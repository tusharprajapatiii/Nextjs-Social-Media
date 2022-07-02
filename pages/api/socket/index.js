import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    let users = [];

    io.on("connection", (socket) => {
      socket.on("joinUser", (user) => {
        users.push({
          id: user._id,
          socketId: socket.id,
          followers: user.followers,
        });
      });
      socket.on("disconnect", () => {
        const data = users.find((user) => user.socketId === socket.id);
        if (data) {
          const clients = users.filter((user) =>
            data.followers.find((item) => item._id === user.id)
          );

          if (clients.length > 0) {
            clients.forEach((client) => {
              socket.to(`${client.socketId}`).emit("CheckUserOffline", data.id);
            });
          }
        }
        users = users.filter((user) => user.socketId !== socket.id);
      });
      socket.on("likePost", (newPost) => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter((user) => ids.includes(user.id));

        if (clients.length > 0) {
          clients.forEach((client) => {
            socket.to(`${client.socketId}`).emit("likeToClient", newPost);
          });
        }
      });
      socket.on("unLikePost", (newPost) => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter((user) => ids.includes(user.id));

        if (clients.length > 0) {
          clients.forEach((client) => {
            socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
          });
        }
      });
      socket.on("createComment", (newPost) => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter((user) => ids.includes(user.id));

        if (clients.length > 0) {
          clients.forEach((client) => {
            socket
              .to(`${client.socketId}`)
              .emit("createCommentToClient", newPost);
          });
        }
      });
      socket.on("deleteComment", (newPost) => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter((user) => ids.includes(user.id));

        if (clients.length > 0) {
          clients.forEach((client) => {
            socket
              .to(`${client.socketId}`)
              .emit("deleteCommentToClient", newPost);
          });
        }
      });
      socket.on("follow", (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit("followToClient", newUser);
      });
      socket.on("unFollow", (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser);
      });
      socket.on("createNotify", (msg) => {
        const client = users.find((user) => msg.recipients.includes(user.id));
        client &&
          socket.to(`${client.socketId}`).emit("createNotifyToClient", msg);
      });

      socket.on("removeNotify", (msg) => {
        const client = users.find((user) => msg.recipients.includes(user.id));
        client &&
          socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
      });

      // Message
      socket.on("addMessage", (msg) => {
        const user = users.find((user) => user.id === msg.recipient);
        user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
      });

      // Check User Online / Offline
      socket.on("checkUserOnline", (data) => {
        const following = users.filter((user) =>
          data.following.find((item) => item._id === user.id)
        );
        socket.emit("checkUserOnlineToMe", following);

        const clients = users.filter((user) =>
          data.followers.find((item) => item._id === user.id)
        );

        if (clients.length > 0) {
          clients.forEach((client) => {
            socket
              .to(`${client.socketId}`)
              .emit("checkUserOnlineToClient", data._id);
          });
        }
      });
    });
  }

  res.end();
};

export default SocketHandler;

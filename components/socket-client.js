import { useEffect } from "react";
import { useDispatch } from "react-redux";

function spawnNotification(body, title, icon, url) {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
}

const SocketClient = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const audioref = useRef();

  useEffect(() => {
    socket.emit("joinUser", user);
  }, [socket, user]);

  useEffect(() => {
    socket.on('likeToClient', newPost =>{
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })

    return () => socket.off('likeToClient')
},[socket, dispatch])

useEffect(() => {
    socket.on('unLikeToClient', newPost =>{
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    })

    return () => socket.off('unLikeToClient')
},[socket, dispatch])




};

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function ProfilePic() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <motion.div
        initial={{ y: "-50vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 150 }}
        className="absolute shadow-lg top-2 left-[45%] z-20 rounded-full hidden sm:inline-block bg-[#505050] "
      >
        <Image
          className="rounded-full mx-2 cursor-pointer "
          src={"/profile2.jpg"}
          height={100}
          width={100}
          objectFit="cover"
        />
      </motion.div>
      <motion.div
        initial={{ y: "-50vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", stiffness: 150 }}
        className="hidden absolute top-4 left-[32%] z-20  rounded-full sm:hidden  bg-[#505050] "
      >
        <Image
          className="rounded-full mx-2 cursor-pointer "
          src={"/profile2.jpg"}
          height={55}
          width={55}
        />
      </motion.div>
    </div>
  );
}

export default ProfilePic;

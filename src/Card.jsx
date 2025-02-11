import React from "react";
import Avatar from "./Avatar.jsx";
import ProfileContent from "./ProfileContent.jsx";
import { motion, useScroll } from "motion/react";

const Card = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />
      <motion.div
        // style={{ scaleX: scrollYProgress }}
        style={{ backgroundColor: "blue" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="card"
      >
        <Avatar />
        <ProfileContent />
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Click me
        </motion.button>
      </motion.div>
    </>
  );
};

export default Card;

import { motion,useSpring } from "framer-motion";
import { Text } from "@nextui-org/react";
import { useEffect } from "react";

const ThrowingLetters = ({ text,delay }) => {
  const springAnimation = {
    type: "spring",
    damping: 10, // Adjust the damping value for the spring animation
    stiffness: 100, // Adjust the stiffness value for the spring animation
  };
 
  return (
    <>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ x: "100vw" ,y:"100vh" }} // Set initial position at right center of the screen
          animate={{ x: "0" ,y:"0" }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1// Add a slight delay for each letter
          }}// Set the animation duration with a slight delay for each letter
          className="letter"
          style={{ display: "inline-block" }}
        >
          <Text h6 size={60} weight="extrabold" className="neon-text animate-text">{letter === " " ? "\u00A0" : letter}</Text>
        </motion.span>
      ))}
      </>
  );
};

export default ThrowingLetters;

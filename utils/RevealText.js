import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Text } from "@nextui-org/react";
const RevealText = ({ text,delay }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });
      await controls.start({
        opacity: 0,
        filter:"blur(5px)",
        transition: { duration: 5 },
      });
    };
      sequence();
    // Convert delay to milliseconds
  }, [controls]);
  return (
      <motion.h1 className="reveal-text flex flex-row">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            className="letter hover:translate-y-2 cursor-pointer"
            initial={{
              opacity: 0,
              scale: 5,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.2,
              delay:delay+ index * 0.05 // Add a slight delay for each letter
            }}
            animate={controls}
          >
            <Text h6 weight="hairline" css={{textGradient:"180deg, $gray800 100%, $gray300 50%" ,fontSize:"20px", "@sm" :{fontSize:"25px"},"@md" :{fontSize:"35px"}}}>{letter === " " ? "\u00A0" : letter}</Text>
          </motion.span>
        ))}
      </motion.h1>
  );
};

export default RevealText;

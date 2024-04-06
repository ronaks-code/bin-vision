import React from "react";
import BlinkingCursor from "../BlinkingCursor/BlinkingCursor";
import styles from "./Factoid.module.css";

const FACTOIDS = [
  "Recycling one ton of paper can save 17 trees.",
  "Every hour, Americans use 2.5 million plastic bottles.",
  "Glass can be recycled endlessly without loss in quality.",
  "Recycling Creates Jobs: The recycling industry generates employment opportunities in collection, processing, and manufacturing recycled products." ,
  "Recycling in Space: Even astronauts on the International Space Station recycle waste materials to conserve resources.",
  "Greenhouse Gas Emissions: Landfills emit methane, a potent greenhouse gas. Not recycling organic waste contributes to these emissions."
];

const Factoid = () => {
  const [displayedText, setDisplayedText] = React.useState(FACTOIDS[0]);
  const [factoidIndex, setFactoidIndex] = React.useState(0);
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    if (typing) {
      const nextFactoid = FACTOIDS[factoidIndex];
      if (displayedText !== nextFactoid) {
        const interval = setInterval(() => {
          setDisplayedText((prevText) =>
            nextFactoid.substring(0, prevText.length + 1)
          );
        }, 15);

        return () => clearInterval(interval);
      } else {
        setTimeout(() => {
          setTyping(false);
        }, 6000);
      }
    }
  }, [displayedText, typing, factoidIndex]);

  React.useEffect(() => {
    if (!typing) {
      if (displayedText.length > 0) {
        const interval = setInterval(() => {
          setDisplayedText((prevText) =>
            prevText.substring(0, prevText.length - 1)
          );
        }, 15);

        return () => clearInterval(interval);
      } else {
        setFactoidIndex((prevIndex) => (prevIndex + 1) % FACTOIDS.length);
        setTyping(true);
      }
    }
  }, [displayedText, typing]);

  return (
    <div className={styles.factoidContainer}>
      <span className={styles.factoidText}>
        {displayedText}
        {!typing && " "}
        <BlinkingCursor />
      </span>
    </div>
  );
};

export default Factoid;

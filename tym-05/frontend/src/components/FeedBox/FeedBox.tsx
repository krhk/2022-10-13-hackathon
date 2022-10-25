import React, { useState } from "react";
import ArrowUp from "../../assets/svg/arrowUp.svg";
import ArrowDown from "../../assets/svg/arrowDown.svg";
import Line from "../../assets/svg/Line.svg";
import styles from "./FeedBox.module.css";

const FeedBox = (props: any) => {
  const [downvote, setDownvote] = useState(props.downvotes ?? 0);
  const [upvotes, setUpvotes] = useState(props.upvotes ?? 0);

  const downVote = () => {
    setDownvote(downvote - 1);
  };

  const upvoted = () => {
    setUpvotes(upvotes + 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={props.img} alt="vymol" />
      </div>
      <div className={styles.paragraphContainer}>
        <p className={styles.paragraph}>{props.description}</p>
        <div className={styles.buttonContainer}>
          <img
            onClick={() => upvoted()}
            style={{ cursor: "pointer" }}
            src={ArrowUp}
            alt="upvote button"
          />
          <p>{upvotes}</p>
          <img
            onClick={() => downVote()}
            src={ArrowDown}
            style={{ cursor: "pointer" }}
            alt="downvote button"
          />
          <p>{downvote}</p>
        </div>
      </div>
      <div className={styles.divider}>
        <img src={Line} alt="linka" />
      </div>
    </div>
  );
};

export default FeedBox;

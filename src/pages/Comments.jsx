import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

export const Comments = ({ data }) => {
  let [comment, setComment] = useState(data);
  const [visiable, setVisible] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [input, setInput] = useState("");


  const addComment = () => {
    let newdata = {
      id: Date.now(),
      author: data.author,
      body: input,
    };
    if (!comment.replies) {
      let updatedData = { ...comment, replies: [newdata] };
      setComment(updatedData);
      // return comment
    } else {
      let updatedData = { ...comment, replies: [...comment.replies, newdata] };

      setComment(updatedData);
      // return comment
    }
    console.log(comment);
  };
  const expand = () => {
    setVisible(!visiable);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="mainReplayBox">
        <button
          onClick={expand}
          className={visiable ? "expandButtonActive" : "expandButton"}
        >
          {visiable ? "" : "+"}
        </button>
        <div className="replayBox">
          <div className="commentBody">
            <span style={{ marginBottom: "0px" }}>{comment.body}</span>

            <div className="replayOption">
              <span
                onClick={() => {
                  setShowInputBox(!showInputBox);
                }}
              >
                Replay
              </span>
              <span>Give Award</span>
              <span>Share</span>
              <span>Report</span>
              <span>Save</span>
            </div>
            {showInputBox && (
              <div className="inputBox">
                <input
                  type="text"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <button onClick={addComment}>Add Comment</button>
              </div>
            )}
          </div>

          {visiable &&
            comment.replies &&
            comment.replies.map((replay) => {
              return (
                <div style={{ padding: "10px" }} key={replay.id}>
                  <Comments data={replay}></Comments>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

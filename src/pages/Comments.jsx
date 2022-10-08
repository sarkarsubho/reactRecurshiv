import { useState } from "react";
import "./style.css";
import "../App.css"

export const Comments = ({ data, handleUpdate, id }) => {
  const [visiable, setVisible] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [input, setInput] = useState("");

  const addComment = () => {
    let newdata = {
      id: Date.now(),
      author: data.author,
      body: input,
    };
    if (!data.replies) {
      data.replies = [newdata];
    } else {
      data.replies.push(newdata);
    }
    console.log(data);
    handleUpdate(id);
    setInput("");
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
            <span style={{ marginBottom: "0px" }}>{data.body}</span>

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
                  value={input}
                  className="newcomment"
                  placeholder="add New"
                />
                <button className="post" onClick={addComment}>Replay</button>
              </div>
            )}
          </div>

          {visiable &&
            data.replies &&
            data.replies.map((replay) => {
              return (
                <div style={{ padding: "10px" }} key={replay.id}>
                  <Comments
                    data={replay}
                    handleUpdate={handleUpdate}
                    id={id}
                  ></Comments>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

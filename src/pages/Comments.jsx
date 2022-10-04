import { useState } from "react";
import "./style.css";

export const Comments = ({ data }) => {
  const [visiable, setVisible] = useState(false);
  const [showInputBox,setShowInputBox]=useState(false);
  console.log(data);
  const expand = () => {
    setVisible(!visiable);
  };
  console.log(data);
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
              <span onClick={()=>{setShowInputBox(!showInputBox)}}>Replay</span>
              <span>Give Award</span>
              <span>Share</span>
              <span>Report</span>
              <span>Save</span>
            </div>
           {showInputBox && <div className="inputBox">
              <input type="text" />
              <button>Add Comment</button>
            </div>}
            
          </div>

          {visiable &&
            data.replies &&
            data.replies.map((replay) => {
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

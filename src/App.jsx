import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Comments } from "./pages/Comments";
// import { Replay } from "./pages/Replay";

function App() {
  const [data, setData] = useState([]);
  console.log(data);
  const [commenttext, setCommentText] = useState("");
  const addNewComment = () => {
    let newdata = {
      id: Date.now(),
      author: data.author,
      body: commenttext,
      points: 2,
    };

    axios.post("http://localhost:8080/posts", newdata).then((res) => {
      setData([...data, res.data]);
      console.log("posting comment", res);
    });
    setCommentText("");
  };

  const getData = () => {
    axios.get("http://localhost:8080/posts").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = (id) => {
    let updateddata = data.find((e) => {
      return e.id == id;
    });
    console.log("main Data", data, id, updateddata);
    axios
      .patch(`http://localhost:8080/posts/${id}`, updateddata)
      .then((res) => {
        getData();
      });
  };

  return (
    <div className="App">
      <h2>Comments</h2>
      <div className="commentBox">
        <input
          type="text"
          placeholder="Add new Comment"
          className="newcomment"
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          value={commenttext}
        />
        <button className="post" onClick={addNewComment}>
          POST
        </button>
      </div>

      {data?.map((comment) => {
        // console.log(comment)
        return (
          <Comments
            key={comment.id}
            data={comment}
            handleUpdate={handleUpdate}
            id={comment.id}
          ></Comments>
        );
      })}
    </div>
  );
}

export default App;

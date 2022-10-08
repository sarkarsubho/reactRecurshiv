import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Comments } from "./pages/Comments";
// import { Replay } from "./pages/Replay";

function App() {
  const [data, setData] = useState([]);
  console.log(data)
  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((res) => {
      setData(res.data);
    });
  }, []);
  
  return (
    <div className="App">
      <h2>Comments</h2>
      {data?.map((comment) => {
        // console.log(comment)
        return <Comments key={comment.id} data={comment} ></Comments>;
      })}
    </div>
  );
}

export default App;

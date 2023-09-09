import React, { useState } from "react";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PostsList1 from "./PostList1";
import PostsList2 from "./PostList2";
import Post from "./Post";
import CreatePost from "./CreatePost";

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export type PostProps = {
  id: string | number;
  title: string;
  userId?: number;
}[];

export const POSTS: PostProps = [
  { id: 1, title: "Lorem ipsum dolor sit amet", userId: 1 },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipisicing",
  },
  { id: 3, title: "Lorem, ipsum dolor", userId: 3 },
];

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div className="App">
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <br />
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost />)}>
        Create Post
      </button>
      {currentPage}
    </div>
  );
}

export default App;

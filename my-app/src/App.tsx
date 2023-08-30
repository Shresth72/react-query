import React from "react";
import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

type PostProps = {
  id: string | number;
  title: string;
}[];

const POSTS: PostProps = [
  { id: 1, title: "Post 1" },
  { id: 1, title: "Post 2" },
];

function App() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div className="App">
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("new Post")}
      >
        {" "}
        Add new
      </button>
    </div>
  );
}

export default App;

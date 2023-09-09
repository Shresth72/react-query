import { useMutation } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import { POSTS } from "./App";

const CreatePost = () => {
  const titleRef = useRef();
  const userRef = useRef();
  const createPostMutation = useMutation({
    mutationFn: (title: string, userId: number) => {
      return POSTS.push({ title: title, userId: userId, id: 2 });
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      userId: userRef.current.value,
    });
  }

  return <div></div>;
};

export default CreatePost;

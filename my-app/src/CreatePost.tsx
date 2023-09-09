import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import { POSTS, PostProps } from "./App";

const CreatePost = () => {
  const titleRef = useRef();
  const userRef = useRef();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: (title: string, userId: number) => {
      return POSTS.push({ title: title, userId: userId, id: 2 });
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["posts", data.id], data); //caching
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
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

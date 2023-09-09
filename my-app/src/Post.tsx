import { useQuery } from "@tanstack/react-query";
import { POSTS } from "./App";

type PostProps = {
  id: string | number;
};

export default function Post({ id }: PostProps) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => POSTS.find((post) => id === post.id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery.data?.userId],
    enabled: postQuery.data?.userId != null,
    queryFn: () => POSTS.find((post) => postQuery.data?.userId === post.userId),
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data?.title} <br />
        <small>
          {postQuery.data?.userId}
          {/* {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name} */}
        </small>
      </h1>
    </>
  );
}

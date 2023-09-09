import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PostListPaginated = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(data),
  });

  return (
    <div>
      <div>PostListPaginated</div>
    </div>
  );
};

export default PostListPaginated;

import { useSinglePost } from "@/store/useSinglePost";
import { useParams } from "react-router-dom";

export const SinglePostPage = () => {
  const params = useParams();
  const userId = params.postId;
  const { data } = useSinglePost(userId);
  console.log(data);

  return <p>Single Post</p>;
};

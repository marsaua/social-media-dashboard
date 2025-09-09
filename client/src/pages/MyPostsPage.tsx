import { AddPost } from "@/components/AddPost";
import MediaCard from "@/components/MediaCard";
import { usePosts } from "@/store/usePosts";
import Masonry from "@mui/lab/Masonry";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MyPostsPage = () => {
  const { data: posts, isLoading, isError, error } = usePosts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div> {error.message} </div>;
  return (
    <>
      <Stack direction="row" sx={{ justifyContent: "space-between", paddingBottom: "40px" }}>
        <Typography variant="h4">My Posts</Typography>
        <AddPost />
      </Stack>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{ margin: "0" }}>
        {posts?.map((post) => <MediaCard post={post} />)}
      </Masonry>
    </>
  );
};

import { usePosts } from "@/store/usePosts";

export const MyPostsPage = () => {
  const { data: posts, isLoading, isError } = usePosts();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <h1>Users Page</h1>
      {posts?.map((post) => (
        <div key={post.title}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

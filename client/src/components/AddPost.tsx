import Button from "@mui/material/Button";
import { AddPostModal } from "./Modals/AddPostModal";
import { useState } from "react";
import { useCreatePost } from "@/store/useCreatePost";
import type { Post } from "@/store/types";

export const AddPost = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { handleSubmit } = useCreatePost(handleCloseModal);
  const initialValues: Post = {
    title: "",
    description: "",
    image: null,
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Add New Post
      </Button>
      {open && (
        <AddPostModal
          open={open}
          onClose={handleCloseModal}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </>
  );
};

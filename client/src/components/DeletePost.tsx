import Button from "@mui/material/Button";
import { AddPostModal } from "./Modals/AddPostModal";
import { useState } from "react";
import { useDeletePost } from "@/store/useDeletePost";
import { DeletePostModal } from "./Modals/DeletePostModal";

export const DeletePost = ({ post = null }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);
  const { handleSubmit } = useDeletePost(handleCloseModal, post);

  return (
    <>
      <Button size="small" onClick={handleOpenModal}>
        Delete Post
      </Button>
      {open && <DeletePostModal open={open} onClose={handleCloseModal} handleSubmit={handleSubmit} />}
    </>
  );
};

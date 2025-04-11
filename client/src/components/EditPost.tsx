import Button from "@mui/material/Button";
import { AddPostModal } from "./Modals/AddPostModal";
import { useState } from "react";
import { useEditPost } from "@/store/useEditPost";

export const EditPost = ({ post = null }) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);
  const { handleSubmit } = useEditPost(handleCloseModal, post);

  return (
    <>
      <Button size="small" onClick={handleOpenModal}>
        Edit
      </Button>
      {open && <AddPostModal open={open} onClose={handleCloseModal} handleSubmit={handleSubmit} initialValues={post} />}
    </>
  );
};

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Form, Field, Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { UploadFile } from "../UploadFile";
import { useCreatePost, type Post } from "@/store/useCreatePost";

interface Props {
  open: boolean;
  onClose: () => void;
  post: Post;
}

export const AddPostModal = ({ open, onClose, handleSubmit, initialValues }: Props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Post
        </Typography>
        <Formik onSubmit={(value) => handleSubmit(value)} initialValues={initialValues}>
          <Form>
            <Stack direction="column" spacing={2} justifyContent="center" mt={2}>
              <Field as={TextField} label="Title" variant="outlined" name="title" />
              <Field as={TextField} label="Description" variant="outlined" name="description" multiline rows={3} />
              <UploadFile />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

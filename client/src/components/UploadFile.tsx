import { useFormikContext } from "formik";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadFile = () => {
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
      {values.file ? values.file.name : "Upload file"}
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue("image", e.currentTarget.files[0]);
          }
        }}
      />
    </Button>
  );
};

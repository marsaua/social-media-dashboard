import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import { useRegisterForm } from "@/store/useRegisterForm";
import { User } from "@/store/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginPage = () => {
  const { handleSubmit, initialValues } = useRegisterForm();
  const styles = {
    container: {
      position: "relative" as const,
      width: "100%",
      height: "100%",
    },
    form: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      marginTop: "20px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "20px",
      maxWidth: "500px",
      width: "100%",
    },
    title: {
      position: "absolute" as const,
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.title}>
        Registration
      </Typography>
      <Formik initialValues={initialValues} onSubmit={(values: User) => handleSubmit(values)} style={styles.container}>
        <Form style={styles.form}>
          <Field as={TextField} name="username" label="Username" />
          <Field as={TextField} name="password" type="password" label="Password" />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

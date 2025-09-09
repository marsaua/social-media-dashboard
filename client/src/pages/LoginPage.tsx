import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import type { LogInData } from "@/store/types";
import Button from "@mui/material/Button";
import { useLogInForm } from "@/store/useAutherization";
import { InputItem } from "@/components/InputItem";

export const LoginPage = () => {
  const { handleSubmit, initialValues, error } = useLogInForm();
  console.log(error);

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
        Authorization
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: LogInData) => handleSubmit(values)}
        style={styles.container}
      >
        <Form style={styles.form}>
          <InputItem name="username" label="Username" error={error} />
          <InputItem name="password" label="Password" error={error} />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

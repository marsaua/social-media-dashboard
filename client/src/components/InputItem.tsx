import TextField from "@mui/material/TextField";

interface InputItemProps {
  name: string;
  label: string;
  required?: boolean;
  error?: any;
}

export const InputItem = ({ name, label, error }: InputItemProps) => {
  const errorItem = error?.errors?.[name];
  const errorMessage = Array.isArray(errorItem) ? errorItem.join(", ") : errorItem;

  return <TextField name={name} label={label} variant="outlined" error={!!errorItem} helperText={errorMessage} />;
};

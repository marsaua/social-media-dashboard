import { useReducer } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface State {
  count: number;
  error: string | null;
}
interface Action {
  type: "increment" | "decrement";
}
function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case "increment": {
      const newCount = state.count + 1;
      const hasError = newCount > 5;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? "Maximum reached" : null,
      };
    }
    case "decrement": {
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {
        ...state,
        count: hasError ? state.count : newCount,
        error: hasError ? "Minimum reached" : null,
      };
    }
  }
}

export const TwitterPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });
  return (
    <Box>
      <Typography variant="h1">Twitter Page</Typography>
      <Box>
        <Typography>Count: {state.count}</Typography>
      </Box>
      <Box>
        <Button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </Button>
      </Box>
      {state.error && <Typography>{state.error}</Typography>}
    </Box>
  );
};

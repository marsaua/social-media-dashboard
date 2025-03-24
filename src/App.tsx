import { AppRouters } from "./AppRouters";
import { ThemeProviderWrapper } from "./store/ThemeProvider";

function App() {
  return (
    <ThemeProviderWrapper>
      <AppRouters />
    </ThemeProviderWrapper>
  );
}

export default App;

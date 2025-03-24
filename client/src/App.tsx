import { AppRouters } from "./AppRouters.tsx";
import { ThemeProviderWrapper } from "./store/ThemeProvider.tsx";

function App() {
  return (
    <ThemeProviderWrapper>
      <AppRouters />
    </ThemeProviderWrapper>
  );
}

export default App;

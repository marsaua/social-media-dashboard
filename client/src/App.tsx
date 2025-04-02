import { AppRouters } from "./AppRouters.tsx";
import { ThemeProviderWrapper } from "./store/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <AppRouters />
      </ThemeProviderWrapper>
    </QueryClientProvider>
  );
}

export default App;

import { AppRouters } from "./AppRouters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouters />
    </QueryClientProvider>
  );
}

export default App;

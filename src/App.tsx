import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "./components/Calendar";
import { Form } from "./components/Form";
import { Stats } from "./components/Stats";
import { GlobalStateProvider } from "./context/GlobalState";
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

function App() {
  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <div className="w-fit h-screen flex justify-center flex-col mx-auto gap-4">
          <Form />
          <Calendar />
          <Stats />
        </div>
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;

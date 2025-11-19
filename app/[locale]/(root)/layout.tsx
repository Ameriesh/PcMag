import Navbar from "../../../components/Navbar";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    {/* <QueryClientProvider client={queryClient}> */}
      <main className="font-work-sans">
        <Navbar></Navbar>
          {children}
      </main>
    {/* </QueryClientProvider> */}
    
    </>

  );
}
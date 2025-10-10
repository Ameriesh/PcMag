import Navbar from "../../components/Navbar";
import { Toaster } from "sonner";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
       <Navbar></Navbar>
        {children}
    </main>
  );
}
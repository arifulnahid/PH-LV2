import "./App.css";
import { Outlet } from "react-router";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/nav/Navbar";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Toaster position="top-center" />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

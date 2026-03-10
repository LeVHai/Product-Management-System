import { Toaster } from "sonner";
import Logo from "@/assets/image.png";
import "./App.css";
import { MotionLazy } from "./components/animate/motion-lazy";
import Router from "./routes";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div className="h-screen">
      <MotionLazy>
        <Helmet>
            <title>Owl</title>
            <link rel="icon" href={Logo} />
          </Helmet>
        <Toaster position="top-right" richColors />
        <Router />
      </MotionLazy>
    </div>
  );
}

export default App;

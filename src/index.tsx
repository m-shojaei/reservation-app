import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./ui/App";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

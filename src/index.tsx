import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./ui/App";
import { Base_Name } from "./constants";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter basename={Base_Name}>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);

import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import "./Styles/reset.css";

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

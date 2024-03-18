import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/AuthPages/Signup";
import Login from "./pages/AuthPages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/sign-up" Component={Signup}/>
        <Route path="/sign-in" Component={Login}/>
      </Routes>
    </>
  );
}

export default App;

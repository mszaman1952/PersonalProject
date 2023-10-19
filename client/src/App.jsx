import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./conponents/Login";
import Register from "./conponents/Register";
import "./assets/index.css"
import MonthlyTransition from "./pages/MonthlyTransition";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/monthly_transition" element={<MonthlyTransition />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
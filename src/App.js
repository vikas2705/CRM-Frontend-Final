import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/customer' element={<Customer />} />
                    <Route path='/engineer' element={<Engineer />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

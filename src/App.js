import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import NotFound404 from "./components/NotFound404";
import Unauthorised403 from "./components/Unauthorised403";
import RequireAuth from "./components/RequireAuth";
import { USER_ROLES } from "./constants/userRoles";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Login />} />

                    <Route
                        element={
                            <RequireAuth allowedRoles={[USER_ROLES.ADMIN]} />
                        }
                    >
                        <Route path='/admin' element={<Admin />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    USER_ROLES.CUSTOMER,
                                    USER_ROLES.ADMIN,
                                ]}
                            />
                        }
                    >
                        <Route path='/customer' element={<Customer />} />
                    </Route>

                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    USER_ROLES.ENGINEER,
                                    USER_ROLES.ADMIN,
                                ]}
                            />
                        }
                    >
                        <Route path='/engineer' element={<Engineer />} />
                    </Route>

                    <Route path='/unauthorised' element={<Unauthorised403 />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

/**
 *
 * Step 1:
 * Admin -> Admin,  else Unauthorised
 * Engineer -> Engineer, else Unauthorised
 * Customer -> Customer, else Unauthorised
 *
 *
 * Step 2:
 * Admin role -> Admin,Engineer,Customer  else Unauthorised
 * Engineer role-> Engineer, else Unauthorised
 * Customer role -> Customer, else Unauthorised
 *
 *
 * Admin page --> Admin
 * Customer --> Customer, Admin
 * ENgineer --> Engineer, Admin
 *
 */

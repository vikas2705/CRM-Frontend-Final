import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from "@coreui/react";
import "../styles/sidebar.css";
import Logout from "./Logout";

function Sidebar() {
    return (
        <CSidebar unfoldable className='height-100p bg-black'>
            <CSidebarNav>
                <CNavItem href='#' className='bg-dark'>
                    <i className='bi bi-bar-chart-fill text-white m-2'></i>
                    <h5 className='text-white mx-3  my-1 fw-bolder'>MY CRM</h5>
                </CNavItem>

                <CNavTitle className='text-light fw-normal'>
                    A CRM app for all your requirements.
                </CNavTitle>

                <CNavItem href='/'>
                    <i className='bi bi-house text-white m-2'></i>
                    <div className='text-decoration-none text-white mx-3'>
                        Home
                    </div>
                </CNavItem>

                <Logout />
            </CSidebarNav>
        </CSidebar>
    );
}

export default Sidebar;

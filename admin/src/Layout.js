import React, { useState, useEffect } from 'react';
import NavbarComponent from './components/NavBar';
import SidebarComponent from './components/SideBar';

const Layout = () => {

    return (
        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{marginTop:'70px', marginLeft:'280px'}}>

            </div>
        </div>
    );
};

export default Layout;

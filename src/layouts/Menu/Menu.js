import React from 'react';
import '../Menu/Menu.css';
import  { Link }  from 'react-router-dom';

const Menu = () => {
    return(
        <div class= "container1">
        <aside className="main-sidebar sidebar-light-primary elevation-4 position-fixed" style={{backgroundColor: "#ECEFF1"}}>
          {/* Brand Logo */}
          <div className="text-center">
            <img src="/img/PIK_logo-01-min.png" width="70%" className="img-fluid" style={{paddingTop:"20px"}}/>
            </div>
          {/* Sidebar */}
          <div className="sidebar" style={{minHeight: "100%"}}>
            {/* Sidebar user panel (optional) */}
            
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}

                <li className="nav-item has-treeview">
                  <Link to="/sliderlist" className="nav-link dpp">
                    <i class="far fa-images"></i>
                    <p className="ml-3">
                       Home Gallery
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview">
                  <Link to="/aboutuslist" className="nav-link dpp">
                    <i class="far fa-address-card"></i>
                    <p className="ml-3">
                       About Us
                    </p>
                  </Link>
                </li>
{/* 
                <li className="nav-item has-treeview ">
                  <Link to="/missionList" className="nav-link dpp">
                    <i class="fas fa-sun"></i>
                    <p className="ml-3">
                        Mission & Vision
                    </p>
                  </Link>
                </li> */}


                <li className="nav-item has-treeview ">
                  <Link to="/successlist" className="nav-link dpp">
                  <i className="fas fa-trophy" />
                    <p className="ml-3">
                       Success Stories
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview ">
                  <Link to="/courseslist" className="nav-link dpp">
                  <i className="fas fa-chalkboard-teacher" />
                    <p className="ml-3">
                       Courses
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview">
                  <Link to="/applicationlist" className="nav-link dpp">
                  <i class="fas fa-file-signature"></i>
                    <p className="ml-3">
                        Application
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview ">
                  <Link to="/newslist" className="nav-link dpp">
                  <i className="far fa-newspaper" />
                    <p className="ml-3">
                       News
                    </p>
                  </Link>
                </li>

                <li className="nav-item has-treeview ">
                  <Link to="/contactlist" className="nav-link dpp">
                  <i class="fas fa-phone-square-alt"></i>
                    <p className="ml-3">
                       Contact
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview ">
                  <Link to="/footerlist" className="nav-link dpp">
                    <i class="fas fa-shoe-prints"></i>
                    <p className="ml-3">
                    Footer
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
            
          </div>
          
        </aside>
      </div>
    )
}

export default Menu;
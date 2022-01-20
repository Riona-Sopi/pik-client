import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

export default function Navbar(){
  const history = useHistory()
  const onDeleteTokenLocalStorage = () =>{
    localStorage.removeItem('token');
    history.push('/')
  }
    return (
      <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav ">
          <li className="nav-item">
            <div className="nav-link" data-widget="pushmenu" style={{cursor:"pointer"}}><i className="fas fa-bars" /></div>
          </li>
          
        </ul>
        <ul class="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-sm btn-link lbtn"onClick={onDeleteTokenLocalStorage}>Log out</button>
          </li>
        </ul>
   
        
      </nav>
    </div>
  
        /* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img className="logo" src="./img/powerpacklogo.png" width="15%"></img>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
    <Link className="nav-link" to="/aboutuslist">About Us</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/subaboutlist">Sub About Us</Link>
      </li>
    <li className="nav-item">
    <Link className="nav-link" to="/productlist">Products</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/productTextList">Product Text</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/techlist">Technology</Link>
      </li>   
      <li className="nav-item">
    <Link className="nav-link" to="/degralialist">Degralia</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/sliderPhotoslist">Slider Photos</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/dplist">DandP</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/footerlist">Footer</Link>
      </li>
    </ul>
      <li className="nav-item">
        <button className="btn btn-sm btn-link" onClick={onDeleteTokenLocalStorage} style={{color: "grey", fontSize: "16px", float:"right"}}>Log out</button>
      </li>
  </div>
</nav> */
    )
}
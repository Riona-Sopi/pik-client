import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';


export const HomePage = () => {
  const lang = localStorage.getItem("lang")
  const [coursel, setCoursel] = useState([])
  const [missionList, setMissionList] = useState([])
  const [clientList, setClientList] = useState([])
  const [values, setValues] = useState([])
  const [newsList, setNewsList] = useState([])
  const [productList, setProductList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [aboutList, setAboutList] = useState([])
  const [subAboutList, setSubAboutList] = useState([])
  const [departmentList, setDepartmentList] = useState([])


  var settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000
  };



useEffect(() => {
    axios.get("https://localhost:44394/api/HomeGallery/")
        .then(res => {
            setCoursel(res.data)
        })
        .catch(err => console.log(err))
}, [])


  return(
    <div>
        <Carousel fade>
            {coursel.map(data => (
                <Carousel.Item interval={5000}>
                    <a href={data.link} target="_blank">
                    <img
                    className="d-block w-100"
                    src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`}
                    alt="..."
                    />
                    </a>
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    </div>
  )
}


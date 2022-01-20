import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel } from 'react-bootstrap';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player';


export const AboutPage = () => {
  const lang = localStorage.getItem("lang")
  const [aboutList, setAboutList] = useState([])
  const [successList, setSuccessList] = useState([])
  const [abList, setABList] = useState([])
  const [values, setValues] = useState([])
 
  var settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

useEffect(() => {
  axios.get("https://localhost:44394/api/AboutUs/")
      .then(res => {
          setAboutList(res.data)
      })
      .catch(err => console.log(err))
}, [])

useEffect(() => {
    axios.get("https://localhost:44394/api/AB/")
        .then(res => {
            setABList(res.data)
        })
        .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get("https://localhost:44394/api/Success/")
        .then(res => {
            setSuccessList(res.data)
        })
        .catch(err => console.log(err))
  }, [])


  return(
    <div>
         {abList.map(data => (
             <>
         <img className="banner mb-5" src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} style={{width: "100%"}}/>    
            </>
          ))}
          {aboutList.map(data => (
             <>
                <div className="row m-5 rwab">
                  <div className="col-lg-6">
                  <div className="text" style={{padding:"0px 50px 50px 50px"}}>
                {lang === 'al' ? (
                      <>
                        <p className="aboutTitle" style={{fontSize:"45px"}} >{data.aboutTitle}</p>
                        <p className="aboutDescription" dangerouslySetInnerHTML={{__html: data.aboutDescription}}></p>
                      </>
                    ): (
                      <>
                      <p className="aboutTitle" style={{fontSize:"45px"}} >{data.aboutTitleGerman}</p>
                      <p className="aboutDescription" dangerouslySetInnerHTML={{__html: data.aboutDescriptionGerman}}></p>
                      </>
                    )}
                    </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="image">
                {lang === 'al' ? (
                      <>
                        <img src={data.imageSrcGerman} className="img-fluid text-center" width="70%" style={{margin:"auto"}}></img>
                      </>
                    ): (
                      <>
                      <img src={data.imageSrcGerman} className="img-fluid text-center" width="70%" style={{margin:"auto"}}></img>
                      </>
                    )}
                    </div>
                    </div>
                </div>  

                <img src="./img/PaPagese.png" width="100%" className="mt-5 mb-5"></img>

                <div className="row justify-content-center rcw" style={{margin:"50px"}}>
                      <div className="col-lg-6">
                        <div className="text-center m-3">
                        <Link to="/courses">
                        <img src="/img/RrethNesh2-04-min.png" width="100%"></img>
                        </Link>
                        </div>
                      </div>
                      <div className="col-lg-6">
                      <div className="text-center m-3">
                      <Link to="/application">
                         <img src="/img/RrethNesh2-05-min.png" width="100%"></img>
                         </Link>
                         </div>
                      </div>
                </div>

                <div className="cnt mb-5" style={{margin:"auto", padding:"50px 0px 50px 0px", backgroundColor:"#ECEFF1"}}>
              <div class="text-center">
                <div className="aboutTitle" style={{textAlign:"center", margin:"auto", fontSize:"50px"}}>{lang === 'al' ? 'Histori Suksesi' : 'Erfolgsgeschichten'}</div>
                </div>
                </div>
                <div className="sliderclients" style={{margin:"0px 150px 50px 150px"}}>
                <Slider {...settings}>
                  {successList.map(data => (
                    <div className="container pe-3 ps-3">
                      <img
                          className="d-block w-100"
                          src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} 
                          alt="..."
                      />
                      {lang === 'al' ? (
                      <>
                        <div className="successTitle mb-2 mt-2">{data.successTitle}</div>
                        <div className="successDesc" dangerouslySetInnerHTML={{__html: data.successDescription}}></div>
                      </>
                        ): (
                          <>
                          <div className="successTitle">{data.successTitleGerman}</div>
                          <div className="successDesc" dangerouslySetInnerHTML={{__html: data.successDescriptionGerman}}></div>
                          </>
                        )}
                      </div>
                    ))}
                </Slider>
                </div>
             </>
          ))}
    </div>
  )
}


import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const CoursesPage = () => {
const lang = localStorage.getItem("lang")
  const [coursesList, setCoursesList] = useState([])
  const [coList, setCOList] = useState([])
  const [values, setValues] = useState([])
 


useEffect(() => {
  axios.get("https://localhost:44394/api/Courses/")
      .then(res => {
            setCoursesList(res.data)
      })
      .catch(err => console.log(err))
}, [])

useEffect(() => {
    axios.get("https://localhost:44394/api/CO/")
        .then(res => {
            setCOList(res.data)
        })
        .catch(err => console.log(err))
  }, [])



  return(
    <div>
     {coList.map(data => (
             <>
         <img className="banner" src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} style={{width: "100%"}}/>    
            </>
          ))} 
   
   <div className="row mb-5">
        {coursesList.map((data, index) => (
        <div className="sus pb-3 mt-5 mb-5" key={index} style={{backgroundColor: data.susBackgroundColor}}>
             <div className="hey">
            <div class="containerproducts">
            <div class="imagge" style={{float:data.imageAlign}}>
                <div className="text-center">
                <img src={data.imageSrc} className="img-fluid text-center" width="80%" style={{margin:"auto"}}/>
                </div>
            </div>
            <div class="textt" style={{float:data.textAlign}}>
            <div className="justify-content-center" style={{width:"85%", margin: "auto"}}>
                {lang === 'al' ? (
                    <>
                    <p className="aboutTitle" style={{fontSize:"45px"}}>{data.coursesTitle}</p>
                    <p className="aboutDescription mb-5" dangerouslySetInnerHTML={{__html: data.coursesDescription}}></p>
                    </>
                ): (
                    <>
                    <p className="aboutTitle" style={{fontSize:"45px"}}>{data.coursesTitleGerman}</p>
                    <p className="aboutDescription mb-5" dangerouslySetInnerHTML={{__html: data.coursesDescriptionGerman}}></p>
                    </>
                )}
                </div>
          </div>
          </div>
          </div>
                </div>
          ))}
          </div>
    </div>
  )
}


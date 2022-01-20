import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player';


export default function SingleNewsPage() {
  const lang = localStorage.getItem("lang")
  const {id} = useParams();
  const [gallery, setGallery] = useState([]);
  const [newsList, setNewsList] = useState([])
  const [neList, setNeList] = useState([])
  const [value, setValue] = useState([])
  const [v, setV] = useState([])

    const url = window?.location.href ?? '';



  useEffect(() => {
    axios.get(`https://localhost:44394/api/News/${id}`)
        .then(res =>{ 
          setGallery(res.data.nGallery)
            setNewsList(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

  useEffect(() => {
    axios.get("https://localhost:44394/api/News/")
        .then(res => setValue(res.data))
        .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    axios.get("https://localhost:44394/api/News/News-Gallery")
        .then(res => setV(res.data))
        .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    axios.get("https://localhost:44394/api/NE/")
        .then(res => {
            setNeList(res.data)
        })
        .catch(err => console.log(err))
  }, [])


  return (
    <>
     {neList.map(data => (
             <>
         <img className="banner" src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} style={{width: "100%"}}/>    
            </>
          ))}
  
        <div className="nsn" style={{margin:"5em 7em 0em 7em"}}>
        <div className="container m-auto">
        <div className="containerimg">
        <Carousel>
            {gallery.map(data => (
                <Carousel.Item interval={2000}>
                {/* <ReactPlayer muted={true} autoplay={true} url={newsList.imageSrc}/> */}
                    <img
                    className="d-block w-100 img-fluid_nw nimg"
                    src={data.imageSrc}
                    alt="..."
                    />
                  
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
       {/* <img src={newsList.imageSrc} className="nimg"/> */}
        </div>
        <p className="newsDate mt-3">{newsList.newsDate}</p><br/>
            {lang === 'al' ? (
              <>
                <p className="newsTitlee mb-3" style={{fontSize:"40px"}}>{newsList.newsTitle}</p>
                <p className="newsDesc" dangerouslySetInnerHTML={{__html: newsList.newsDescription}}></p>
              </>
            ): (
              <>
                 <p className="newsTitlee mb-3" style={{fontSize:"40px"}}>{newsList.newsTitleGerman}</p>
                <p className="newsDesc" dangerouslySetInnerHTML={{__html: newsList.newsDescriptionGerman}}></p>
              </>
            )}
  
             {newsList.video !== "" ? (
              //  <div className="">
              //   <ReactPlayer style={{aspectRatio:"16/9"}} url={lang === 'al' ? `${newsList.video}` : `${newsList.videoGerman}`} />
              //  </div>
              //   <div className="ratio ratio-16x9">
              //  <ReactPlayer url={lang === 'al' ? `${newsList.video}` : `${newsList.videoGerman}`} />
              //  </div>
                  <div className="ratio ratio-16x9">
                  <iframe src={lang === 'al' ? `${newsList.video}` : `${newsList.videoGerman}`} title="YouTube video" allowFullScreen></iframe>
                  </div>
              ): ""} 
    </div>
    </div>
    {/* <hr className="mb-5"/> */}
    <p className="pbottom mt-5 mb-5" style={{width:"20%"}}/>
    <p className="newsTitle text-center mb-5 mt-5">Read Other News</p>
    <div className="row justify-content-center mr-5 ml-5 mb-5">
          {v.slice(0, 2).map(data => (
            <div className="col-lg-6 pr-5 pl-5 pb-3">
                <div className="">
                {data.gallery.slice(0, 1).map(item => (
                  <img src={item.imageSrc} className="card-img-top img-fluid"/>  
                ))} 
                 <div className="p-0">
                  <span className="" style={{fontSize:"12px", display:"inline-block"}}>{data.newsDate}</span><br/>
                  <span className="newsTitle mt-2 mb-3" style={{fontSize:"20px", display:"inline-block"}}>{lang === 'al' ? `${data.newsTitle}` : `${data.newsTitleGerman}`}</span><br/>
                  <Link className="btn nbtn1 mb-4" to={`/singleNews/${data.newsID}`}>READ MORE</Link>
              </div>
              </div>
            </div>
            ))}
            </div>
    </>
)
}

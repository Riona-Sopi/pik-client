import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const ContactPage = () => {
  const lang = localStorage.getItem("lang")
  const [contactList, setContactList] = useState([])
  const [cnList, setCNList] = useState([])
  const [values, setValues] = useState([])
 


useEffect(() => {
  axios.get("https://localhost:44394/api/Contact/")
      .then(res => {
        setContactList(res.data)
      })
      .catch(err => console.log(err))
}, [])

useEffect(() => {
    axios.get("https://localhost:44394/api/CN/")
        .then(res => {
            setCNList(res.data)
        })
        .catch(err => console.log(err))
  }, [])


  return(
    <div>
         {cnList.map(data => (
             <>
         <img className="banner" src={data.imageSrc} style={{width: "100%"}}/>    
            </>
          ))}
          <div class="row justify-content-center m-5 cnrow">
          {contactList.map(data => (
            <>
            <div class="col-lg-6 pr-3 pl-3 col-sm-12">
              <div className="cntt" style={{margin: "80px"}}>
              <p className="newsTitle mb-5 mt-5" style={{fontSize:"40px"}}>{lang === 'al' ? 'Na Kontaktoni' : 'Kontaktiere uns'}</p>
              <div className="c">
                <div className="row mb-5">
              <div className="align-items ">
            <div className="align-text-item">
                <div className="align-content">
                    <i className="fas fa-map-marker-alt fa-2x ic"></i>
                    <div>
                    {lang === 'al' ? (
                      <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.location}}></p>
                        </>
                      ): (
                        <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.locationGerman}}></p>
                        </>
                      )}
  
                    </div>
                </div>
              </div>
              </div>
              </div>

              <div className="row mb-5">
              <div className="align-items ">
              <div className="align-text-item">
              <div className="align-content">
              <i className="fas fa-envelope fa-2x ic"></i>
                    <div>
                    {lang === 'al' ? (
                      <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.contact}}></p>
                        </>
                      ): (
                        <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.contactGerman}}></p>
                        </>
                      )}
                    </div>
                </div>
                </div>
              </div>
              </div>

              <div className="row mb-5">
              <div className="align-items ">
              <div className="align-text-item">
              <div className="align-content">
              <i className="fas fa-phone-alt fa-2x ic"></i>
                    <div>
                    {lang === 'al' ? (
                      <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.hours}}></p>
                        </>
                      ): (
                        <>
                          <p className="subcontact" dangerouslySetInnerHTML={{__html: data.hoursGerman}}></p>
                        </>
                      )}

                    </div>
                </div>
                </div>
              </div>
              </div>

            </div>
          

    
            </div>
            </div>
            <div className="col-lg-6 pr-3 pl-3 col-sm-12 text-center">
            <div className="google-map-code" style={{margin:"auto"}}>
          <iframe className="gml" src={data.map} width="550" height="600" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
           </div>
          </div>
          </>
          ))}
          </div>
    </div>
  )
}


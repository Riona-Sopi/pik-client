import React, { useState, useEffect } from 'react';
import axios from "axios";
import emailjs from 'emailjs-com';

export const ApplicationPage = () => {
  const lang = localStorage.getItem("lang")
  const [applicationList, setApplicationList] = useState([])
 
useEffect(() => {
  axios.get("https://localhost:44394/api/Application/")
      .then(res => {
          setApplicationList(res.data)
      })
      .catch(err => console.log(err))
}, [])


function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm('', '', e.target, '')
    .then((result) => {
        alert('Your email was sent successfully. Our team will reach out to you, upon reviewing your application.')
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

    e.target.reset();
}

  return(
    <>

          {applicationList.map(data => (
             <>
         <img className="banner" src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} style={{width: "100%"}}/>    
            </>
          ))}

    <div style={{marginBottom: "100px"}}/>
        {applicationList.map(data => (
              <div className="container text-center mt-5 w-50 calr">
                {lang === 'al' ? (
                  <>
                      <p className="aboutTitle">{data.applicationTitle}</p>
                      <p className="aboutDescription" dangerouslySetInnerHTML={{__html: data.applicationDescription}}></p>
                  </>
                ): (
                  <>
                     <p className="aboutTitle">{data.applicationTitleGerman}</p>
                      <p className="aboutDescription" dangerouslySetInnerHTML={{__html: data.applicationDescription}}></p>
                  </>
                )}
              </div>
        ))}
        <p className="bbottom mt-5"/>


    <div className="container" style={{margin: "auto", width:"65%", justifyContent:"center"}}>
         <form className="contact-form pt-3" onSubmit={sendEmail}>
           <div className="row mt-5">
             <div className="col-lg-6 pr-4 cr">
             <p className="formTitle">{lang === 'al' ? 'Emri dhe Mbiemri' : 'Name und Nachname'}</p>
                <input className="form-control careersbox" type="text" name="name"/>
             </div>
             <div className="col-lg-6 pl-4 cr">
               <p className="formTitle">{lang === 'al' ? 'Email' : 'Email'}</p>
                <input className="form-control careersbox" type="email" name="email"/>
              </div>
              </div>
              <div className="row">
             <div className="col-lg-6 pr-4 cr">
             <p className="formTitle">{lang === 'al' ? 'Data e Lindjes' : 'Geburtstag'}</p>
                <input className="form-control careersbox" type="text" name="birthday"/>
             </div>
             <div className="col-lg-6 pl-4 cr">
               <p className="formTitle">{lang === 'al' ? 'Nr. i tel' : 'Telefonnummer'}</p>
                <input className="form-control careersbox" type="text" name="phone"/>
              </div>
              </div>
              <div className="row">
             <div className="col-lg-6 pr-4 cr">
             <p className="formTitle">{lang === 'al' ? 'Adresa' : 'Die Anschrift'}</p>
                <input className="form-control careersbox" type="text" name="address"/>
             </div>
             <div className="col-lg-6 pl-4 cr">
             <p className="formTitle">{lang === 'al' ? 'Niveli Akademik' : 'Akademischer Grad'}</p>
                <input className="form-control careersbox" type="text" name="address"/>
             </div>
              </div>
           <div className="row">
             <div className="col-lg-12 cr">
              <p className="formTitle">{lang === 'al' ? 'Mesazhi' : 'Beiträge'}</p>
              <textarea className="form-control careersboxx" name="message"/>
             </div>
           </div>
            <input type="hidden" name="contact_number" />
            <input type="submit" className="btn abtn" value="Send" style={{margin:"40px  0px"}}/>
            </form>
    </div> 
    <div style={{marginBottom: "100px"}}/>

    </>
  )
}


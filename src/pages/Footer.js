import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const  Footer= () => {
    const lang = localStorage.getItem('lang') || 'dt';
    const onChange  = (e) => {
      localStorage.setItem("lang", e.target.value)
      window.location.reload();
    }
    const [footer, setFooter] = useState([])


    useEffect(() => {
        axios.get("https://localhost:44394/api/Footer/")
            .then(res => {
                setFooter(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <div className="footer">
                <div className="row ml-5 mt-3 mb-3">
                 {footer.map(data => (
                     <>
                     <div className="col-lg-6 ml-5 mb-3">
                         <p className="footertitle">{lang === 'al' ? `${data.title}` : `${data.titleGerman}`}</p>
                         <p className="footersubtitle" style={{width:"50%"}}>{lang === 'al' ? `${data.subTitle}` : `${data.subTitleGerman}`}</p>
                     </div>   
                     <div className="col-lg-2 mb-3">
                        <p className="footertitle">{lang === 'al' ? 'Kompania' : 'Begleitung'}</p>
                        <div>
                        <Link className="footersubtitle" to={'/aboutus'}>{lang === 'al' ? 'Rreth nesh' : 'Über uns'}</Link>
                        </div>
                        <div>
                        <Link className="footersubtitle" to={'/courses'}>{lang === 'al' ? 'Kurset' : 'Kurse'}</Link>
                        </div>
                        <div>
                        <Link className="footersubtitle" to={'/application'}>{lang === 'al' ? 'Aplikimi' : 'Anwendung'}</Link>
                        </div>
                        <div>
                        <Link className="footersubtitle" to={'/news'}>{lang === 'al' ? 'Lajme' : 'Nachrichten'}</Link>
                        </div>
                        <div>
                        <Link className="footersubtitle" to={'/contact'}>{lang === 'al' ? 'Kontakti' : 'Kontakt'}</Link>
                        </div>
                        </div>   
                     <div className="col-lg-3">
                        <p className="footertitle">{lang === 'al' ? 'Kontakti' : 'Kontakt'}</p>
                        <p className="footersubtitle">{lang === 'al' ? 'Nëse keni ndonjë pyetje ose keni nevojë për ndihmë, mos hezitoni të kontaktoni ekipin tonë' : 'Wenn Sie Fragen haben oder Hilfe benötigen, zögern Sie nicht, unser Team zu kontaktieren'}</p>
                        <p className="footertitle mt-3" style={{fontSize:"20px"}}>{lang === 'al' ? `${data.contact}` : `${data.contactGerman}`}</p>
                        <p className="footersubtitle">{lang === 'al' ? `${data.location}` : `${data.locationGerman}`}</p>
                        <div className="mt-3">
                        <a href="https://www.facebook.com/Scampa-561672253950017" target="_blank">
                        <i className="fab fa-facebook social__links fa-2x"></i>
                        </a>
                        <a href="https://www.instagram.com/scampa_/" target="_blank">
                        <i className="fab fa-instagram social__links fa-2x"></i>
                        </a> 
                        <a href="https://www.linkedin.com/company/scampa/" target="_blank">
                        <i className="fab fa-linkedin social__links fa-2x"></i>
                        </a>  
                        </div>
                        </div>   
                    </>
                ))}
            </div>
            </div>
            <div className="nvb2">
                <div className="row m-auto">
                    <div className="col-lg-4 col-sm-4 p-0 m-auto">
                        <a className="nav-link nvl text-center" href="http://www.degralia.be/en">@2021 PIK</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;

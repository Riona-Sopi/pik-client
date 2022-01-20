import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function AboutUsList() {
    const [aboutList, setAboutList] = useState([])
    const [abList, setABList] = useState([])

    useEffect(() => {
        refreshAboutUsList();
    }, [])


    const aboutAPI = (url = 'https://localhost:44394/api/AboutUs/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    useEffect(() =>{
        axios.get('https://localhost:44394/api/AB/')
            .then(res => {
                setABList(res.data)
            })
            .catch(err => console.log(err))   
    }, [])


    function refreshAboutUsList() {
        aboutAPI().fetchAll()
            .then(res => {
                setAboutList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            aboutAPI().delete(id)
                .then(res => refreshAboutUsList())
                .catch(err => console.log(err))
    }

    const aboutCard = data => (
        <>
        <div class="container">
               <img src={data.imageSrc} className="img-fluid" width="50%"/>
                <p class="dtitle">Title</p>
                <span>{data.aboutTitle}</span> <br/>
                <p class="dtitle">Description</p>
                <p dangerouslySetInnerHTML={{__html: data.aboutDescription}}></p>
        </div>
            <div className="row">
            <div className="col-lg-12">
            <Link className="btn abtn" to={`/editAboutUs/${data.aboutID}`} style={{marginTop: "20px"}}>Edit</Link>
            </div>
        </div>
        </>
    )


    const abCard = data => (
        <div className="container">
        <img src={data.imageSrc} className="img-fluid" width="50%" />
            <div className="row">
                <div className="col-lg-6">
                <Link className="btn abtn mt-5" to={`/editab/${data.abid}`}>Edit</Link>
                </div>
            </div>
     </div>
    )

 

   


    return (
        <>
        <div className="row">
              <p class="sbtitle ml-5">About Us Banner</p>
            <div className="col-md-12">
       
                <table class="ml-5 mt-5 mb-4">
                    <tbody>
                    {
                            [...Array(Math.ceil(abList.length / 4))].map((e, i) =>
                                <tr key={i}>
                                    <td>{abCard(abList[4 * i])}</td>
                                    <td>{abList[4 * i + 1] ? abCard(abList[4 * i + 1]) : null}</td>
                                    <td>{abList[4 * i + 2] ? abCard(abList[4 * i + 2]) : null}</td>
                                    <td>{abList[4 * i + 3] ? abCard(abList[4 * i + 3]) : null}</td>

                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                </div>
        </div>
        <hr/>
        <div className="row">
              <p class="sbtitle ml-5">About Us</p>
            <div className="col-md-12">
       
                <table class="ml-5 mt-5 mb-4">
                    <tbody>
                    {
                            [...Array(Math.ceil(aboutList.length / 4))].map((e, i) =>
                                <tr key={i}>
                                    <td>{aboutCard(aboutList[4 * i])}</td>
                                    <td>{aboutList[4 * i + 1] ? aboutCard(aboutList[4 * i + 1]) : null}</td>
                                    <td>{aboutList[4 * i + 2] ? aboutCard(aboutList[4 * i + 2]) : null}</td>
                                    <td>{aboutList[4 * i + 3] ? aboutCard(aboutList[4 * i + 3]) : null}</td>

                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                </div>
        </div>
        <hr/>
    </>
    )
}






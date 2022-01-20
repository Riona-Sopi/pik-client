import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function ApplicationList() {
    const [applicationList, setApplicationList] = useState([])

    useEffect(() => {
        refreshApplicationList();
    }, [])


    const applicationAPI = (url = 'https://localhost:44394/api/Application/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    function refreshApplicationList() {
        applicationAPI().fetchAll()
            .then(res => {
                setApplicationList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
        applicationAPI().delete(id)
                .then(res => refreshApplicationList())
                .catch(err => console.log(err))
    }

    const applicationCard = data => (
        <>
        <div class="container">
               <img src={data.imageSrc} className="" width="50%"/>
                <p class="dtitle">Title</p>
                <span>{data.applicationTitle}</span> <br/>
                <p class="dtitle">Description</p>
                <p dangerouslySetInnerHTML={{__html: data.applicationDescription}}></p>

                <div className="row">
                <div className="col-lg-12">
                <Link className="btn abtn" to={`/editApplication/${data.applicationID}`} style={{marginTop: "20px"}}>Edit</Link>
                </div>
                </div>
        </div>
        {/* <div class="container">
        <img src={data.imageSrcGerman} className="card-img-top"/>
            <p class="dtitle">Title</p>
            <span>{data.applicationTitleGerman}</span> <br/>
            <p class="dtitle">Description</p>
            <p dangerouslySetInnerHTML={{__html: data.applicationDescriptionGerman}}></p>
            </div>
            <div className="row">
            <div className="col-lg-12">
            <Link className="btn abtn" to={`/editApplication/${data.applicationID}`} style={{marginTop: "20px"}}>Edit</Link>
            </div>
        </div> */}
        </>
    )

 

   


    return (
        <>
        <div className="row">
              <p class="sbtitle ml-5">Application Banner</p>
            <div className="col-md-12">
       
                <table class="ml-5 mt-5 mb-4">
                    <tbody>
                    {
                            [...Array(Math.ceil(applicationList.length / 4))].map((e, i) =>
                                <tr key={i}>
                                    <td>{applicationCard(applicationList[4 * i])}</td>
                                    <td>{applicationList[4 * i + 1] ? applicationCard(applicationList[4 * i + 1]) : null}</td>
                                    <td>{applicationList[4 * i + 2] ? applicationCard(applicationList[4 * i + 2]) : null}</td>
                                    <td>{applicationList[4 * i + 3] ? applicationCard(applicationList[4 * i + 3]) : null}</td>

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






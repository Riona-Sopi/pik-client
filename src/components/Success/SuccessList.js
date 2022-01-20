import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function SuccessList(){
    const [successList, setSuccessList] = useState([])

    useEffect(() => {
        refreshSuccessList();
    }, [])


    const successAPI = (url = 'https://localhost:44394/api/Success/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    function refreshSuccessList() {
        successAPI().fetchAll()
            .then(res => {
                setSuccessList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            successAPI().delete(id)
                .then(res => refreshSuccessList())
                .catch(err => console.log(err))
    }


    return (
        <>
       <div className="row d-flex ml-3">
       <Link className="btn abtn ml-5 mt-5 mb-5" to="/createSuccess" style={{width: "15%", fontSize:"14px"}}>Add Success Story</Link>
       <div className="row" width="80%">
       {successList.map(data => (
           <div class="col-lg-4 border-right mb-5">
           <img src={data.imageSrc} width="200px" height="200px" className="text-center" />
           <div className="mt-3">
               <p className="sbtitle1">{data.successTitle}</p>
               <p dangerouslySetInnerHTML={{__html: data.successDescription}}></p>
               </div>
               {/* <img src={data.imageSrcGerman} width="200px" height="200px" className="text-center" />
           <div className="card-body">
               <p className="sbtitle1">{data.successTitleGerman}</p>
               <p dangerouslySetInnerHTML={{__html: data.successDescriptionGerman}}></p>
               </div> */}
               <div className="row">
                   <div className="col-lg-6">
               <button className="btn btn-light mt-2" onClick={e => onDelete(e, parseInt(data.successID))}>
                   Delete
               </button>
                   </div>
                   <div className="col-lg-6">
                   <Link className="btn btn-light mt-2" to={`/editSuccess/${data.successID}`}>Edit</Link>
                   </div>
               </div>
           </div>
       ))}
       </div>  
       </div>
       </>  
    )
}






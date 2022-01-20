import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function CNList() {
    const [cnList, setCNList] = useState([])


    useEffect(() => {
        refreshCNList();
    }, [])


    const cnAPI = (url = 'https://localhost:44394/api/CN/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshCNList() {
       cnAPI().fetchAll()
            .then(res => {
                setCNList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            cnAPI().delete(id)
                .then(res => refreshCNList())
                .catch(err => console.log(err))
    }

    const cnCard = data => (
        <>
        <div class="container">
            <img src={data.imageSrc} className="card-img-top" />

            <p className='etitle'>Banner in German</p>
            <img src={data.imageSrcGerman} className="card-img-top" />
      
                <div className="row">
                    <div className="col-lg-12">
                    <Link className="btn abtn" to={`/editcn/${data.cnid}`} style={{marginTop: "20px"}}>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )

   


    return (
        <div className="row ml-5">
            <div className="col-md-12">
            {/* <Link className="btn abtn ml-4 mt-3 mb-5" to="/createabout">about new</Link> */}
                <table style={{marginBottom: "4em"}}>
                    <tbody>
                    {
                            [...Array(Math.ceil(cnList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{cnCard(cnList[1 * i])}</td>
                                    <td>{cnList[4 * i + 1] ? cnCard(cnList[4 * i + 1]) : null}</td>
        
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
              
                </div>
        </div>
    )
}

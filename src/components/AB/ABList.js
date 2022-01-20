import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function ABList() {
    const [abList, setABList] = useState([])


    useEffect(() => {
        refreshABList();
    }, [])


    const abAPI = (url = 'https://localhost:44394/api/AB/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshABList() {
       abAPI().fetchAll()
            .then(res => {
                setABList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            abAPI().delete(id)
                .then(res => refreshABList())
                .catch(err => console.log(err))
    }

    const abCard = data => (
        <>
        <div class="container">
            <img src={data.imageSrc} className="card-img-top" />
      
                <div className="row">
                    <div className="col-lg-12">
                    <Link className="btn abtn" to={`/editab/${data.abid}`} style={{marginTop: "20px"}}>Edit</Link>
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
                            [...Array(Math.ceil(abList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{abCard(abList[1 * i])}</td>
                                    <td>{abList[4 * i + 1] ? abCard(abList[4 * i + 1]) : null}</td>
        
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
              
                </div>
        </div>
    )
}

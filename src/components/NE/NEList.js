import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../dashboard.css';

export default function NEList() {
    const [neList, setNEList] = useState([])


    useEffect(() => {
        refreshNEList();
    }, [])


    const neAPI = (url = 'https://localhost:44394/api/NE/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshNEList() {
       neAPI().fetchAll()
            .then(res => {
                setNEList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            neAPI().delete(id)
                .then(res => refreshNEList())
                .catch(err => console.log(err))
    }

    const neCard = data => (
        <>
        <div class="container">
            <img src={data.imageSrc} className="card-img-top" />
            {/* <div className="card-body"> */}
              
            <p className='etitle'>Banner in German</p>
            <img src={data.imageSrcGerman} className="card-img-top" />
            
                {/* <span>{data.aboutDescription}</span> <br/> */}
                <div className="row">
                    <div className="col-lg-12">
                    <Link className="btn abtn" to={`/editNE/${data.neid}`} style={{marginTop: "20px"}}>Edit</Link>
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
                            [...Array(Math.ceil(neList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{neCard(neList[1 * i])}</td>
                                    <td>{neList[4 * i + 1] ? neCard(neList[4 * i + 1]) : null}</td>
        
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                
                {/* <Link className="btn abtn ml-4 mt-3 mb-5" to="/createsubabout">subabout new</Link> */}
              
                </div>
        </div>
    )
}

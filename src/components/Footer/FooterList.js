import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function FooterList() {
    const [footerList, setFooterList] = useState([])

    useEffect(() => {
        refreshFooterList();
    }, [])

    const footerAPI = (url = 'https://localhost:44394/api/Footer/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshFooterList() {
        footerAPI().fetchAll()
            .then(res => {
                setFooterList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            footerAPI().delete(id)
                .then(res => refreshFooterList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <>
        <div className="card">
            <div className="card-body">
                <span>{data.title}</span> <br/>
                <span>{data.subTitle}</span> <br/>
                <span>{data.location}</span> <br/>
                <span>{data.contact}</span> <br/>
                <span>{data.email}</span> <br/>
                <div className="row">
                    <div className="col-lg-12">
                    <Link className="btn abtn" to={`/editFooter/${data.footerID}`} style={{marginTop: "20px"}}>Edit</Link>
                    </div>
                </div>
            </div>
         </div>
        </>
    )


    return (
        <div className="row ml-5">
            <div className="col-md-12">
                <p class="sbtitle mb-3">Footer</p>
                {/* <Link className="btn btn-light" to="/createfooter">Add Footer</Link> */}
                <table style={{margin: "unset"}}>
                    <tbody>
                    {
                            [...Array(Math.ceil(footerList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(footerList[1 * i])}</td>
                                    <td>{footerList[1 * i + 1] ? imageCard(footerList[4 * i + 1]) : null}</td>
        
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                </div>
        </div>
    )
}

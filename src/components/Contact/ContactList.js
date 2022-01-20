import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ContactList() {
    const [contactList, setContactList] = useState([])
    const [cnList, setCNList] = useState([])

    useEffect(() => {
        refreshContactList();
    }, [])

    const contactAPI = (url = 'https://localhost:44394/api/Contact/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    useEffect(() =>{
        axios.get('https://localhost:44394/api/CN/')
            .then(res => {
                setCNList(res.data)
            })
            .catch(err => console.log(err))   
    }, [])

    function refreshContactList() {
        contactAPI().fetchAll()
            .then(res => {
                setContactList(res.data)
            })
            .catch(err => console.log(err))
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
        contactAPI().delete(id)
                .then(res => refreshContactList())
                .catch(err => console.log(err))
    }

    const cnCard = data => (
        <div className="container">
        <img src={data.imageSrc} className="img-fluid" width="50%"/>
            <div className="row">
                <div className="col-lg-12">
                <Link className="btn abtn mt-5" to={`/editcn/${data.cnid}`}>Edit</Link>
                </div>
            </div>
     </div>
    )

    const imageCard = data => (
        <>
            <div className="card">
                <div className="card-body">
                    <span>{data.location}</span> <br/>
                    <span>{data.contact}</span> <br/>
                    <span>{data.hours}</span> <br/>
                    <span>{data.map}</span> <br/>
                    <div className="row">
                        <div className="col-lg-12">
                        <Link className="btn abtn" to={`/editContact/${data.contactID}`} style={{marginTop: "20px"}}>Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


    return (
        <div>
            <div className="row">
            <p class="sbtitle ml-5">Contact Banner</p>
            <div className="col-md-12">

        <table class="ml-5 mt-5 mb-4">
            <tbody>
            {
                    [...Array(Math.ceil(cnList.length / 4))].map((e, i) =>
                        <tr key={i}>
                            <td>{cnCard(cnList[4 * i])}</td>
                            <td>{cnList[4 * i + 1] ? cnCard(cnList[4 * i + 1]) : null}</td>
                            <td>{cnList[4 * i + 2] ? cnCard(cnList[4 * i + 2]) : null}</td>
                            <td>{cnList[4 * i + 3] ? cnCard(cnList[4 * i + 3]) : null}</td>

                        </tr>
                    )
                }
                
            </tbody>
        </table>
        </div>
            </div>
            <hr/>
            <div className="col-md-12 ml-5">
                <p class="sbtitle mb-3">Contact</p>
                {/* <Link className="btn btn-light" to="/createfooter">Add Footer</Link> */}
                <table style={{margin: "unset"}}>
                    <tbody>
                    {
                            [...Array(Math.ceil(contactList.length / 1))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(contactList[1 * i])}</td>
                                    <td>{contactList[1 * i + 1] ? imageCard(contactList[4 * i + 1]) : null}</td>
        
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                </div>
        </div>
    )
}

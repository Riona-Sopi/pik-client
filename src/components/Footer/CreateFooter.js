import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const initialFieldValues = {
    footerID: 0,
    title: '',
    titleGerman:'',
    subTitleGerman:'',
    locationGerman:'',
    contactGerman:'',
    emailGerman:'',
    subTitle: '',
    location: '',
    contact: '',
    email: '',
}

export default function CreateFooter() {
    const [footerList, setFooterList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const history = useHistory()
  

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

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


    const add = (formData) => {
        footerAPI().create(formData)
            .then(res => {
                history.push('/footerlist');
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const validate = () => {
        let temp = {}
        temp.title = values.title === "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader1').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('footerID', values.footerID)
            formData.append('title', values.title)
            formData.append('subTitle', values.subTitle)
            formData.append('location', values.location)
            formData.append('contact', values.contact)
            formData.append('email', values.email)
            formData.append('titleGerman', values.titleGerman)
            formData.append('subTitleGerman', values.subTitleGerman)
            formData.append('locationGerman', values.locationGerman)
            formData.append('contactGerman', values.contactGerman)
            formData.append('emailGerman', values.emailGerman)
            add(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Create Footer</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 100px 100px"}}>
                    <div className="card-body">
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('title')} placeholder="Footer Title" name="title"
                                value={values.title}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('subTitle')} placeholder="Footer Sub Title" name="subTitle"
                                value={values.subTitle}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('location')} placeholder="Footer Location" name="location"
                                value={values.location}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('contact')} placeholder="Footer Contact" name="contact"
                                value={values.contact}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('email')} placeholder="Footer Email" name="email"
                                value={values.email}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('titleGerman')} placeholder="Footer Title German" name="titleGerman"
                                value={values.titleGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('subTitleGerman')} placeholder="Footer Sub Title German" name="subTitleGerman"
                                value={values.subTitleGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('locationGerman')} placeholder="Footer Location German" name="locationGerman"
                                value={values.locationGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('contactGerman')} placeholder="Footer Contact German" name="contactGerman"
                                value={values.contactGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('emailGerman')} placeholder="Footer Email German" name="emailGerman"
                                value={values.emailGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/footerlist" className="btn btn-light">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

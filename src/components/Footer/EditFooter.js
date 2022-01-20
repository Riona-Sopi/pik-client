import React, { useState, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
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

export default function EditFooter() {
    const {id} = useParams();
    const [footerList, setFooterList] = useState([])

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory()


    useEffect(() => {
        axios.get(`https://localhost:44394/api/Footer/${id}`)
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.log(err))
      }, [id])

      const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const footerAPI = (url = 'https://localhost:44394/api/Footer/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const edit = (formData) => {
        footerAPI().update(formData.get('footerID'), formData)
            .then(res => {
                history.push("/footerlist")
            })
            .catch(err => console.log(err))
    }

    const validate = () => {
        let temp = {}
        temp.title = values.title === "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
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
            edit(formData)
        }
    }

    // const showRecordDetails = data => {
    //     setRecordForEdit(data)
    // }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 50px 100px", boxShadow:"unset"}}>
                    <div className="card-body">
                    <p class="etitle">Title</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('title')} placeholder="Footer Title" name="title"
                                value={values.title}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">Title Sub Title</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('subTitle')} placeholder="Footer Sub Title" name="subTitle"
                                value={values.subTitle}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">Location</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('location')} placeholder="Footer Location" name="location"
                                value={values.location}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">Contact</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('contact')} placeholder="Footer Contact" name="contact"
                                value={values.contact}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">E-mail</p>
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
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/footerlist" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

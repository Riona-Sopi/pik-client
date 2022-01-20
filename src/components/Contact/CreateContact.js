import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const initialFieldValues = {
    contactID: 0,
    location: '',
    contact: '',
    hours: '',
    map: '',
    locationGerman: '',
    contactGerman: '',
    hoursGerman: '',
    mapGerman: '',
}

export default function CreateContact() {
    const [contactList, setContactList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [location, setLocation] = useState("")
    const [contact, setContact] = useState("")
    const [hours, setHours] = useState("")
    const [locationGerman, setLocationGerman] = useState("")
    const [contactGerman, setContactGerman] = useState("")
    const [hoursGerman, setHoursGerman] = useState("")
    const history = useHistory()
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const contactAPI = (url = 'https://localhost:44394/api/Contact/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshContactList() {
        contactAPI().fetchAll()
            .then(res => {
                setContactList(res.data)
            })
            .catch(err => console.log(err))
    }


    const add = (formData) => {
        contactAPI().create(formData)
            .then(res => {
                history.push('/contactlist');
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
            formData.append('contactID', values.contactID)
            formData.append('location', location)
            formData.append('contact', contact)
            formData.append('hours', hours)
            formData.append('map', values.map)
            formData.append('locationGerman', locationGerman)
            formData.append('contactGerman', contactGerman)
            formData.append('hoursGerman', hoursGerman)
            formData.append('mapGerman', values.mapGerman)
            add(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Create Contact</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 100px 100px"}}>
                    <div className="card-body">
                    <p class="etitle">Location</p>
                    <CKEditor 
                            editor={ClassicEditor}
                            data={values.location}
                        
                            onChange={ (event, editor) => {
                                const data = editor.getData();
                                setLocation(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                         <p class="etitle">Contact</p>
                         <CKEditor 
                            editor={ ClassicEditor }
                            data={values.contact}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setContact(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        <p class="etitle">Hours</p>
                         <CKEditor 
                            editor={ ClassicEditor }
                            data={values.hours}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setHours(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        <p class="etitle">Map</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('map')} placeholder="Map" name="map"
                                value={values.map}
                                onChange={handleInputChange} />
                        </div>

                        <p class="etitle">Location German</p>
                    <CKEditor 
                            editor={ClassicEditor}
                            data={values.locationGerman}
                        
                            onChange={ (event, editor) => {
                                const data = editor.getData();
                                setLocationGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                         <p class="etitle">Contact German</p>
                         <CKEditor 
                            editor={ ClassicEditor }
                            data={values.contactGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setContactGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        <p class="etitle">Hours German</p>
                         <CKEditor 
                            editor={ ClassicEditor }
                            data={values.hoursGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setHoursGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        <p class="etitle">Map German</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('mapGerman')} placeholder="Map German" name="mapGerman"
                                value={values.mapGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/contactlist" className="btn btn-light">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

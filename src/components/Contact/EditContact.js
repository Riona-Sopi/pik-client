import React, { useState, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
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

export default function EditContact() {
    const {id} = useParams();
    const [contactList, setContactList] = useState([])
    const [location, setLocation] = useState("")
    const [contact, setContact] = useState("")
    const [hours, setHours] = useState("")
    const [locationGerman, setLocationGerman] = useState("")
    const [contactGerman, setContactGerman] = useState("")
    const [hoursGerman, setHoursGerman] = useState("")
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory()


    useEffect(() => {
        axios.get(`https://localhost:44394/api/Contact/${id}`)
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

    const contactAPI = (url = 'https://localhost:44394/api/Contact/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const edit = (formData) => {
        contactAPI().update(formData.get('contactID'), formData)
            .then(res => {
                history.push("/contactlist")
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
            formData.append('contactID', values.contactID)
            formData.append('location', location)
            formData.append('contact', contact)
            formData.append('hours', hours)
            formData.append('map', values.map)
            formData.append('locationGerman', locationGerman)
            formData.append('contactGerman', contactGerman)
            formData.append('hoursGerman', hoursGerman)
            formData.append('mapGerman', values.mapGerman)
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
                    <p class="etitle">Location</p>
                    <CKEditor 
                            editor={ ClassicEditor }
                            data={values.location}
                        
                            onChange={ ( event, editor ) => {
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
                                onChange={handleInputChange}/>
                        </div>
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/contactlist" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

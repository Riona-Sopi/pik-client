import React, { useState, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const defaultImageSrc = ''

const initialFieldValues = {
    applicationID: 0,
    applicationTitle: '',
    applicationDescription: '',
    applicationTitleGerman: '',
    applicationDescriptionGerman: '',
    imageSrc: defaultImageSrc,
    imageFile: null,
    imageSrcGerman: defaultImageSrc,
    imageFileGerman: null
}

export default function EditApplication() {
    const {id} = useParams();
    const [applicationList, setApplicationList] = useState([])
    const [applicationDesc, setApplicationDesc] = useState("")
    const [applicationDescGerman, setApplicationDescGerman] = useState("")
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory()


    useEffect(() => {
        axios.get(`https://localhost:44394/api/Application/${id}`)
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

    const applicationAPI = (url = 'https://localhost:44394/api/Application/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    const edit = (formData) => {
        applicationAPI().update(formData.get('applicationID'), formData)
            .then(res => {
                history.push("/applicationlist")
            })
            .catch(err => console.log(err))
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('applicationID', values.applicationID)
            formData.append('applicationTitle', values.applicationTitle)
            formData.append('applicationDescription', applicationDesc)
            formData.append('applicationTitleGerman', values.applicationTitleGerman)
            formData.append('applicationDescriptionGerman', applicationDescGerman)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            formData.append('imageNameGerman', values.imageNameGerman)
            formData.append('imageFileGerman', values.imageFileGerman)
            edit(formData)
        }
    }

  

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
             <div className="container text-center">
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Edit Application</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 100px 100px"}}>
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader1" />
                        </div>

                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('applicationTitle')} placeholder="Application Title" name="applicationTitle"
                                value={values.applicationTitle}
                                onChange={handleInputChange} />
                        </div>
                   
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.applicationDescription}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setApplicationDesc(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />

                        <div className="form-group mt-3 mb-3">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrcGerman')}
                                onChange={showPreview} id="image-uploader1" />
                        </div>

                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('applicationTitleGerman')} placeholder="Application Title German" name="applicationTitleGerman"
                                value={values.applicationTitleGerman}
                                onChange={handleInputChange} />
                        </div>
                   
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.applicationDescriptionGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setApplicationDescGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                   
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn btn-light mt-3">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/applicationlist" className="btn btn-light mt-3">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

import React, { useState, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const defaultImageSrc = ''
const defaultImageSrcGerman = ''

const initialFieldValues = {
    aboutID: 0,
    aboutTitle: '',
    aboutDescription: '',
    aboutTitleGerman: '',
    aboutDescriptionGerman: '',
    imageSrc: defaultImageSrc,
    imageFile: null,
    imageSrcGerman: defaultImageSrc,
    imageFileGerman: null
}

export default function EditAboutUs() {
    const {id} = useParams();
    const [aboutList, setAboutList] = useState([])
    const [aboutDesc, setAboutDesc] = useState("")
    const [aboutDescGerman, setAboutDescGerman] = useState("")
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory()


    useEffect(() => {
        axios.get(`https://localhost:44394/api/AboutUs/${id}`)
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

    const aboutAPI = (url = 'https://localhost:44394/api/AboutUs/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    const edit = (formData) => {
        aboutAPI().update(formData.get('aboutID'), formData)
            .then(res => {
                history.push("/aboutuslist")
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

    const showPreviewGerman = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFileGerman = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFileGerman,
                    imageSrcGerman: x.target.result,
                })
            }
            reader.readAsDataURL(imageFileGerman)
        }
        else {
            setValues({
                ...values,
                imageFileGerman: null,
                imageSrcGerman: defaultImageSrcGerman
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        temp.imageSrcGerman = values.imageSrcGerman === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('aboutID', values.aboutID)
            formData.append('aboutTitle', values.aboutTitle)
            formData.append('aboutDescription', aboutDesc)
            formData.append('aboutTitleGerman', values.aboutTitleGerman)
            formData.append('aboutDescriptionGerman', aboutDescGerman)
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
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Edit About</p>
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
                            <input className={"form-control" + applyErrorClass('aboutTitle')} placeholder="About Title" name="aboutTitle"
                                value={values.aboutTitle}
                                onChange={handleInputChange} />
                        </div>
                   
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.aboutDescription}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setAboutDesc(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        
                        <img src={values.imageSrcGerman} className="card-img-top mt-3 mb-3" />
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrcGerman')}
                                onChange={showPreviewGerman} id="image-uploader2" />
                        </div>

                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('aboutTitleGerman')} placeholder="About Title German" name="aboutTitleGerman"
                                value={values.aboutTitleGerman}
                                onChange={handleInputChange} />
                        </div>
                   
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.aboutDescriptionGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setAboutDescGerman(data)
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
                            <Link to="/aboutuslist" className="btn btn-light mt-3">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const defaultImageSrc = ''

const initialFieldValues = {
    coursesID: 0,
    coursesTitle: '',
    coursesBackgroundColor: '',
    textAlign: '',
    imageAlign: '',
    coursesDescription: '',
    coursesTitleGerman:'',
    coursesDescriptionGerman:'',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function CreateCourses() {
    const [coursesList, setCoursesList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [coursesDesc, setCoursesDesc] = useState("")
    const [coursesDescGerman, setCoursesDescGerman] = useState("")
    const history = useHistory()
  

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const coursesAPI = (url = 'https://localhost:44394/api/Courses/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshCoursesList() {
        coursesAPI().fetchAll()
            .then(res => {
                console.log(res.data)
                setCoursesList(res.data)
            })
            .catch(err => console.log(err))
    }


    const add = (formData) => {
        coursesAPI().create(formData)
            .then(res => {
                history.push('/coursesList');
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
        temp.coursesTitle = values.coursesTitle === "" ? false : true;
        temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader1').value = null;
        setErrors({})
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

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('coursesID', values.coursesID)
            formData.append('coursesTitle', values.coursesTitle)
            formData.append('coursesDescription', coursesDesc)
            formData.append('coursesTitleGerman', values.coursesTitleGerman)
            formData.append('coursesDescriptionGerman', coursesDescGerman)
            formData.append('textAlign', values.textAlign)
            formData.append('imageAlign', values.imageAlign)
            formData.append('coursesBackgroundColor', values.coursesBackgroundColor)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            add(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Create Course</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 100px 100px"}}>
                    <div className="card-body">
                    <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader1" />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('coursesTitle')} placeholder="Title" name="coursesTitle"
                                value={values.coursesTitle}
                                onChange={handleInputChange} />
                        </div>
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.coursesDescription}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setCoursesDesc(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />

                        <div className="form-group mt-3">
                            <input className={"form-control" + applyErrorClass('coursesTitleGerman')} placeholder="Title German" name="coursesTitleGerman"
                                value={values.coursesTitleGerman}
                                onChange={handleInputChange} />
                        </div>
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.coursesDescriptionGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setCoursesDescGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                          <div className="form-group mt-3">
                            <input className={"form-control" + applyErrorClass('coursesBackgroundColor')} placeholder="Background Color" name="coursesBackgroundColor"
                                value={values.coursesBackgroundColor}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('textAlign')} placeholder="Courses Text Align" name="textAlign"
                                value={values.textAlign}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('imageAlign')} placeholder="Courses Image Align" name="imageAlign"
                                value={values.imageAlign}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center float-start mt-3">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start mt-3" style={{paddingLeft:"20px"}}>
                            <Link to="/coursesList" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>

            <p className="ml-5">Text/Image Aligned Right: <b>right</b></p>
            <p className="ml-5">Text/Image Aligned Left: <b>left</b></p>
            <p className="ml-5">Grey background color: <b>#f1f1f1</b></p>
            <p className="ml-5">White background color: <b>#fff</b></p>
        </>
    )
}

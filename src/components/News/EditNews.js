import React, { useState, useEffect } from 'react'
import { Link, useHistory  } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const initialFieldValues = {
    newsID: '',
    newsDate: '',
    specificationGerman: '',
    newsGerman: '',
    newsDescription: '',
    videoGerman:'',
    specification: '',
    newsTitle: '',
    newsDescription: '',
    video:'',
}

export default function EditNews() {
    const {id} = useParams();
    const [newsDesc, setNewsDesc] = useState("")
    const [newsDescGerman, setNewsDescGerman] = useState("")

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const history = useHistory()

    useEffect(() => {
        axios.get(`https://localhost:44394/api/News/${id}`)
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

    const newsAPI = (url = "https://localhost:44394/api/News/") => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    const edit = (formData) => {
        newsAPI().update(formData.get('newsID'), formData)
            .then(res => {
                history.push("/newslist")
            })
            .catch(err => console.log(err))
    }


    const validate = () => {
        let temp = {}
        temp.newsTitle = values.newsTitle === "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('newsID', values.newsID)
            formData.append('newsDate', values.newsDate)
            formData.append('specification', values.specification)
            formData.append('newsTitle', values.newsTitle)
            formData.append('newsDescription', newsDesc)
            formData.append('video', values.video)
            formData.append('specificationGerman', values.specificationGerman)
            formData.append('newsTitleGerman', values.newsTitleGerman)
            formData.append('newsDescriptionGerman', newsDescGerman)
            formData.append('videoGerman', values.videoGerman)
            edit(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 50px 100px", boxShadow:"unset"}}>
                    <div className="card-body">
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('newsDate')} placeholder="Date" name="newsDate"
                                value={values.newsDate}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('specification')} placeholder="Event/News" name="specification"
                                value={values.specification}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">Title</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('newsTitle')} placeholder="Title" name="newsTitle"
                                value={values.newsTitle}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group mt-2">
                        <p class="etitle">Description</p>
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.newsDescription}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setNewsDesc(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('video')} placeholder="Video SRC" name="video"
                                value={values.video}
                                onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('specificationGerman')} placeholder="Event/News German" name="specificationGerman"
                                value={values.specificationGerman}
                                onChange={handleInputChange} />
                        </div>
                        <p class="etitle">Title German</p>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('newsTitleGerman')} placeholder="Title German" name="newsTitleGerman"
                                value={values.newsTitleGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group mt-2">
                        <p class="etitle">Description German</p>
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.newsDescriptionGerman}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setNewsDescGerman(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('videoGerman')} placeholder="Video SRC German" name="videoGerman"
                                value={values.videoGerman}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/newslist" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}



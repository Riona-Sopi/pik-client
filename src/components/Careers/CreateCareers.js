import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const initialFieldValues = {
    careersID: 0,
    careersTitle: '',
    careersDescription: '',
}

export default function CreateCareers() {
    const [careersDesc, setCareersDesc] = useState("")
    const history = useHistory()
  

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const careersAPI = (url = 'https://localhost:44394/api/Careers/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const add = (formData) => {
        careersAPI().create(formData)
            .then(res => {
                history.push('/careerslist');
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }


    const validate = () => {
        let temp = {}
        temp.careersTitle = values.careersTitle === "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

  

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('careersID', values.careersID)
            formData.append('careersTitle', values.careersTitle)
            formData.append('careersDescription', careersDesc)
            add(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead" style={{paddingTop:"20px", fontSize:"30px"}}>Create Careers Text</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 50px 100px", boxShadow:"none"}}>
                    <div className="card-body">
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('careersTitle')} placeholder="Careers Text Title" name="careersTitle"
                                value={values.careersTitle}
                                onChange={handleInputChange} />
                        </div>
                   
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.careersDescription}
                        
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setCareersDesc(data)
                            } }
                            onBlur={ ( event, editor ) => {
                            } }
                            onFocus={ ( event, editor ) => {
                            } 
                            }
                        />
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/careerslist" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

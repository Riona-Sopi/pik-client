import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';


const defaultImageSrc = ''

const initialFieldValues = {
    galleryID: 0,
    newID: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function AddNewsPhotos() {
    const [newID, setNewID] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const history = useHistory()
  
    const {id} = useParams();

 

     useEffect(() => {
         axios.get(`https://localhost:44394/api/News/${id}`)
             .then(res =>{ 
                 //setNewsList(res.data)
                 setNewID(id)
             })
             .catch(err => console.log(err))
     }, [id])

    //  useEffect(() => {
    //     axios.get(`https://localhost:44394/api/News/News-Gallery`)
    //         .then(res =>{ 
    //             setNList(res.data)
    //             console.log(res.data)
    //         })
    //     .catch(err => console.log(err))
    // }, [])


    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const galleryAPI = (url = 'https://localhost:44394/api/Gallery/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    const add = (formData, onSuccess) => {
        galleryAPI().create(formData)
            .then(res => {
                onSuccess();
                history.push(`/getNews/${newID}`);
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

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader1').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('galleryID', values.galleryID)
            formData.append('newID', newID)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            add(formData, resetForm)
        }
    }


    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 50px 100px", boxShadow:"unset"}}>
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                    <p class="etitle">News ID</p>
                    <div className="form-group">
                        <input className={"form-control" + applyErrorClass('newID')} placeholder="" name="newID"
                                    value={newID}
                                    onChange={handleInputChange} />
                     </div>
                    <p class="etitle">Image</p>
                        <div className="form-group">
                            <input type="file" accept="file/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader1" />
                        </div>
            
                        <div className="form-group text-center float-start mt-3">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start mt-3" style={{paddingLeft:"20px"}}>
                            <Link to={`/getNews/${newID}`} className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>

           
        </>
    )
}


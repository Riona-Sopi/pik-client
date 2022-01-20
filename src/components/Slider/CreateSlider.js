import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const defaultImageSrc = ''
const defaultImageSrcGerman = ''

const initialFieldValues = {
    sliderPhotosID: 0,
    imageSrc: defaultImageSrc,
    imageFile: null,
    imageSrcGerman: defaultImageSrcGerman,
    imageFile: null
}

export default function CreateSlider() {
    const [sliderList, setSliderList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const history = useHistory()
  

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const sliderAPI = (url = 'https://localhost:44394/api/HomeGallery/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshSliderList() {
        sliderAPI().fetchAll()
            .then(res => {
                setSliderList(res.data)
            })
            .catch(err => console.log(err))
    }


    const add = (formData) => {
        sliderAPI().create(formData)
            .then(res => {
                history.push('/sliderlist');
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
        //temp.imageSrcGerman = values.imageSrcGerman === defaultImageSrcGerman ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x === true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader1').value = null;
        document.getElementById('image-uploader2').value = null;
        setErrors({})
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('sliderPhotosID', values.sliderPhotosID)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            formData.append('imageNameGerman', values.imageNameGerman)
            formData.append('imageFileGerman', values.imageFileGerman)
            add(formData)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card" style={{margin:"20px 50px 100px", boxShadow:"unset"}}>
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                    <p class="etitle">Image</p>
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader1" />
                        </div>

                        <p class="etitle">Image in German</p>
                        <img src={values.imageSrcGerman} className="card-img-top" />
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrcGerman')}
                                onChange={showPreviewGerman} id="image-uploader2" />
                        </div>
                        <div className="form-group text-center float-start">
                            <button type="submit" className="btn abtn">Submit</button>
                        </div>
                        <div className="form-group text-center float-start" style={{paddingLeft:"20px"}}>
                            <Link to="/sliderlist" className="btn abtn">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

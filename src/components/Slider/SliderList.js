import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function SliderList() {
    const [sliderList, setSliderList] = useState([])

    useEffect(() => {
        refreshSliderList();
    }, [])

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

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            sliderAPI().delete(id)
                .then(res => refreshSliderList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <>
        <div className="card">
            <img src={data.imageSrc} className="card-img-top" />
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-6">
                    <button className="btn abtn" onClick={e => onDelete(e, parseInt(data.sliderPhotosID))}>
                    Delete
                </button>
                </div>
                    <div className="col-lg-6">
                    <Link className="btn abtn" to={`/editSliderPhotos/${data.sliderPhotosID}`}>Edit</Link>
                    </div>
                </div>
            </div>
         </div>
        </>
    )


    return (
        <>
        <p class="sbtitle ml-5 mb-5">Slider Photos</p>
        <Link className="btn abtn ml-5 mb-5" to="/createSliderPhotos" style={{width: "15%", fontSize:"14px"}}>Add Slider Photo</Link>
        <div class="row m-auto" style={{width:"90%"}}>
            {sliderList.map((data, index) => (
           <div class="col-lg-3 border-right pr-3 pl-3">
            <img src={data.imageSrc} className="img-fluid"/>
          <div className="row">
                <div className="col-lg-6">
                 <button className="btn nbtn mt-3" onClick={e => onDelete(e, parseInt(data.sliderPhotosID))}>
                     Delete
                 </button>
                     </div>
                     <div className="col-lg-6">
                     <Link className="btn nbtn mt-3" to={`/editSliderPhotos/${data.sliderPhotosID}`}>Edit</Link>
                     </div>
                 </div>
             </div>
         ))}
       </div>
       </>
    )
}

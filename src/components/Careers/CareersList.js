import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


export default function CareersList() {
    const [careersList, setCareersList] = useState([])

    useEffect(() => {
        refreshCareersList();
    }, [])


    const careersAPI = (url = 'https://localhost:44394/api/Careers/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshCareersList() {
        careersAPI().fetchAll()
            .then(res => {
                setCareersList(res.data)
            })
            .catch(err => console.log(err))
    }


    const careersCard = data => (
        <>
        <div class="container">
                <p class="dtitle">Title</p>
                <span>{data.careersTitle}</span> <br/>

                <p class="dtitle">Description</p>
                <p dangerouslySetInnerHTML={{__html: data.careersDescription}}></p>
        
                <div className="row">
                    <div className="col-lg-12">
                    <Link className="btn abtn" to={`/editCareers/${data.careersID}`} style={{marginTop: "20px"}}>Edit</Link>
                    </div>
                </div>
            </div>
        </>
    )


    return (
        <div className="row ml-5">
            <div className="col-md-12">
            {/* <Link className="btn abtn ml-4 mt-3 mb-5" to="/createCareers">Careers new</Link> */}
                <table style={{marginBottom: "4em"}}>
                    <tbody>
                        {
                            [...Array(Math.ceil(careersList.length / 4))].map((e, i) =>
                                <tr key={i}>
                                    <td>{careersCard(careersList[4 * i])}</td>
                                    <td>{careersList[4 * i + 1] ? careersCard(careersList[4 * i + 1]) : null}</td>
                                    <td>{careersList[4 * i + 2] ? careersCard(careersList[4 * i + 2]) : null}</td>
                                    <td>{careersList[4 * i + 3] ? careersCard(careersList[4 * i + 3]) : null}</td>

                                </tr>
                             )
                        }
                    </tbody>
                </table>
                </div>
        </div>
    )
}

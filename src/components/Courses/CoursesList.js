import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel, Tab, Tabs, Container, Row, Col, Nav, NavItem  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TabContentPanel from "../TabContentPanel";
import ReactPaginate from "react-paginate";

export const CoursesList = () => {
  const [coursesList, setCoursesList] = useState([])
  const [coList, setCOList] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

    useEffect(() => {
        refreshCoursesList();
    }, [])


    useEffect(() =>{
        axios.get('https://localhost:44394/api/CO/')
            .then(res => {
                setCOList(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))   
    }, [])

    useEffect(() => {
        axios.get("https://localhost:44394/api/Courses/")
            .then(res => {
                setCoursesList(res.data)
            })
            .catch(err => console.log(err))
      }, [])

    const coCard = data => (
        <div className="card">
        <img src={data.imageSrc} className="card-img-top" />
        <div className="card-body">
            <div className="row">
                <div className="col-lg-6">
                <button className="btn abtn" onClick={e => onDelete(e, parseInt(data.coid))}>
                Delete
            </button>
            </div>
                <div className="col-lg-6">
                <Link className="btn abtn" to={`/editCO/${data.coid}`}>Edit</Link>
                </div>
            </div>
        </div>
     </div>
    )

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

    const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure to delete this record?'))
    coursesAPI().delete(id)
    .then(res => refreshCoursesList())
    .catch(err => console.log(err))
    }

  const displayUsers = coursesList
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .sort((a,b) => b.coursesID - a.coursesID)
  .map((data, i) => {
    return (
      <div class="col-lg-3 border-right pr-3 pl-3">
          <div className="">
          <img src={data.imageSrc} className="card-img-top"/>
          <div className="p-0">
              <span className="newsTitle mt-2 mb-3" style={{fontSize:"20px", display:"inline-block"}}>{data.coursesTitle}</span><br/>
          </div>
          <div className="row">
                <div className="col-lg-6">
                 <button className="btn nbtn mt-3" onClick={e => onDelete(e, parseInt(data.coursesID))}>
                     Delete
                 </button>
                     </div>
                     <div className="col-lg-6">
                     <Link className="btn nbtn mt-3" to={`/editCourses/${data.coursesID}`}>Edit</Link>
                     </div>
                 </div>
                 {/* <Link className="button__news mt-3" to={`/getNews/${data.newsID}`}>LEXO ME SHUMË</Link> */}
             </div>
        </div>
    );
  });

  const pageCount = Math.ceil(coursesList.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 


  return(
      <>
    <div classClass="row">
      <p class="sbtitle ml-5">Courses Banner</p>
      {coList.map((data, index) => (
        <div className="container ml-5 mt-5">
        <img src={data.imageSrc} className="img-fluid" width="50%" />
            <div className="row">
                <div className="col-lg-6">
                <Link className="btn abtn mt-5 mb-3" to={`/editco/${data.coid}`}>Edit</Link>
                </div>
            </div>
        </div>
        ))}
    </div>
<hr/>
    <div className="row mb-5">
        <div className="col-md-12">
            <Link className="btn abtn ml-5 mt-5 mb-5" to="/createCourses">Add Courses</Link>
                <div class="row m-auto" style={{width:"75%"}}>
                {displayUsers}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

            </div>   
        </div>
    </div>
    </>
  )
}





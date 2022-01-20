import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel, Tab, Tabs, Container, Row, Col, Nav, NavItem  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TabContentPanel from "../../components/TabContentPanel";
import ReactPaginate from "react-paginate";


export const NewsPage = () => {
  const lang = localStorage.getItem("lang")
  const [newsList, setNewsList] = useState([])
  const [neList, setNeList] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    axios.get("https://localhost:44394/api/NE/")
        .then(res => {
            setNeList(res.data)
        })
        .catch(err => console.log(err))
  }, [])


  var obj = [...newsList];
  const displayUsers = obj
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .sort((a,b) => b.newsID - a.newsID)
  .map((data, i) => 
  {
    return( 
      <div class="col-lg-6 pr-5 pl-5 mb-5">
          <div className="">
          {data.gallery.slice(0, 1).map(item => (
              <>
            <img className="card-img-top img-fluid" src={item.imageSrc} style={{width: "100%"}}/> 
            </>
          ))} 
          <div className="p-0">
              <span className="" style={{fontSize:"12px", display:"inline-block"}}>{data.newsDate}</span><br/>
              <span className="newsTitle mt-2 mb-3" style={{fontSize:"20px", display:"inline-block"}}>{lang === 'al' ? `${data.newsTitle}` : `${data.newsTitleGerman}`}</span><br/>
                <Link className="btn nbtn1 mb-4" to={`/singleNews/${data.newsID}`}>READ MORE</Link>
          </div>
        </div>
      </div>
    );
  });

  const pageCount = Math.ceil(newsList.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 

 
  useEffect(() => {
    axios.get("https://localhost:44394/api/News/News-Gallery")
        .then(res => {
            setNewsList(res.data)
        })
        .catch(err => console.log(err))
  }, [])

  return(
    <div>
    {neList.map(data => (
             <>
         <img className="banner" src={lang === 'al' ? `${data.imageSrc}` : `${data.imageSrcGerman}`} style={{width: "100%", marginBottom:"5em"}}/>    
            </>
          ))}
          <div className="cnt m-auto" style={{width:"90%"}}>
            <div className="row mt-5">
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
  )
}


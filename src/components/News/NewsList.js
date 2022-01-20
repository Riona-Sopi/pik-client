import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";

export const NewsList = () => {
  const [newsList, setNewsList] = useState([])
  const [neList, setNEList] = useState([])
  const [nList, setNList] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

    useEffect(() => {
        refreshNewsList();
    }, [])

    const newsAPI = (url = 'https://localhost:44394/api/News/') => {
         return {
             fetchAll: () => axios.get(url),
             create: newRecord => axios.post(url, newRecord),
             update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
             delete: id => axios.delete(url + id)
         }
     }

     function refreshNewsList() {
        newsAPI().fetchAll()
        .then(res => {
            console.log(res.data)
            setNewsList(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      axios.get(`https://localhost:44394/api/News/News-Gallery`)
          .then(res =>{ 
              setNList(res.data.gallery)
          })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`https://localhost:44394/api/NE`)
        .then(res =>{ 
            setNEList(res.data)
        })
    .catch(err => console.log(err))
}, [])

    const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure to delete this record?'))
    newsAPI().delete(id)
    .then(res => refreshNewsList(),
    window.location.reload())
    .catch(err => console.log(err))
    }

  var obj = [...newsList];
  const displayUsers = obj
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .sort((a,b) => b.newsID - a.newsID)
  .map((data, i) => {
    return (
      <div class="col-lg-3 border-right pr-3 pl-3">
          <div className="">
            
          <div className="p-0">
              <span className="" style={{fontSize:"12px", display:"inline-block"}}>{data.newsDate}</span><br/>
              <span className="newsTitle mt-2 mb-3" style={{fontSize:"20px", display:"inline-block"}}>{data.newsTitle}</span><br/>
          </div>
          <div className="row">
                <div className="col-lg-6">
                 <button className="btn nbtn mt-3" onClick={e => onDelete(e, parseInt(data.newsID))}>
                     Delete
                 </button>
                     </div>
                     <div className="col-lg-6">
                     <Link className="btn nbtn mt-3" to={`/editNews/${data.newsID}`}>Edit</Link>
                     </div>
                 </div>
                 {/* <Link className="button__news mt-3" to={`/getNews/${data.newsID}`}>LEXO ME SHUMË</Link> */}
             </div>
             <div className="row">
              <div className="col-lg-12">
                     <Link className="btn nbtn mt-3" to={`/getNews/${data.newsID}`}>Add Photos</Link>
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
      <>
      <div classClass="row">
      <p class="sbtitle ml-5">News Banner</p>
      {neList.map((data, index) => (
        <div className="container ml-5 mt-5">
        <img src={data.imageSrc} className="img-fluid" width="50%" />
            <div className="row">
                <div className="col-lg-6">
                <Link className="btn abtn mt-5 mb-3" to={`/editne/${data.neid}`}>Edit</Link>
                </div>
            </div>
        </div>
        ))}
    </div>
    <hr/>
    <div className="row">
        <div className="col-md-12">
            <Link className="btn abtn ml-4 mt-3 mb-5" to="/createNews">Add News</Link>
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

          <div className="mb-3"></div>
            </div>   
        </div>
    </div>
    </>
  )
}





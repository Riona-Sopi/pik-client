import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Carousel, Tab, Tabs, Container, Row, Col, Nav, NavItem  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TabContentPanel from "../../components/TabContentPanel";
import ReactPaginate from "react-paginate";

export const ClientPage = () => {
  const [clientList, setClientList] = useState([])
  const [clList, setCLList] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 56;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    axios.get("https://localhost:44394/api/CL/")
        .then(res => {
            setCLList(res.data)
        })
        .catch(err => console.log(err))
  }, [])


  var obj = [...clientList];
  const displayUsers = obj
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .map((data, i) => 
  {
    return( 
      <div class="col-lg-2 pr-3 pl-3 mb-5">
              <div className="">
              <img src={data.imageSrc} className="img-card-top img-fluid"/>
        </div>
      </div>
    );
  });

  const pageCount = Math.ceil(clientList.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize] = useState(2);

 
  useEffect(() => {
    axios.get("https://localhost:44394/api/Client/")
        .then(res => {
            setClientList(res.data)
        })
        .catch(err => console.log(err))
  }, [])

// const indexOfLastPost = currentPage * pageSize;
// const indexOfFirstPost = indexOfLastPost - pageSize;
// const currentPosts = newsList.slice(indexOfFirstPost, indexOfLastPost);

// const paginate = pageNumber => setCurrentPage(pageNumber);

  return(
    <div>
    {clList.map(data => (
             <>
         <img className="banner" src={data.imageSrc} style={{width: "100%"}}/>    
            </>
          ))}
            <div className="row justify-content-center m-5">
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
  )
}






// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { Carousel } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


// export const ClientPage = () => {
//   const [clientList, setClientList] = useState([])
//   const [clList, setCLList] = useState([])
//   const [values, setValues] = useState([])
 


// useEffect(() => {
//   axios.get("https://localhost:44394/api/Client/")
//       .then(res => {
//           setClientList(res.data)
//       })
//       .catch(err => console.log(err))
// }, [])

// useEffect(() => {
//     axios.get("https://localhost:44394/api/CL/")
//         .then(res => {
//             setCLList(res.data)
//         })
//         .catch(err => console.log(err))
//   }, [])


//   return(
//     <div>
//          {clList.map(data => (
//              <>
//          <img src={data.imageSrc} style={{width: "100%"}}/>    
//             </>
//           ))}
//           <div class="row justify-content-center m-5">
//           {clientList.map(data => (
//             <div class="col-lg-2 pr-3 pl-3 mb-5">
//             <div className="">
//             <img src={data.imageSrc} className="img-card-top img-fluid"/>
//           </div>
//         </div>
//           ))}
//           </div>
//         <p className="pbottom mt-3 mb-5" style={{width:"10%"}}/>
//     </div>
//   )
// }





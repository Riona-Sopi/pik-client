import React from 'react';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
const MainLayouts = ({children}) => {
    return(
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}


export default MainLayouts;
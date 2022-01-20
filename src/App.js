import React from 'react';
import './App.css';
import './index.css';
import './pages/home/home.css';
import './pages/news/news.css';
import './pages/courses/courses.css';
import './pages/about/aboutstyle.css';
import './pages/application/applicationstyle.css';
import './pages/contact/contact.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import createHistory from 'history/browser';

import {
 BrowserRouter as Router,
  Switch
} from "react-router-dom";


import PrivateRoute from './PrivateRoute';
import AppRoute from './AppRoute';

import ScrollToTop from './ScrollToTop';

import MainLayouts from './layouts/MainLayout';

import Login from './users/LoginForm';
import Register from './users/RegisterForm';


import CreateAboutUs from './components/About/CreateAboutUs';
import AboutUsList from './components/About/AboutUsList';
import EditAboutUs from './components/About/EditAboutUs';

import { HomePage } from './pages/home/HomePage';
import DashboardLayout from './layouts/DashboardLayout';

import SliderList from './components/Slider/SliderList';
import EditSlider from './components/Slider/EditSlider';
import CreateSlider from './components/Slider/CreateSlider';

import EditFooter from './components/Footer/EditFooter';
import FooterList from './components/Footer/FooterList';
import CreateFooter from './components/Footer/CreateFooter';

import { NewsList } from './components/News/NewsList';
import GetNews from './components/News/GetNews';
import CreateNews from './components/News/CreateNews';
import EditNews from './components/News/EditNews';

import { NewsPage } from './pages/news/NewsPage';
import SingleNewsPage from './pages/news/SingleNewsPage';

import NEList from './components/NE/NEList';
import CreateNE from './components/NE/CreateNE';
import EditNE from './components/NE/EditNE';

import { AboutPage } from './pages/about/AboutPage';

import COList from './components/CO/COList';
import CreateCO from './components/CO/CreateCO';
import EditCO from './components/CO/EditCO';

import { ContactPage } from './pages/contact/ContactPage';

import ContactList from './components/Contact/ContactList';
import CreateContact from './components/Contact/CreateContact';
import EditContact from './components/Contact/EditContact';

import { ApplicationPage } from './pages/application/ApplicationPage';


import EditNewsPhotos from './components/News/EditNewsPhotos';
import AddNewsPhotos from './components/News/AddNewsPhotos';
import SuccessList from './components/Success/SuccessList';
import CreateSuccess from './components/Success/CreateSuccess';
import EditSuccess from './components/Success/EditSuccess';


import ABList from './components/AB/ABList';
import CreateAB from './components/AB/CreateAB';
import EditAB from './components/AB/EditAB';

import CreateCN from './components/CN/CreateCN';
import CNList from './components/CN/CNList';
import EditCN from './components/CN/EditCN';

import CreateApplication from './components/Application/CreateApplication';
import ApplicationList from './components/Application/ApplicationList';
import EditApplication from './components/Application/EditApplication';

import { CoursesList } from './components/Courses/CoursesList';
import CreateCourses from './components/Courses/CreateCourses';
import EditCourses from './components/Courses/EditCourses';
import { CoursesPage } from './pages/courses/CoursesPage';



function App() {
  return (
    <>
    <Router history={createHistory}>
          <ScrollToTop />
          <Switch>
          <AppRoute exact path="/" component ={HomePage} layout={MainLayouts} />
          <AppRoute exact path="/courses" component ={CoursesPage} layout={MainLayouts} />
          <AppRoute exact path="/application" component ={ApplicationPage} layout={MainLayouts} />
          <AppRoute path="/aboutus" component ={AboutPage} layout={MainLayouts} />
          <AppRoute path="/news" component ={NewsPage} layout={MainLayouts} />
          <AppRoute path="/singleNews/:id" component ={SingleNewsPage} layout={MainLayouts} />
          <AppRoute path="/contact" component ={ContactPage} layout={MainLayouts} />

              
                  <AppRoute path="/loginform">
                    <Login/>
                  </AppRoute>

                  <PrivateRoute path="/registerform">
                      <Register/>
                  </PrivateRoute>

                  <PrivateRoute path="/aboutuslist" component={AboutUsList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createabout" component={CreateAboutUs} layout={DashboardLayout}/>
                  <PrivateRoute path="/editAboutUs/:id" component={EditAboutUs} layout={DashboardLayout}/>

                  <PrivateRoute path="/courseslist" component={CoursesList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createCourses" component={CreateCourses} layout={DashboardLayout}/>
                  <PrivateRoute path="/editCourses/:id" component={EditCourses} layout={DashboardLayout}/>

                  <PrivateRoute path="/applicationlist" component={ApplicationList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createApplication" component={CreateApplication} layout={DashboardLayout}/>
                  <PrivateRoute path="/editApplication/:id" component={EditApplication} layout={DashboardLayout}/>

                  <PrivateRoute path="/sliderlist" component={SliderList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createSliderPhotos" component={CreateSlider} layout={DashboardLayout}/>
                  <PrivateRoute path="/editSliderPhotos/:id" component={EditSlider} layout={DashboardLayout}/>

                  <PrivateRoute path="/successlist" component={SuccessList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createSuccess" component={CreateSuccess} layout={DashboardLayout}/>
                  <PrivateRoute path="/editSuccess/:id" component={EditSuccess} layout={DashboardLayout}/>

        
                  <PrivateRoute path="/contactlist" component={ContactList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createcontact" component={CreateContact} layout={DashboardLayout}/>
                  <PrivateRoute path="/editcontact/:id" component={EditContact} layout={DashboardLayout}/>

                  <PrivateRoute path="/colist" component={COList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createco" component={CreateCO} layout={DashboardLayout}/>
                  <PrivateRoute path="/editco/:id" component={EditCO} layout={DashboardLayout}/>

                  <PrivateRoute path="/cnlist" component={CNList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createcn" component={CreateCN} layout={DashboardLayout}/>
                  <PrivateRoute path="/editcn/:id" component={EditCN} layout={DashboardLayout}/>

                  <PrivateRoute path="/ablist" component={ABList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createab" component={CreateAB} layout={DashboardLayout}/>
                  <PrivateRoute path="/editab/:id" component={EditAB} layout={DashboardLayout}/>

                  <PrivateRoute path="/nelist" component={NEList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createne" component={CreateNE} layout={DashboardLayout}/>
                  <PrivateRoute path="/editne/:id" component={EditNE} layout={DashboardLayout}/>

    
                  <PrivateRoute path="/footerlist" component={FooterList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createfooter" component={CreateFooter} layout={DashboardLayout}/>
                  <PrivateRoute path="/editFooter/:id" component={EditFooter} layout={DashboardLayout}/>


                  <PrivateRoute path="/newslist" component={NewsList} layout={DashboardLayout}/>
                  <PrivateRoute path="/createNews" component={CreateNews} layout={DashboardLayout}/>
                  <PrivateRoute path="/editNews/:id" component={EditNews} layout={DashboardLayout}/>
                  <PrivateRoute path="/getNews/:id" component={GetNews} layout={DashboardLayout}/>
                  <PrivateRoute path="/editNewsPhotos/:id" component={EditNewsPhotos} layout={DashboardLayout}/>
                  <PrivateRoute path="/addNewsPhotos/:id" component={AddNewsPhotos} layout={DashboardLayout}/>

                  
          </Switch>
    
      </Router>
    </>
  );
}

export default App;

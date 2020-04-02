import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

// STYLING
import GlobalStyle from './components/styled-components/GlobalStyle';
import bckgImg from './images/Wave-PNG-Clipart.png'
import './App.css';

//COMPONENTS
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import LoginForm from './components/forms/LoginForm';
import SignUpPage from './components/forms/SignUpPage';
import SalonSignUp from './components/forms/SalonSignUp';
import EditUser from './components/forms/EditUser';
import SearchPage from './components/search/SearchPage';
import UserDash from './components/users/UserDash';
import StylistDash from './components/users/StylistDash';
import AllReviews from './components/reviews/AllReviews';
import ReviewForm from './components/reviews/ReviewForm';
import AddPost from './components/forms/AddPost.js';
// import PrivateRoute from './components/PrivateRoute';

// CONTEXTS
import DataProvider from './components/contexts/DataContext.js'
import UserProvider from './components/contexts/UserContext.js'

function App() {

  return (
    <div className="App">
      <img src={bckgImg} alt='wave' className='bckgImg'/>
      <GlobalStyle/>
      <UserProvider>
        <DataProvider>
        <Router>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/userlogin" component={LoginForm}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/signup/salon" component={SalonSignUp}/>
            <Route path='/search' component={SearchPage}/>
            <Route path='/users/:id/dash' component={UserDash}  />
            <Route path='/stylists/:id/dash' component={StylistDash}/>
            <Route path='/edit/user' component={EditUser}/>
            <Route path='/:id/reviews' component={AllReviews}/>
            <Route path='/stylist/:id/add-review' component={ReviewForm}/>
            <Route path='/stylist/:id/add-post' component={AddPost}/>
        </Switch>
        <Footer/>
        </Router>
      </DataProvider>
      </UserProvider>
      
      
    </div>
  );
}

export default App;


import React from 'react';
import styled from 'styled-components';
import {Route, NavLink} from 'react-router-dom';
// import PrivateRoute from '../PrivateRoute';
// import axiosWithAuth from '../utilis/axiosWithAuth';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alreadyUser: true
        }
    }

    handleUser(){
        this.setState({alreadyUser: true ? false : true})
    }
    
    render(){
        const isAlreadyUser = this.state.alreadyUser;

        let form;
        let loginOrSignup;

        if (isAlreadyUser === true){
            form = <LoginForm/>;
            loginOrSignup = <p>sign up</p>
        } else {
            form = <SignUpForm/>;
            loginOrSignup = <p onClick={this.handleUser}>login</p>
        }


        return(
            <Page>
                <div>
                   {form}
                   {loginOrSignup }              

                </div>
                <img src='https://images.unsplash.com/photo-1501699169021-3759ee435d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80' alt='salon chair and makeup light'/>
            </Page>

        )
    }
}

export default LoginPage;

const Page = styled.div`
    width: 90vh;
    height: 80vh;
    margin: auto;
    display:flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    img{height: 100%}
    a{
        font-size: .8rem; 
        text-align: right; 
        text-decoration: none; 
        color: black; 
        :hover{color: gray}
    }
    p{
        cursor: pointer;
        color: gray;
    }
`;
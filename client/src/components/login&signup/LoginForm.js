import React from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import defaultImg from '../../images/default-profile.jpg'
import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isStylist: false,
            isLoggedIn: false,
            loginFail: false,
            email: '',
            password: '',
            profile_img: {defaultImg},
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value 
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        var loginUrl;
        if(this.state.isStylist === false){
            axiosWithAuth()
            .post('/auth/login/user', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.user.id);
                localStorage.setItem('usertype', res.data.user.usertype);
                this.setState({isLoggedIn: true})
                this.props.history.push(`/users/${res.data.user.id}/dash`)
            })
            .catch(err=> {
                this.setState({loginFail: true})
                console.log('USER LOGIN ERROR', err)
            }) 
        } 
        
        
        else{
            axiosWithAuth()
            .post('/auth/login/stylist', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.stylist.id);
                localStorage.setItem('usertype', res.data.stylist.usertype);
                this.setState({isLoggedIn: true})
                this.props.history.push(`/stylists/${res.data.stylist.id}/dash`)
            })
            .catch(err=> {
                this.setState({loginFail: true})
                console.log('STYLIST LOGIN ERROR', err)
            }) 
        }
    };

    
     
    render(){
        if(this.state.isLoggedIn === true) {
            console.log('Login successful.')
        }
        let loginError;
        if (this.state.loginFail === true){
            loginError =  <p className='login-fail'>Email or Password Incorrect</p>
        }

        return (
            <LoginPage>
                <LoginForm onSubmit={this.handleSubmit}>
                    <h3>Welcome Back</h3>
                    <input 
                        type='text' 
                        name='email' 
                        value={this.email} 
                        placeholder="Email" 
                        onChange={this.handleChange}
                    />
                    <input 
                        type='password' 
                        name='password' 
                        value={this.password} 
                        placeholder="Password" 
                        onChange={this.handleChange}
                    />
                    <div className='check-stylist'>
                        I'm a Stylist
                        <input 
                            type='radio'
                            label='isStylist'
                            name='isStylist'
                            value={'true'}
                            onClick={this.handleChange}
                        />
                    </div>
                    <button type='submit' onClick={this.handleSubmit}>Login</button>
                    {loginError}
                    <Link to='/signup'><p>Don't have an account?</p></Link> 
                </LoginForm>
                
            </LoginPage>
    )
}};

export default Login;


const LoginPage = styled.div`
    width: 50vw;
    height: 50vh;
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
    .login-fail p{
        color: red,
        font-size: .5rem;
    }
`;

const LoginForm = styled.form`
    display:flex;
    justify-content: center;
    align-content: spece-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
    h3{
        margin: 0; 
        font-size: 2rem; 
        font-family: 'Dancing Script', cursive
    }
    
    input, button{
        height: 25px;
        width: 100%
        margin: 5px auto;
        border: 1px solid #80808095;
        font-size: 1rem;
        padding: 2px;
        border-radius: 2px;
    }
    button{
        background: orange;
        max-width: 30%;
        padding: 2px 5px;
        color: #fff;
        border: none;
        height: 30px;
        cursor: pointer
    }    
    .check-stylist{
      display: flex;
      width: 80%;
      align-items: center;
      justify-content: space-between;
      input{width: 30%; margin-left: 0}
    }
`;
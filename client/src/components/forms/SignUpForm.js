import React from "react";
import styled from 'styled-components';
import axiosWithAuth from "../utilis/axiosWithAuth";
import defaultImg from '../../images/default-profile.jpg'
import SalonSignUp from './SalonRegister';

export default class SignUp extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      password: '',
      first_name: '',
      last_name: '',
      profile_img: {defaultImg},
      street_address: '',
      city: '',
      zipcode: '',
      state: '',
      country: '',
      salon: '',
      email: '',
      usertype: 'user',
      salonForm: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };


  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleNext = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/auth/register/stylist', {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email,          
      profile_img: this.state.profile_img,
      usertype: 'stylist'
    })
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      localStorage.setItem('id', res.data.stylist.id);
      localStorage.setItem('usertype', res.data.user.usertype);
      this.setState({salonForm: true})
    })  
    .catch(err=>{console.log('Register Stylist Error', err)})
  };

  handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
      .post('/auth/register/user', {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        email: this.state.email,
        profile_img: this.state.profile_img,
        usertype: 'user',
    })
      .then( res=> {
        localStorage.setItem('token', res.data.payload)
        console.log('Signup Successful')
        this.props.history.push('/login')
      })
      .catch(err=>{console.log('FE Error', err)})
  };

  render(){
    return (
      <SignupPage>
        <SignupForm>
          {this.state.salonForm === false && (
            <div>
              <h3>Glad You're Here!</h3>
              <input
                type='text'
                name='first_name'
                value={this.state.first_name} 
                placeholder="first name" 
                onChange={this.handleChange}
              />
              <input
                type='text'
                name='last_name'
                value={this.state.last_name} 
                placeholder="last name" 
                onChange={this.handleChange}
              />

              <input
                type='password'
                name='password'
                value={this.state.password} 
                placeholder="password" 
                onChange={this.handleChange}
              />

              <input
                type='text'
                name='email'
                value={this.state.email} 
                placeholder="email" 
                onChange={this.handleChange}
              />

              <div className='check-stylist'>
                I'm a Stylist
                <input 
                  type='radio'
                  label='user'
                  name='usertype'
                  value={'stylist'}
                  onClick={this.handleChange}
                />
              </div>

              {this.state.usertype === 'user' && (
                <button type='submit' onClick={this.handleSubmit}>signup</button>
              )}

              {this.state.usertype === 'stylist' && (
                <button type='submit' onClick={this.handleNext}>signup</button>
              )}

            </div>
          )}
        </SignupForm> 
          {this.state.salonForm === true && (
            <SalonSignUp/>
          )}
      </SignupPage>
    );
  }
}

const SignupPage = styled.div`
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
  .check-stylist{
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: space-between;
    input{width: 30%; margin-left: 0}
  }
`;

const SignupForm = styled.form`
display:flex;
justify-content: center;
align-content: spece-between;
align-items: center;
margin: 0 auto;
padding: 20px;
flex-direction: column;
width: 50%;
h3{margin: 0; font-size: 2rem; font-family: 'Dancing Script', cursive}
p{font-size: .8rem; text-align: right; }
input, button{
    height: 25px;
    width: 80%
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
`;
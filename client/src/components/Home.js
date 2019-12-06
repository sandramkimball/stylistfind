import React, {useState, useEffect} from "react";
import {  NavLink } from "react-router-dom";
import Styled from "styled-components";
import Reviews from './reviews/Reviews';
import Posts from './posts/Posts';
import axiosWithAuth from "./utilis/axiosWithAuth";


export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  
  useEffect(()=>{
    axiosWithAuth()
    .get('/search/posts')
    .then(res=> {
      console.log('Latest Posts: ', res);
      // var latest = res.data.filter(item=> item.date.replace('-', '').sort(function(a, b)return{a-b}));
      // setRecentPosts(latest);
    })
    .catch(err=> {console.log('Latest Post Error: ', err)})
  }, [])

  useEffect(()=>{
    axiosWithAuth()
    .get('/search/reviews')
    .then(res=> {
      console.log('Latest Reviews: ', res);
      var latestReviews = res.data.filter(review=> 
        review.date.replace('-', '').sort(function(a, b){return a-b}));
      setRecentReviews(latestReviews);
    })
    .catch(err=> {console.log('Latest Post Error: ', err)})
  }, [])

  return (
    <div>
      <Body>
        <Section1>
          <img src='https://images.unsplash.com/photo-1497433550656-7fb185be365e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9' alt='curly blonde hair and green leaves'/>
          <SearchBar>
            <h1>Find Stylists</h1>
            <form >
                <input
                id='search_input'
                type='text'
                name='textfield'
                placeholder='Enter location, salon or stylist name...'/>
            </form>
          </SearchBar>
        </Section1>
        <Section2>
          <div>
            <h1>Latest Reviews</h1>
            <Reviews props={recentReviews}/>
          </div>
        </Section2>
        <Section3>
          <div>
            <h1>Latest Posts</h1>
            <Posts props={recentPosts}/>
          </div>
        </Section3>
     </Body>
    </div>
  );
}


const Body = Styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  dislay: flex;
  flex-direction: column;
  align-content: space-between;
`;

const Section1 = Styled.section`
  height: 60vh;
  width: 100vw;
  img{
    object-fit: cover;
    position: relative;
    height: 100%;
    width: 100vw
  }
`;

const Section2 = Styled.section`
  width: 100vw;
  h1{font-size: 2rem;}
  div{margin: 0 auto}
`;

const Section3 = Styled.section`
  width: 100vw;
  div{margin: 0 auto}
  h1{font-size: 2rem;}
`;

const SearchBar = Styled.div`
  width: 60%;
  margin: 10px auto;
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 5;
  position: absolute;
  top: 30vh;
  left: 20vw;
  border-radius: 5px 3px;
  h1{font-size: 2.75rem; padding: 0; margin: 0 }
  form{
    border: none;
    height: 30px;
    margin-left: 20px;
    width: 60%
    button{
        background: none;
        border: 1px solid black;
        padding: 7px;
    }
    input{
        border: none;
        height: 40px;
        width: 100%;
        text-align: left;
        border-bottom: 1.5px solid gray;
    }
  }
`;

const RegisterBtn = Styled.div`
  width: 40vw;
  align-items: center;
  a{text-decoration: none;}
  h3{
    font-size: 3rem;
    color: purple;
    :hover{
      transform: scale(1.1);
      color: #80808095; 
      cursor: pointer;
    }
  }
`;





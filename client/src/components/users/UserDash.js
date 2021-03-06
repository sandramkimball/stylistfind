import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import ReviewCard from '../reviews/ReviewCards';
import defaultImg from '../../images/default-profile.jpg';
import { Link } from 'react-router-dom';

const UserDash = () => {
    const [user, setUser] = useState([])
    const [reviews, setReviews] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('id')
    
    useEffect(()=>{
        axiosWithAuth()
        .get(`/users/${user_id}/`, token) 
        .then(res=> {         
            setUser(res.data)                  
            return axiosWithAuth()
            .get(`users/${res.data.id}/reviews`, token)
            .then(res=> setReviews(res.data) )
        })
        .catch(err => console.log(err.response) );
    }, [])

    return (
        <Dash>                   
            <InfoBox>
                <div className='profile-pic-box'>
                    {user.profile_img !== null &&(
                        <img src={`${user.profile_img}`} alt='profile of user'/>
                    )}
                    {user.profile_img === null && (
                        <img src={defaultImg} alt='default avatar'/>
                    )}
                </div>
                <div className='profile-text'>
                    <h1>{user.first_name} {user.last_name}</h1> 
                    <p>{user.email}</p> 
                    <Link to={`/user/${user.id}/edit`}><p className='edit-btn'>Edit</p></Link>
                </div>
            </InfoBox>    
            <div className='reviews'>
                <h4>Your Reviews</h4>
                <div>
                    {reviews && reviews.map(review => (
                        <ReviewCard  
                            key={review.id}
                            id={review.id} 
                            review={review}/>
                    ))}
                    {reviews === null && (
                        <p>You have no reviews</p>
                    )}
                </div>
            </div>
            <div className='bookmarks'>
                <h4>Your Favorites</h4>
                <div>
                    {bookmarks && bookmarks.map(review => (
                        <p>Stylist Name</p>
                    ))}
                    {!bookmarks && (
                        <p>You have nothing saved.</p>
                    )}
                </div>
            </div>
        </Dash>  
    )
}

export default UserDash;

const Dash = styled.section`
    display: flex;
    flex-direction: column;
    margin: 5vh auto;
    justify-content: space-between;
    a{text-decoration: none}
    .reviews, .bookmarks{ 
        background: white;
        box-shadow: 0px 3px 8px gray;
        border-radius: 4px;
        width: 75vw;
        max-height: 50vh;
        height: 100%;
        margin: 5vh auto;
        overflow: auto;
        div{
            display: flex;
            flex-direction: column;
            margin: 0 1px 2px 1px;
        }
    }
`;

const InfoBox = styled.div`
    background: white;
    box-shadow: 0px 3px 8px gray;
    border-radius: 4px;
    width: 75vw;
    height: 30vh;
    padding: 10px 5px;
    margin: auto;
    font-size: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1{
        padding: 0; 
        margin: 0
    }
    .profile-pic-box{
        height: 25vh;
        width: 25vh;
        margin: 0 auto;
        border-radius: 50%;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }    
    .profile-text{
        margin: 2px auto;
        width: 70%;
        text-align: left;
    }
    .edit-btn{
        color: gray;
        :hover{color: #000}
    }
`;



import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import axiosWithAuth from '../utilis/axiosWithAuth';
import FilterBar from './Filter-Bar';
import GoogleApiWrapper from './Map';

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    //Two apis? search location+name against salon+stylists.
    useEffect(()=> {
        axiosWithAuth()
        .get('/search') 
        .then(res=> {
            console.log('LIST OF STYLISTS:', res);
            const results = res.data.filter(item=> item.salon.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(results);
        })
        .catch(err=> {
            console.log('FACEPALM', err)
        })
    }, [searchTerm]);

    const handleChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    };

    return(
        <div>
            <div>
                <SearchBar>
                <h1>Find Stylists</h1>
                <form onSubmit={handleChange}>
                    <input
                    id='search_input'
                    type='text'
                    name='textfield'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleChange}/>
                </form>
            </SearchBar>
            <MapContainer>
                <GoogleApiWrapper/>
            </MapContainer>
            </div>
            <BodyContainer>
                <FilterBar/>
                <SearchContainer>
                    <div className='search-results'>
                        {searchResults.map(result=> (
                            <SearchCard key={result.id} result={result}/>
                        ))}
                    </div>
                </SearchContainer>
            </BodyContainer>
        </div>
    )
}

export default SearchPage;

const BodyContainer = styled.div`
    display: flex
`;

const MapContainer = styled.div`
    position: fixed;
    right: 0;
    width: 30%;
    max-width: 330px;
    height: 100vh;
    border-left: 2px solid gray;
`;

const SearchContainer = styled.div`
    margin: 0 auto;  
    width: 60%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .search-results{
        width: 100%
    }
`;


const SearchBar = styled.div`
    width: 80%;
    margin: 10px ;
    display: flex;
    // justify-content: center;
    align-items: center;
    position: relative;
    form{
        border: none;
        margin-left: 20px;
        height: 40px;
        width: 50%;
        button{
            background: none;
            border: 1px solid black;
            padding: 7px;
        }
        input{
            border: 1px solid black;
            border-radius: 4px;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding-left: 5px;
            font-size: 1rem;
        }
        input:focus{border: 1px solid gray}
    }
`;
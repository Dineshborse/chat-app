import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';

import './styles/_searchbar.scss'

const SearchBar = () => {
    
  return (
    <div className='SearchBar-container'>
        <SearchIcon/>
        <input className='SearchBar-container__input' type={"text"}></input>
    </div>
  )
}

export default SearchBar
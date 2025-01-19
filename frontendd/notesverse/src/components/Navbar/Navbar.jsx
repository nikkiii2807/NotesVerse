import React, { useState } from 'react'
import Profile from '../Cards/Profile'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo, searchNote}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  // Handle search text change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle search action (when clicking magnifying glass)
  const handleSearch = () => {
    
    if(searchValue){
      searchNote(searchValue)
    }
  };

  // Clear the search input
  const handleClearSearch = () => {
    setSearchValue('');
    searchNote('');
  };

  const onLogout = () => {
    localStorage.clear()
    navigate("/Login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className='text-xl font-bold text-black py-2'>NotesVerse</h2>
      <SearchBar 
        value={searchValue} 
        onChange={handleSearchChange} 
        handleSearch={handleSearch} 
        onClearSearch={handleClearSearch} 
      />
      <Profile userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default Navbar;

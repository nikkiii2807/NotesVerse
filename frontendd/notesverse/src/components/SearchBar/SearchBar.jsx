import React from 'react'
import { IoMdClose } from 'react-icons/io'; // Close icon
import { FaMagnifyingGlass } from 'react-icons/fa6'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleClear = () => {
    onClearSearch(); // Clears the text in the input
  };

  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
      <input
        type='text'
        placeholder='Search Notes'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange} // Updates value when typing
      />
      {/* Conditionally render the cancel icon based on the input value */}
      {value && (
        <IoMdClose 
          className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' 
          onClick={handleClear} // Clears input on click
        />
      )}
      <FaMagnifyingGlass 
        className='text-slate-400 cursor-pointer hover:text-black' 
        onClick={handleSearch} // Initiates search on click
      />
    </div>
  );
}

export default SearchBar;

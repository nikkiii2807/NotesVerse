import React, { useState } from 'react';
import {MdAdd,MdClose} from "react-icons/md"
const TagInput = ({tags,setTags}) => {

    
        const [inputValue, setInputValue] = useState("");

        const handleInput=(e)=>{
            setInputValue(e.target.value);
        }
        const addNewTag=()=>{
            if(inputValue.trim()!==""){
                setTags([...tags,inputValue.trim()])
                setInputValue("");
            }
        }
        const handleKeyDown=(e)=>{
            if (e.key==="Enter"){
                addNewTag();
            }
        }
        const handleRemove=(tagRemove)=>{
            setTags(tags.filter((tag)=>tag!==tagRemove))
        }
  return (
    <div>
        {tags?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="flex items-center bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded"
      >
        #{tag}
        <button
          onClick={() => {
            // Logic to remove the tag
           handleRemove(tag)
          }}
          className="ml-2"
        >
          <MdClose />
        </button>
      </span>
    ))}
  </div>
)}

      <div className="flex items-center gap-4 mt-3">
        <input type="text"
        value={inputValue}
        className='text-sm bg-transparent border px-3 py-3 rounded outline-none'
        placeholder='add tags'
        onChange={handleInput}
        onKeyDown={handleKeyDown}/>
        <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700' onClick={()=>{
            addNewTag();
        }}>
            <MdAdd className='text-2xl text-blue-700 hover:text-white'/>
        </button>
      </div>
    </div>
  )
}

export default TagInput

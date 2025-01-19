import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from "react-icons/md";
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, getAllNotes, type, onClose,showToast }) => {
    const [title, setTitle] = useState(noteData?.title|| "");
    const [content, setContent] = useState(noteData?.content|| "");
    const [tags, setTags] = useState(noteData?.tags|| []);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleAdd = async () => {
        // Form validation
        if (title.trim() === "" || content.trim() === "") {
            setErrorMessage("Title and Content fields cannot be empty.");
            return;
        }
        
        try {
            const response = await axiosInstance.post("/add-note", {
                title: title.trim(),
                content: content.trim(),
                tags,
            });
            
            if (response.data && response.data.note) {
                showToast("Note added successfully");
                getAllNotes(); // Refresh the notes list
                onClose(); // Close the modal
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Failed to add note. Please try again.");
            }
            console.error("Error adding note:", error);
        }
    };

    const editNote = async () => {
        // Form validation
        const noteId=noteData._id
        
        try {
            const response = await axiosInstance.put("/edit-note/"+noteId, {
                title: title.trim(),
                content: content.trim(),
                tags,
            });
            
            if (response.data && response.data.note) {
                showToast("Note updated successfully");
                getAllNotes(); // Refresh the notes list
                onClose(); // Close the modal
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Failed to add note. Please try again.");
            }
            console.error("Error adding note:", error);
        }
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose size={24} />
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none"
                    placeholder="Enter title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea
                    type="text"
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Enter content"
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="text-red-500 text-sm mt-3">{errorMessage}</div>
            )}

<button
  className="btn-primary font-medium mt-5 p-3"
  onClick={type === "edit" ? editNote : handleAdd}
>
  {type === "edit" ? "UPDATE" : "ADD"}
</button>
        </div>
    );
};

export default AddEditNotes;
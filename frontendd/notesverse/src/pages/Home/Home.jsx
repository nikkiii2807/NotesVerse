import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Notecard from '../../components/Cards/Notecard';
import { MdAdd } from 'react-icons/md'; // Import MdAdd
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import moment from "moment";
import ToastMessage from '../../components/Toast/ToastMessage';
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const [openEditAdd, setEditAdd] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToast, setToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch,setIsSearch]=useState(false)

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setEditAdd({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showtoastmsg = (message, type) => {
    setToast({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setToast({
      isShown: false,
      message: "",
    });
  };

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      // Check if error.response exists and handle the 401 error properly
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        // Log the error if it's not a 401 status
        console.error("Error fetching user info:", error);
      }
    }
  };
  

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  // Delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    console.log("Deleting note with ID:", noteId); // Debugging

    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        showtoastmsg("Note Deleted Successfully", "delete");
        getAllNotes(); // Refresh the notes list
      }
    } catch (error) {
      if (error.response?.data?.message) {
        showtoastmsg(error.response.data.message, "error");
      } else {
        showtoastmsg("Failed to delete note. Please try again.", "error");
      }
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  //search
  // Search for a Note
  const searchNote = async (query) => {
    try {
      if (!query.trim()) {
        setIsSearch(false);
        getAllNotes(); // Reset to all notes when search is cleared
        return;
      }
  
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
  
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Search error:", error);
      // Optionally show an error toast
      showtoastmsg("Failed to search notes", "error");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
   
      <Navbar userInfo={userInfo} searchNote={searchNote} />
      
      <div className="container mx-auto mt-8 ">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {allNotes.map((item) => (
              <Notecard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format('Do MMM YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-teal-600 hover:bg-teal-700 absolute right-10 bottom-10 transition-all duration-300"
        onClick={() => {
          setEditAdd({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openEditAdd.isShown}
        onRequestClose={() => setEditAdd({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openEditAdd.type}
          noteData={openEditAdd.data}
          onClose={() => setEditAdd({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
          showToast={showtoastmsg}
        />
      </Modal>

      <ToastMessage
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;

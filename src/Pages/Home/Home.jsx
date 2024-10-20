import React, { useContext, useEffect, useState } from 'react';
import notFound from '../../assets/notfounddark.png';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import axios from 'axios';
import { UserToken } from '../../Context/UserTokenProvider';
import Modal from '../../Components/Modal/Modal';
import { ThemeContext } from '../../Context/ThemeContext'; // Import ThemeContext

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(UserToken);
  const { darkMode } = useContext(ThemeContext); // Use context for dark mode
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const updateValues = (id, title, content) => {
    setShowModal(true);
    setIsUpdating(true);
    setValues({ id, title, content });
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: {
          token: "3b8ny__" + token
        }
      });
      const filteredArray = notes.filter((note) => note._id !== id);
      setNotes(filteredArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const getUserNotes = async () => {
    try {
      const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: "3b8ny__" + token
        }
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    token && getUserNotes();
  }, [token]);

  return (
    <>
      <button
        onClick={handleModal}
        className={`hover:bg-sky-950 duration-300 cursor-pointer absolute top-5 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-[#005dcb]'}`}
        type="button">
        <CiStickyNote className='mr-3' />
        Add Note
      </button>

      {notes.length === 0 ? (
        <div className='text-center'>
          <img src={notFound} className='w-1/3 mx-auto' />
          <p className='text-gray-200 p-3 text-2xl'>No Notes Found</p>
        </div>
      ) : (
        <div className='container mx-auto mt-20'>
          <div className="row w-4/5 mx-auto">
            {notes.map((note) => (
              <div key={note._id} className='w-full md:w-1/2 lg:w-1/4 xl:w-1/4 text-white text-center p-4'>
                <div className={`inner flex flex-col rounded-lg ${darkMode ? 'bg-[#202020]' : 'bg-[#005dcb]'} p-6`}>
                  <div className={`flex items-center font-bold justify-between border-b-2 text-3xl mb-5 flex-col ${darkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className='capitalize mb-2'>{note.title}</h2>
                    <div className="flex w-full justify-between">
                      <MdDelete onClick={() => deleteNote(note._id)} className='cursor-pointer' />
                      <FaEdit onClick={() => updateValues(note._id, note.title, note.content)} className='cursor-pointer' />
                    </div>
                  </div>
                  <p className={`text-xl ${darkMode ? 'text-gray-200' : 'text-black'}`}>{note.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          setNotes={setNotes}
          notes={notes}
          values={values}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      )}
    </>
  );
};

export default Home;

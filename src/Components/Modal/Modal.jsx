import React, { useContext } from 'react'
import { UserToken } from '../../Context/UserTokenProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
function Modal({ setShowModal, setNotes, values, isUpdating, setIsUpdating }) {
    const { token } = useContext(UserToken);
    const closeModal = () => {
        setShowModal(false);
        setIsUpdating(false);
    }
    const validateInputs = Yup.object({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required!")
    })
    const callAPI = async (userInputs) => {
        if (isUpdating === false) {
            /*Add Note */
            try {
                const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, userInputs, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                console.log(data);
                setShowModal(false);
                // const newArray = structuredClone(notes);
                // setNotes([...newArray, data.note]);
                setNotes((prevState) => [...prevState, data.note]);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${values.id}`, userInputs, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                console.log(data);
                //notes.map
                setNotes((prevState) => prevState.map(note => note._id === values.id ? data.note : note))
                setShowModal(false);
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsUpdating(false);
            }
        }
    }
    const modalForm = useFormik({
        initialValues: {
            title: isUpdating ? values.title : "",
            content: isUpdating ? values.content : "",
        },
        validationSchema: validateInputs,
        onSubmit: callAPI
    })
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <form onSubmit={modalForm.handleSubmit} className="border-0 shadow-lg relative flex flex-col w-full dark:bg-[#171717] rounded outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-white capitalize">
                                {isUpdating ? "Update note" : "Add a new note!"}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-3 flex items-center justify-center">
                            <label htmlFor="title" className='mr-3 text-white'>Title</label>
                            <input name="title" id="title"
                                value={modalForm.values.title}
                                onChange={modalForm.handleChange}
                                onBlur={modalForm.handleBlur}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></input>
                            {modalForm.errors.title && modalForm.touched.title &&
                                <p className='text-center text-red-500 my-5'>{modalForm.errors.title}</p>
                            }
                        </div>
                        <div className="p-6 flex items-center justify-center">
                            <label htmlFor="content" className='mr-3 text-white'>Content</label>
                            <textarea name="content" id="content"
                                value={modalForm.values.content}
                                onChange={modalForm.handleChange}
                                onBlur={modalForm.handleBlur}
                                rows={5}
                                className='block resize-y w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></textarea>
                            {modalForm.errors.content && modalForm.touched.content &&
                                <p className='text-center text-red-500 my-5'>{modalForm.errors.content}</p>
                            }
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                onClick={closeModal}
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Close
                            </button>
                            <button
                                disabled={!(modalForm.isValid && modalForm.dirty)}
                                className="disabled:opacity-85 disabled:cursor-not-allowed bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                {isUpdating ? "Update Note" : "Add note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default Modal
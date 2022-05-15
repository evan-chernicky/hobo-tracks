import React from 'react'
import CloseButton from './assets/close-btn-black.svg'

function DeleteModal({setDeleteModal, deleteID, type, handleDelete}) {

    const animate = "scale-up-center"

    function deleteItem() {
        fetch(`/api/${type}s/${deleteID}`,{
            method: "DELETE",     
        })
        handleDelete(type, deleteID)
        setDeleteModal(false)
    }


  return (
            <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen`}>
                <div className={`px-20 py-12 bg-white relative text-center rounded-xl ${animate}`}>
                    <button onClick={() => setDeleteModal(false)}>
                        <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
                    </button>
                    <h2 className="text-center text-4xl font-bold text-green pb-12 capitalize">Delete {type}</h2>
                    <p>Are you sure you would really like to delete this {type}?</p>
                    { type === "trip" ? <p>Deleting this trip will destroy all associated days and stops forever.</p> : null}

                    <div className="pt-10 flex flex-row justify-center">
                        <button onClick={() => deleteItem()} className="py-3 mx-2 px-8 bg-red-700 text-white font-medium duration-300 mb-10 hover:scale-95">Delete</button>
                        <button onClick={() => setDeleteModal(false)} className="py-3 mx-2 px-8 bg-gray-400 text-white font-medium duration-300 mb-10 hover:scale-95">Close</button>
                    </div>
                </div>
            </div>
  )
}

export default DeleteModal
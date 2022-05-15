import React, {useState} from 'react'
import DeleteModal from './DeleteModal'
import EditDayModal from './DayModal'
import EditStopModal from './StopModal'
import EditTripModal from './TripModal'
import Options from './assets/Options.svg'

function OptionsDropdown({updateStopImages, selectedID, type, handleDelete, editData, updateDayData, updateStopData, focusedAddress, setFocusedCords, focusedCords, onPlaceChanged, updateTripData}) {

    const [showDropDown, setShowDropDown] = useState(false)
    const [showDayModal, setShowDayModal] = useState(false)
    const [showStopModal, setShowStopModal] = useState(false)
    const [showTripModal, setShowTripModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    function onEditItem() {
        if (type === "day") {
            setShowDayModal(true)
        }
        else if (type === "stop") {
            setShowStopModal(true)
        }
        else if (type === "trip") {
            setShowTripModal(true)
        }
        setShowDropDown(false)
    }

    function onDeleteItem() {
        setDeleteModal(true)
        setShowDropDown(false)
    }

  return (
      <div className="relative">
        <button onClick={() => setShowDropDown(!showDropDown)} className={`${showDropDown ? "rotate-90" : null} duration-300` }>
            <img src={Options} alt="dropdown arrow" />
        </button>
        {showDropDown ? (
        <duv className="absolute right-0 border text-center bg-white right-0 bottom-0 z-10 fade-in-bottom" style={{right: "-50px"}}>
            <button onClick={() => onEditItem()} className="px-4 py-2 duration-200 hover:bg-green hover:text-white w-full">Edit</button>
            <button onClick={() => onDeleteItem()} className="px-4 py-2 duration-200 hover:bg-red-700 hover:text-white w-full">Delete</button>
        </duv>
        ) : null}
        {deleteModal ? <DeleteModal setDeleteModal={setDeleteModal} deleteID={selectedID} type={type} handleDelete={handleDelete}/> : null}
        {showDayModal ? <EditDayModal editData={editData} setShowDayModal={setShowDayModal} updateDayData={updateDayData}/> : null}
        {showStopModal ? <EditStopModal updateStopImages={updateStopImages} editData={editData} setShowStopModal={setShowStopModal} updateStopData={updateStopData} focusedAddress={focusedAddress} onPlaceChanged={onPlaceChanged} setFocusedCords={setFocusedCords} focusedCords={focusedCords}/> : null}
        {showTripModal ? <EditTripModal editData={editData} setShowTripModal={setShowTripModal} updateTripData={updateTripData} /> : null}

    </div>
  )
}

export default OptionsDropdown
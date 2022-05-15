import React, {useState, useEffect} from 'react'
import CloseButton from './assets/close-btn-black.svg'
import ErrorMessage from './ErrorMessage'

function DayModal({tripID, setDaysData, daysData, setShowDayModal, editData, updateDayData}) {

    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const animate = "scale-up-center"

    useEffect(() => {
      if (editData) {
        setDescription(editData.description)
        setDate(editData.date)
      }
    }, [editData])


    //PATCH request is defined by whether or not there is editData!

    function renderNewDay(e) {
        e.preventDefault()

        //If there is a day ID, it's going to be a PATCH request
        fetch(`/api/days/${editData ? editData.id : ""}`, {
            method: `${editData ? "PATCH" : "POST"}`,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              date,
              description,
              trip_id: tripID ? tripID : editData.trip_id
            }),
          }).then((r) => {
            if (r.ok) {
              if (!editData) {
                r.json().then((dayData) => setDaysData([...daysData, dayData]))     
              } else {
                r.json().then((updatedDay) => updateDayData(updatedDay))   
              }
              setShowDayModal(false)
            } else {
              r.json().then((errorData) => setErrorMessage(errorData.error))
            }
          })

        e.target.reset()
    }


  return (
            <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen`}>
                <div className={`px-20 py-12 bg-white relative rounded-xl ${animate}`}>
                    <button onClick={() => setShowDayModal(false)}>
                        <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
                    </button>
                    <h2 className="text-center text-4xl font-bold text-green pb-8">{`${editData ? "Edit" : "Add"} Day`}</h2>
                        <form className="flex flex-col" onSubmit={(e) => renderNewDay(e)}>
                        {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
                        <label htmlFor="start_date" className="text-green font-medium text-left pb-2">Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="border-2 border-green text-green text-left px-2"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <label htmlFor="description" className="text-green font-medium text-left pb-2 mt-4">Description:</label>
                        <textarea
                            type="text"
                            id="description"
                            className="border-2 border-green text-green text-left px-2"
                            style={{minHeight: "100px"}}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button className="mt-6 py-3 px-8 bg-orange text-white font-medium duration-300 mb-10 hover:scale-95" type="submit">Submit</button>
                        </form>
                </div>
            </div>
  )
}

export default DayModal
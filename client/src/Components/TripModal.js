import React, {useState, useEffect} from 'react'
import CloseButton from './assets/close-btn-black.svg'
import ErrorMessage from "./ErrorMessage"

function CreateTrip({user, setRerender, rerender, editData, setShowTripModal, updateTripData}) {

  const [tripName, setTripName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [hasExistingPhoto, setHasExistingPhoto] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const animate = "scale-up-center"

  useEffect(() => {
    if (editData) {
      setDescription(editData.description)
      setTripName(editData.trip_name)
      if (editData.image_url) {
        setSelectedPhoto(editData.image_url)
        setHasExistingPhoto(true)
      }
    }
  }, [editData])


  function renderNewTrip(e) {
    e.preventDefault()

    fetch(`/api/trips/${editData ? editData.id : ""}`, {
      method: `${editData ? "PATCH" : "POST"}`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip_name: tripName,
        description,
        user_id: editData ? editData.user_id : user.id 
      }),
    }).then((r) => {
      if (r.ok) {
        if(!editData || (!hasExistingPhoto || (hasExistingPhoto && !selectedPhoto))) { //if new trip or if editing trip and has changed photo, go on to render file
          r.json().then((tripData) => renderFile(tripData));
        } else  { //if editing trip and no change in photo, update trip data and close popup
          r.json().then((updatedTripData) => updateTripData(updatedTripData))
          setShowTripModal(false)
        } 
      } else {
        r.json().then((errorData) => setErrorMessage(errorData.error))
      }
    })

    function renderFile(tripData) {

      if (selectedPhoto && !hasExistingPhoto) {
          let photo = new FormData()
          photo.append('file', selectedPhoto)

          fetch(`/api/create-trip-photo/${editData ? editData.id : tripData.id}`, {
            method: `${editData ? "PATCH" : "POST"}`,
            body: photo
        })
        .then(res => res.json())
        .then(updatedTripData => updateTripData(updatedTripData))
      }
      else if (editData) {
        fetch(`/api/delete-trip-photo/${editData.id}`, {
          method: "DELETE",
      })
      .then(res => res.json())
      .then(updatedTripData => updateTripData(updatedTripData))
      }

      if (!editData) { //if new trip, close popup and go to trip page
        setShowTripModal(false)
        window.location.href = `/${user.username}/${tripData.id}`
      } else { //if editing, close popup
        setShowTripModal(false)
      }
      setRerender(!rerender)

    } 
  }

  function handlePhoto(e) {
    setSelectedPhoto(e.target.files[0])
    setHasExistingPhoto(false)
  }

  return (
    <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen`}>
    <div className={`px-20 py-12 bg-white relative rounded-xl ${animate}`}>
        <button onClick={() => setShowTripModal(false)}>
            <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
        </button>
        <h2 className="text-center text-4xl font-bold text-green pb-12">{`${editData ? "Edit" : "Create"} Trip`}</h2>
          <form className="flex flex-col" onSubmit={(e) => renderNewTrip(e)}>
            {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
              <div className="px-4">
                <div className="px-6 py-4 border-green border-2 mb-6 border-dashed">
                  {selectedPhoto ? null : <label for="image" className="py-2 px-2 text-center m-auto text-orange font-medium duration-300 hover:scale-95 cursor-pointer flex justify-center">Preview Image</label>}
                    {selectedPhoto ? (
                      <div className="bg-gray-300	h-40 overflow-hidden relative my-4 border" style={{maxWidth: "180px"}}>
                        <img className="absolute inset-0 min-h-full w-full m-auto object-cover" src={hasExistingPhoto ? selectedPhoto : window.URL.createObjectURL(selectedPhoto)} alt={selectedPhoto.name} />
                        <button className="z-10 absolute w-4 bg-white rounded-full right-2 top-2" onClick={() => setSelectedPhoto(null)}>
                          <img src={CloseButton} className="scale-50" alt="close button"/>
                        </button>
                      </div>
                    ): null}
                  <input 
                  type="file" 
                  id="image" 
                  name="image" 
                  accept="image/*"
                  className="text-center m-auto hidden"
                  onChange={(e) => handlePhoto(e)}                
                  />
                </div>
                <div className="flex flex-col px-4">
                  <label className="py-2 px-2 text-green font-medium duration-300 hover:scale-95 cursor-pointer inline-block" htmlFor="trip_name">Trip Name:</label>
                  <input
                    type="text"
                    id="trip_name"
                    className="border-2 border-green text-green text-left px-2"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                />
                <label className="py-2 px-2 text-green font-medium duration-300 hover:scale-95 cursor-pointer inline-block" htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    id="description"
                    className="border-2 border-green text-green text-left px-2 mb-3"
                    value={description}
                    style={{minHeight: "100px"}}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
              </div>
              <button type="submit" className="py-3 px-8 bg-orange text-white font-medium duration-300 hover:scale-95 mt-6 m-auto" style={{maxWidth: "130px"}}>Submit</button>
             </form>
          </div>
    </div>
  )
}

export default CreateTrip
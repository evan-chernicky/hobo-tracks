import React, {useState, useEffect} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import CloseButton from './assets/close-btn-black.svg'
import ErrorMessage from './ErrorMessage'


function CreateStopModal({updateStopData, editData, onPlaceChanged, focusedCords, dayID, setStopData, stopData, focusedAddress, setFocusedCords, setShowStopModal, updateStopImages}) {

    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [existingPhotos, setExistingPhotos] = useState([])

    const animate = "scale-up-center"

    function handlePhotos(e) {
      const fileArray = Array.from(e.target.files)
      fileArray.map(f => f["id"] = Math.random() * Math.pow(10,16))
      setSelectedPhotos(fileArray)
    }

    useEffect(() => {
      setLocation(focusedAddress)
    }, [focusedAddress])

    useEffect(() => {
      if(editData) {
        setExistingPhotos(editData.images)
      }
    }, [editData])

    //PATCH request is defined by whether or not there is editData!

    useEffect(() => {
      if (editData) {
        setDescription(editData.description)
        setTime(editData.time)
        setLocation(editData.location)
        setName(editData.name)
        setLongitude(editData.longitude)
        setLatitude(editData.latitude)
      }
    }, [editData])


    function renderNewStop(e) {
        e.preventDefault()

        //If there is a day ID, it's going to be a PATCH request
        fetch(`/api/stops/${editData ? editData.id : ""}`, {
          method: `${editData ? "PATCH" : "POST"}`,
          headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                time,
                latitude: focusedCords ? focusedCords.lat : latitude, //Coords do not automatically set on edit, so this defaults back to origional coordinates
                longitude: focusedCords ? focusedCords.lng : longitude,
                description,
                location,
                day_id: dayID ? dayID : editData.day_id
              }),
          }).then((r) => {
            if (r.ok) {
              if (!editData) {//If new stop
                r.json().then((newStop) => {
                  if (selectedPhotos.length === 0) {//If there are no attached photos, add stop
                    setStopData([...stopData, newStop])
                  } 
                  else {//If there are photos, proceed to photo fetch request
                    renderFile(newStop)
                  }
                }) 
              } 
              else {//If editing stop
                  r.json().then((updatedStop) => {
                    if (selectedPhotos.length === 0) { //If there are no attached photos, update stop
                    updateStopData(updatedStop)
                    }
                    else {//If there are photos, proceed to photo fetch request
                      renderFile(updatedStop)
                    }
              })
              }      
              setShowStopModal(false) //closes popup
            } else {
              r.json().then((errorData) => setErrorMessage(errorData.error))
            }
          })

          function renderFile(stop) {

            const images = new FormData();

            for (const file of selectedPhotos) {
              images.append('files[]', file);
            }
        
                fetch(`/api/create-stop-photos/${stop.id}`, {
                  method: "POST",
                  body: images
              })
              .then(res => res.json())
              .then(stop => {
                if (!editData) { //if new stop, add to the list
                  setStopData([...stopData, stop])
                }
                else { //if existing stop, update it
                  updateStopData(stop)
                }              
              })
            }

          setShowStopModal(false)
            setLocation("")
            e.target.reset()
    }
  

    function onCloseButtonClick() {
      setShowStopModal(false)
      setFocusedCords(null)
    }

    function removeExistingPhoto(photoID) {

      fetch(`/api/delete-stop-photo/${editData.id}?photo_id=${photoID}`, {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(updatedStopData => {
        console.log(updatedStopData)
        updateStopImages(photoID)
      })
      }           


  return (
        <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen`}>
            <div className={`px-20 py-12 bg-white relative rounded-xl ${animate}`}>
                <button onClick={() => onCloseButtonClick()}>
                    <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
                </button>
                <h2 className="text-center text-4xl font-bold text-green pb-12">{editData ? "Edit" : "Add"} Stop</h2>
                    <form className="flex flex-col w-64" onSubmit={(e) => renderNewStop(e)}>
                    {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
                    <label htmlFor="name" className="text-green font-medium text-left pb-2 mt-4">Name of Stop:</label>
                    <input 
                        type="text" 
                        name="name"
                        class="border-2 border-green text-green text-left px-2"
                        value={name}  
                        onChange={(e) => setName(e.target.value)}
                        required/>
                    <label htmlFor="location" className="text-green font-medium text-left pb-2 mt-4">Location:</label>
                    <Autocomplete onPlaceChanged={onPlaceChanged} types={['geocode', 'establishment']}>
                        <input 
                        type="text" 
                        name="location"
                        class="border-2 border-green text-green text-left px-2 w-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required/>
                    </Autocomplete>
                    <label htmlFor="time" className="text-green font-medium text-left pb-2 mt-4">Time:</label>
                    <input 
                        type="time" 
                        name="time"
                        class="border-2 border-green text-green text-left px-2"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required/>
                    <label htmlFor="description" className="text-green font-medium text-left pb-2 mt-4">Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        style={{minHeight: "100px"}}
                        className="border-2 border-green text-green text-left px-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {existingPhotos && (existingPhotos.length > 0) ? (
                      <>
                        <label htmlFor="photos">Images:</label>
                        <div className="grid grid-cols-4 h-12 overflow-y-scroll my-2">
                            {existingPhotos.map(photo => (
                              <div className="bg-gray-300 w-full h-10 overflow-hidden relative m-1 w-auto border-black border m-auto" key={photo.name}>
                                <img className="absolute inset-0 object-cover m-auto" src={photo.url} alt={photo.name}/>
                                <button className="z-10 absolute w-4 bg-white rounded-full right-1 top-1 scale-90" onClick={() => removeExistingPhoto(photo.id)}>
                                  <img src={CloseButton} className="scale-50" alt="close button"/>
                                </button>
                              </div>
                            ))}
                        </div>
                      </>
                    ) : null}
                      <div className="px-6 py-4 border-green border-2 mb-6 border-dashed w-full display-flex items-center m-auto justify-center text-center mt-6">
                        {selectedPhotos.length > 0 ? (
                          <div className="grid grid-cols-4 h-12 overflow-y-scroll my-2">
                            {Array.from(selectedPhotos).map(photo => (
                              <div className="bg-gray-300 w-full h-10 overflow-hidden relative m-1 w-auto border-black border m-auto" key={photo.name}>
                                <img className="absolute inset-0 object-cover m-auto" src={window.URL.createObjectURL(photo)} alt={photo.name}/>
                              </div>
                            ))}
                          </div>
                          ) : (
                            <label for="image" className="py-2 px-2 text-green font-medium duration-300 hover:scale-95 cursor-pointer inline-block">Add Images</label>
                          )}
                            <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            accept="image/*"
                            className="text-center m-auto hidden"
                            onChange={(e) => handlePhotos(e)}    
                            multiple            
                            />
                      </div>
                    <button className="mt-4 py-3 px-8 bg-orange text-white font-medium duration-300  hover:scale-95" type="submit">Submit</button>
                    </form>
            </div>
        </div>
  )
}

export default CreateStopModal
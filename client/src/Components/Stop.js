import React, {useState, useEffect} from 'react'
import OptionsDropdown from './OptionsDropdown'
import ImageModal from './ImageModal'

function Stop({stop, map, handleDelete, isSameUser, focusedAddress, setFocusedCords, focusedCords, onPlaceChanged, updateStopData}) {

    const {description, location, name, time, id, latitude, longitude, images} = stop

    const [imageList, setImageList] = useState([])
    const [imageModal, setImageModal] = useState(null)

    useEffect(() => {
        setImageList(images)
    },[images])

    //converts time 
    function convert(input) {
        console.log(input)
        const [sHours, minutes] = input.match(/([0-9]{1,2}):([0-9]{2})/).slice(1)
        const period = +sHours < 12 ? 'AM' : 'PM'
        const hours = +sHours % 12 || 12
        return `${hours}:${minutes} ${period}`
        }

    function onStopClick() {
        map.panTo({lat: parseFloat(latitude), lng: parseFloat(longitude)})
        map.setZoom(15)
    }

    function updateStopImages(photoID) {
        const filteredImages = images.filter(image => image.id !== photoID)
        setImageList(filteredImages)
    }

  return (
    <div className="pt-6" id={id}>
        {imageModal !== null ? <ImageModal image={imageModal} images={images} setImageModal={setImageModal}/> : null}
        <div class="flex flex-row justify-between">
            <button onClick={() => onStopClick()} className="text-lg text-green font-bold hover-underline-animation mb-1">{name}</button>
            {isSameUser ? <OptionsDropdown 
                                selectedID={stop.id} 
                                type={"stop"} 
                                handleDelete={handleDelete} 
                                editData={stop}
                                focusedAddress={focusedAddress}
                                setFocusedCords={setFocusedCords}
                                focusedCords={focusedCords}
                                onPlaceChanged={onPlaceChanged}
                                updateStopData={updateStopData}
                                updateStopImages={updateStopImages}
                                  /> : null}
        </div>
            <div className="flex">
                <span className="pr-2">{location}</span> | 
                <span className="pl-2">{convert(time)}</span>
            </div>
        <p>{description}</p>
        {imageList && (imageList.length > 0) ? (
            <div className="grid grid-cols-4 h-12 overflow-y-scroll my-2 max-w-sm">
                {imageList.map(image => (
                <button className="bg-gray-300 w-full h-10 overflow-hidden relative m-1 w-auto border-black border m-auto" key={image.id} onClick={() => setImageModal(images.indexOf(image))}>
                    <img className="absolute inset-0 object-cover m-auto" src={image.url} alt={image.name}/>
                </button>
                ))}
            </div>
        ) : null}
  </div>
  )
}

export default Stop
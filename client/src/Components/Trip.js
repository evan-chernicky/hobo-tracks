import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom"
import Map from './Map'
import CreateDayModal from './DayModal'
import Day from './Day'
import Loading from './Loading'
import OptionsDropdown from './OptionsDropdown'
import DefaultUserImage from './assets/default-user.png'



function Trip({rerender, setRerender, user}) {

  let params = useParams()
  const [tripsData, setTripsData] = useState([])
  const [daysData, setDaysData] = useState([])
  const [focusedCords, setFocusedCords] = useState(null)
  const [focusedAddress, setFocusedAddress] = useState("")
  const [map, setMap] = useState( /**@type google.maps.Map */ (null))
  const [stopsData, setStopsData] = useState([])
  const [showDayModal, setShowDayModal] = useState(false)



  useEffect(() => {
    fetch(`/api/trips/${params.trip}`)
    .then(resp => resp.json())
    .then(resp => setTripsData(resp))
  },[params.trip])


  let {trip_name, description, id, days, stops} = tripsData
  const isSameUser = user.id === tripsData.user_id ? true : false

  //set days data
  useEffect(() => {
    setDaysData(days)
  },[days])

    //set stops data
    useEffect(() => {
      setStopsData(stops)
    },[stops])

  useEffect(() => {
    setRerender(!rerender)
  },[daysData, stops])


  function handleDelete(type, deleteID) {

    if (type === "stop") {
      const newStopsList = stopsData.filter(stop => stop.id !== deleteID)
      setStopsData(newStopsList)
    } 
    else if (type === "day") {
      const newDaysList = daysData.filter(day => day.id !== deleteID)
      setDaysData(newDaysList)
    }
    else if (type === "trip") {
      window.location.href = `/${user.username}`;
    }
  }

  function updateDayData(updatedDay) {
    const withoutOldDayData = daysData.filter(day => day.id !== updatedDay.id)
    const updateDaysData = [...withoutOldDayData, updatedDay]
    setDaysData(updateDaysData)
  }

  function updateStopData(updatedStop) {
    const withoutOldStopData = stopsData.filter(stop => stop.id !== updatedStop.id)
    const updateStopsData = [...withoutOldStopData, updatedStop]
    setStopsData(updateStopsData)
  }

  function updateTripData(updatedTrip) {
    setTripsData(updatedTrip)
  }


  


  //Map stuffff
      //Set coordinates when someone types in location in popup
      function onPlaceChanged() {

        //Grabs and builds address data
        const grabbedAddress = this.getPlace().address_components

        setFocusedAddress(`${grabbedAddress[0].short_name} ${grabbedAddress[1].short_name} ${grabbedAddress[3].short_name}, ${grabbedAddress[4].short_name}`)
        setFocusedCords({lat: this.getPlace().geometry.location.lat(), lng: this.getPlace().geometry.location.lng()})

        if (this !== null) {
            map.panTo({lat: this.getPlace().geometry.location.lat(), lng: this.getPlace().geometry.location.lng()})
          } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

  return (
    tripsData && stopsData && tripsData.user ? (
    <div className="grid grid-cols-2 w-full text-left">
      <div className="p-16 relative">
        <div className="flex flex-row justify-between items-center mb-10"> {isSameUser ? (
          <>
            <button onClick={() => setShowDayModal(true)} className="py-3 px-8 bg-orange text-white font-medium duration-300 hover:scale-95" >Add Day</button>         
            {showDayModal ? <CreateDayModal tripID={id} setDaysData={setDaysData} daysData={daysData} setShowDayModal={setShowDayModal}/> : null}
            <OptionsDropdown selectedID={id} type={"trip"} handleDelete={handleDelete} editData={tripsData} updateTripData={updateTripData}/>
          </>
        ) : null}
        </div>
        <h1 className="text-5xl font-bold text-green pb-3 leading-tight">{trip_name}</h1>
          <div className="inline-flex flex-row mt-6">
          <Link to={"/" + tripsData.user.username + "/"}>
            <div className="bg-gray-300	h-12 overflow-hidden relative w-12 rounded-full mr-3">            
              <img className="absolute inset-0 min-h-full w-full m-auto object-cover" src={tripsData.user.avatar_url ? tripsData.user.avatar_url : DefaultUserImage} alt={tripsData.user.username} />
            </div>
            </Link>
              <div className="flex flex-col">
               <Link to={"/" + tripsData.user.username + "/"}>
                <p className="font-medium hover:underline">@{tripsData.user.username}</p>
              </Link>
              <p>{description}</p>
            </div>
          </div>
        <div className="py-10">
        {daysData ? daysData.map(day => <Day 
        key={day.id} 
        day={day}
        map={map} 
        onPlaceChanged={onPlaceChanged} 
        focusedCords={focusedCords} 
        focusedAddress={focusedAddress} 
        stopData={stopsData}
        setStopData={setStopsData}
        setFocusedCords={setFocusedCords}
        handleDelete={handleDelete}
        isSameUser={isSameUser}
        updateDayData={updateDayData}
        updateStopData={updateStopData}
        />).sort(function compare(a, b) {
          const dateA = new Date(a.props.day.date)
          const dateB = new Date(b.props.day.date)
          return dateA - dateB
        }) : <Loading />}
        </div>
      </div>
      <Map 
      map={map} 
      setMap={setMap} 
      setFocusedCords={setFocusedCords} 
      focusedCords={focusedCords}
      stopsData={stopsData}
      />
    </div>
    ) : <Loading />
  )
}

export default Trip
import React, {useEffect, useState} from 'react'
import Loading from './Loading'
import TripPreview from './TripPreview'

function SearchTrips({loggedInUser}) {

const [trips, setTrips] = useState([])
const [search, setSearch] = useState("")

useEffect(() => {
    fetch('/api/trips')
    .then(resp => {
        if (resp.ok) {
            resp.json().then((tripData => setTrips(tripData)))
        }
    })
},[])

  return (
    trips.length ? (
    <div className="p-16 w-full max-w-screen-xl	mx-auto">
        <div className="shadow-lg w-full flex flex-col p-8 mb-16 items-center justify-center border-4 border-green rounded-xl bg-white">
              <h1 className="text-5xl font-bold text-green pb-8 px-4">Search Trips</h1>
                <input
                    type="text"
                    id="search"
                    className="border-2 border-green bg-white text-black text-left px-2 mx-4"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
        </div>    
        <div className="grid-cols-3	grid">
            {trips.slice(0).reverse().map(trip => <TripPreview key={trip.id} trip={trip} user={trip.user} loggedInUser={loggedInUser}/>)
            .filter(trip => trip.props.trip.trip_name.toLowerCase().includes(search.toLowerCase()))}
        </div>
    </div>
    ) : (
      <Loading />
    )
  )
}

export default SearchTrips
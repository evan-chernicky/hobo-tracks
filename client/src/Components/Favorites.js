import React, {useEffect, useState} from 'react'
import TripPreview from './TripPreview'
import Loading from './Loading'


function Favorites({loggedInUser}) {

    const [trips, setTrips] = useState([])
    
    useEffect(() => {
        fetch(`/api/favorites/${loggedInUser.id}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then((tripData => setTrips(tripData)))
            }
        })
    },[loggedInUser])

    return (
        trips ? (
          <div className="p-16 w-full max-w-screen-xl	mx-auto">
              <div className="shadow-lg w-full flex flex-col p-8 mb-16 items-center justify-center border-4 border-green rounded-xl">
                  <h1 className="text-5xl font-bold text-green px-4">Favorited Trips</h1>
              </div>
              {trips.length ? (
              <div className="grid-cols-3 grid">
                  {trips.map(trip => (
                      <TripPreview key={trip.id} trip={trip} user={trip.user} updatedAt={trip.updated_at} loggedInUser={loggedInUser}/>
                  ))
                  }
                  </div>
              ) : (
                  <p className="text-center">No favorited trips :(</p>
              )}
          </div>
        ) : <Loading />
    )
  }

export default Favorites
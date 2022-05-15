import React, {useState, useEffect} from 'react'
import TripPreview from './TripPreview'
import Loading from './Loading'

function Home({loggedInUser}) {

const [trips, setTrips] = useState([])

useEffect(() => {
    fetch(`/api/followed-trips/${loggedInUser.id}`)
    .then(resp => {
        if (resp.ok) {
            resp.json().then(tripsData => setTrips(tripsData))
        }
    })
},[loggedInUser.id])


  return (
      trips ? (
        <div className="p-16 w-full max-w-screen-xl	mx-auto">
            <div className="shadow-lg w-full flex flex-col p-8 mb-16 items-center justify-center border-4 border-green rounded-xl">
                <h1 className="text-5xl font-bold text-green px-4">New Activity from Users You Follow</h1>
            </div>
            {trips.length ? (
            <div className="grid-cols-3 grid">
                {trips.map(trip => (
                    <TripPreview key={trip.id} trip={trip} user={trip.user} updatedAt={trip.updated_at} loggedInUser={loggedInUser}/>
                ))
                .sort(function compare(a, b) {
                    const dateA = new Date(a.props.trip.updated_at)
                    const dateB = new Date(b.props.trip.updated_at)
                    return dateB - dateA
                })
                }
                </div>
            ) : (
                <p className="text-left">No recent activity. Follow users to keep up to date with their travels!</p>
            )}
        </div>
      ) : <Loading />
  )
}

export default Home
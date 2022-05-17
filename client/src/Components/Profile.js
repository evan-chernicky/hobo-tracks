import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import Loading from './Loading'
import TripPreview from './TripPreview'
import ProfileModal from './ProfileModal'
import FollowModal from './FollowModal'
import DefaultUserImage from './assets/default-user.png'

function Profile({loggedInUser}) {

  let params = useParams()
  const [user, setUser] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [followModal, setFollowModal] = useState("")


  useEffect(() => {
    fetch(`/api/profile?username=${params.username}`)
    .then(resp => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user))
      } 
      else {//if path not a user, redirect to profile page
        window.location.href = `/${loggedInUser.username}`;
      }
    })
  },[isFollowed, loggedInUser.username, params.username])

  const {avatar_url, username, first_name, last_name, bio, trip_number, followers, followings} = user || {}


  //Set whether or not the logged in user follows the shown user
  useEffect(() => {
    const loggedInUserFollowings = loggedInUser.followings
    for (let follow in loggedInUserFollowings) {
      if (loggedInUserFollowings[follow].id === user.id) {
        setIsFollowed(true)
        break
      }
    }
},[user, loggedInUser.followings])

//Sets whether or not the logged in user is the same user as shown user
const isSameUser = loggedInUser.id === user.id ? true : false

//Logic for what button to show
function renderFollowButton() {
  if (isSameUser) {
    return <button onClick={() => setShowProfileModal(true)} className="text-green border-green border px-2 rounded hover:bg-green hover:text-white duration-200">Edit Profile</button>
  } else if (isFollowed) {
    return <button onClick={() => unfollowUser()} className="text-orange border-orange border px-2 rounded hover:bg-orange hover:text-white duration-200">Unfollow</button>
  } else {
    return <button onClick={() => followUser()} className="text-green border-green border px-2 rounded hover:bg-green hover:text-white duration-200">Follow</button>
  }
}

function unfollowUser() {
  fetch(`/follows/${user.id}`,{
    method: 'DELETE'
  })
  .then(resp => {
    if (resp.ok) {
      setIsFollowed(false)
    }
  })
}

function followUser() {
  fetch(`/follows/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followed_user: user.id }),
  }).then((resp) => {
    if (resp.ok) {
      setIsFollowed(true)
    }
  })
}

function updateUserData(updatedUser) {
  setUser(updatedUser)
}



  return (
    username ? ( 
    <div className="p-16 w-full max-w-screen-xl	mx-auto">
      {showProfileModal ? <ProfileModal setShowProfileModal={setShowProfileModal} user={user} updateUserData={updateUserData}/> : null}
      {followModal !== "" ? <FollowModal followModal={followModal} setFollowModal={setFollowModal} followers={followers} followings={followings}/> : null}
      <div className="shadow-lg  w-full flex flex-row	p-8 mb-16 border-4 border-green rounded-xl">
          <div className="w-44 h-44 rounded-full overflow-hidden relative z-10"  style={{minWidth: "11rem"}}>
            <img className="rounded-full absolute inset-0 m-auto" src={avatar_url ? avatar_url : DefaultUserImage} alt={`${username}'s avatar`} />
            </div>
            <div className="text-left mx-16 col-span-5" style={{maxWidth: "500px"}}>
              <h1 className="text-5xl font-bold text-green">{first_name + " " + last_name}</h1>
              <p className="pb-4">@{user.username}</p>
                <div className="flex pb-3">
                  <button onClick={() => setFollowModal("Following")} className="pr-2 hover:underline"><strong>{followings.length }</strong> Following</button> 
                  <button onClick={() => setFollowModal("Followers")} className="pr-4 hover:underline"><strong>{followers.length }</strong> Followers</button>
                  {renderFollowButton()}
                </div>
              <p>{bio}</p>
            </div>
            <div className="px-12 rounded-lg mx-auto flex flex-col content-center justify-center bg-orange py-4">
                <span className="text-white text-7xl font-bold pb-2">{trip_number}</span>
                {trip_number === 1 ? <p className="text-white text-2xl font-bold">Trip</p> : <p className="text-white text-2xl font-bold">Trips</p>}
              </div>
      </div>
      <h2 className="pb-16 text-left text-5xl font-bold text-green">Trips</h2>
      {user.trips.length ? (
          <div className="grid-cols-3	grid">
              {user.trips.slice(0).reverse().map(trip => <TripPreview key={trip.id} trip={trip} user={user} loggedInUser={loggedInUser}/>)}
          </div>
      ) : (
        <p className="text-left">You have not created any trips yet!</p>
      )}
    </div>
    ) : <Loading />
  )
}

export default Profile
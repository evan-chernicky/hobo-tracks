import React, {useState, useEffect} from 'react'
import { Link} from "react-router-dom";
import TripDefaultImage from './assets/trip-default.png'
import DefaultUserImage from './assets/default-user.png'


function TripPreview({trip, user, updatedAt, loggedInUser}) {

    const {trip_name, id, description, image_url, favorite_count, day_count, stop_count} = trip
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = updatedAt ? new Date(updatedAt) : null
    const formattedDate = updatedAt ? `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` : null
    const [favorited, setFavorited] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [favoriteCount, setFavoriteCount] = useState(0)
    const fillOrange = favorited ? 'fill-orange' : null
    const textOrange = favorited ? 'text-orange' : null

    useEffect(() => {
    //sees if user favorited post
      for (const favorite in favorites) {
        if (favorites[favorite].trip_id === id) {
          setFavorited(true)
        }
      }
    },[favorites, id])

    //gets user's favorites
    useEffect(() => {
      setFavorites(loggedInUser.favorites)
    },[loggedInUser.favorites])

    //gets number of people who favorited the trip
    useEffect(() => {
      setFavoriteCount(favorite_count)
    },[])

      
      function handleFavorite() {

        if (favorited) {

          let deletedFavoriteID

          //find favorite id
          for (const favorite in favorites) {
            if (favorites[favorite].trip_id === id) {
              deletedFavoriteID = favorites[favorite].id
            }
          }

          fetch(`/api/favorites/${deletedFavoriteID}`, {
            method: "DELETE",
          }).then((resp) => {
            if (resp.ok) {
              const newFavorites = favorites.filter(favorite => favorite.id !== deletedFavoriteID)
              setFavorites(newFavorites)
              setFavorited(false)
              setFavoriteCount(1 - favoriteCount)
            }
          })

        }
        else {
          fetch(`/api/favorites/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              trip_id: id, 
              user_id: loggedInUser.id
            }),
          }).then((resp) => {
            if (resp.ok) {
              resp.json().then(newFavorite => setFavorites([...favorites, newFavorite]))
              setFavorited(true)
              setFavoriteCount(1 + favoriteCount)    
            }
          })
        }      
      }


  return (
    <div className="m-4 shadow-lg hover:shadow duration-300 border-4 border-green overflow-hidden bg-white relative">
        <Link to={"/" + user.username + "/" + id}>
            <div className="bg-gray-300	h-40 overflow-hidden relative ">
              <img className="absolute inset-0 min-h-full w-full m-auto object-cover hover:scale-125 hover:brightness-75 duration-300" src={image_url ? image_url : TripDefaultImage} alt={`${trip_name}`} />
            </div>
            </Link>
            <div className="px-10 py-8 text-left mb-14" style={{}}>
            <Link to={"/" + user.username + "/" + id}>
                <h3 className="text-3xl font-bold mb-2 text-green hover:text-orange duration-300">{trip_name}</h3>
              </Link>
                  <Link to={"/" + user.username + "/"}>
                    <div className="inline-flex flex-row hover:underline items-center">
                      <div className="rounded-full w-8 h-8 mr-1 relative overflow-hidden">
                        <img className="absolute inset-0 object-cover" src={user.avatar_url ? user.avatar_url : DefaultUserImage} alt={user.username} />
                      </div>
                      <p className="font-medium ">@{user.username}</p>
                    </div>
                  </Link>
                  {updatedAt ? <p><i>Last Updated:  {formattedDate} </i></p> : null}
                <p className="pt-2">{description}</p>
                  <button onClick={() => handleFavorite()} className="flex flex-row absolute bottom-10 items-center">
                    <svg className="scale-125" xmlns="http://www.w3.org/2000/svg"  width="16" height="14.119" viewBox="0 0 16 14.119">
                      <defs>
                        <clipPath id="clip-path">
                          <rect width="16" height="14.119" fill="none"/>
                        </clipPath>
                      </defs>
                      <g id="Component_1" data-name="Component 1" clip-path="url(#clip-path)">
                        <path className={`hover:fill-orange duration-200 ${fillOrange}`} id="Heart" d="M14.746,1.3a4.3,4.3,0,0,0-6.119,0l-.6.6-.6-.6A4.327,4.327,0,0,0,1.3,7.423l6.721,6.721,6.721-6.721a4.3,4.3,0,0,0,0-6.119" transform="translate(-0.025 -0.025)" fill="#2e3e29" fill-rule="evenodd"/>
                      </g>
                    </svg>
                    <span className={`ml-2 text-xs font-bold ${textOrange}`} >{favoriteCount}</span>
                  </button>
            </div>
    </div>
  )
}

export default TripPreview
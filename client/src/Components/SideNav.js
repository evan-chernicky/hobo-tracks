import React from 'react'
import { NavLink, useNavigate} from "react-router-dom";


function SideNav({loggedInUser, setLoggedInUser, setShowTripModal}) {

  let navigate = useNavigate();

    function handleLogoutClick() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setLoggedInUser(null)
          }
        })
        sessionStorage.removeItem('Logged In?')
        navigate('/')
      }


  return (
    loggedInUser ? (
      <div style={{width: "250px"}}>
        <div class="min-h-screen shadow-md px-1 bg-green sticky top-0">
            <ul class="relative">
                <li class="relative">
                  <NavLink to={"/home"} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Home</NavLink>
                </li>
                <li class="relative">
                  <NavLink to={"/" + loggedInUser.username} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Profile</NavLink>
                </li>
                <li class="relative">
                  <button onClick={() => setShowTripModal(true)} className="w-full flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Create Trip</button>
                </li>
                <li class="relative">
                  <NavLink to="/search" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Search Trips</NavLink>
                </li>
                <li class="relative">
                  <NavLink to="/explore" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Explore</NavLink>
                </li>
                <li class="relative">
                  <NavLink to="/favorites" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Favorites</NavLink>
                </li>
                <li class="relative">
                    <button onClick={() => handleLogoutClick()} className="flex w-full items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">Logout</button>
                </li>
            </ul>
        </div>
    </div>

        ) : null
  )
}

export default SideNav
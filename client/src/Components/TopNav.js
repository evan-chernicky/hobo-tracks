import React from 'react'
import { NavLink, Link} from "react-router-dom";


function TopNav() {

  return (
    <nav className="px-2 sm:px-4 py-2.5 rounded-b bg-green fixed z-20 w-full">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <Link to="/" className="flex items-center ">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white hover:scale-95 duration-300">HoboTracks</span>
    </Link>
    <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium top-nav">
        <li>
            <NavLink to="/about" className="block p-2 relative text-white hover:text-gray-200">About</NavLink>
          </li>
          <li>
            <NavLink to="/login" className="block p-2 relative text-white hover:text-gray-200">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="block p-2 relative text-white hover:text-gray-200">Signup</NavLink>
          </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default TopNav
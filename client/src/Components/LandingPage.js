import React from 'react'
import { Link } from "react-router-dom";
import BackgroundImage from './assets/trip-default.png'

function Home() {
  return (
    <div className="grid grid-cols-2 h-screen w-full pt-14">
        <div className="h-100 w-100 bg-no-repeat bg-cover flex items-center justify-center" style={{backgroundImage: `url(${BackgroundImage})`}}>
            <div className="bg-white/80 p-20 text-left text-green text-6xl font-bold leading-tight">
                <h1>Travel.<br/>Journal.<br/>Discover.</h1>
            </div>
        </div>
        <div className="h-100 w-100 flex items-center justify-center flex-col">
          <div className="text-left p-20">
            <h2 className="text-orange text-xl font-bold pb-3">FOR THE ADVENTURERS</h2> 
            <h3 className="text-4xl max-w-xl leading-tight text-green font-medium">Read about others travels before you leave and write about your travels along the way.</h3>
            <div className="pt-10">
              <Link to="login" className="py-3 px-8 bg-orange text-white font-medium duration-300 hover:bg-gray-400 uppercase" >Login</Link>
              <Link to="signup" className="pl-8 font-medium text-orange hover:text-orange400 uppercase hover:text-gray-400 duration-300">Create Account</Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home
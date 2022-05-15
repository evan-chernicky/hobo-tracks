import React, {useState, useEffect } from 'react'
import { Routes, Route} from "react-router-dom";
import LandingPage from './LandingPage'
import SignUp from './SignUp'
import Login from './Login'
import TopNav from './TopNav'
import SideNav from './SideNav'
import Profile from './Profile'
import Trip from './Trip'
import Loading from './Loading'
import ShowTripModal from './TripModal'
import SearchTrips from './SearchTrips'
import Explore from './Explore'
import Home from './Home'
import About from './About'
import Favorites from './Favorites'


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [rerender, setRerender] = useState(false)
  const [showTripModal, setShowTripModal] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/api/me/").then((r) => {
      if (r.ok) {
        sessionStorage.setItem('Logged In?', true)
        r.json().then((user) => setLoggedInUser(user))
      }
    })
  }, [rerender])

  //Sees if there is a logged in session then converts to boolean
    let isLoggedIn = !!sessionStorage.getItem('Logged In?')

  //Sends user to page if not logged in
  function restrict(component) {
    if (isLoggedIn) {
      return loggedInUser ? component : <Loading />
    } else {
      return <LandingPage />
    }
  }

  

  //adds flex class only if there is a sidebar (user logged in)
  const loginFlex = isLoggedIn ? "flex flex-row align-stretch" : null

  return (
    <div className={"App " + loginFlex}>
      {isLoggedIn ? <SideNav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setShowTripModal={setShowTripModal}/> : <TopNav /> }
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login setLoggedInUser={setLoggedInUser}  />} />
          <Route path=":username" element={restrict(<Profile loggedInUser={loggedInUser}/>)} />
          <Route path=":username/:trip" element={restrict(<Trip setRerender={setRerender} rerender={rerender} user={loggedInUser}/>)} />
          <Route path="search" element={restrict(<SearchTrips loggedInUser={loggedInUser}/>)} />
          <Route path="explore" element={restrict(<Explore />)} />
          <Route path="favorites" element={restrict(<Favorites loggedInUser={loggedInUser}/>)} />
          <Route path="home" element={restrict(<Home loggedInUser={loggedInUser}/>)} />
        </Route>
      </Routes>
      {showTripModal ? <ShowTripModal setShowTripModal={setShowTripModal} user={loggedInUser} setRerender={setRerender} rerender={rerender}/> : null}
    </div>
  );
}

export default App;

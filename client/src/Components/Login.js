import React, {useState} from 'react'
import { useNavigate} from "react-router-dom"
import ErrorMessage from "./ErrorMessage"
import LoginBackground from "./assets/login-background.png"


function Login({setLoggedInUser}) {

    let navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

  
    function handleSubmit(e) {
      e.preventDefault()
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        if (r.ok) {
          sessionStorage.setItem('Logged In?', true)
          r.json().then((user) => setLoggedInUser(user))
          navigate("/home")
        } else {
          r.json().then((errorData) => setErrorMessage(errorData.error))
        }
      })
    }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute h-full w-full bg-no-repeat bg-cover blur-lg brightness-125" style={{backgroundImage: `url(${LoginBackground})`}}></div>
      <div className="z-10 bg-green lg:px-24 px-14 py-20 rounded-xl">
          <h1 className="text-5xl font-bold text-white mb-14">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-md	 mx-auto text-center">
          {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
            <label htmlFor="username" className="text-white font-medium text-left pb-2">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              className="border-2 border-orange text-left bg-green text-white px-2 mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" className="text-white font-medium text-left pb-2">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="border-2 border-orange text-left bg-green text-white px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="py-3 px-8 bg-orange text-white font-medium duration-300 hover:scale-95 mt-8">Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login
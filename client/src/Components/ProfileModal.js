import React, {useState, useEffect} from 'react'
import CloseButton from './assets/close-btn-white.svg'
import ErrorMessage from "./ErrorMessage"

function ProfileModal({setShowProfileModal, user, updateUserData}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [hasExistingPhoto, setHasExistingPhoto] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const animate = "scale-up-center"

    useEffect(() => {
        setUsername(user.username)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setBio(user.bio)
        setSelectedPhoto(user.avatar_url)
        setHasExistingPhoto(true) 
    },[user])

    function handlePhoto(e) {
        setSelectedPhoto(e.target.files[0])
        setHasExistingPhoto(false)
      }

      function handleSubmit(e) {
        e.preventDefault();
        fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
            first_name: firstName,
            last_name: lastName,
            bio
          }),
        })
          .then((r) => {
            if (r.ok) {
                if(!hasExistingPhoto || (hasExistingPhoto && !selectedPhoto)) { //if new user or if editing user and has new photo, go on to render file
                    r.json().then((userData) => renderFile(userData))
                    setErrorMessage(null)
                }
                else {//if editing trip and no change in photo, update trip data and close popup
                    r.json().then((updatedUserData) => updateUserData(updatedUserData))
                    setShowProfileModal(false)
                }
            } else {
              r.json().then((errorData) => setErrorMessage(errorData.error))
            }
          })   
          function renderFile() {

            if (selectedPhoto && !hasExistingPhoto) {
                let avatar = new FormData()
                avatar.append('file', selectedPhoto)
      
                fetch(`/api/create-user-photo/${user.id}`, {
                  method: "PATCH",
                  body: avatar
              })
              .then(res => res.json())
              .then(updatedUserData => updateUserData(updatedUserData))
            }
            else {
              fetch(`/api/delete-user-photo/${user.id}`, {
                method: "DELETE",
            })
            .then(res => res.json())
            .then(updatedUserData => updateUserData(updatedUserData))
            }      
          } 
          setShowProfileModal(false)
      }   
      

  return (
    <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen`}>
    <div className={`px-20 py-12 bg-green relative rounded-xl drop-shadow-xl ${animate}`}>
        <button onClick={() => setShowProfileModal(false)}>
            <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
        </button>
        <h2 className="text-center text-4xl font-bold text-white pb-12">Edit Profile</h2>
          <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-2 items-center">
                  <div className="px-8">
                        {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
                        <div className="px-4 items-center justify-center">
                            <div className="px-6 py-4 border-orange border-2 mb-6 border-dashed w-full display-flex items-center m-auto justify-center">
                            {selectedPhoto ? null : <label for="image" className="py-2 px-2 text-orange font-medium duration-300 hover:scale-95 cursor-pointer inline-block">Choose Profile Picture</label>}
                                {selectedPhoto ? (
                                <div className="bg-gray-300 w-full h-40 overflow-hidden relative my-4 border m-auto" style={{maxWidth: "180px"}}>
                                    <img className="absolute inset-0 min-h-full w-full m-auto object-cover" src={hasExistingPhoto ? selectedPhoto : window.URL.createObjectURL(selectedPhoto)} alt={selectedPhoto.name} />
                                    <button className="z-10 absolute w-4 bg-white rounded-full right-2 top-2" onClick={() => setSelectedPhoto(null)}>
                                    <img src={CloseButton} className="scale-50" alt="close button"/>
                                    </button>
                                </div>
                                ): null}
                            <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            accept="image/*"
                            className="text-center m-auto hidden"
                            onChange={(e) => handlePhoto(e)}                
                            />
                            </div>
                        </div>
                        <p className="text-white font-medium text-center pb-2">Profile Picture</p>
                    </div>
                <div>
                <div className="grid grid-cols-2">
                    <div className="col-span-2 flex flex-col py-2">
                        <label htmlFor="username" className="text-white font-medium text-left pb-2">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="border-2 border-orange bg-green text-white text-left px-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => e.code === "Space" ? e.preventDefault() : null} //no spaces!
                            required
                            maxLength="16"
                            minLength="4"
                        />
                    </div>
                        <div className="flex flex-col col-span-1 py-2 pr-2">
                            <label htmlFor="password" className="text-white font-medium text-left pb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="border-2 border-orange text-left bg-green text-white px-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                maxLength="16"
                                minLength="4"
                            />
                        </div>
                        <div className="flex flex-col col-span-1 py-2 pl-2">
                            <label htmlFor="password_confirmation" className="text-white font-medium text-left pb-2">Confirm Password:</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="border-2 border-orange text-left bg-green text-white px-2"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                                maxLength="16"
                                minLength="4"
                            />
                        </div>
                        <div className="flex flex-col col-span-1 py-2 pr-2">                       
                            <label htmlFor="avatar" className="text-white font-medium text-left pb-2">First Name:</label>
                            <input
                                type="text"
                                id="first_name"
                                className="border-2 border-orange text-left bg-green text-white px-2"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col col-span-1 py-2 pl-2">                       
                            <label htmlFor="avatar" className="text-white font-medium text-left pb-2">Last Name:</label>
                            <input
                                type="text"
                                id="last_name"
                                className="border-2 border-orange text-left bg-green text-white px-2"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2 flex flex-col py-2">
                            <label htmlFor="avatar" className="text-white font-medium text-left pb-2">Bio:</label>
                                <textarea
                                type="text"
                                id="bio"
                                className="border-2 border-orange text-left bg-green text-white px-2"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength="160"
                            />
                        </div>
                 </div>
              </div>
              </div>
              <button type="submit" className="py-3 px-8 bg-orange text-white font-medium duration-300 hover:scale-95 mt-6 m-auto" style={{maxWidth: "130px"}}>Submit</button>
             </form>
          </div>
    </div>
  )
}

export default ProfileModal
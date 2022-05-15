import React from 'react'
import {Link} from "react-router-dom"
import CloseButton from './assets/close-btn-black.svg'
import DefaultUserImage from './assets/default-user.png'


function FollowModal({setFollowModal, followModal, followers, followings}) {

    const animate = "scale-up-center"


  return (
    <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-black/30 max-h-screen `}>
    <div className={`px-20 py-12 bg-white relative rounded-xl overflow-hidden mx-4 max-w-3xl ${animate}`}>
    <h2 className="text-center text-4xl font-bold text-green pb-12">{followModal === "Following" ? "Following" : "Followers"}</h2>
        <div className="overflow-y-scroll max-h-96 px-6">
            <button onClick={() => setFollowModal("")}>
                <img className="w-6 absolute top-5 right-5" src={CloseButton} alt="close button" />
            </button>
            {(followModal === "Following" ? followings : followers).map(follow => (
                <Link to={`/${follow.username}`} className="border-t-2 border-b-1 border-green py-2 max-w-lg" onClick={() => setFollowModal("")}>
                    <div className="flex flex-row hover:bg-gray-200 duration-200 p-5">
                        <img className="w-8 h-8 rounded-full mr-3" src={follow.avatar_url ? follow.avatar_url : DefaultUserImage} alt={follow.username} />
                        <div className="text-left">
                            <h3 className="text-lg font-bold text-green">{`${follow.first_name} ${follow.last_name}`}</h3>
                            <span>@{follow.username}</span>
                            <p>{follow.bio}</p>
                        </div>
                    </div>
                </Link>
            ))}
          
        </div>
    </div>
</div>
  )
}

export default FollowModal
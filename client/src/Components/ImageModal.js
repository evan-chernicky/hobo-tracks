import React, {useEffect, useState} from 'react'
import CloseButton from './assets/close-btn-white.svg'
import Next from './assets/next.svg'
import Back from './assets/back.svg'



function ImageModal({image, images, setImageModal}) {

    const totalImages = images.length
    const [index, setIndex] = useState(null)

    useEffect(() => {
        setIndex(image)
    },[image])


    function nextImage(direction) {
        if(direction === 'next') {
            if(index === totalImages - 1) {
                setIndex(0)
              } else {
                setIndex(index + 1)
              }
        } else {
          if(index === 0) {
            setIndex(totalImages - 1)
          } else {
            setIndex(index - 1)
          }
        }
    }

    const animate = "scale-up-center"

  return (
        <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-10 w-full h-full max-h-screen`}>
        <div className="h-100 w-100 absolute inset-0 bg-black/70 max-h-screen"></div>
        <button onClick={() => setImageModal(null)}>
            <img className="w-10 absolute top-10 right-10 hover:scale-90 duration-300" src={CloseButton} alt="close button"/>
        </button>
        <div className={`flex flex-row z-50 max-h-screen ${animate}`}>
          {totalImages > 1 ? (
              <button onClick={() => nextImage('back')}>
                  <img className="w-10 h-10 hover:scale-90 duration-200" src={Back} alt="back button"/>
              </button>
          ) : null}
            {index !== null ? <img src={images[index].url} alt={images[index].name} className="m-5 max-h-screen max-w-screen-md"/> : null}
            {totalImages > 1 ? (
              <button onClick={() => nextImage('next')}>
                  <img className="w-10 h-10 hover:scale-90 duration-200" src={Next} alt="next button"/>
              </button>
            ) : null}
        </div>
    </div>
  )
}

export default ImageModal
import React, {useState} from 'react'
import CreateStopModal from './StopModal'
import Stop from './Stop'
import OptionsDropdown from './OptionsDropdown'


function Day({day, onPlaceChanged, focusedCords, focusedAddress, stopData, setStopData, map, setFocusedCords, handleDelete, isSameUser, updateDayData, updateStopData}) {

        const {description, date, id} = day
        const [showStopModal, setShowStopModal] = useState(false)

        const fullDate = new Date(date)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const year = fullDate.getFullYear()
        const month = months[fullDate.getMonth()]
        const dayNumber = fullDate.getDate() + 1

  return (
    <div className="pb-6 relative">
        <div >
          <div className="w-full border-b-2 border-green pb-4">
            <div className="flex flex-row justify-between items-center mb-2">
              <h2 className="text-3xl text-green font-bold">{`${month} ${dayNumber}, ${year}`}</h2>
              {isSameUser ? (
                <div className="flex flex-row items-center">
                <button onClick={() => setShowStopModal(true)} className="px-4 text-orange font-medium duration-300 hover:scale-95" style={{minWidth: "100px"}}>Add Stop</button>
                {showStopModal ? (
                <CreateStopModal 
                  onPlaceChanged={onPlaceChanged} 
                  focusedCords={focusedCords} 
                  dayID={id} 
                  setStopData={setStopData} 
                  stopData={stopData}
                  setShowStopModal={setShowStopModal}
                  focusedAddress={focusedAddress}
                  setFocusedCords={setFocusedCords}
                  />
                  ) : null}
                  <OptionsDropdown selectedID={day.id} type={"day"} handleDelete={handleDelete} editData={day} updateDayData={updateDayData}/>
                </div>
              ): null}

            </div>
            <p>{description}</p>
        </div>
            {stopData ? stopData.map(stop => 
            <Stop 
              key={stop.id} 
              stop={stop} 
              map={map} 
              handleDelete={handleDelete} 
              isSameUser={isSameUser}
              focusedAddress={focusedAddress}
              setFocusedCords={setFocusedCords}
              focusedCords={focusedCords}
              onPlaceChanged={onPlaceChanged}
              updateStopData={updateStopData} 
              />
              )
              .filter(stop => stop.props.stop.day_id === id)
              .sort((a, b) => parseInt(a.props.stop.time.replace(':','')) - parseInt(b.props.stop.time.replace(':',''))) : null}
        </div>
    </div>
  )
}

export default Day
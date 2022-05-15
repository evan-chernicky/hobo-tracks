import React, {useState, useEffect} from 'react'
import Loading from './Loading.js'
import Map from './Map.js'

function Explore() {

    const [map, setMap] = useState( /**@type google.maps.Map */ (null))
    const [stopsData, setStopsData] = useState([])
    const [focusedCords, setFocusedCords] = useState(null)



    useEffect(() => {
        fetch('/api/stops/')
        .then(resp => {
            if (resp.ok) {
                resp.json().then(data => setStopsData(data))
            }
        })
    },[])


  return (
      stopsData  ? (
    <div class="w-full h-screen">
        <Map setMap={setMap} stopsData={stopsData} map={map} setFocusedCords={setFocusedCords} focusedCords={focusedCords} type="explore"/>
    </div>
      ) : <Loading />
  )
}

export default Explore
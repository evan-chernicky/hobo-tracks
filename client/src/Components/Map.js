import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow  } from '@react-google-maps/api'
import {Link} from "react-router-dom"
import Loading from './Loading.js'
import GreenMarker from './assets/green-marker.svg'
import DefaultUserImage from './assets/default-user.png'


function Map({focusedCords, setMap, map, stopsData, setFocusedCords, type}) {

  const [windowOpen, setWindowOpen] = useState(false)
  const [windowID, setWindowID] = useState("")



console.log(process.env.REACT_APP_GOOGLE_API_KEY)

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ['places']
    })

    const mapOptions = {
        streetViewControl: false, 
        fullScreenControl: false,
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#523735"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#c9b2a6"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#dcd2be"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#93817c"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#447530"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#db8555"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#806b63"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
    }

    const center = {lat: 44.967243, lng: -103.771556}

        //hacky work around rerendering issues, hopefully can find another way to do this
        if (stopsData && map) {
          //Pan to start on page load (no focused cords)
          if(stopsData.length && !focusedCords) { 
            map.panTo({lat: parseFloat(stopsData[0].latitude), lng: parseFloat(stopsData[0].longitude)})
          }
          //Pan to focused cordinated after creating new stop
          else if (stopsData.length && focusedCords){
            map.panTo(focusedCords)
          } 
          //Start with overview of the United States if there are no stops (new map)
          else {
            map.panTo(center)
            map.setZoom(3)
          }
        }
    



    if (!isLoaded) {
        return <Loading />
    }

    function renderMarkerClick(stop) {
      if (window.location.pathname === '/explore') {
        window.location.href = `/${stop.trip.username}/${stop.trip.id}/#${stop.id}`
        map.panTo({lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)})
        map.setZoom(15)
      }
      document.querySelector(`[id="${stop.id}"]`).scrollIntoView()
      map.panTo({lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)})
      map.setZoom(15)
    }


    function handleMarkerClick(stop) {
      setFocusedCords({lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)})
      setWindowOpen(!windowOpen)
      setWindowID(stop.id)
    }

    const fullHeight = type === "explore" ? "h-screen" : null

  return (
    <div className={`w-full relative min-h-screen ${fullHeight}`}>
        <div className="sticky max-h-screen top-0 w-full h-full">

        <GoogleMap 
            center={focusedCords} 
            zoom={15} 
            mapContainerStyle={{width: '100%', height: '100%'}} 
            options={mapOptions} 
            onLoad={(map) => setMap(map)}>
            {stopsData ? stopsData.map(stop => (
              <Marker 
                position={{lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)}} 
                map={map}
                // onClick={() => renderMarkerClick(stop)}
                key={stop.id}
                onClick={() => handleMarkerClick(stop)}
                icon={GreenMarker}
                >
                {windowOpen && (windowID === stop.id) ? ( 
                <InfoWindow position={{lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)}} >
                    <div className="flex flex-col p-3 pt-6 cursor-pointer" onClick={() => renderMarkerClick(stop)}>
                      {type === "explore" ? (
                        <Link to={"/" + stop.user.username + "/"} className="absolute top-2 left-2 text-white">
                            <div className="inline-flex flex-row hover:underline items-center">
                              <img className="rounded-full w-6 mr-1" src={stop.user.avatar_url ? stop.user.avatar_url : DefaultUserImage} alt={stop.user.username} />
                              <p className="">@{stop.user.username}</p>
                            </div>
                        </Link>
                        ) : null}
                        {type === "explore" ? (
                          <Link to={`/${stop.user.username}/${stop.trip.id}/#${stop.id}`}>
                              <span className="text-lg font-bold text-white pb-2 hover:underline">{stop.name}</span>
                          </Link>
                        ) : (
                          <span className="text-lg font-bold text-white pb-2">{stop.name}</span>
                        )}

                      <span className="text-white">{stop.location}</span>
                    </div>
                </InfoWindow>
                ) : null}
              </Marker> 
            )) : null}
            <Marker icon={GreenMarker} position={focusedCords ? focusedCords : null} map={map} zIndex={-1}/> 
        </GoogleMap>
        </div>
    </div>
  )
}

export default Map
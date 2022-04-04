
import React, {useEffect} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const DashboardMap=({properties})=> {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY
  })

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: properties[0].location?.lat,
    lng: properties[0].location?.lng
  };
  const [map, setMap] = React.useState(null)  

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
         {properties && properties.map((property, index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: property.location?.lat,
                lng: property.location?.lng
              }}
              icon={{
                url: image,
                scaledSize: new window.google.maps.Size(20, 20)
              }}
            />
          )
        })
         }
      </GoogleMap>
  ) : <></>
}

export default React.memo(DashboardMap)
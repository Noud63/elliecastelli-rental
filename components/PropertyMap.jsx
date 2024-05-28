import React,{useState, useEffect} from "react";
import { Marker, TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import shadow from "leaflet/dist/images/marker-shadow.png";
import pin from "leaflet/dist/images/marker-icon.png";
// import opencage from "opencage-api-client";

const PropertyMap = () => {

  const [lat, setLat] = useState(40.049468);
  const [lng, setLng] = useState(-105.201421);
  const positionMap = [lat, lng];
  const positionMarker = [lat, lng];


// const fetchCoords = async () => {
 
// opencage
//     .geocode({
//       q: `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`,
//       key: process.env.NEXT_PUBLIC_API_KEY,
//     })
//     .then((data) => {
//       if (data.results.length > 0) {
//         const place = data.results[0];
//         // console.log(place);
//         // console.log(place.formatted);
//         // console.log(place.geometry);
//         setLat(place.geometry.lat);
//         setLng(place.geometry.lng);

//         console.log(place.geometry.lat, place.geometry.lng);
//         // console.log(place.annotations.timezone.name);
//       } else {
//         console.log("status", data.status.message);
//         console.log("total_results", data.total_results);
//       }
//     })
//     .catch((error) => {
//       console.log("error", error.message);
//     });
//   };

//   useEffect(() => {
//     fetchCoords();
//   }, []);
 
  const icon = new L.Icon({
    iconUrl: pin.src,
    shadowUrl: shadow.src,
    iconSize: [35, 50],
    shadowSize: [80, 54],
    shadowAnchor: [25, 40],
  });

  return (
    <MapContainer
      center={positionMap}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org">&copy; OpenStreetMap</a>'
        url="https://api.mapbox.com/styles/v1/noud/cjv7mpqox0hps1fs1tzwk9fgx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91ZCIsImEiOiJjanYyY205MjExbW82M3ptMjVxd21ma2w2In0.rpsoE0GNWh9fWdkNikufxg"
      />
      <Marker position={positionMarker} icon={icon}></Marker>
    </MapContainer>
  );
};

export default PropertyMap;

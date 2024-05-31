// "use client"
// import React,{useState, useEffect} from "react";
// import { Marker, TileLayer, MapContainer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import shadow from "leaflet/dist/images/marker-shadow.png";
// import pin from "leaflet/dist/images/marker-icon.png";
// import opencage from "opencage-api-client";


// const PropertyMap = ({property}) => {

//   const [lat, setLat] = useState(42.3567011);
//   const [lng, setLng] = useState(-71.0610578);
//   const position = [lat, lng];

// useEffect(() => {
// const fetchCoords = async () => {
//   try {
//      await opencage
//     .geocode({
//       q: `${property.location.street}, ${property.location.city}, ${property.location.state}`,
//       key: "83acc005d5c541c1aa6a437c12a3e239",
//     })
//     .then((data) => {
//       console.log(data)
//       if (data.results.length > 0) {
//         const place = data.results[0];
//         setLat(place.geometry.lat);
//         setLng(place.geometry.lng);

//         console.log(place.geometry.lat, place.geometry.lng);
      
//       } else {
//         console.log("status", data.status.message);
//         console.log("total_results", data.total_results);
//       }
//     })
//   } catch (error) {
//      console.log("error", error.message);
//   }
// };
// fetchCoords();
// },[])

//  const icon = new L.Icon({
//    iconUrl: pin.src,
//    shadowUrl: shadow.src,
//    iconSize: [35, 50],
//    shadowSize: [80, 54],
//    shadowAnchor: [25, 40],
//  });

//  return (
//    <MapContainer
//      center={position}
//      zoom={12}
//      scrollWheelZoom={false}
//      style={{ height: "400px", width: "100%" }}
//    >
//      <TileLayer
//        attribution='<a href="https://www.openstreetmap.org">&copy; OpenStreetMap</a>'
//        url="https://api.mapbox.com/styles/v1/noud/cjv7mpqox0hps1fs1tzwk9fgx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91ZCIsImEiOiJjanYyY205MjExbW82M3ptMjVxd21ma2w2In0.rpsoE0GNWh9fWdkNikufxg"
//      />
//      <Marker position={position} icon={icon}></Marker>
//    </MapContainer>
//  );
// };

// export default PropertyMap;

// import React, { useCallback, useMemo, useState } from "react";
// import Map, { Layer, Popup, Source } from "react-map-gl";
// import type { FillLayer } from "react-map-gl";

// const countiesLayer: FillLayer = {
//   id: "counties",
//   type: "fill",
//   "source-layer": "original",
//   paint: {
//     "fill-outline-color": "rgba(0,0,0,0.1)",
//     "fill-color": "rgba(0,0,0,0.1)",
//   },
// };

// // Highlighted county polygons

// const highlightLayer: FillLayer = {
//   id: "counties-highlighted",
//   type: "fill",
//   source: "counties",
//   "source-layer": "original",
//   paint: {
//     "fill-outline-color": "#484896",
//     "fill-color": "#6e599f",
//     "fill-opacity": 0.75,
//   },
// };

// const MAPBOX_TOKEN = "pk.eyJ1IjoiZG9raXRlIiwiYSI6ImNseTJkNWw3YTE4dWMybG9pZGg0NjAyMHkifQ.eqToDQmIXWKU14LOVXRY-w";

// const StateLevel = () => {
//   const [hoverInfo, setHoverInfo] = useState(null);

//   const onHover = useCallback((event) => {
//     const county = event.features && event.features[0];
//     setHoverInfo({
//       longitude: event.lngLat.lng,
//       latitude: event.lngLat.lat,
//       countyName: county && county.properties.COUNTY,
//     });
//   }, []);

//   const selectedCounty = (hoverInfo && hoverInfo.countyName) || "";
//   const filter = useMemo(() => ["in", "COUNTY", selectedCounty], [selectedCounty]);
//   const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9?sdk=js-3.4.0&access_token=${MAPBOX_TOKEN}`;
//   const sourceUrl = `https://api.mapbox.com/v4/mapbox.82pkq93d.json?secure&access_token=${MAPBOX_TOKEN}`;

//   return (
//     <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
//       <Map
//         mapboxAccessToken={MAPBOX_TOKEN}
//         initialViewState={{
//           longitude: 46.169614,
//           latitude: -20.201251,
//           zoom: 5,
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle={styleUrl}
//       >
//         <Source type="vector" url={sourceUrl}>
//           <Layer beforeId="waterway-label" {...countiesLayer} />
//           <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
//         </Source>
//         {selectedCounty && (
//           <Popup
//             longitude={hoverInfo.longitude}
//             latitude={hoverInfo.latitude}
//             offset={[0, -10]}
//             closeButton={false}
//             className="county-info"
//           >
//             {selectedCounty}
//           </Popup>
//         )}
//       </Map>
//     </div>
//   );
// };

// export default StateLevel;

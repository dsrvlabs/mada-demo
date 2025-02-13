/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import React, { useCallback, useMemo, useState } from "react";
import Map, { FullscreenControl, Layer, Popup, Source } from "react-map-gl";
import type { FillLayer, MapMouseEvent } from "react-map-gl";
import madagascarGeoJSON from "./madagascar-simple.json";
import type { HoverInfo } from "../../../types/type";
import SupplyTrendLineChart from "../Dashboard/components/SupplyTrendLineChart";
import TokenDonutChart from "../Dashboard/components/TokenDonutChart";

const geojson: FeatureCollection<Geometry, GeoJsonProperties> = madagascarGeoJSON as FeatureCollection<
  Geometry,
  GeoJsonProperties
>;

const countiesLayer: FillLayer = {
  id: "counties",
  type: "fill",
  paint: {
    "fill-outline-color": "rgba(0,0,0,0)",
    "fill-color": "rgba(0,0,0,0)",
  },
};

const highlightLayer: FillLayer = {
  id: "counties-highlighted",
  type: "fill",
  paint: {
    "fill-outline-color": "#484896",
    "fill-color": "#2D60FF",
    "fill-opacity": 0.75,
  },
};

const MAPBOX_TOKEN = "pk.eyJ1IjoiZG9raXRlIiwiYSI6ImNseTJkNWw3YTE4dWMybG9pZGg0NjAyMHkifQ.eqToDQmIXWKU14LOVXRY-w";

const NationalLevel = () => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<GeoJsonProperties | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onHover = useCallback((event: MapMouseEvent) => {
    const { point, target, lngLat } = event;
    const features = target.queryRenderedFeatures(point, { layers: ["counties"] });

    if (features.length > 0) {
      const hoveredFeature = features[0];

      setHoverInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        feature: hoveredFeature && hoveredFeature.properties?.shapeName,
      });
      setHoveredFeature(hoveredFeature);
    } else {
      setHoverInfo(null);
      setHoveredFeature(null);
    }
  }, []);

  const filter = useMemo(() => {
    if (!hoveredFeature) return ["in", "shapeName", ""];
    return ["==", "shapeName", hoveredFeature.properties.shapeName];
  }, [hoveredFeature]);

  const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v9?sdk=js-3.4.0&access_token=${MAPBOX_TOKEN}`;

  const onClickHandler = useCallback((event: MapMouseEvent) => {
    const { point, target } = event;
    const features = target.queryRenderedFeatures(point, { layers: ["counties"] });

    if (features.length > 0) {
      const clickedFeature = features[0];
      if (clickedFeature.properties?.shapeName) {
        setIsClicked(true);
      }
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", zIndex: "1" }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 46.169614,
          latitude: -20.201251,
          zoom: 6,
        }}
        onClick={onClickHandler}
        onMouseMove={onHover}
        interactiveLayerIds={["counties"]}
        mapStyle={styleUrl}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer beforeId="waterway-label" {...countiesLayer} />
          <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
        </Source>
        {hoverInfo && isClicked && (
          <div
            className="z-10 bg-white p-8 text-black"
            style={{
              position: "absolute",
              top: "50%",
              left: "70%",
              transform: "translate(-50%, -50%)",
              width: "450px",
              height: "700px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "8px",
            }}
          >
            <div>
              <h1 className="pt-2 text-2xl">User Today : 82</h1>
              <h1 className="pb-2 pt-8 text-2xl">Melaky&apos;s Voucher Activity</h1>
              <SupplyTrendLineChart />
              <h1 className="pt-8 text-2xl">Voucher Status</h1>
              <div className="ml-4">
                <TokenDonutChart />
              </div>
              <p className="pt-2 text-center text-blue-500">See details</p>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
};

export default NationalLevel;

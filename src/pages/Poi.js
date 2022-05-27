import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlacemarkService } from "../utils/placemark-service";
import UploadImage from "../components/molecules/UploadImage";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/map.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const Poi = () => {
  const [poi, setPoi] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      if (id !== null) {
        const currPoi = await PlacemarkService.getPoi(id);
        setPoi(currPoi);
      }
    };

    getCategory();
  }, [id]);
  return (
    <section>
      <section className="section columns is-vcentered">
        <div className="column has-text-centered">
          <div className="title">{poi ? poi.name : "Loading..."}</div>
          <div>Description: {poi ? poi.description : "Loading..."}</div>
          <div>Latitude: {poi ? poi.latitude : "Loading..."}</div>
          <div>Longitude: {poi ? poi.longitude : "Loading..."}</div>
        </div>
        <div className="column">
          <UploadImage poiid={poi ? poi._id : null} />
        </div>
      </section>
      <section className="section">
        <h2 className="title">Map</h2>
        {poi ? (
          <MapContainer
            center={[poi.latitude, poi.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "500px" }}
            className="is-centered"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.Overlay checked name="Marker with popup">
                <Marker
                  position={[poi.latitude, poi.longitude]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    {poi.name}
                    <br /> {poi.description}
                  </Popup>
                </Marker>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Layer group with circles">
                <Circle
                  center={[poi.latitude, poi.longitude]}
                  pathOptions={{ fillColor: "blue" }}
                  radius={500}
                />
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        ) : null}
      </section>
    </section>
  );
};

export default Poi;

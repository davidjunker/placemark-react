import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlacemarkService } from "../utils/placemark-service";
import ListPois from "../components/molecules/ListPois";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Circle,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/map.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const Category = () => {
  const [category, setCategory] = useState(null);
  const [pois, setPois] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [latError, setLatError] = useState(false);
  const [lngError, setLngError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      if (id !== null) {
        const currCategory = await PlacemarkService.getCategory(id);
        setCategory(currCategory);
        if (currCategory.pois !== null) {
          setPois(currCategory.pois);
        }
      }
    };

    getCategory();
  }, [id]);

  const addPoi = async (e) => {
    e.preventDefault();

    setNameError(false);
    setDescError(false);
    setLatError(false);
    setLngError(false);

    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const lat = document.getElementById("lat").value;
    const lng = document.getElementById("lng").value;

    let error = false;

    if (name === "") {
      setNameError(true);
      error = true;
    }
    if (desc === "") {
      setDescError(true);
      error = true;
    }
    if (lat === "") {
      setLatError(true);
      error = true;
    }
    if (lng === "") {
      setLngError(true);
      error = true;
    }

    if (!error) {
      const poi = {
        name: name,
        description: desc,
        latitude: lat,
        longitude: lng,
        categoryid: category._id,
      };
      const result = await PlacemarkService.createPoi(category._id, poi);
      if (result !== null) {
        const tempPois = pois.slice();
        tempPois.push(result);
        setPois(tempPois);
      }
    }
  };

  const deletePoi = async (id) => {
    await PlacemarkService.deletePoi(id);
    const tempPois = pois.slice();
    const index = tempPois.findIndex((poi) => poi._id === id);
    tempPois.splice(index, 1);
    setPois(tempPois);
    return false;
  };

  return (
    <section className="section columns">
      <div className="column has-text-centered">
        <div className="title">
          {category !== null ? category.title : "Loading ..."}
        </div>
        <ListPois pois={pois} deletePoi={deletePoi} />
        <form className="box" onSubmit={addPoi}>
          <label>Enter Poi Details:</label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <input
                  className="input"
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  id="desc"
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  id="lat"
                  type="number"
                  placeholder="Enter latitude"
                  name="latitude"
                  step=".01"
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  id="lng"
                  type="number"
                  placeholder="Enter longitude"
                  name="longitude"
                  step=".01"
                />
              </div>
            </div>
          </div>
          <button className="button is-primary">Add Poi</button>
        </form>
        <div>
          {nameError ? <div>Please enter a name</div> : null}
          {descError ? <div>Please enter a description</div> : null}
          {latError ? <div>Please enter a latitude</div> : null}
          {lngError ? <div>Please enter a longitude</div> : null}
        </div>
      </div>
      <div className="column has-text-centered">
        <div className="title">Maps</div>
        <div>
          {pois ? (
            <MapContainer
              center={[0, 0]}
              zoom={1}
              scrollWheelZoom={false}
              className="is-centered"
              style={{ height: "500px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl position="topright">
                <LayersControl.Overlay checked name="Marker with popup">
                  <LayerGroup>
                    {pois.map((poi) => (
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
                    ))}
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Layer group with circles">
                  <LayerGroup>
                    {pois.map((poi) => (
                      <Circle
                        center={[poi.latitude, poi.longitude]}
                        pathOptions={{ fillColor: "blue" }}
                        radius={500}
                      />
                    ))}
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Category;

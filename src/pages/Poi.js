import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
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
import "react-image-gallery/styles/css/image-gallery.css";

const Poi = () => {
  const [poi, setPoi] = useState(null);
  const [images, setImages] = useState([]);
  let { id } = useParams();
  const imgRef = useRef(null);

  useEffect(() => {
    const getCategory = async () => {
      if (id !== null) {
        const currPoi = await PlacemarkService.getPoi(id);
        setPoi(currPoi);
        if (currPoi.images !== null) {
          // setImages(currPoi.images);
          let currImages = [];
          currPoi.images.map((image) =>
            currImages.push({
              original: image.img.slice(0, 4) + "s" + image.img.slice(4),
              thumbnail: image.img.slice(0, 4) + "s" + image.img.slice(4),
            })
          );
          setImages(currImages);
        }
      }
    };

    getCategory();
  }, [id]);

  const reloadData = async (result) => {
    const currPoi = images.slice();
    currPoi.push({
      original: result.img.slice(0, 4) + "s" + result.img.slice(4),
      thumbnail: result.img.slice(0, 4) + "s" + result.img.slice(4),
    });
    setImages(currPoi);
  };

  const deleteImage = async () => {
    const index = imgRef.current.getCurrentIndex();
    let currImageId = null;
    poi.images.forEach((image) => {
      if (image.img === images[index].original) {
        currImageId = image._id;
      }
    });

    if (currImageId !== null) {
      await PlacemarkService.deleteImage(currImageId);
      let currGalleryImages = images.slice();
      currGalleryImages.splice(index, 1);
      setImages(currGalleryImages);
    }
  };

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
          <UploadImage poiid={poi ? poi._id : null} reloadData={reloadData} />
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
      <section className="section has-text-centered">
        {images.length > 0 ? (
          <>
            <h2 className="title">Image Gallery</h2>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              ref={imgRef}
            />
            <button onClick={() => deleteImage()} className="button is-danger">
              <span className="icon-is-small">
                <i className="fas fa-trash"></i>
              </span>
            </button>
          </>
        ) : null}
      </section>
    </section>
  );
};

export default Poi;

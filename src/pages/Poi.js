import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlacemarkService } from "../utils/placemark-service";
import UploadImage from "../components/molecules/UploadImage";

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
  );
};

export default Poi;

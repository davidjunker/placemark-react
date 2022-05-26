import React from "react";
import { PlacemarkService } from "../../utils/placemark-service";

const UploadImage = ({ poiid }) => {
  const updateFile = () => {
    const fileInput = document.querySelector(".file-input");
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector(".file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };

  const addImage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let imagefile = document.querySelector("#file");
    formData.append("imagefile", imagefile.files[0]);

    await PlacemarkService.uploadImage(poiid, formData);
  };
  return (
    <div className="card">
      <div className="card-content">
        <form onSubmit={addImage} encType="multipart/form-data">
          <div id="file-select" className="file has-name is-fullwidth">
            <label className="file-label">
              <input
                className="file-input"
                id="file"
                name="imagefile"
                type="file"
                accept="image/png, image/jpeg"
                onChange={() => updateFile()}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name"></span>
            </label>
            <button type="submit" className="button is-info">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;

import React, { useContext, useEffect, useState } from "react";
import { SlideContext } from "../../../context/SlideContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSlide = () => {
  const { slides, updateSlide } = useContext(SlideContext);
  const { id } = useParams();
  const [slide, setSlide] = useState({});
  useEffect(() => {
    setSlide(slides.filter((slide) => slide._id === id)[0]);
  }, [slides, id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlide((prevSlide) => ({
      ...prevSlide,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('imageFile', selectedFile);
    formData.append('name', slide.name);
    formData.append('description', slide.description);
    updateSlide(formData, slide._id);
    navigate("/admin/slides");
    window.location.reload();
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <div className="w-75 d-flex align-items-center flex-column gap-3">
        <h2 className="text-center fw-bold display-6">Slide information</h2>
        <form className="w-50" onSubmit={handleSubmit} encType="multipart/form-data">
          <div class="input-group mb-3">
            <span class="input-group-text fs-5" id="inputGroup-sizing-default">
              Name
            </span>
            <input
              value={slide.name}
              name="name"
              type="text"
              className="form-control fs-5"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleInputChange}
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text fs-5" id="inputGroup-sizing-default">
              Description
            </span>
            <input
              value={slide.description}
              name="description"
              type="text"
              className="form-control fs-5"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleInputChange}
            />
          </div>
          <div class="input-group mb-3">
            <input
              name="image"
              type="file"
              className="form-control fs-5"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handleFileSelect}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success rounded-pill w-100 py-3 fs-5"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSlide;
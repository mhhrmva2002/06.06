import React, { useContext, useEffect, useState } from 'react'
import { SlideContext } from '../../../context/SlideContext';
import { Link, useNavigate } from 'react-router-dom';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSlide } from '../../../api/requests';

const Slides = () => {
    const { slides, deleteSlide } = useContext(SlideContext);
    const [slidesData, setSlidesData] = useState([]);
    useEffect(() => {
        setSlidesData(slides);
    }, [slides])

    const [slide, setSlide] = useState({});
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
        createSlide(formData);
        navigate("/admin/slides");
        window.location.reload();
    };
    if(slidesData.length ===0){
        return <div className='text-center fs-3 py-5'>There are not any slides</div>
    }

    return (
        <div className="d-flex align-items-center flex-column py-5">
            <div className="w-50">
                <h2 className='text-center'>All Slides</h2>
                <table class="table my-5">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col" colSpan={3}>Image URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slidesData.map(slide => (
                                <tr key={slide._id}>
                                    <th scope="row">{slide.name}</th>
                                    <th scope="row">{slide.description}</th>
                                    <th scope="row">{slide.image}</th>
                                    <td align='end'>
                                        <Link className="btn btn-warning text-white" to={`/admin/slides/${slide._id}`}>
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Link>
                                    </td>
                                    <td align='end'>
                                        <button className="btn btn-danger" onClick={() => {
                                            deleteSlide(slide._id)
                                            window.location.reload();
                                        }}><FontAwesomeIcon icon={faRemove} /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-75 d-flex align-items-center flex-column gap-3 mt-5">
                <h2 className="text-center fw-bold display-6">Add new slide</h2>
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
                            type="text"
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
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Slides
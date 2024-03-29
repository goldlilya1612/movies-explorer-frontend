import React from "react";
import "./Preloader.css";

const Preloader = ({ isPreloaderVisible }) => {
    return (
        <div
            className={`preloader ${
                isPreloaderVisible ? "" : "preloader_invisible"
            }`}
        >
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    );
};

export default Preloader;

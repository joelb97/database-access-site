import React from "react";
import FetchPopulation from "../FetchPopulation";
import UploadPopulation from "../UploadPopulation";
  
const Population = () => {
  return (
    <div className="page">
      <div className="section">
        <div className="header-container">   
          <h1 className="header">
            Upload
          </h1>
        </div> 
        <UploadPopulation />
      </div>
      <div className="section">
        <div className="header-container">         
          <h1 className="header">
            Download
          </h1>
        </div>
        <FetchPopulation />
      </div>
    </div>
  );
};
  
export default Population;
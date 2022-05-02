import React from "react";
import UploadProducts from '../UploadProducts';
import FetchProducts from '../FetchProducts';
  
const Products = () => {
  return (
    <div className="page">
      <div className="section">
        <div className="header-container">   
          <h1 className="header">
            Upload
          </h1>
        </div> 
        <UploadProducts />
      </div>
      <div className="section">
        <div className="header-container">         
          <h1 className="header">
            Download
          </h1>
        </div>
        <FetchProducts />
      </div>
    </div>
  );
};
  
export default Products;
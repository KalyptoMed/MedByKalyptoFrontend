import React from "react";
import Image from "next/image";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function ProductCategories() {
  return (
    <div>
      <h3 className="">Product Categories</h3>
      <h6 className="">Explore our wide range of medical digital products</h6>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
           <Image src="/assets/images/drugPix.png" alt="Telemedicine" width={300} height={200} />
              <h5 className="card-title">Malaria Tablet</h5>
              <p className="card-text">
                $2,000
              </p>
                <BsFillArrowUpRightCircleFill size={18} />
          </div>
        </div>
      </div>

    </div> 
  );
}

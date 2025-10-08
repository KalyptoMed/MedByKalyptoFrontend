import React, { Fragment } from "react";
import Image from "next/image";
function SearchField() {
  return (
    <Fragment>
      <div className="flex justify-between ml-12 mr-96 px-32 mt-8 py-2 bg-white border rounded-full">
        <div className="flex items-center w-full mr-1">
          <Image
            src="/assets/Images/Icon (1).png"
            alt="Icon"
            width={20}
            height={20}
            className="mr-1"
          />
          <input
            type="text"
            placeholder="Antibiotics"
            className="flex rounded-full py-1 px-1"
          />
        </div>

        <button className="mr-1 p-2 rounded-full bg-white border border-100 absolute right-20 transform translate-x-0">
          {/* onClick={handleClick}> */}
          <Image
            src="/assets/Images/sliders-horiz-2.png"
            alt="sliders"
            width={20}
            height={20}
          />
        </button>
      </div>
    </Fragment>
  );
}

export default SearchField;

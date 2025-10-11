import React, { Fragment } from "react";
import Image from "next/image";
function SearchField() {
  return (
    <Fragment>
      <div className="flex justify-between mt-40 py-2 px-10">
        <div className="flex items-center w-3/4 mr-2 ">
          <input
            type="text"
            placeholder="Antibiotics"
            className="flex rounded-full p-3 w-full"
          />
        </div>

        <button className="p-4 rounded-full bg-white border border-100 absolute right-20 transform translate-x-0">
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

import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="h-screen-full bg-[#0038FF] flex flex-col relative">
      <div className="grid">
        {/* logo */}
        <div className="flex bg-white m-6 pt-4 py-1 rounded-lg">
          <div className="text-5xl ml-6">
            <Image
              src="/assets/images/logo_no bg 1.png"
              alt="logo"
              width={70}
              height={60}
            />
          </div>
          <div className="flex flex-col ml-32 text-center mr">
            <ul className="flex text-center justify-center ml-44 text-[#0B438D]">
              <li className="">
                <a href="/">Home</a>
              </li>
              <li className="ml-16">
                <a href="/product">Product</a>
              </li>
              <li className="ml-16">
                <a href="/solutions">Solutions</a>
              </li>
              <li className="ml-16">
                <a href="/contact us">Contact us</a>
              </li>
            </ul>
          </div>
          {/* cart */}
          <div className="flex items-center justify-center mr-4 absolute right-16 transform translate-x-0">
            <button className="py-2 bg-transparent hover:bg-white-200 rounded">
              <Image
                src="/assets/images/Vector.png"
                alt="Vector"
                width={35}
                height={35}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="search-bar ml-7 mr-96 px-32 mt-8 py-2 rounded-4xl  bg-white input type=text placeholder:Antibiotics">
        <Image
          src="/assets/Images/Icon (1).png"
          alt="Icon"
          width={20}
          height={20}
        />
        {/* <input type='text' placeholder='Antibiotics' />  */}
        <button className="searchBtn bg-white ">
          <Image
            src="/assets/Images/sliders-horiz-2.png"
            alt="sliders"
            width={20}
            height={20}
          />
        </button>
      </div>
      <br />
      <br />

      {/* <div className='order'>
                <p>LET'S SKIP TO THE HEALTHY PART</p>
                <img src='' /> ********
                <p>ORDER ONLINE PICKUP AT NEAREST LOCATION OR TO YOUR DOORSTEP</p>
            </div>
          </div>
        </div>
      </div>
      {/* From Trending Products to Vitamins */}
      <div className="m-4">
      <div className="flex text-white font-extrabold ml-12 items-center flex-row">
        <h1 className="text-[28px] leading-[28px]">
          Trending Products
          <br />
          for you!
        </h1>
        <Image
          src="/assets/Images/love.png"
          alt="love"
          width={50}
          height={30}
          className="mt-5 mr-2"
        />
      </div>
      <div className="text-[#CFFC51] text-right mr-20 ">
        <p className="">See all products --&gt;</p>
      </div>
      {/* For the drugs */}
      <div className="ml-12">
        <div className="rounded-full w-64 h-12 flex items-center justify-center">
          <h4 className="mt-4 text-center text-xs text-[#fff] bg-[#AABE43] px-4 rounded-full">
            ANTIBIOTICS
          </h4>
        </div>
        <div className="mt-6 flex flex-row space-10 justify-around">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative">
              <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={200}
                height={160}
              />
              <div className="h-0.5 flex flex-row justify-between items-center px-12">
                {/* div className="absolute inset-0 flex flex-row justify-between p-20 */}
                <div>
                <h4 className="text-left text-xs">
                  DOXYCAP
                  <br />
                  Doxycline 100mg caps(10x10)
                </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          ANTI-DIARRHOEAL
          </h6>
        </div>
        <div className="mt-12 flex flex-row space-x-10 justify-around">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <Image
                src="/assets/Images/Drug2.png"
                alt="Drug2"
                width={200}
                height={160}
              />
              <div className="h-0.5 flex justify-between items-center px-12">
                {/* div className="absolute inset-0 flex flex-row justify-between p-20 */}
                <p className="mr-1 text-left text-xs">
                  COLOSEAL CAPS
                  <br />
                  Loperamide 2mg caps(10x10)
                </p>
                <p className="flex flex-row text-xs">
                  N2,000
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          ANTACIDS/ANTI-ULCER
          </h6>
        </div>

        {/* <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          ANTI-DIABETICS
          </h6>
        </div>

        <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          NON-STEROIDAL ANTI-INFLAMATORIES
          </h6>
        </div>

        <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          ANTI-MALARIAL
          </h6>
        </div>

        <div className="mt-4 w-64 h-12 flex items-center justify-center">
          <h6 className="mt-20 text-center text-xs text-[#fff] bg-[#6180EF] px-4 rounded-full">
          VITAMINS/HEALTHSUPPLEMENTS
          </h6>
        </div> */}

      </div>

      {/* Footer */}

      <div className="flex flex-row justify-around text-white">
        <div className="flex flex-col mt-40">
          <h2 className="font-extrabold text-white m-3"> 
            Contact Us 
          </h2>
        <p className="flex flex-row text-white mb-1"> 
          <Image 
            src="/assets/Images/phone.png"
            alt="phone" 
            width={20} 
            height={10} 
          />
          <span className="ml-2">+2348144440000</span>
        </p>
        <p className="flex flex-row text-white mt-1 p-1">
        <Image 
          src="/assets/Images/email.png" 
          alt="email" 
          width={25} 
          height={15} 
        />
        <span className="ml-2">Medicartbykalypto@Gmail.Com</span>
        </p>
        <div className="flex flex-row bg-white rounded-full items-center justify-center px-3 mt-2 w-28">
          <Image src="/assets/Images/WhatsApp.png" alt="WhatsApp" width={25} height={20} />
          <Image src="/assets/Images/Instagram.png" alt="Instagram" width={25} height={20} />
          <Image src="/assets/Images/FB.png" alt="FB" width={25} height={20} />
          <Image src="/assets/Images/X.png" alt="X" width={25} height={20} />
        </div>
        </div>

        <div className="flex flex-col mt-40">
          <h2 className="font-extrabold mb-2 text-[24px] leading-[32px]">
            Navigation
          </h2>
          <p className="flex flex-col items-center font-medium">
            Solution 
          </p>
          <p className="flex flex-col items-center font-medium">
            Products </p>
          <p className="flex flex-col items-center font-medium">
            Resources </p>
          <p className="flex flex-col items-center font-medium">
            Pricing </p>
          <p className="flex flex-col items-center font-medium">
            More </p>
        </div>

      <div className="flex flex-col items-center mr-8">
        <div className="mt-32 bg-white rounded-lg flex items-center justify-center p-2 w-36 h-24">
        <Image 
          src="/assets/Images/logo_no bg 1.png" 
          alt="logo" 
          width={125} 
          height={90} 
        />
        </div>
        <div className="mt-4 w-full max-w-md">
          <h2 className="mt-6 font-bold m-5 text-[20px] leading-[30px]">
            Sign Up For New Products
          </h2>
          </div>
          <p className="mt-4 rounded-lg text-left">
          <input 
            type="email" 
            placeholder="Example@Gmail.Com"
            className="flex rounded-lg py-1 px-20 text-left" 
          />
          </p>
          <div className="mt-4 flex flex-col items-center justify-center">
          <p className="text-center bg-[#071443] rounded-md flex flex-col items-center justify-center p-4 w-36 h-8">
            Subscribe
          </p>
          </div>
        </div>
      </div>
       {/* line down */}
      <div className="w-full h-0.5 bg-white my-12"></div>




      {/* <div className='product'>
                    

    

            <p>ANTACIDS/ANTI-ULCER</p>
                <div className='product'>
                    <img src='' /> ~~~~~~~
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <button>
                    <img src='add'/> Add
                    </button>
                </div>
                <br />

                <p>ANTI-DIABEITICS</p>
                <div className='product'>
                    <img src='' /> ~~~~~~~
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <button>
                    <img src='add'/> Add
                    </button>
                </div>
                <br />

                <p>NON-STEROIDAL ANTI-INFLAMATORIES</p>
                <div className='product'>
                    <img src='' /> ~~~~~~~
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <button>
                    <img src='add'/> Add
                    </button>
                </div>
                <br />

                <p>ANTI-MALARIAL</p>
                <div className='product'>
                    <img src='' /> ~~~~~~~
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <button>
                    <img src='add'/> Add
                    </button>
                </div>
                <br />

                <p>VITAMINS/HEALTHSUPPLEMENTS</p>
                <div className='product'>
                    <img src='' /> ~~~~~~~
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <button>
                    <img src='add'/> Add
                    </button>
                </div>
                <br />
            </div>
        

            
                  */}
    </div>
  );
}

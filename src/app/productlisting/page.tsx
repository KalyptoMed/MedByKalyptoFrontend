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
{/* searchBar */}
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
{/* ShoppingBar */}
        <div className="relative m-12">
          <Image
            src="/assets/Images/Rectangle.png"
            alt="Rectangle"
            width={1300}
            height={30}
          />
          <div className="absolute inset-0 flex flex-row items-center justify-around">
            <div className="text-white font-sans ml-2 pr-56 align-center flex">
              <div className="text-[40px] leading-[40px] font-semibold italic text-center">
                <h1>LET&apos;S SKIP TO THE</h1>
                <h1>HEALTHY PART</h1> 
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <Image
                src="/assets/Images/shopping.png"
                alt="shopping"
                width={260}
                height={300}
              />
            </div>
            <div className="text-white flex flex-col justify-end items-center relative">
              <div className="font-semibold">
                <h4>ORDER ONLINE</h4>
                <h4>PICKUP AT NEAREST LOCATION</h4>
                <h4>OR TO YOUR DOORSTEP</h4>
              </div>
              
              <Image 
                 src="/assets/Images/Vector 5 (1).png" 
                 alt="Vector 5" 
                 width={60}
                 height={20}
                 className="absolute top-0 left-8 transform -translate-x-full -translate-y-1/2" 
               />
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
      {/* From Trending Products to See all Products */}
<div className="ml-2">
  <div className="flex justify-between items-center text-white font-extrabold ml-11">
    <div className="flex flex-col">
      <h1 className="text-[32px] leading-[32px]">
        Trending Products
        <span className="flex items-center">
          for you!
          {/* love logo */}
          <Image
            src="/assets/Images/love.png"
            alt="love"
            width={60}
            height={36}
            className="ml-1"
          />
        </span>
      </h1>
    </div>
    <div className="text-[#CFFC51] text-right font-normal flex items-center">
      <span className="">See all products</span>
      <Image 
        src='/assets/Images/Arrow.png' 
        alt='Arrow' 
        width={20} 
        height={20} 
        className="m-16"
      />
    </div>
  </div>
</div>

      {/* For the drugs */}
      <div className="ml-2 mr-2">
        <div className="ml-2">
        <div className="h-12 w-auto ml-10 flex items-center font-light">
          <p className="text-center text-xs text-[#fff] bg-[#AABE43] px-4 py-2 rounded-full whitespace-nowrap">
            ANTIBIOTICS
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            DOXYCAP
            <span className="block">Doxycline 100mg caps(10x10)</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
                // className="font-thin"
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
           </div>
           </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            ANTI-DIARRHOEAL
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            COLOSEAL CAPS
            <span className="block">Loperamide 2mg caps(10x10)</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
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
           </div>
           </div>
           ))}
           </div>
           </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10 ">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            ANTACIDS/ANTI-ULCER
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            OMEZOLE 20
            <span className="block">Omeprazole 20mg caps(4x7)</span> 
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
           </div>
           </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            ANTI-DIABETICS
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            DIABETMIN 500
            <span className="block">Metformin 500mg taps(5x20)</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
           </div>
            </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            NON-STEROIDAL ANTI-INFLAMATORIES
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            CLOFENAC SR
            <span className="block">Diclofenac Sodium 100mg tap</span>
            <span className="block">(10x10)</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
           </div>
           </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            ANTI-MALARIA
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            LUTER 80/480
            <span className="block">Artemether 80mg + Lumefantrine </span>
            <span className="block">480mg(1x6)</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
           </div>
            </div>

           <div className="ml-2 mt-14">
           <div className="h-32 w-auto ml-10 flex items-center font-light -mb-10">
          <p className="text-center text-xs text-[#fff] bg-[#6180EF] px-4 py-2 rounded-full whitespace-nowrap">
            VITAMINS/HEALTH SUPPLEMENTS
          </p>
        </div>

        <div className="flex flex-wrap justify-around ml-2 mt-1">
        {[...Array(5)].map((_, index) => (
        <div key={index} className="relative my-2">
        <div className="flex flex-col">
        <Image
                src="/assets/Images/Drug.png"
                alt="Drug"
                width={250}
                height={100}
              />
           </div>
           <div className="absolute bg-white bottom-[-56px] w-[250px] p-3 rounded-t-2xl">
            <div className="flex flex-row justify-between">
            <h5 className="text-left text-xs sm:text-xs w-6/10">
            BETATONE
            <span className="block">Potent Multivitamin, minerals soft</span>
            <span className="block">gel caps 30&apos;s</span>
            </h5>
            <p className="text-right text-xs w-4/10">N2,000</p>
           </div>
           <div className="flex flex-row justify-between">
              <Image
                src='/assets/Images/rate.png' 
                alt='rate' 
                width={20} 
                height={4} 
              />

              <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5">
              <Image
                src="/assets/Images/Add.png"
                alt="Add"
                width={15}
                height={10}
              /> 
              <p className="text-xs ml-1">Add</p>
              </button>
            </div>
           </div>
           </div>
           ))}
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

      </div>

      {/* Footer */}
      <div className=" ml-6 mt-14 flex flex-row justify-between text-white">
        <div className="ml-5 mt-10">
        <div className="flex flex-col mt-36">
          <h2 className="font-extrabold mb-2 text-[24px] leading-[32px]"> 
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



    
        

            
                  */}
    </div>
  );
}

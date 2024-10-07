import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className= 'h-screen bg-[#0038FF]'>
        <div className='navbar flex ml-5 mr-5 px-6 gap-32 mt-7 bg-white'>
            <Image src='/assets/images/logo_no bg 1.png' alt='logo' width={80} height={50} />
            {/* <h1>Medicart</h1>
            <p className='mt-10 w-5'>BY KALYPTO</p> */}
            <ul className='flex mt-0 ml-8 gap-16'>
                <li><a href='/'>Home</a></li>
                <li><a href='/product'>Product</a></li>
                <li><a href='/solutions'>Solutions</a></li>
                <li><a href='/contact us'>Contact us</a></li>
                <div className='ml-96 gap-32'>
                    <Image src='/assets/images/Vector.png' alt='Vector' width={35} height={35} />
                    </div>
            </ul>
        </div>
            <br />
            <br />

             <div className='search-bar ml-7 mr-96 px-32 mt-8 py-2 rounded-4xl bg-white input type=text placeholder:Antibiotics'>
                <Image src='/assets/Images/Icon (1).png' alt='Icon' width={20} height={20} />
                {/* <input type='text' placeholder='Antibiotics' />  */}
                <button className='searchBtn bg-white '> 
                <Image src='/assets/Images/sliders-horiz-2.png' alt='sliders' width={20} height={20} />
                </button>
            </div>
            <br />
            <br />

            {/* <div className='order'>
                <p>LET'S SKIP TO THE HEALTHY PART</p>
                <img src='' /> ********
                <p>ORDER ONLINE PICKUP AT NEAREST LOCATION OR TO YOUR DOORSTEP</p>
            </div>
            <br />
            <br />
            <br /> */}

            {/* <div className='product-details'>
                <div className='flex text-#fff font-bold'><h1>Trendind Products for you! pix</h1></div>
                <p className='ml-32 text-#CFFC51 text-'>See all products -- </p>
                <p><input type='text' placeholder='ANTIBIOTICS' text-sm text-white-200 style={{ backgroundColor: '#b2c837' }} />ANTIBIOTICS</p>
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

                <p>ANTI-DIARRHOEAL</p>
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

            <div className='footer'>
                <div className='footer-links'>
                    <h2>Contact us</h2>
                    <img src='/Users/deca/Downloads/call_Icon.png' />
                    <p>+2348144440000</p>
                    <img src='/Users/deca/Downloads/email_Icon.jpg' />
                    <p>Medicartbykalypto@Gmail.Com</p>
                </div>
                <br />
                
                <div className='footer-links'>
                    <p>Whatsapp</p>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                </div>
                <br />

                <div className='footer-links'>
                    <h2>Navigation</h2>
                    <p>Solutions</p>
                    <p>Products</p>
                    <p>Resources</p>
                    <p>Pricing</p>
                    <p>More</p>
                </div>
                <br />

                <div className='footer-links'>
                    <p>Sign up for New Products</p>
                    <input type='email' placeholder='Enter your email address' /> <br />
                    <button>Subscribe</button>
                </div>
                <br /> */}

            {/* </div>  */}

     
    </div>
  )
}

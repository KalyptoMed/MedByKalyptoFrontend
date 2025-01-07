import Image from "next/image";
export default function Footer() {
  return (
    <div className="flex flex-row justify-around text-white bg-[#0038ff] py-6">
      <div className="flex flex-col ">
        <h2 className="font-extrabold text-white m-3">Contact Us</h2>
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
          <Image
            src="/assets/Images/WhatsApp.png"
            alt="WhatsApp"
            width={25}
            height={20}
          />
          <Image
            src="/assets/Images/Instagram.png"
            alt="Instagram"
            width={25}
            height={20}
          />
          <Image src="/assets/Images/FB.png" alt="FB" width={25} height={20} />
          <Image src="/assets/Images/X.png" alt="X" width={25} height={20} />
        </div>
      </div>

      <div className="flex flex-col ">
        <h2 className="font-extrabold mb-2 text-[24px] leading-[32px]">
          Navigation
        </h2>
        <p className="flex flex-col items-center font-medium">Solution</p>
        <p className="flex flex-col items-center font-medium">Products </p>
        <p className="flex flex-col items-center font-medium">Resources </p>
        <p className="flex flex-col items-center font-medium">Pricing </p>
        <p className="flex flex-col items-center font-medium">More </p>
      </div>

      <div className="flex flex-col items-center mr-8">
        <div className=" bg-white rounded-lg flex items-center justify-center p-2 w-36 h-24">
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
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ValidatePage: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9a-zA-Z]?$/.test(value)) {
      const newToken = [...token];
      newToken[index] = value;
      setToken(newToken);


      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (value && nextInput) nextInput.focus();
    }
  };

  const handleValidate = async () => {
    const enteredCode = token.join("");
    if (enteredCode.length < 4) {
      alert("Please enter your 4-digit token");
      return;
    }

    setLoading(true);

    try {
      // Simulate backend token validation
      // Replace this block with your API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example success
      alert("Validation successful!");
      router.push("/med-login");
    } catch (error) {
      alert("Invalid token. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EBFFF5]">
      <div className="hidden md:flex md:w-3/5 items-center justify-center relative">
        <Image
          src="/assets/images/login_img.png"
          alt="Doctor"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* RIGHT SIDE VALIDATION FORM */}
      <div className="flex flex-col justify-center items-center rounded-l-3xl md:w-2/5 bg-[#004D4A] text-white p-8">
        <h2 className="text-2xl font-semibold">A token has been sent to</h2>
        <p className="mb-2 text-2xl font-semibold text-gray-300">medicart@yahoo.com</p>
        <p className="text-sm mb-8">Sign up</p>

        <div className="flex space-x-4 mb-6">
          {token.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        <button
          onClick={handleValidate}
          disabled={loading}
          className="w-80 bg-[#B1E46B] text-[#003A3C] font-semibold py-2 px-6 rounded-full hover:bg-[#b6e82f] transition"
        >
          {loading ? "Validating..." : "Validate"}
        </button>

        <p className="mt-6 text-sm text-gray-300">
          Didn’t get the code?{" "}
          <span className="text-[#C6F432] cursor-pointer hover:underline">
            Resend again
          </span>
        </p>
      </div>
    </div>
  );
};

export default ValidatePage;



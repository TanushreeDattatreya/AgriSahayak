import React from "react";
import { useState } from "react";
import HomeHeroSection from "../../components/HomeHeroSection/HomeHeroSection.jsx";
import HomePanel from "../../components/HomePanel/HomePanel.jsx";
import SchemeCard from "../../components/SchemeCard/SchemeCard.jsx";
import FinancialSupportCard from "../../components/FinancialSupportCard/FinancialSupportCard.jsx";
import RecommendedSchemesCard from "../../components/RecommendedSchemesCard/RecommendedSchemesCard.jsx";

const HOME = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* NAVBAR */}
      <nav className="relative w-screen h-[80px] z-50 bg-[#F5F5F5] drop-shadow-xl border-">
        <div className="px-2 flex justify-between gap-10 items-center w-full h-full">
          <h1 className="m-2 md:text-4xl font-extrabold text-[#1C6758] md:text-center text-left text-3xl">
            AgriSahayak
          </h1>
          <ul className="md:flex m-2 text-gray-600 font-semibold gap-10 hidden">
            <li className="hover:text-[#1C6758] hover:cursor-pointer hover:border-b-2 hover:border-[#F7C35F]">
              Home
            </li>
            <li className="hover:text-[#1C6758] hover:cursor-pointer hover:border-b-2 hover:border-[#F7C35F]">
              Schemes
            </li>
            <li className="hover:text-[#1C6758] hover:cursor-pointer hover:border-b-2 hover:border-[#F7C35F]">
              Financial Support
            </li>
            <li className="hover:text-[#1C6758] hover:cursor-pointer hover:border-b-2 hover:border-[#F7C35F]">
              Recommended Schemes
            </li>
            <li className="hover:text-[#1C6758] hover:cursor-pointer hover:border-b-2 hover:border-[#F7C35F]">
              AgroLink
            </li>
          </ul>
          <div className="md:flex">
            <div className="md:flex flex-row hidden bg-[#F7C35F] justify-center items-center mr-5 p-3 drop-shadow-lg rounded-sm text-white font-semibold hover:cursor-pointer">
              Login
            </div>
            <div className="md:flex flex-row hidden bg-[#F7C35F] justify-center items-center mr-5 p-3 drop-shadow-lg rounded-sm text-white font-semibold hover:cursor-pointer">
              SignIn
            </div>
          </div>
          <div
            className="md:hidden text-[#1C6758] text-3xl cursor-pointer mr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        {isOpen && (
          <ul className="md:hidden absolute top-20 left-0 w-full bg-white text-gray-600 font-semibold flex flex-col items-center gap-4 py-4 shadow-lg">
            <li className="hover:text-[#1C6758] hover:border-b-2 hover:border-[#F7C35F]">
              Home
            </li>
            <li className="hover:text-[#1C6758] hover:border-b-2 hover:border-[#F7C35F]">
              Schemes
            </li>
            <li className="hover:text-[#1C6758] hover:border-b-2 hover:border-[#F7C35F]">
              Financial Support
            </li>
            <li className="hover:text-[#1C6758] hover:border-b-2 hover:border-[#F7C35F]">
              Donate
            </li>
          </ul>
        )}
      </nav>
      {/* HEROSECTION */}
      <section className=" relative w-screen h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between  px-6 md:px-20 gap-2 md:mt-0 pt-5 pb-0 overflow-hidden">
        <div className="absolute  inset-0 bg-cover bg-center md:bg-[url(src/assets/home-bg.png)] bg-[url(src/assets/home-bg-ph.png)]"></div>
        <div className="md:w-1/2 text-left z-2 mt-4 md:mr-0 w-[270px] bg-black/40 p-4 rounded-lg md:mt-0 mr-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
            Empowering Farmers with Government Schemes & Support
          </h1>
          <p className="text-white mt-4 text-xl md:font-semibold drop-shadow-2xl ">
            Easily access subsidies, financial aid, and agricultural benefits.
            Find the right support to boost productivity and secure a better
            future for your farm. 🌱🚜
          </p>
        </div>
      </section>

      {/* HOMEPANEL */}

      <div className="bg-[#FFF8E1]  py-5 px-4 md:py-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Section */}
        <div className="md:w-1/2 mb-4 md:mb-0 text-center md:text-left text-[#1C6758]">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
            Explore available schemes, contribute to donations, and make a
            meaningful impact.
          </h2>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 text-center ">
          <p className="mb-3 text-sm sm:text-base md:text-lg text-[#1C6758]">
            Connecting communities, supporting initiatives, and empowering
            individuals through valuable resources and contributions.
          </p>

          {/* Stats Section */}
          <div className="flex justify-center space-x-6 md:space-x-8 text-[#F7C35F]">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold">500+</p>
              <p className="text-xs md:text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold">100+</p>
              <p className="text-xs md:text-sm">Successful Applications</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold">50+</p>
              <p className="text-xs md:text-sm">Partner Organizations</p>
            </div>
          </div>
        </div>
      </div>

      {/* DONATE */}
      <div className="relative w-[80%] mx-auto bg-cover bg-center rounded-2xl drop-shadow-xl overflow-hidden md:mt-20 mt-10 bg-[url(/src/assets/donatecard-bg.jpg)]">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
        <div className="relative z-10 p-10 text-white">
          <h2 className=" font-bold uppercase md:text-5xl xs:text-base text-3xl">
            Donate
          </h2>
          <p className="mt-2 md:text-2xl font-semi-bold ">
            Contribute to empowering farmers by providing essential resources,
            financial aid, and sustainable solutions. Every donation helps build
            a stronger farming community. 🤝🌾
          </p>
          <button className="mt-4 px-4 py-2 text-md font-semibold text-white bg-[#F7C35F] rounded-full hover:drop-shadow-xl md:ml-210">
            DONATE NOW
          </button>
        </div>
      </div>

      {/* SCHEME */}
      <div className="relative w-[80%] mx-auto bg-cover bg-center rounded-2xl drop-shadow-xl overflow-hidden md:mt-20 mt-10 bg-[url(/src/assets/schemecard-bg.jpg)]">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
        <div className="relative z-10 p-10 text-white">
          <h2 className=" font-bold uppercase md:text-5xl xs:text-base text-3xl">
            Schemes
          </h2>
          <p className="mt-2 md:text-2xl font-semi-bold ">
            Stay informed about the latest agricultural schemes, subsidies, and
            benefits. Get the right support to enhance productivity and grow
            sustainably. 🌾📜
          </p>
          <button className="mt-4 px-4 py-2 text-md font-semibold text-white bg-[#F7C35F] rounded-full hover:drop-shadow-xl md:ml-210">
            Know More
          </button>
        </div>
      </div>

      {/* FINANCIALSUPPORT */}
      <div className="relative w-[80%] mx-auto bg-cover bg-center rounded-2xl drop-shadow-xl overflow-hidden md:mt-20 mt-10 bg-[url(/src/assets/financialcard-bg.jpg)]">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
        <div className="relative z-10 p-10 text-white">
          <h2 className=" font-bold uppercase md:text-5xl xs:text-base text-3xl">
            Financial Support
          </h2>
          <p className="mt-2 md:text-2xl font-semi-bold ">
            Access loans, subsidies, and grants to boost your farm’s growth.
            Secure the funding you need for a sustainable and successful future.
            💰🌱
          </p>
          <button className="mt-4 px-4 py-2 text-md font-semibold text-white bg-[#F7C35F] rounded-full hover:drop-shadow-xl md:ml-210">
            Know More
          </button>
        </div>
      </div>

      {/* RECOMMENDEDSCHEME */}
      <div className="relative w-[80%] mx-auto bg-cover bg-center rounded-2xl drop-shadow-xl overflow-hidden md:mt-20 mt-10 bg-[url(/src/assets/donatecard-bg.jpg)]">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div>
        <div className="relative z-10 p-10 text-white">
          <h2 className=" font-bold uppercase md:text-5xl xs:text-base text-3xl">
            Recommended Schemes
          </h2>
          <p className="mt-2 md:text-2xl font-semi-bold ">
            Explore top government schemes tailored to your needs. Get the best
            support to boost your farm’s growth and sustainability. 🌾📜
          </p>
          <button className="mt-4 px-4 py-2 text-md font-semibold text-white bg-[#F7C35F] rounded-full hover:drop-shadow-xl md:ml-210">
            Know More
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative w-screen flex flex-col items-center bg-[#3D8361] text-white py-16 mt-30">
        <div className="absolute -top-20 w-[80%] md:w-[60%] bg-[#649C81] bg-opacity-80 text-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">
              Get started today for better future finance!
            </h2>
            <p className="text-sm mt-2">
              Connect with us for all your agricultural needs and support. We're
              here to help!
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 ">
            <input
              type="phone-number"
              placeholder="+91"
              className="p-2 rounded-full bg-white text-black outline-none w-[150px] md:w-[200px]"
            />
            <button className="bg-[#1C6758] px-4 py-2 rounded-full text-white font-semibold hover:bg-emerald-700 hover:cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
        <footer className="w-full flex flex-col md:flex-row justify-between items-center max-w-6xl px-6 md:px-12 md:mt-20 mt-50">
          <div className="mb-6 md:mb-0">
            <h1 className="font-bold text-lg">AgriSahayak</h1>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="text-sm mt-1">
              Careers
            </a>
            <a href="#" className="text-sm">
              About Us
            </a>
          </div>

          <div className="flex flex-col text-center md:text-left">
            <h3 className="font-semibold">Resources</h3>
            <a href="#" className="text-sm mt-1">
              Blog
            </a>
            <a href="#" className="text-sm">
              FAQs
            </a>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm">contact@agrisahayak.com</p>
            <p className="text-sm">+91-9876543210</p>
            <div className="flex gap-3 justify-center md:justify-start mt-2">
              <a href="#" className="text-white text-3xl">
                <i class="fa-brands fa-square-instagram"></i>
              </a>
              <a href="#" className="text-white text-3xl">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-white text-3xl">
                <i class="fa-brands fa-square-whatsapp"></i>
              </a>
            </div>
          </div>
        </footer>

        <div className="mt-6 text-center text-sm border-t border-gray-600 pt-4 w-full max-w-6xl">
          © 2025 agrisahayak.app. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default HOME;

{
  /* <HomeHeroSection />
      <HomePanel />
      <SchemeCard />
      <FinancialSupportCard />
      <RecommendedSchemesCard /> */
}
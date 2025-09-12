import React from "react";

const HomeSection: React.FC = () => {
  return (
    <div className="mt-6 px-4 space-y-12">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center justify-around bg-[rgb(216,237,235)] rounded-lg max-w-6xl mx-auto p-8">
        {/* Left: Phone Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/Phone.png" alt="Phone app" className="" />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
          <h1 className="font-semibold text-3xl md:text-5xl mb-4 leading-tight">
            Bank for free <br /> with no hidden <br /> fees
          </h1>
          <p className="text-gray-700 text-lg">
            Open your account in minutes and enjoy 100% <br />
            mobile banking. Get a free virtual card and <br />
            monthly ATM withdrawals.
          </p>
          <button className="mt-6 text-[rgb(8,129,119)] font-medium px-6 py-3 rounded-lg hover:underline cursor-pointer transition">
            Open a N26 Standard account
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-8 max-w-6xl mx-auto bg-[rgb(250,248,245)] p-8">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 rounded-lg ">
          <h1 className="font-semibold text-3xl md:text-5xl mb-4 leading-tight">
            Get an ECB- <br /> linked interest rate
          </h1>
          <p className="text-gray-700 text-lg">
            Open a new N26 Metal account and earn 2% <br />
            interest p.a.* on your Instant Savings — linked to <br />
            the European Central Bank rate.
          </p>
          <button className="mt-6 text-[rgb(8,129,119)] font-medium px-6 py-3 rounded-lg hover:underline cursor-pointer transition">
           Discover Instant Savings
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="rounded-lg w-" src="/handphone.webp" alt="Phone with app" />
        </div>
      </div>
      {/* Third Section */}
<div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg items-center justify-around gap-8 p-8 max-w-6xl mx-auto mt-12">
  {/* Left: Image */}
  <div className="w-full md:w-1/2 flex justify-center bg-[rgb(134,126,104)] rounded-lg p-6">
    <img className="rounded-lg max-w-xs md:max-w-sm" src="/Trading.webp" alt="Trading app" />
  </div>

  {/* Right: Text */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <h1 className="font-semibold text-3xl md:text-5xl mb-4 leading-tight">
     Free Stock and <br /> ETF Trading
    </h1>
    <p className=" text-lg mb-3">
     Trade stocks and ETFs for free**. Buy and sell 400+ <br /> 
     <span className="underline">crypto</span> coins instantly***. Then put it all on autopilot <br />
       with our free investment plans. <br />
    </p>
 <p>Investing involves risk of financial loss.</p>
    <button className="mt-6 text-[rgb(8,129,119)] font-medium px-6 py-3 rounded-lg hover:underline cursor-pointer transition">
      Start Investing
    </button>
  </div>
</div>

    </div>
  );
};

export default HomeSection;

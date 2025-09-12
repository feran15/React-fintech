import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src="/Hero_Edit.webm"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay with text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white bg-black/40">
        <h1 className="text-6xl md:text-6xl font-bold mb-4">
          The bank you'll love
        </h1>
        <p className="text-lg md:text-2xl max-w-9xl">
          Bank, save, and invest in one beautifully simple app trusted by millions
        </p>
        <button className="mt-6 bg-white text-[rgb(8,129,119)] px-6 py-3 rounded-lg hover:cursor-pointer  transition">
          Open Bank Account
        </button>
      </div>
    </div>
  );
};

export default Home;

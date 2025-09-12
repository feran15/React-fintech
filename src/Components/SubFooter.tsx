

const SubFooter = () => {
  return (
    <div> 
      <div className="flex flex-col md:flex-row items-center justify-around mt-13 bg-[rgb(245,225,227)] rounded-lg max-w-6xl mx-auto p-8">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
          <h1 className="font-semibold text-3xl md:text-5xl mb-4 leading-tight">
            The card made <br /> for travel
          </h1>
          <p className=" text-lg">
           Get cashback**** on travel, the best exchange rates<br /> and airport lounge
            access. Travel stress-free thanks <br /> to free ATM withdrawls abroad and insurance — <br />
            included with N26 Go and Metal.
          </p>
          <button className="mt-6 text-[rgb(8,129,119)] font-medium px-6 py-3 rounded-lg hover:underline cursor-pointer transition">
            Open a N26 Go Account
          </button>
        </div>

        {/* Right: Phone Image */}
        <div className="w-full md:w-1/2 flex justify-center bg-[rgb(167,149,96)]">
          <img src="/Airport.webp" alt="Phone app" className="" />
        </div>
      </div>


        {/* Second Section */}
<div className="bg-[rgb(216,237,235)] mt-8 ms-25 rounded-lg max-w-6xl">
  <div className="max-w-5xl mx-auto text-center px-6 py-20">

    {/* Top: Text */}
    <h1 className="font-bold text-4xl md:text-6xl mb-6 leading-tight">
      Switch banks in minutes
    </h1>
    <p className="text-gray-700 text-lg mb-6">
      Open your N26 account and move your recurring payments <br />
      in just a few taps.
    </p>
    <a
      href="/"
      className="text-[rgb(8,129,119)] hover:underline font-semibold inline-flex items-center gap-2 transition"
    >
      Open bank account <span>→</span>
    </a>

    {/* Bottom: Image */}
    <div className=" flex justify-center">
      <img
        src="/Card.png"
        alt="N26 Cards"
        className="w-full max-w-xl"
      />
    </div>
  </div>
</div>

    </div>
  )
}

export default SubFooter;
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const FAQs = () => {
  return (
    <footer className="border-t border-gray-200 px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Socials */}
        <div className="space-y-6">
          <div className="text-3xl font-bold">
            <span className="border-b-4 border-black pb-1">N</span>26
          </div>
          <div className="flex space-x-4 text-teal-700 text-2xl mt-40">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
          <button className="border rounded-md px-3 py-1 flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Europe.svg"
              alt="English"
              className="w-5 h-5"
            />
            <span>English</span>
          </button>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-teal-700 mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Leadership Team</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Affiliate program</li>
            <li>Partners</li>
            <li>Suppliers</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-teal-700 mb-4">Help</h3>
          <ul className="space-y-2">
            <li className="">Customer Support</li>
            <li>Sitemap</li>
            <li className="">Financial crime policies</li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h3 className="font-semibold text-teal-700 mb-4">More</h3>
          <ul className="space-y-2">
            <li>Security</li>
            <li>Studies and research</li>
            <li>Web app</li>
            <li>Refer a friend</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FAQs;

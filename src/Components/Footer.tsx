import React from "react";

const Footer = () => {
  return (
    <div className="px-8 py-12">
      {/* Header */}
      <div className="footer-text mb-8 px-20 text-center">
        <h1 className="mb-4 font-semibold leading-tight text-5xl">
          Noteworthy reads
        </h1>
        <p className="leading-tight font-semibold">
          Articles and stories to help you make the most of your money
        </p>
      </div>

      {/* Articles Grid */}
      <div className="footer-links grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Article 1 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/Girly.webp"
            alt=""
            className="rounded-sm mb-4 w-3/4"
          />
          <h2 className="font-semibold text-md leading-tight mb-4">
            A beginner's guide: What is trading <br /> and how does it work?
          </h2>
          <p>
            Trading is more than a buzzword or an ‘80s throwback. 
            This article covers what financial trading is and how it works, step by step.
          </p>
        </div>

        {/* Article 2 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/stock.webp"
            alt=""
            className="rounded-lg mb-4 w-3/4"
          />
          <h2 className="font-semibold text-md leading-tight mb-2">
            How to save money fast: 17 tips to grow your savings
          </h2>
          <p className="text-gray-700">
            Whether your financial goals are big or small, these life hacks will help you save money faster.
          </p>
        </div>

        {/* Article 3 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://images.ctfassets.net/q33z48p65a6w/4cgqwWXdAxjYWvNZa0vdyX/d99b4269daf98406a58e5290716774b3/50_30_20.jpg?fm=webp&h=573&q=80&w=1024"
            alt=""
            className="rounded-lg mb-4 w-3/4"
          />
          <h2 className="font-semibold text-md leading-tight mb-4">
            The 50/30/20 rule: how to budget money more efficiently
          </h2>
          <p className="text-gray-700">
            The 50/30/20 budget is beautiful in its simplicity. 
            It can help you divide your income into categories that make saving easy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

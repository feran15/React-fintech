const Footer = () => {
  return (
    <div className="px-8 py-12">
      {/* Header */}
      <div className="footer-text mb-8">
        <h1 className="mb-4 font-semibold leading-tight text-4xl">
          Noteworthy reads
        </h1>
        <p className="leading-relaxed font-semibold">
          Articles and stories to help you make the most of your money
        </p>
      </div>

      {/* Articles Grid */}
      <div className="footer-links grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Article 1 */}
        <div>
          <img
            src="https://images.ctfassets.net/q33z48p65a6w/6vCW1TVJvfeKS4XwRvCfNj/2abcb16598c7ae3189c663a98a9efab5/CRST-3503_Equities_Blog_Header_Assets_1940x1280_what_is_trading.png?fm=webp&h=676&q=80&w=1024"
            alt=""
            className="rounded-lg mb-4 h-35"
          />
          <h2 className="font-semibold text-md leading-tight mb-2">
            A beginner's guide: What is trading <br /> and how does it work?
          </h2>
          <p className="text-gray-700">
            Trading is more than a buzzword or an ‘80s throwback. 
            This article covers what financial trading is and how it works, step by step.
          </p>
        </div>

        {/* Article 2 */}
        <div>
          <img
            src="https://images.ctfassets.net/q33z48p65a6w/6VM1WaDNKkN6HGul8T7uMO/0f4eeae8dbf82114f280c5eddc215a94/Stocksy_txp7e0a75d0s9u200_Medium_2428314.jpg?fm=webp&h=682&q=80&w=1024"
            alt=""
            className="rounded-lg mb-4 h-35"
          />
          <h2 className="font-semibold text-md leading-tight mb-2">
            How to save money fast: 17 tips to grow your savings
          </h2>
          <p className="text-gray-700">
            Whether your financial goals are big or small, these life hacks will help you save money faster.
          </p>
        </div>

        {/* Article 3 */}
        <div>
          <img
            src="https://images.ctfassets.net/q33z48p65a6w/4cgqwWXdAxjYWvNZa0vdyX/d99b4269daf98406a58e5290716774b3/50_30_20.jpg?fm=webp&h=573&q=80&w=1024"
            alt=""
            className="rounded-lg mb-4 h-35"
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

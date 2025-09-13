import React from "react";

interface ArticleCardProps {
  image: string;
  title: string;
  description: string;
  alt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, title, description, alt }) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={`/${image}`} alt={alt} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const ArticlesSection: React.FC = () => {
  const articles = [
    {
      image: "Girly.webp",
      alt: "Woman explaining trading concept",
      title: "A beginner's guide: What is trading and how does it work?",
      description:
        "Trading is more than a buzzword or an '80s throwback. This article covers what financial trading is and how it works, step by step.",
    },
    {
      image: "stock.webp",
      alt: "Jar filled with coins",
      title: "How to save money fast: 17 tips to grow your savings",
      description:
        "Whether your financial goals are big or small, these life hacks will help you save money faster.",
    },
    {
      image: "Pie.webp",
      alt: "50/30/20 budgeting pie chart",
      title: "The 50/30/20 rule: how to budget your money more efficiently",
      description:
        "The 50/30/20 budget is beautiful in its simplicity. It can help you divide your income into categories that make saving easy.",
    },
  ];

  return (
    <div className="px-6 py-10">
      {/* Section Header */}
      <div className="px-10 mb-10">
        <h2 className="text-4xl font-semibold mb-4">Noteworthy Reads</h2>
        <p className=" font-medium">
          Articles and stories to help you make the most of your money
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            image={article.image}
            alt={article.alt}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesSection;

import React, { useState } from "react";

const Section: React.FC = () => {
    // FAQs
    const faqs = [
        { question: "Is N26 a bank?", answer: "N26 is the first 100% mobile bank to be granted and operate with a full German banking license from the German Federal Financial Supervisory Authority (BaFin). That means your money is fully protected — both in your bank account and Instant Savings account — up to €100,000 by the German Deposit Protection Scheme. We currently operate in 24 markets worldwide and have over 8 million customers." },
        { question: "Where is N26 available?", answer: "We offer our accounts in the following countries: Austria, Belgium, Denmark, Estonia, Finland, France (not available for residents in the French territories outside Europe), Germany, Greece, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, and Switzerland. You can open your account if you live in one of these countries and meet our requirements. Our products and services vary by country." },
        { question: "Is N26 secure?", answer: "N26 has been granted a full German banking license from BaFin. By law, each customer’s funds are protected up to €100,000 by the German Deposit Protection Scheme. With 3D Secure, Mastercard Identity Check, and fingerprint and face recognition, the security of your online payments is always guaranteed." },
        { question: "How is N26 protecting my money and personal data?", answer: "As a bank, N26 is supervised by BaFin. Your funds are guaranteed up to €100,000 by the German Deposit Protection Scheme. In addition, the N26 app has many features to ensure the security of your bank account and data." },
        { question: "What documents do I need to open an N26 bank account?", answer: "In order to open a bank account with N26, you must have a government-issued ID. See the list of List of accepted ID documents here. Don’t worry, there’s no fussy paperwork or long wait times involved — just present your valid ID during a quick call and you’ll be up and running. Note that you’ll need a smartphone to use your account, and must live in an eligible country where N26 operates." },
        { question: "How much does it cost to open a bank account?", answer: "The standard N26 bank account is free, with no opening or maintenance fees. The N26 Smart bank account costs €4.90 per month, the N26 Go bank account costs €9.90 per month, and the N26 Metal account is available for €16.90 per month. To open an N26 account, no deposit or minimum income is required." },
        { question: "How long does it take to open a bank account with N26?", answer: "You can open your mobile N26 account online in minutes from your phone or the N26 website — no paperwork or waiting times. But best of all: once your N26 bank account is active, you can start using it right away. This means you can start spending with your virtual card as soon as your account is set up, and you don't have to wait for your physical card to arrive." },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-12 px-6">
            {/* Disclaimer Section */}
            <div className="max-w-5xl mx-auto text-center md:text-left leading-relaxed space-y-6 text-sm text-gray-700">

                <p>
                    *Valid only for new customers who open a new N26 Metal account from
                    19/02/2025 onwards. The interest rate for the N26 Instant Savings <br />
                    account corresponds to the current European Central Bank deposit
                    facility rate (2% starting on 11/06/2025) and is subject to change by <br />
                    N26 any time. Terms and conditions apply.
                </p>

                <p>
                    For existing customers, N26 Instant Savings account interest rates are
                    based on their main N26 plan, for both personal and business <br />
                    accounts: from 11/06/2025 onwards, 0.30% p.a. for Standard and Smart,
                    0.50% p.a. for N26 Go, and 1.50% p.a. for Metal (before taxes). <br />
                    Please note that rates per plan can be changed by N26 over time. This
                    offer is available at no extra cost in the N26 app in Estonia, Finland, <br />
                    Greece, Ireland, Latvia, Lithuania, Luxembourg, the Netherlands,
                    Portugal, Slovakia, and Slovenia.
                </p>

                <p>
                    **These statements are intended to provide general information and do
                    not constitute investment advice or any other advice on financial <br />
                    services and financial instruments such as Stocks, ETFs and
                    Ready-made funds. These statements also do not constitute an offer to <br />
                    conclude a contract for the purchase or sale of Stocks, ETFs and
                    Ready-made funds. Stocks, ETFs and Ready-made funds can be subject <br />
                    to high fluctuations in value. A decline in value or a complete loss
                    of the money invested are possible at any time. The values depicted are <br />
                    fictional and for illustrative purposes. Stocks and ETFs are currently
                    available for eligible customers in Germany, Austria, France, Spain, <br />
                    Ireland, Belgium, Denmark, Estonia, Finland, Greece, Latvia, Lithuania,
                    Norway, Poland, Portugal, Slovakia, Slovenia and the Netherlands. <br />
                    Using the N26 Broker service is always subject to eligibility.
                </p>

                <p>
                    Trading stocks and ETFs with N26 is fee-free. Product costs may apply,
                    e.g. ETF management fees and third-party inducements.
                </p>

                <p>
                    ***The market for crypto assets constitutes a high risk. A complete
                    loss of the money spent is possible at any time. N26 Crypto is powered <br />
                    by Bitpanda.
                </p>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-12">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-200 py-4 cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">{faq.question}</h3>
                            <span className="text-[rgb(8,129,119)]">
                                {openIndex === index ? "−" : "›"}
                            </span>
                        </div>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;

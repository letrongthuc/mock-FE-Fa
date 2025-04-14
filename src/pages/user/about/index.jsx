function About() {
  return (
    <section className="px-6 md:px-20 lg:px-28 py-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-normal font-serif text-[#2C2C47] mb-10">
        ABOUT US
      </h2>

      <div className="relative">
        <img
          src="/images/about-banner.jpg"
          alt="FashionX About"
          className="w-full h-66 md:h-90 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex item-center justify-center text-center p-6">
          <h3 className="text-white text-lg md:text-4xl font-light">
            <div>We believe we</div>
            <div className="mt-4">can all make a </div>
            <div className="mt-4">difference.</div>
            <div className="text-lg md:text-2xl mt-3">Our way: Exceptional</div>
            <div className="text-lg md:text-2xl mt-1">
              quality. Ethical factories.
            </div>
            <div className="text-lg md:text-2xl mt-1">
              Radical transparency.
            </div>
          </h3>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-10 md:px-12">
        <div className="grid grid-cols2 gap-4 font-serif text-[#2C2C47]">
          <div>
            <p className="text-2xl md:text-3xl font-bold">77</p>
            <p className="text-sm md:text-base">market</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">143,000</p>
            <p className="text-sm md:text-base">employees globally</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">236</p>
            <p className="text-sm md:text-base">
              billion SEK in net sales in 2023
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">85%</p>
            <p className="text-sm md:text-base">
              recycled or sustainably sourced materials in our products
            </p>
          </div>
        </div>
        <div className="text-[#2C2C47] font-serif ">
          <p className="text-lg md:text-2xl font-bold leading-relaxed">
            FashionX is a global fashion and design company, with over 4,000
            stores in more than 75 markets and online sales in 60 markets.
          </p>
          <p className="text-sm md:text-lg mt-4 leading-relaxed">
            All our brands and business ventures share the same passion for
            making great and more sustainable fashion and design available to
            everyone. Each brand has its own unique identity, and together they
            complement each other and strengthen FashionX – all to offer our
            customers unbeatable value and to enable a more circular lifestyle.
          </p>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-normal font-serif text-[#2C2C47] mt-8 md:mt-12">
        OUR WAY
      </h2>

      <div className="mt-8 md:mt-12">
        <img
          src="/images/our-way.jpg"
          alt="Our Way"
          className="w-full h-44 md:h-72 object-cover rounded-lg"
        />
      </div>

      <p className="mt-6 text-[#2C2C47] md:text-3xl text-center md:px-40 font-light leading-relaxed">
        We follow all regulations in the markets where we operate and aim to do
        the right thing. Acting with consistency and strong ethics helps us
        remain a company and partner. This approach builds customer trust, earns
        respect from society, and makes us proud of the work we do.
      </p>

      <p className="mt-4 text-[#2C2C47]  text-center md:px-40 font-light leading-relaxed leading-relaxed">
        The “Our way” document sums up FashionX’s culture, values, policies, and
        guidelines. It defines who we are, what we do and how we do it.
      </p>
    </section>
  );
}

export default About;

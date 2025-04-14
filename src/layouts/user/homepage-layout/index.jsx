import { Link } from 'react-router-dom';

function HomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-[#F9DBBD] px-8 py-16 md:px-24 lg:px-28 flex items-center">
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2C47]">Luxury ✦ Elegant</h1>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C47] mt-2">
              Shine with your own style!
            </h2>
            <p className="hidden xl:block font-serif text-base md:text-lg text-[#2C2C47] mt-4">
              At FashionX, we craft timeless fashion with exquisite materials <br />
              and impeccable craftsmanship, bringing you elegance <br />
              that transcends trends and defines sophistication.
            </p>

            <Link to="/sales">
              <button
                className="flex items-center px-4 py-2 text-white hover:text-orange-400 bg-[#2C2C47] font-serif font-semibold rounded-2xl 
                 transition duration-300 ease-in-out hover:scale-105 active:scale-95 
                 select-none text-center mt-6 space-x-4"
              >
                Shop Now →
              </button>
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/clothing.jpg"
              alt="Clothing"
              className="hidden md:block rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      <div className="px-8 md:px-24 lg:px-36 font-serif font-bold text-xl md:text-2xl lg:text-3xl text-orange-500 mt-6 md:mt-8 lg:mt-10">
        Sales
      </div>

      <main className="flex-1 flex flex-col">
        <div className="flex-grow">{children}</div>
      </main>

      <section className="flex justify-between items-center px-8 md:px-24 lg:px-28 ml-0 md:ml-4 lg:ml-16 py-16">
        <div className="space-y-6">
          <div className="bg-[#2C2C47] text-white p-6 rounded-xl shadow-lg flex items-center space-x-4 max-w-md">
            <div className="flex-1 -mt-2 -mb-2">
              <p className="text-4xl">“</p>
              <p className="text-base italic -mt-4">
                Fashion is not necessarily about labels. It’s not about brands. It’s about something else that comes
                from within you.
              </p>
              <p className="font-bold mt-2">Ralph Lauren</p>
            </div>
            <img src="/images/ralph-lauren.jpg" className="w-12 h-12 rounded-full object-cover" />
          </div>

          <div className="bg-[#2C2C47] text-white p-4 rounded-xl shadow-lg flex items-center space-x-4 max-w-md">
            <div className="flex-1">
              <p className="text-4xl">“</p>
              <p className="text-base italic -mt-4">
                Elegance is not about being noticed, but about being remembered. True style reflects confidence,
                personality, and the way you carry yourself.
              </p>
              <p className="font-bold mt-2">Giorgio Armani</p>
            </div>
            <img src="/images/giorgio-armani.jpg" className="w-12 h-12 rounded-full object-cover" />
          </div>
        </div>

        <div className="hidden md:block pr-8 md:pr-12 md:ml-10 lg:pr-28">
          <img src="/images/silhouette.jpg" alt="Fashion Silhouette" className="h-64 md:h-72 lg:h-80" />
        </div>
      </section>
    </div>
  );
}

export default HomeLayout;

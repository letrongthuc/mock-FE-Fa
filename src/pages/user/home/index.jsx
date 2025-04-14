import { HomeLayout } from '../../../layouts/user';
import ProductList from '../../../components/product-list';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [ageGender, setAgeGender] = useState('Women');
  return (
    <div>
      <HomeLayout>
        <div className="text-sm md:text-lg space-x-8 sm:md-space-x-16 md:space-x-28 font-serif text-center mt-4 md:mt-8 text-[#2C2C47]">
          {['Women', 'Men', 'Kids', 'Babies', 'viewmore'].map((cat) =>
            cat === 'viewmore' ? (
              <button className="hover:text-orange-400" key={cat}>
                <Link to="/sales">
                  View <b>More →</b>
                </Link>
              </button>
            ) : (
              <button
                key={cat}
                className={`hover:text-orange-400 transition duration-200 ${ageGender === cat ? 'text-green-400' : ''}`}
                onClick={() => setAgeGender(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            )
          )}
        </div>
        <div className="px-8 sm:px-16 md:px-28 lg:px-32 mt-4 md:mt-12">
          <ProductList showPagination={false} ageGender={ageGender} showOldPrice={true} />
        </div>
      </HomeLayout>
    </div>
  );
}

export default Home;

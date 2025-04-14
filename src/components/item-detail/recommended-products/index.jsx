import { Link } from 'react-router-dom';
import ProductList from '../../product-list';

function RecommendedProducts({ error, product, category, categoryName }) {
  return (
    <>
      <div className="hidden md:block text-[#2C2C47] text-center -mt-4 text-3xl pb-10">
        {error || !product ? (
          <span>Unable to load this product. Check out other recommendations below</span>
        ) : (
          <span>
            <b>Complete</b> Your Look
          </span>
        )}
      </div>
      <div className="hidden md:block px-40 pb-20">
        <ProductList
          showPagination={false}
          categoryId={product?.category_id}
          productId={[product?.ids[0], product?.ids[product?.ids.length - 1]]}
          isRecommended={true}
        />
      </div>
      <div className="text-lg -mt-16 text-right mr-44 mb-12 text-[#2C2C47] hover:text-orange-400">
        <Link to={`/${category}/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}>
          View <b>More →</b>
        </Link>
      </div>
    </>
  );
}

export default RecommendedProducts;

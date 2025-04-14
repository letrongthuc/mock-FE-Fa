import { FaStar } from 'react-icons/fa';

function ItemDescriptions({ product, activeTab, setActiveTab }) {
  return (
    <div className="font-serif hidden md:block -mt-4 px-32 pb-16 text-[#2C2C47]">
      <div className="flex gap-8 justify-center border-b-2 pb-2 border-gray-200 mr-20 ml-20">
        {product?.description && (
          <button
            className={`${activeTab === 'description' ? 'font-semibold pb-1 border-b-2 border-[#2C2C47]' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Descriptions
          </button>
        )}
        {product?.sizeFit && (
          <button
            className={`${activeTab === 'sizefit' ? 'font-semibold pb-1 border-b-2 border-[#2C2C47]' : ''}`}
            onClick={() => setActiveTab('sizefit')}
          >
            Size & Fit
          </button>
        )}
        {product?.reviews && (
          <button
            className={`${activeTab === 'reviews' ? 'font-semibold pb-1 border-b-2 border-[#2C2C47]' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        )}
      </div>

      <div className="mt-4 text-center px-16 min-h-auto">
        {activeTab === 'description' && product?.description && <p>{product.description}</p>}
        {activeTab === 'sizefit' && product?.sizeFit && <p>{product.sizeFit}</p>}
        {activeTab === 'reviews' && product?.reviews && (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index}>
                <p className="font-semibold flex items-center justify-center gap-2">
                  {review.username}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-sm text-gray-500">({review.rating})</span>
                  </div>
                  <span className="font-light text-xs text-gray-500">{review.date}</span>
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDescriptions;

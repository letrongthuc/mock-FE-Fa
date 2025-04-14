function Filters({ filters }) {
  return (
    <div className="text-gray-500 text-sm mt-2 font-sans text-center w-full">
      <span className="font-semibold">Current Selection: </span>
      {Object.entries(filters)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => {
          if (key === 'ageGender' || key === 'category') {
            return null;
          }
          if (key === 'size' && value.length > 0) {
            return `Size: ${value.join(', ')}`;
          }
          return null;
        })
        .filter(Boolean)
        .concat(
          filters.category
            ? filters.ageGender
              ? `${filters.category} For ${
                  {
                    Women: 'Women',
                    Men: 'Men',
                    Kids: 'Kids',
                    Babies: 'Babies',
                  }[filters.ageGender] || ''
                }`
              : filters.category
            : filters.ageGender
            ? `For ${
                {
                  Women: 'Women',
                  Men: 'Men',
                  Kids: 'Kids',
                  Babies: 'Babies',
                }[filters.ageGender] || ''
              }`
            : [],
          filters.priceMin && filters.priceMax
            ? `Price: ₫${filters.priceMin} - ₫${filters.priceMax}`
            : filters.priceMin
            ? `From ₫${filters.priceMin}`
            : filters.priceMax
            ? `Up to ₫${filters.priceMax}`
            : [],
          filters.minRating && filters.maxRating
            ? `Rating: ${filters.minRating}⭐ - ${filters.maxRating}⭐`
            : filters.minRating
            ? `At least ${filters.minRating}⭐`
            : filters.maxRating
            ? `Up to ${filters.maxRating}⭐`
            : []
        )
        .map((text, index, arr) => (
          <span key={index}>
            {text}
            {index !== arr.length - 1 && ', '}
          </span>
        ))}
    </div>
  );
}

export default Filters;

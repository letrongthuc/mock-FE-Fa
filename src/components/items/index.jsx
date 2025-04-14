import { Link } from 'react-router-dom';

function Item({ data, setSearchValue }) {
  return (
    <Link
      to={`/products/${data.name}`}
      className="flex items-center hover:bg-gray-200 cursor-pointer"
      onClick={() => setSearchValue('')}
      title={data.name}
    >
      <img src={data.image || '/icon.svg'} alt={data.name} className="w-5 h-5 object-contain rounded-md mr-3" />
      <span className="text-[#2C2C47] text-xl font-semibold">
        {data.name.length > 20 ? data.name.slice(0, 20) + '...' : data.name}
      </span>
    </Link>
  );
}

export default Item;

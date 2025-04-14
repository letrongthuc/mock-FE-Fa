import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="flex bg-[#2C2C47] px-4 sm:px-16 lg:px-24 md:px-20 pt-0 pb-2 lg:space-x-12 md:space-x-8 sm:space-x-4 space-x-2 text-white text-base md:text-xl font-serif">
      <NavLink
        title="Go to Home Page"
        to="/"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        title="Explore New Arrivals"
        to="/new-arrivals"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        New Arrivals
      </NavLink>
      <NavLink
        title="Browse Clothing"
        to="/clothing"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        Clothing
      </NavLink>
      <NavLink
        title="Explore Accessories"
        to="/accessories"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        Accessories
      </NavLink>
      <NavLink
        title="Learn About Us"
        to="/about"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        About
      </NavLink>
      <NavLink
        title="Contact Us"
        to="/contact"
        className={({ isActive }) =>
          `hover:text-orange-400 active:text-orange-500 transition duration-200 ${
            isActive ? 'text-green-400' : ''
          }`
        }
      >
        Contact
      </NavLink>
      <NavLink
        title="Check Out Sales"
        to="/sales"
        className={({ isActive }) =>
          `text-orange-400 font-semibold hover:text-orange-500 transition duration-200 ${
            isActive ? 'text-orange-600' : ''
          }`
        }
      >
        Sales
      </NavLink>
    </nav>
  );
}

export default NavBar;

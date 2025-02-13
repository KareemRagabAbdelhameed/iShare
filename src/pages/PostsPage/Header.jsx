import { FiSearch, FiBell, FiCreditCard, FiUser } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* Main Header */}
      <nav className="bg-white shadow-sm p-4 fixed w-full top-0 z-10 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-semibold">Your Logo</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="text-gray-400 cursor-pointer" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-mainColor focus:ring-1 focus:ring-mainColor"
            />
          </div>

          {/* Icons Section */}
          <div className='hidden md:block'>
          <div className="flex items-center space-x-4 md:space-x-10">
            {/* Transactions Icon */}
            <Link to="/transactions">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiCreditCard className="text-gray-600 text-xl" />
              </button>
            </Link>

            {/* Notification Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiBell className="text-gray-600 text-xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Create Post Icon */}
            <Link to="/create-post">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaPlus className="text-gray-600 text-xl" />
              </button>
            </Link>

            {/* User Account Icon */}
            <Link to="/account">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FiUser className="text-gray-600 text-xl" />
              </button>
            </Link>
          </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-sm z-10 md:hidden">
        <div className="flex justify-around items-center p-2">
          {/* Transactions Icon */}
          <Link to="/transactions">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiCreditCard className="text-gray-600 text-xl" />
            </button>
          </Link>

          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <FiBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Create Post Icon */}
          <Link to="/create-post">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaPlus className="text-gray-600 text-xl" />
            </button>
          </Link>

          {/* User Account Icon */}
          <Link to="/account">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiUser className="text-gray-600 text-xl" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
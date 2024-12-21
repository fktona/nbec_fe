import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 w-full  px-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <User className="h-6 w-6 mr-2" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

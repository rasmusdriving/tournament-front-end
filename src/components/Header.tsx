import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Trophy className="mr-2" /> Tournament Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/admin" className="hover:underline">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
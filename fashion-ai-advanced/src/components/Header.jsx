import { Bell, MessageCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = ({ user }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            موضة AI
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="p-2">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MessageCircle size={20} />
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings size={20} />
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


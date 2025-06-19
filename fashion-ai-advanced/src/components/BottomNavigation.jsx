import { Search, Heart, User, Home, Sparkles, DollarSign } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'الرئيسية', path: '/' },
    { icon: Search, label: 'البحث', path: '/search' },
    { icon: Sparkles, label: 'AI', path: '/ai-recommendations' },
    { icon: DollarSign, label: 'الأرباح', path: '/earnings' },
    { icon: User, label: 'الملف الشخصي', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;


import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Eye, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Mock data for fashion recommendations
const mockRecommendations = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    title: 'فستان صيفي أنيق',
    brand: 'Zara',
    price: '$89',
    likes: 1250,
    comments: 89,
    description: 'فستان صيفي مثالي للمناسبات الخاصة، مصنوع من القطن الطبيعي',
    tags: ['صيفي', 'أنيق', 'مناسبات'],
    aiMatch: 95,
    user: {
      name: 'سارة أحمد',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
    title: 'بدلة رجالية كلاسيكية',
    brand: 'Hugo Boss',
    price: '$299',
    likes: 890,
    comments: 45,
    description: 'بدلة رجالية كلاسيكية مثالية للعمل والمناسبات الرسمية',
    tags: ['رسمي', 'كلاسيكي', 'عمل'],
    aiMatch: 88,
    user: {
      name: 'محمد علي',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
    title: 'حذاء رياضي عصري',
    brand: 'Nike',
    price: '$120',
    likes: 2100,
    comments: 156,
    description: 'حذاء رياضي مريح وعصري، مثالي للأنشطة اليومية والرياضة',
    tags: ['رياضي', 'مريح', 'عصري'],
    aiMatch: 92,
    user: {
      name: 'ليلى حسن',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  }
];

const HomePage = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (id) => {
    setRecommendations(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, likes: item.likes + 1, liked: !item.liked }
          : item
      )
    );
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Welcome Message */}
      {user && (
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
          <h2 className="text-lg font-semibold">مرحباً {user.name}!</h2>
          <p className="text-sm opacity-90">إليك أحدث التوصيات المخصصة لك</p>
        </div>
      )}

      {/* Recommendations Feed */}
      <div className="space-y-6 pb-6">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden border-0 shadow-lg">
            {/* User Info */}
            <div className="flex items-center p-4 pb-2">
              <img 
                src={item.user.avatar} 
                alt={item.user.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.user.name}</p>
                <p className="text-xs text-gray-500">منذ ساعتين</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {item.aiMatch}% مطابقة
              </Badge>
            </div>

            {/* Product Image */}
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/50 text-white">
                  {item.brand}
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(item.id)}
                  className={`p-2 ${item.liked ? 'text-red-500' : ''}`}
                >
                  <Heart size={20} fill={item.liked ? 'currentColor' : 'none'} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <MessageCircle size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Share2 size={20} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link to={`/virtual-try-on/${item.id}`}>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Eye size={16} className="mr-1" />
                    جربه
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <ShoppingBag size={16} className="mr-1" />
                  {item.price}
                </Button>
              </div>
            </div>

            {/* Engagement Info */}
            <div className="px-4 pb-2">
              <p className="text-sm font-semibold">{item.likes.toLocaleString()} إعجاب</p>
            </div>

            {/* Description */}
            <div className="px-4 pb-2">
              <p className="text-sm">
                <span className="font-semibold">{item.title}</span> {item.description}
              </p>
            </div>

            {/* Tags */}
            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, index) => (
                  <span key={index} className="text-blue-500 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Preview */}
            <div className="px-4 pb-4">
              <Button variant="ghost" size="sm" className="text-gray-500 p-0 h-auto">
                عرض جميع التعليقات الـ {item.comments}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="p-4 text-center">
        <Button variant="outline" className="w-full">
          تحميل المزيد من التوصيات
        </Button>
      </div>
    </div>
  );
};

export default HomePage;


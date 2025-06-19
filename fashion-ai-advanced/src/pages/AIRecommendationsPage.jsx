import { useState, useEffect } from 'react';
import { Camera, Upload, Sparkles, Download, RefreshCw, ArrowLeft, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AIRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchRecommendations();
    loadUserProfile();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      // Simulate API call to backend
      const response = await fetch('http://localhost:5000/api/recommendations/feed');
      const data = await response.json();
      
      if (data.status === 'success') {
        setRecommendations(data.feed);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Fallback to mock data
      setRecommendations([
        {
          id: 1,
          title: "فستان صيفي أنيق",
          brand: "Zara",
          price: 89,
          ai_match: 95,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
          likes: 1250,
          comments: 89,
          user: { name: "سارة أحمد", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
          posted_at: "منذ ساعتين",
          recommendation_reason: "يتماشى مع أسلوبك المفضل • مطابقة ممتازة لملفك الشخصي"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = () => {
    const savedUser = localStorage.getItem('fashionAI_user');
    if (savedUser) {
      setUserProfile(JSON.parse(savedUser));
    }
  };

  const handleLike = (productId) => {
    setRecommendations(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, likes: item.likes + 1, liked: !item.liked }
          : item
      )
    );
  };

  const handleVirtualTryOn = (productId) => {
    // Navigate to virtual try-on page
    window.location.href = `/virtual-try-on/${productId}`;
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-4">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <Sparkles className="mr-2 text-purple-500" size={24} />
            توصيات AI
          </h1>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            مخصص لك
          </Badge>
        </div>
        
        {userProfile && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              مرحباً {userProfile.name}! إليك توصياتنا المخصصة بناءً على أسلوبك المفضل
            </p>
          </div>
        )}
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-6 p-4">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {/* User Info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img 
                  src={item.user?.avatar} 
                  alt={item.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{item.user?.name}</p>
                  <p className="text-sm text-gray-600">{item.posted_at}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {item.ai_match}% مطابقة
              </Badge>
            </div>

            {/* Product Image */}
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/70 text-white">
                  {item.brand}
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => handleVirtualTryOn(item.id)}
                >
                  <Eye size={16} className="mr-1" />
                  جرب
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-lg font-bold text-green-600">${item.price}</p>
                </div>
              </div>

              {/* AI Recommendation Reason */}
              {item.recommendation_reason && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="flex items-start space-x-2 rtl:space-x-reverse">
                    <Sparkles size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>لماذا نوصي بهذا المنتج:</strong><br />
                      {item.recommendation_reason}
                    </p>
                  </div>
                </div>
              )}

              {/* Engagement */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(item.id)}
                    className={item.liked ? 'text-red-500' : ''}
                  >
                    <Heart size={20} fill={item.liked ? 'currentColor' : 'none'} />
                    <span className="mr-1">{item.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle size={20} />
                    <span className="mr-1">{item.comments}</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="p-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={fetchRecommendations}
        >
          <RefreshCw size={16} className="mr-2" />
          تحديث التوصيات
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationsPage;


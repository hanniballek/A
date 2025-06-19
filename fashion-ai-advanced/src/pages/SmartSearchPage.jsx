import { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Camera, Mic, X, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SmartSearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState('normal'); // normal, smart, visual, voice
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRecentSearches();
    loadTrendingSearches();
  }, []);

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('fashionAI_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const loadTrendingSearches = () => {
    setTrendingSearches([
      'فساتين صيفية',
      'أحذية رياضية',
      'حقائب يد',
      'ملابس كاجوال',
      'إكسسوارات ذهبية',
      'بدل رجالية'
    ]);
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    
    try {
      const searchData = {
        query: searchQuery,
        user_id: 'user_123',
        filters: filters
      };

      const response = await fetch('http://localhost:5000/api/smart-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setResults(data.results);
        saveRecentSearch(searchQuery);
      }
    } catch (error) {
      console.error('Error searching:', error);
      // Fallback to mock results
      setResults([
        {
          id: 1,
          title: "فستان صيفي أنيق",
          brand: "Zara",
          price: 89,
          ai_match: 95,
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
          rating: 4.5,
          reviews: 234
        }
      ]);
      saveRecentSearch(searchQuery);
    } finally {
      setLoading(false);
    }
  };

  const saveRecentSearch = (searchQuery) => {
    const recent = [...recentSearches];
    const index = recent.indexOf(searchQuery);
    
    if (index > -1) {
      recent.splice(index, 1);
    }
    
    recent.unshift(searchQuery);
    const updatedRecent = recent.slice(0, 10); // Keep only last 10 searches
    
    setRecentSearches(updatedRecent);
    localStorage.setItem('fashionAI_recent_searches', JSON.stringify(updatedRecent));
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
    } else {
      alert('البحث الصوتي غير مدعوم في هذا المتصفح');
    }
  };

  const handleVisualSearch = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Simulate visual search
        setQuery('بحث بالصورة: ' + file.name);
        handleSearch('بحث بالصورة');
      }
    };
    input.click();
  };

  const clearFilters = () => {
    setFilters({});
  };

  const FilterSection = () => (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">فلاتر البحث</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          مسح الكل
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">الفئة</label>
          <Select value={filters.category || ''} onValueChange={(value) => setFilters({...filters, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dress">فساتين</SelectItem>
              <SelectItem value="suit">بدل</SelectItem>
              <SelectItem value="shoes">أحذية</SelectItem>
              <SelectItem value="bags">حقائب</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">اللون</label>
          <Select value={filters.color || ''} onValueChange={(value) => setFilters({...filters, color: value})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر اللون" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="أسود">أسود</SelectItem>
              <SelectItem value="أبيض">أبيض</SelectItem>
              <SelectItem value="أزرق">أزرق</SelectItem>
              <SelectItem value="أحمر">أحمر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">النمط</label>
          <Select value={filters.style || ''} onValueChange={(value) => setFilters({...filters, style: value})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر النمط" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">كاجوال</SelectItem>
              <SelectItem value="formal">رسمي</SelectItem>
              <SelectItem value="trendy">عصري</SelectItem>
              <SelectItem value="classic">كلاسيكي</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">السعر</label>
          <Select value={filters.price_range || ''} onValueChange={(value) => setFilters({...filters, price_range: value})}>
            <SelectTrigger>
              <SelectValue placeholder="نطاق السعر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200-500">$200 - $500</SelectItem>
              <SelectItem value="500+">$500+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-4 border-b">
        <h1 className="text-xl font-bold mb-4 flex items-center">
          <Search className="mr-2 text-purple-500" size={24} />
          البحث الذكي
        </h1>
        
        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            placeholder="ابحث عن الملابس والإكسسوار..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-12 pr-20"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1 rtl:space-x-reverse">
            <Button size="sm" variant="ghost" onClick={handleVoiceSearch}>
              <Mic size={16} />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleVisualSearch}>
              <Camera size={16} />
            </Button>
          </div>
        </div>

        {/* Search Mode Tabs */}
        <div className="flex space-x-2 rtl:space-x-reverse mt-3">
          <Button
            size="sm"
            variant={searchMode === 'normal' ? 'default' : 'outline'}
            onClick={() => setSearchMode('normal')}
          >
            بحث عادي
          </Button>
          <Button
            size="sm"
            variant={searchMode === 'smart' ? 'default' : 'outline'}
            onClick={() => setSearchMode('smart')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <Sparkles size={14} className="mr-1" />
            بحث ذكي
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={14} className="mr-1" />
            فلاتر
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Filters */}
        {showFilters && <FilterSection />}

        {/* Smart Search Info */}
        {searchMode === 'smart' && (
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <Sparkles size={20} className="text-purple-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                  البحث الذكي بالذكاء الاصطناعي
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  يستخدم الذكاء الاصطناعي معلوماتك الشخصية (الطول، الوزن، نوع الجسم، التفضيلات) لإيجاد أفضل المنتجات المناسبة لك.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Clock size={16} className="mr-2" />
              عمليات البحث الأخيرة
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery(search);
                    handleSearch(search);
                  }}
                  className="text-xs"
                >
                  {search}
                  <X 
                    size={12} 
                    className="mr-1 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = recentSearches.filter((_, i) => i !== index);
                      setRecentSearches(updated);
                      localStorage.setItem('fashionAI_recent_searches', JSON.stringify(updated));
                    }}
                  />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        {!query && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp size={16} className="mr-2" />
              الأكثر بحثاً
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery(search);
                    handleSearch(search);
                  }}
                  className="text-xs"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-4">
                <div className="animate-pulse flex space-x-4 rtl:space-x-reverse">
                  <div className="w-20 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                نتائج البحث ({results.length})
              </h3>
              {searchMode === 'smart' && (
                <Badge className="bg-purple-100 text-purple-800">
                  مرتب حسب التطابق
                </Badge>
              )}
            </div>
            
            <div className="space-y-4">
              {results.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-20 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{product.title}</h4>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                            <span className="font-bold text-green-600">${product.price}</span>
                            {product.ai_match && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {product.ai_match}% مطابقة
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button size="sm" variant="outline">
                            عرض
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                            جرب
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && (
          <Card className="p-8 text-center">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="font-semibold mb-2">لم نجد نتائج</h3>
            <p className="text-gray-600 mb-4">
              جرب كلمات مختلفة أو استخدم البحث الذكي للحصول على اقتراحات أفضل
            </p>
            <Button 
              onClick={() => setSearchMode('smart')}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Sparkles size={16} className="mr-2" />
              جرب البحث الذكي
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SmartSearchPage;


import { useState } from 'react';
import { Search, Filter, Sliders, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    style: '',
    priceRange: '',
    size: '',
    brand: ''
  });

  const categories = [
    'طقم كامل', 'فستان', 'بدلة', 'قميص', 'بنطال', 'تنورة', 'جاكيت', 
    'حذاء', 'حقيبة', 'إكسسوارات', 'ملابس داخلية', 'ملابس رياضية'
  ];

  const colors = [
    'أسود', 'أبيض', 'أزرق', 'أحمر', 'أخضر', 'أصفر', 'وردي', 'بنفسجي', 
    'بني', 'رمادي', 'برتقالي', 'ذهبي', 'فضي'
  ];

  const styles = [
    'عصري', 'كلاسيكي', 'رياضي', 'كاجوال', 'رسمي', 'بوهيمي', 'مينيمال', 
    'فينتاج', 'شيك', 'أنيق', 'جريء', 'رومانسي'
  ];

  const handleSearch = () => {
    console.log('البحث عن:', searchQuery, 'مع الفلاتر:', filters);
    // هنا سيتم استدعاء API البحث
  };

  const handleAISearch = () => {
    console.log('البحث الذكي باستخدام AI');
    // هنا سيتم استدعاء خدمة الذكاء الاصطناعي للبحث
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">البحث الذكي</h1>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="ابحث عن الملابس والإكسسوارات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 rtl:space-x-reverse mb-4">
          <Button onClick={handleSearch} className="flex-1">
            <Search size={16} className="mr-2" />
            بحث عادي
          </Button>
          <Button 
            onClick={handleAISearch} 
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Sparkles size={16} className="mr-2" />
            بحث ذكي
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="px-3"
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-4 mb-6">
          <div className="flex items-center mb-4">
            <Sliders size={20} className="mr-2" />
            <h3 className="font-semibold">فلاتر متقدمة</h3>
          </div>

          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">نوع المنتج</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع المنتج" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-2">اللون</label>
              <Select value={filters.color} onValueChange={(value) => setFilters({...filters, color: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللون" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm font-medium mb-2">الستايل</label>
              <Select value={filters.style} onValueChange={(value) => setFilters({...filters, style: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الستايل" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">النطاق السعري</label>
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النطاق السعري" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50">أقل من $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="500+">أكثر من $500</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 rtl:space-x-reverse pt-4">
              <Button 
                onClick={() => setFilters({category: '', color: '', style: '', priceRange: '', size: '', brand: ''})}
                variant="outline" 
                className="flex-1"
              >
                مسح الفلاتر
              </Button>
              <Button onClick={handleSearch} className="flex-1">
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* AI Search Explanation */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-start">
          <Sparkles className="text-purple-500 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              البحث الذكي بالذكاء الاصطناعي
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
              يستخدم الذكاء الاصطناعي معلوماتك الشخصية (الطول، الوزن، العمر، التفضيلات) 
              لإيجاد أفضل المنتجات المناسبة لك.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">تحليل شخصي</Badge>
              <Badge variant="secondary" className="text-xs">مطابقة ذكية</Badge>
              <Badge variant="secondary" className="text-xs">توصيات مخصصة</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Popular Searches */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">عمليات البحث الشائعة</h3>
        <div className="flex flex-wrap gap-2">
          {['فساتين صيفية', 'بدل رجالية', 'أحذية رياضية', 'حقائب يد', 'إكسسوارات ذهبية', 'ملابس كاجوال'].map((term) => (
            <Button 
              key={term} 
              variant="outline" 
              size="sm"
              onClick={() => setSearchQuery(term)}
              className="text-xs"
            >
              {term}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div>
        <h3 className="font-semibold mb-3">عمليات البحث الأخيرة</h3>
        <div className="space-y-2">
          {['فستان أسود أنيق', 'حذاء رياضي أبيض', 'حقيبة يد جلدية'].map((search, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="text-sm">{search}</span>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery(search)}>
                <Search size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;


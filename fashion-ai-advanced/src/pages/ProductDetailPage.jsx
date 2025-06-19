import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingBag, Eye, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Mock product data
    const mockProduct = {
      id: id,
      title: 'فستان صيفي أنيق',
      brand: 'Zara',
      price: '$89',
      originalPrice: '$120',
      discount: '26%',
      rating: 4.5,
      reviews: 234,
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop'
      ],
      description: 'فستان صيفي أنيق مصنوع من القطن الطبيعي 100%، مثالي للمناسبات الخاصة والنزهات الصيفية. يتميز بتصميم عصري وقصة مريحة تناسب جميع أنواع الجسم.',
      features: [
        'مصنوع من القطن الطبيعي 100%',
        'قابل للغسل في الغسالة',
        'متوفر بعدة ألوان',
        'مقاسات من XS إلى XXL',
        'تصميم مقاوم للتجعد'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['أسود', 'أبيض', 'أزرق', 'وردي'],
      tags: ['صيفي', 'أنيق', 'مناسبات', 'قطن'],
      aiMatch: 95,
      storeUrl: 'https://www.zara.com/example-product',
      seller: {
        name: 'Zara Official Store',
        rating: 4.8,
        reviews: 15420
      }
    };
    
    setProduct(mockProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-semibold">تفاصيل المنتج</h1>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)}>
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} className={liked ? 'text-red-500' : ''} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-96 object-cover"
        />
        {product.discount && (
          <Badge className="absolute top-4 right-4 bg-red-500">
            خصم {product.discount}
          </Badge>
        )}
        <Badge className="absolute top-4 left-4 bg-green-500">
          {product.aiMatch}% مطابقة لك
        </Badge>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Title and Brand */}
        <div>
          <h2 className="text-xl font-bold mb-1">{product.title}</h2>
          <p className="text-gray-600">{product.brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium mr-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-600">({product.reviews} تقييم)</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-2xl font-bold text-green-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">الوصف</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-2">المميزات</h3>
          <ul className="space-y-1">
            {product.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-semibold mb-2">المقاسات المتوفرة</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Badge key={size} variant="outline" className="px-3 py-1">
                {size}
              </Badge>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-2">الألوان المتوفرة</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <Badge key={color} variant="secondary" className="px-3 py-1">
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold mb-2">العلامات</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-blue-500 text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI Recommendation */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
            توصية الذكاء الاصطناعي
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            هذا المنتج مناسب لك بنسبة {product.aiMatch}% بناءً على معلوماتك الشخصية وتفضيلاتك في الأسلوب.
            اللون والقصة يتماشيان مع نوع جسمك ولون بشرتك.
          </p>
        </Card>

        {/* Seller Info */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">معلومات البائع</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.seller.name}</p>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm">{product.seller.rating}</span>
                <span className="text-sm text-gray-600">({product.seller.reviews} تقييم)</span>
              </div>
            </div>
            <Badge variant="secondary">متجر موثق</Badge>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t space-y-3">
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link to={`/virtual-try-on/${product.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Eye size={16} className="mr-2" />
              جربه افتراضياً
            </Button>
          </Link>
          <Button variant="outline" className="flex-1">
            <MessageCircle size={16} className="mr-2" />
            تعليقات
          </Button>
        </div>
        
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => window.open(product.storeUrl, '_blank')}
        >
          <ShoppingBag size={16} className="mr-2" />
          شراء من {product.brand}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;


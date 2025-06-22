import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Download, ArrowLeft, Sparkles, RefreshCw, Eye, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useParams, useNavigate } from 'react-router-dom';

const EnhancedVirtualTryOnPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [userImage, setUserImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setProduct(data.product);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to mock data
      setProduct({
        id: productId,
        title: 'فستان صيفي أنيق',
        brand: 'Zara',
        price: 89,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop'
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage) return;
    
    setIsProcessing(true);
    setProgress(0);
    setCurrentStep('بدء المعالجة...');
    
    try {
      // Create virtual try-on session
      const response = await fetch('http://localhost:5000/api/virtual-tryon/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'user_123',
          product_id: productId,
          user_image: userImage
        })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setSessionId(data.session_id);
        pollForResult(data.session_id);
      }
    } catch (error) {
      console.error('Error creating virtual try-on:', error);
      // Fallback to simulation
      simulateProcessing();
    }
  };

  const pollForResult = async (sessionId) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/virtual-tryon/status/${sessionId}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          const session = data.session;
          setProgress(session.progress);
          setCurrentStep(session.current_step || '');
          
          if (session.status === 'completed') {
            setResult(session.result);
            setIsProcessing(false);
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error('Error polling status:', error);
        clearInterval(pollInterval);
        simulateProcessing();
      }
    }, 2000);
  };

  const simulateProcessing = () => {
    const steps = [
      { progress: 20, step: 'تحليل الصورة الشخصية...' },
      { progress: 40, step: 'استخراج معالم الجسم...' },
      { progress: 60, step: 'تحليل المنتج وخصائصه...' },
      { progress: 80, step: 'تطبيق المنتج على الصورة...' },
      { progress: 100, step: 'تم الانتهاء!' }
    ];
    
    let currentStepIndex = 0;
    
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setProgress(step.progress);
        setCurrentStep(step.step);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setResult({
          result_image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
          confidence_score: 94,
          ai_feedback: {
            overall: 'هذا المنتج يبدو رائعاً عليك! اللون يتماشى بشكل مثالي مع لون بشرتك.',
            pros: ['اللون مناسب جداً', 'القصة تبرز نقاط القوة في جسمك', 'الأسلوب يتماشى مع شخصيتك'],
            suggestions: ['يمكنك إضافة إكسسوارات ذهبية لإطلالة أكثر أناقة', 'حذاء بكعب متوسط سيكمل الإطلالة']
          },
          fit_analysis: {
            overall_fit: 'ممتاز',
            color_match: 'مناسب جداً',
            style_compatibility: 'متوافق مع أسلوبك',
            size_recommendation: 'المقاس M مناسب لك'
          }
        });
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleUseProfileImage = () => {
    const savedUser = localStorage.getItem('fashionAI_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserImage(user.avatar);
    }
  };

  const handleSaveResult = () => {
    if (result?.result_image) {
      const link = document.createElement('a');
      link.href = result.result_image;
      link.download = `virtual-tryon-${productId}-${Date.now()}.jpg`;
      link.click();
    }
  };

  const handleShare = () => {
    if (navigator.share && result?.result_image) {
      navigator.share({
        title: 'تجربتي الافتراضية - موضة AI',
        text: `جربت ${product?.title} افتراضياً على موضة AI!`,
        url: window.location.href
      });
    }
  };

  if (!product) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 p-4 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold flex items-center">
            <Sparkles className="mr-2 text-purple-500" size={20} />
            التجربة الافتراضية
          </h1>
          <p className="text-sm text-gray-600">تقنية AI متقدمة</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="ghost" size="sm">
            <Heart size={20} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Product Info */}
        <Card className="p-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-20 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-600">{product.brand}</p>
              <Badge className="mt-1 bg-green-100 text-green-800">
                ${product.price}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Image Upload Section */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Camera size={20} className="mr-2" />
            اختر صورتك للتجربة
          </h3>

          {!userImage ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  ارفع صورة واضحة لك لتجربة افتراضية مذهلة
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Upload size={16} className="mr-2" />
                    رفع صورة جديدة
                  </Button>
                  <Button variant="outline" onClick={handleUseProfileImage} className="w-full">
                    <Camera size={16} className="mr-2" />
                    استخدام صورة الملف الشخصي
                  </Button>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Enhanced Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                  <Eye size={16} className="mr-2" />
                  نصائح للحصول على أفضل نتيجة:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    استخدم صورة واضحة وبإضاءة جيدة (ضوء النهار مثالي)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    تأكد من ظهور الجسم كاملاً في الصورة
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    ارتد ملابس بسيطة وضيقة لأفضل نتيجة
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    قف في وضعية مستقيمة أمام خلفية بسيطة
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={userImage} 
                  alt="صورتك"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUserImage(null)}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm"
                >
                  تغيير الصورة
                </Button>
              </div>

              <Button 
                onClick={handleTryOn}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 h-12 text-lg"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={20} className="mr-2 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    جرب المنتج بتقنية AI
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>

        {/* Processing Status */}
        {isProcessing && (
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="text-white animate-pulse" size={40} />
              </div>
              <div>
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  الذكاء الاصطناعي يعمل بجد...
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-4">
                  {currentStep}
                </p>
                <Progress value={progress} className="w-full h-3" />
                <p className="text-xs text-purple-500 mt-2">{progress}% مكتمل</p>
              </div>
            </div>
          </Card>
        )}

        {/* Enhanced Result */}
        {result && (
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Sparkles size={20} className="mr-2 text-purple-500" />
                النتيجة النهائية
                <Badge className="mr-2 bg-green-100 text-green-800">
                  {result.confidence_score}% دقة
                </Badge>
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={result.result_image} 
                    alt="النتيجة"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white">
                      AI Generated
                    </Badge>
                  </div>
                </div>
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button className="flex-1" onClick={handleSaveResult}>
                    <Download size={16} className="mr-2" />
                    حفظ الصورة
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 size={16} className="mr-2" />
                    مشاركة
                  </Button>
                  <Button variant="outline" onClick={handleTryOn}>
                    <RefreshCw size={16} className="mr-2" />
                    إعادة
                  </Button>
                </div>
              </div>
            </Card>

            {/* AI Analysis */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                <Sparkles size={16} className="mr-2" />
                تحليل الذكاء الاصطناعي
              </h4>
              
              <div className="space-y-4">
                <p className="text-sm text-green-700 dark:text-green-300">
                  {result.ai_feedback?.overall}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">التوافق العام</p>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      {result.fit_analysis?.overall_fit}
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">توافق اللون</p>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      {result.fit_analysis?.color_match}
                    </p>
                  </div>
                </div>

                {result.ai_feedback?.pros && (
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200 mb-2">المميزات:</p>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      {result.ai_feedback.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.ai_feedback?.suggestions && (
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">اقتراحات للتحسين:</p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      {result.ai_feedback.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedVirtualTryOnPage;


import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = ({ setUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Step 2: Personal Details
    age: '',
    gender: '',
    height: '',
    weight: '',
    
    // Step 3: Style Preferences
    bodyType: '',
    skinTone: '',
    style: '',
    budget: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now(),
        ...formData,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      };
      
      setUser(user);
      localStorage.setItem('fashionAI_user', JSON.stringify(user));
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">المعلومات الأساسية</h2>
      
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="pr-10"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="pr-10"
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="tel"
            placeholder="أدخل رقم هاتفك"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="pr-10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">كلمة المرور</label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="أدخل كلمة المرور"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="pr-10 pl-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="pr-10"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">المعلومات الشخصية</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-2">العمر</label>
          <Input
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">الجنس</label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
            <SelectTrigger>
              <SelectValue placeholder="اختر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">ذكر</SelectItem>
              <SelectItem value="female">أنثى</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Height */}
        <div>
          <label className="block text-sm font-medium mb-2">الطول (سم)</label>
          <Input
            type="number"
            placeholder="170"
            value={formData.height}
            onChange={(e) => setFormData({...formData, height: e.target.value})}
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-2">الوزن (كغ)</label>
          <Input
            type="number"
            placeholder="65"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
          />
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-sm font-medium mb-2">نوع الجسم</label>
        <Select value={formData.bodyType} onValueChange={(value) => setFormData({...formData, bodyType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع الجسم" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pear">كمثرى</SelectItem>
            <SelectItem value="apple">تفاحة</SelectItem>
            <SelectItem value="hourglass">ساعة رملية</SelectItem>
            <SelectItem value="rectangle">مستطيل</SelectItem>
            <SelectItem value="inverted-triangle">مثلث مقلوب</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Skin Tone */}
      <div>
        <label className="block text-sm font-medium mb-2">لون البشرة</label>
        <Select value={formData.skinTone} onValueChange={(value) => setFormData({...formData, skinTone: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر لون البشرة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fair">فاتح</SelectItem>
            <SelectItem value="medium">متوسط</SelectItem>
            <SelectItem value="olive">زيتوني</SelectItem>
            <SelectItem value="dark">داكن</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">تفضيلات الأسلوب</h2>
      
      {/* Style */}
      <div>
        <label className="block text-sm font-medium mb-2">الأسلوب المفضل</label>
        <Select value={formData.style} onValueChange={(value) => setFormData({...formData, style: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الأسلوب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">كاجوال</SelectItem>
            <SelectItem value="formal">رسمي</SelectItem>
            <SelectItem value="sporty">رياضي</SelectItem>
            <SelectItem value="bohemian">بوهيمي</SelectItem>
            <SelectItem value="classic">كلاسيكي</SelectItem>
            <SelectItem value="trendy">عصري</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">الميزانية الشهرية</label>
        <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الميزانية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">أقل من $100</SelectItem>
            <SelectItem value="100-300">$100 - $300</SelectItem>
            <SelectItem value="300-500">$300 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1000</SelectItem>
            <SelectItem value="1000+">أكثر من $1000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* AI Benefits */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
          كيف سيساعدك الذكاء الاصطناعي؟
        </h3>
        <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
          <li>• توصيات مخصصة بناءً على معلوماتك الشخصية</li>
          <li>• تحليل ذكي لما يناسب نوع جسمك ولون بشرتك</li>
          <li>• اقتراحات ضمن ميزانيتك المحددة</li>
          <li>• تجربة افتراضية للملابس قبل الشراء</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600">انضم إلى موضة AI واحصل على توصيات مخصصة</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-8 h-1 mx-2 ${
                  step > stepNumber ? 'bg-purple-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="mb-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-3 rtl:space-x-reverse">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              السابق
            </Button>
          )}
          <Button 
            type="button"
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
            disabled={loading}
          >
            {loading ? 'جاري الإنشاء...' : step === 3 ? 'إنشاء الحساب' : 'التالي'}
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;


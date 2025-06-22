import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: 1,
        name: 'سارة أحمد',
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        age: 28,
        height: 165,
        weight: 60,
        gender: 'female',
        style: 'casual'
      };
      
      setUser(user);
      localStorage.setItem('fashionAI_user', JSON.stringify(user));
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth
    console.log('تسجيل الدخول بواسطة Google');
    // هنا سيتم تنفيذ OAuth مع Google
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">مرحباً بعودتك</h1>
          <p className="text-gray-600">سجل دخولك للحصول على توصيات مخصصة</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              تذكرني
            </label>
            <Link to="/forgot-password" className="text-purple-600 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>

          {/* Login Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            disabled={loading}
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">أو</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <Button 
          type="button"
          variant="outline" 
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            className="w-5 h-5 mr-2"
          />
          تسجيل الدخول بواسطة Google
        </Button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-purple-600 hover:underline font-medium">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;


import { useState, useRef } from 'react';
import { Camera, Upload, User, Edit, Save, LogOut, Shield, Bell, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const ProfilePage = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'مستخدم جديد',
    email: user?.email || '',
    phone: user?.phone || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || '',
    skinTone: user?.skinTone || '',
    bodyType: user?.bodyType || '',
    style: user?.style || '',
    favoriteColors: user?.favoriteColors || [],
    budget: user?.budget || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  const fileInputRef = useRef(null);

  const handleSave = () => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('fashionAI_user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fashionAI_user');
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <div className="mb-8">
          <User size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">مرحباً بك في موضة AI</h2>
          <p className="text-gray-600 mb-6">سجل دخولك للحصول على توصيات مخصصة</p>
          <div className="space-y-3">
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              تسجيل الدخول
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/register'}>
              إنشاء حساب جديد
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 text-center">
        <div className="relative inline-block mb-4">
          <img 
            src={profileData.avatar} 
            alt="الصورة الشخصية"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isEditing && (
            <Button
              size="sm"
              className="absolute bottom-0 right-0 rounded-full p-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={16} />
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">{profileData.name}</h2>
        <p className="text-gray-600 mb-4">{profileData.email}</p>
        
        <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-4">
          <Badge variant="secondary">عضو منذ 2024</Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">AI Premium</Badge>
        </div>

        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            <Edit size={16} className="mr-2" />
            {isEditing ? 'إلغاء' : 'تعديل الملف الشخصي'}
          </Button>
          {isEditing && (
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save size={16} className="mr-2" />
              حفظ
            </Button>
          )}
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <User size={20} className="mr-2" />
          المعلومات الشخصية
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">العمر</label>
              <Input
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                disabled={!isEditing}
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الجنس</label>
              <Select 
                value={profileData.gender} 
                onValueChange={(value) => setProfileData({...profileData, gender: value})}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">الطول (سم)</label>
              <Input
                type="number"
                value={profileData.height}
                onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                disabled={!isEditing}
                placeholder="170"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوزن (كغ)</label>
              <Input
                type="number"
                value={profileData.weight}
                onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                disabled={!isEditing}
                placeholder="65"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">نوع الجسم</label>
            <Select 
              value={profileData.bodyType} 
              onValueChange={(value) => setProfileData({...profileData, bodyType: value})}
              disabled={!isEditing}
            >
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

          <div>
            <label className="block text-sm font-medium mb-1">لون البشرة</label>
            <Select 
              value={profileData.skinTone} 
              onValueChange={(value) => setProfileData({...profileData, skinTone: value})}
              disabled={!isEditing}
            >
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
      </Card>

      {/* Style Preferences */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Palette size={20} className="mr-2" />
          تفضيلات الأسلوب
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">الأسلوب المفضل</label>
            <Select 
              value={profileData.style} 
              onValueChange={(value) => setProfileData({...profileData, style: value})}
              disabled={!isEditing}
            >
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

          <div>
            <label className="block text-sm font-medium mb-1">الميزانية الشهرية</label>
            <Select 
              value={profileData.budget} 
              onValueChange={(value) => setProfileData({...profileData, budget: value})}
              disabled={!isEditing}
            >
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
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Shield size={20} className="mr-2" />
          الإعدادات
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الإشعارات</p>
              <p className="text-sm text-gray-600">تلقي إشعارات التوصيات الجديدة</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الوضع الداكن</p>
              <p className="text-sm text-gray-600">تفعيل الوضع الداكن للتطبيق</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">مشاركة البيانات</p>
              <p className="text-sm text-gray-600">مشاركة البيانات لتحسين التوصيات</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-4">
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          تسجيل الخروج
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;


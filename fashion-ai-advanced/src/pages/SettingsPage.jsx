import { Settings, User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">الإعدادات</h1>
        <p className="text-gray-600">تخصيص تجربتك في موضة AI</p>
      </div>

      {/* Account Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <User size={20} className="mr-2" />
          إعدادات الحساب
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تحديث الملف الشخصي</p>
              <p className="text-sm text-gray-600">تعديل معلوماتك الشخصية</p>
            </div>
            <Button variant="outline" size="sm">
              تعديل
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تغيير كلمة المرور</p>
              <p className="text-sm text-gray-600">تحديث كلمة المرور الخاصة بك</p>
            </div>
            <Button variant="outline" size="sm">
              تغيير
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Bell size={20} className="mr-2" />
          إعدادات الإشعارات
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">التوصيات الجديدة</p>
              <p className="text-sm text-gray-600">إشعارات عند وجود توصيات جديدة</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">العروض والخصومات</p>
              <p className="text-sm text-gray-600">إشعارات العروض الخاصة</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تحديثات المنتجات</p>
              <p className="text-sm text-gray-600">إشعارات عند توفر منتجات جديدة</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Palette size={20} className="mr-2" />
          إعدادات المظهر
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الوضع الداكن</p>
              <p className="text-sm text-gray-600">تفعيل الوضع الداكن للتطبيق</p>
            </div>
            <Switch />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">حجم الخط</label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">صغير</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="large">كبير</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Language Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Globe size={20} className="mr-2" />
          إعدادات اللغة
        </h3>
        
        <div>
          <label className="block text-sm font-medium mb-2">اللغة</label>
          <Select defaultValue="ar">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Shield size={20} className="mr-2" />
          إعدادات الخصوصية
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">مشاركة البيانات</p>
              <p className="text-sm text-gray-600">مشاركة البيانات لتحسين التوصيات</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تتبع النشاط</p>
              <p className="text-sm text-gray-600">تتبع نشاطك لتحسين الخدمة</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">الملف الشخصي العام</p>
              <p className="text-sm text-gray-600">إظهار ملفك الشخصي للآخرين</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* AI Settings */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <Settings size={20} className="mr-2" />
          إعدادات الذكاء الاصطناعي
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">مستوى التخصيص</label>
            <Select defaultValue="high">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">منخفض</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">التوصيات التلقائية</p>
              <p className="text-sm text-gray-600">توصيات يومية مخصصة</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">التحليل المتقدم</p>
              <p className="text-sm text-gray-600">تحليل عميق للتفضيلات</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Support */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <HelpCircle size={20} className="mr-2" />
          الدعم والمساعدة
        </h3>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            الأسئلة الشائعة
          </Button>
          <Button variant="outline" className="w-full justify-start">
            تواصل معنا
          </Button>
          <Button variant="outline" className="w-full justify-start">
            تقييم التطبيق
          </Button>
          <Button variant="outline" className="w-full justify-start">
            شروط الاستخدام
          </Button>
          <Button variant="outline" className="w-full justify-start">
            سياسة الخصوصية
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4 text-center">
        <p className="text-sm text-gray-600 mb-2">موضة AI</p>
        <p className="text-xs text-gray-500">الإصدار 1.0.0</p>
      </Card>
    </div>
  );
};

export default SettingsPage;


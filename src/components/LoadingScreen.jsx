import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles size={40} className="text-white animate-spin" />
          </div>
          <h1 className="text-4xl font-bold mb-2">موضة AI</h1>
          <p className="text-lg opacity-90">منصة الذكاء الاصطناعي للأزياء</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm opacity-75">جاري التحميل... {progress}%</p>
        </div>

        {/* Loading Messages */}
        <div className="mt-8">
          <p className="text-sm opacity-75 animate-pulse">
            {progress < 30 && "تحضير التوصيات الذكية..."}
            {progress >= 30 && progress < 60 && "تحليل أحدث صيحات الموضة..."}
            {progress >= 60 && progress < 90 && "تخصيص التجربة لك..."}
            {progress >= 90 && "تم التحميل بنجاح!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;


import { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Gift, Copy, Share2, Download, Eye, BarChart3, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EarningsPage = () => {
  const [earnings, setEarnings] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 'user_123'; // In real app, get from auth context

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      
      // Fetch all earnings-related data
      const [earningsRes, referralRes, affiliateRes, analyticsRes, leaderboardRes] = await Promise.all([
        fetch(`http://localhost:5000/api/earnings/${userId}`),
        fetch(`http://localhost:5000/api/referral-code/${userId}`),
        fetch(`http://localhost:5000/api/affiliate-links/${userId}`),
        fetch(`http://localhost:5000/api/earnings-analytics/${userId}`),
        fetch('http://localhost:5000/api/leaderboard')
      ]);

      const earningsData = await earningsRes.json();
      const referralData = await referralRes.json();
      const affiliateData = await affiliateRes.json();
      const analyticsData = await analyticsRes.json();
      const leaderboardData = await leaderboardRes.json();

      if (earningsData.status === 'success') setEarnings(earningsData.earnings);
      if (referralData.status === 'success') setReferralCode(referralData);
      if (affiliateData.status === 'success') setAffiliateLinks(affiliateData.affiliate_links);
      if (analyticsData.status === 'success') setAnalytics(analyticsData.analytics);
      if (leaderboardData.status === 'success') setLeaderboard(leaderboardData.leaderboard);

    } catch (error) {
      console.error('Error fetching earnings data:', error);
      // Fallback to mock data
      setEarnings({
        total_earnings: 156.75,
        pending_earnings: 23.50,
        paid_earnings: 133.25,
        referral_count: 8,
        commission_earnings: 89.25,
        bonus_earnings: 67.50,
        transactions: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferralCode = () => {
    if (referralCode?.referral_link) {
      navigator.clipboard.writeText(referralCode.referral_link);
      alert('تم نسخ رابط الإحالة!');
    }
  };

  const handleShareReferralCode = () => {
    if (navigator.share && referralCode?.referral_link) {
      navigator.share({
        title: 'انضم إلى موضة AI',
        text: 'اكتشف أحدث صيحات الموضة مع الذكاء الاصطناعي!',
        url: referralCode.referral_link
      });
    }
  };

  const handleWithdrawRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/withdraw-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          amount: earnings?.total_earnings || 0,
          payment_method: 'paypal',
          payment_details: { email: 'user@example.com' }
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        alert('تم إرسال طلب السحب بنجاح!');
        fetchEarningsData(); // Refresh data
      }
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      alert('حدث خطأ في إرسال طلب السحب');
    }
  };

  const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
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
        <h1 className="text-xl font-bold flex items-center">
          <DollarSign className="mr-2 text-green-500" size={24} />
          الأرباح والإحالات
        </h1>
        <p className="text-sm text-gray-600 mt-1">تتبع أرباحك وإحالاتك</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Earnings Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="text-center">
              <DollarSign size={24} className="mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-700">${earnings?.total_earnings || 0}</p>
              <p className="text-xs text-green-600">إجمالي الأرباح</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <div className="text-center">
              <Users size={24} className="mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-700">{earnings?.referral_count || 0}</p>
              <p className="text-xs text-blue-600">الإحالات الناجحة</p>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <BarChart3 size={16} className="mr-2" />
            ملخص الأرباح
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">الأرباح المعلقة</span>
              <span className="font-medium text-orange-600">${earnings?.pending_earnings || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">الأرباح المدفوعة</span>
              <span className="font-medium text-green-600">${earnings?.paid_earnings || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">أرباح العمولات</span>
              <span className="font-medium">${earnings?.commission_earnings || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">المكافآت</span>
              <span className="font-medium text-purple-600">${earnings?.bonus_earnings || 0}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500"
            onClick={handleWithdrawRequest}
            disabled={!earnings?.total_earnings || earnings.total_earnings < 10}
          >
            <Download size={16} className="mr-2" />
            طلب سحب الأرباح
          </Button>
          {earnings?.total_earnings < 10 && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              الحد الأدنى للسحب $10
            </p>
          )}
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="referrals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="referrals">الإحالات</TabsTrigger>
            <TabsTrigger value="affiliate">الروابط</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Users size={16} className="mr-2" />
                رابط الإحالة الخاص بك
              </h3>
              
              {referralCode && (
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm font-mono break-all">{referralCode.referral_link}</p>
                  </div>
                  
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={handleCopyReferralCode} className="flex-1">
                      <Copy size={14} className="mr-1" />
                      نسخ
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShareReferralCode} className="flex-1">
                      <Share2 size={14} className="mr-1" />
                      مشاركة
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <p className="font-semibold">{referralCode.stats?.total_uses || 0}</p>
                      <p className="text-gray-600">النقرات</p>
                    </div>
                    <div>
                      <p className="font-semibold">{referralCode.stats?.successful_referrals || 0}</p>
                      <p className="text-gray-600">التسجيلات</p>
                    </div>
                    <div>
                      <p className="font-semibold">${referralCode.stats?.earnings_per_referral || 0}</p>
                      <p className="text-gray-600">لكل إحالة</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Referral Benefits */}
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center">
                <Gift size={16} className="mr-2" />
                مزايا الإحالة
              </h4>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  احصل على $5 لكل صديق يسجل باستخدام رابطك
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  عمولة 5% من مشتريات أصدقائك
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  مكافآت إضافية عند الوصول لأهداف شهرية
                </li>
              </ul>
            </Card>
          </TabsContent>

          {/* Affiliate Links Tab */}
          <TabsContent value="affiliate" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">الروابط التابعة</h3>
              <div className="space-y-3">
                {affiliateLinks.slice(0, 5).map((link, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{link.product_name}</h4>
                        <p className="text-xs text-gray-600">{link.brand}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {link.commission_rate}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs text-center mb-2">
                      <div>
                        <p className="font-semibold">{link.clicks}</p>
                        <p className="text-gray-600">نقرة</p>
                      </div>
                      <div>
                        <p className="font-semibold">{link.conversions}</p>
                        <p className="text-gray-600">تحويل</p>
                      </div>
                      <div>
                        <p className="font-semibold">${link.earnings}</p>
                        <p className="text-gray-600">أرباح</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigator.clipboard.writeText(link.affiliate_link)}>
                      <Copy size={12} className="mr-1" />
                      نسخ الرابط
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            {analytics && (
              <>
                {/* Earnings Chart */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">الأرباح اليومية (آخر 30 يوم)</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analytics.daily_earnings?.slice(-7) || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Earnings Sources */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">مصادر الأرباح</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.earnings_by_source || {}).map(([source, amount], index) => (
                      <div key={source} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{source}</span>
                        <span className="font-medium">${amount}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Top Performing Links */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <TrendingUp size={16} className="mr-2" />
                    أفضل الروابط أداءً
                  </h3>
                  <div className="space-y-2">
                    {analytics.top_performing_links?.map((link, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="flex-1 truncate">{link.product}</span>
                        <span className="font-medium text-green-600">${link.earnings}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Leaderboard */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Award size={16} className="mr-2 text-yellow-500" />
            لوحة المتصدرين
          </h3>
          <div className="space-y-2">
            {leaderboard.slice(0, 5).map((user, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    index === 2 ? 'bg-orange-400 text-orange-900' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.user_name}</p>
                    <p className="text-xs text-gray-600">{user.referrals} إحالة</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${user.total_earnings}</p>
                  <Badge className="text-xs">{user.badge}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievement Goals */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h3 className="font-semibold mb-3 flex items-center text-blue-700 dark:text-blue-300">
            <Target size={16} className="mr-2" />
            أهدافك الشهرية
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>الإحالات (8/15)</span>
                <span>53%</span>
              </div>
              <Progress value={53} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>الأرباح ($156/$300)</span>
                <span>52%</span>
              </div>
              <Progress value={52} className="h-2" />
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              أكمل أهدافك واحصل على مكافأة $50 إضافية!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EarningsPage;


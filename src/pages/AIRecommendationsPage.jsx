import React, { useState, useEffect } from 'react';
import { fetchRecommendations } from '../lib/api';

const AIRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 'user_123'; // استخدم معرف المستخدم الفعلي لديك هنا

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      const data = await fetchRecommendations(userId);
      setRecommendations(data);
      setLoading(false);
    };
    getRecommendations();
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">توصيات الذكاء الاصطناعي</h1>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : recommendations.length === 0 ? (
        <p>لا توجد توصيات.</p>
      ) : (
        <ul>
          {recommendations.map((item) => (
            <li key={item.id}>
              <p>{item.name} - نسبة التطابق: {item.match_percentage}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AIRecommendationsPage;

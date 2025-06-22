import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Components
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import LoadingScreen from './components/LoadingScreen';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import EnhancedVirtualTryOnPage from './pages/EnhancedVirtualTryOnPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SettingsPage from './pages/SettingsPage';
import AIRecommendationsPage from './pages/AIRecommendationsPage';
import SmartSearchPage from './pages/SmartSearchPage';
import EarningsPage from './pages/EarningsPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Check for existing user session
    const savedUser = localStorage.getItem('fashionAI_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header user={user} />
        
        <main className="pb-16 pt-16">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/search" element={<SmartSearchPage />} />
            <Route path="/ai-recommendations" element={<AIRecommendationsPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="/virtual-try-on/:productId" element={<EnhancedVirtualTryOnPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StatusProvider } from './context/StatusContext';
import { AuthProvider } from './context/AuthContext';
import CoursesPage from './components/CoursesPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import SurveyPage from './components/SurveyPage';
import AuthModal from './components/AuthModal';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <StatusProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-[rgb(var(--color-surface))] text-[rgb(var(--color-text))] transition-colors duration-300">
              <Navigation />
              
              {/* Main Content */}
              <main>
                <Routes>
                  <Route path="/" element={
                    <div className="flex flex-col items-center justify-center gap-4 mt-20 p-4">
                      <h1 className="text-4xl font-bold text-center">Welcome to WebDev Academy</h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl">
                        Master web development with our comprehensive courses designed by expert instructors
                      </p>
                      <a href="/courses" className="btn-primary rounded px-6 py-3 text-lg">
                        Browse Courses
                      </a>
                    </div>
                  } />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/survey" element={<SurveyPage />} />
                </Routes>
              </main>
            </div>
          </Router>
          <AuthModal />
        </CartProvider>
      </AuthProvider>
    </StatusProvider>
  );
};

export default App;

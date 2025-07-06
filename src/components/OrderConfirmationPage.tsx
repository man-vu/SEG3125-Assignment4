import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Generate a random order number
  const orderNumber = `IELTS-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !currentUser) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          {/* Confirmation Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Thank you for your purchase. Your order has been confirmed and you'll receive access to your courses immediately.
          </p>
          
          {/* Order Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Order Number</p>
                <p className="font-medium text-gray-900 dark:text-white">{orderNumber}</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{orderDate}</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.email}</p>
              </div>
              
              <div>
                <p className="text-gray-500 dark:text-gray-400">Payment Method</p>
                <p className="font-medium text-gray-900 dark:text-white">Credit Card (•••• 1234)</p>
              </div>
            </div>
          </div>
          
          {/* Receipt & Course Access */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <Button variant="outline" className="space-x-2">
              <span>Download Receipt</span>
            </Button>
            
            <Link to="/dashboard/my-courses">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Access My Courses</span>
              </Button>
            </Link>
          </div>
          
          {/* Support Info */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>Have questions about your order?</p>
            <p>Contact our support team at <a href="mailto:support@ieltsacademy.com" className="text-purple-600 dark:text-purple-400 hover:underline">support@ieltsacademy.com</a></p>
          </div>
          
          {/* Continue Shopping */}
          <div className="mt-8">
            <Link to="/courses">
              <Button variant="link" className="text-purple-600 dark:text-purple-400">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);
  
  // Calculate discount (if applicable)
  const originalTotal = cart.reduce((sum, item) => {
    const originalPrice = item.price.original || item.price.current;
    return sum + (originalPrice * item.quantity);
  }, 0);
  
  const discount = originalTotal - subtotal;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    navigate('/checkout');
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Cart
        </h1>
        
        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-8/12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                    {/* Course Thumbnail */}
                    <div className="w-full sm:w-40 h-32 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                      <img
                        src={item.thumbnail || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xODcuNSAxMTIuNUwyMTIuNSA5N1YxMjhMMTg3LjUgMTEyLjVaIiBmaWxsPSIjOTMzM0VBIi8+CjwvU3ZnPgo="}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Course Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <Link to={`/courses/${item.id}`} className="text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                          {item.title}
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white">
                            ${item.price.current}
                          </span>
                          {item.price.original && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              ${item.price.original}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {item.instructor.name}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto justify-between items-end pt-4">
                        <div className="flex items-center">
                          <label className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                            Quantity:
                          </label>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="py-1 px-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          >
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Clear Cart Button */}
              <div className="flex justify-end mt-6">
                <Button 
                  variant="outline" 
                  className="text-gray-600 dark:text-gray-400"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-4/12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <Link to="/courses">
                  <Button 
                    variant="link" 
                    className="w-full mt-4 text-purple-600 dark:text-purple-400"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
              
              {/* Payment Methods */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  We Accept
                </h3>
                <div className="flex gap-2">
                  <div className="w-12 h-8 bg-blue-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-blue-800 dark:text-blue-300">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-red-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-red-800 dark:text-red-300">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-blue-900 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-white">
                    AMEX
                  </div>
                  <div className="w-12 h-8 bg-yellow-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs font-medium text-yellow-800 dark:text-yellow-300">
                    PP
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any courses yet.
            </p>
            <Link to="/courses">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 text-lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

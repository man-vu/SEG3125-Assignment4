import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useStatus } from '@/context/StatusContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Users, BookOpen, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { getCourseById, Course } from '@/data/courses';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const { addToCart, isInCart } = useCart();
  const { showStatus } = useStatus();
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [pendingCheckout, setPendingCheckout] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (courseId) {
          const courseData = getCourseById(courseId);
          
          if (courseData) {
            setCourse(courseData);
            
            // Mock reviews
            setReviews([
              {
                id: '1',
                userName: 'Sarah Johnson',
                userAvatar: '',
                rating: 5,
                date: '2025-05-15',
                comment: 'This course was incredibly helpful for my web development journey. I went from beginner to building full-stack applications!'
              },
              {
                id: '2',
                userName: 'Michael Chen',
                userAvatar: '',
                rating: 4,
                date: '2025-05-10',
                comment: 'Great explanations and practice materials. Would recommend more speaking exercises though.'
              }
            ]);
          } else {
            showStatus('Course not found', 'error');
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
        showStatus('Failed to load course details', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleAddToCart = () => {
    if (!course) return;
    
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      instructor: {
        name: course.instructor.name
      },
      thumbnail: course.thumbnail,
      quantity: 1
    });
  };

  const handleEnrollNow = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!course) return;
    if (!isInCart(course.id)) {
      handleAddToCart();
      setPendingCheckout(true);
    } else {
      navigate('/checkout');
    }
  };

  useEffect(() => {
    if (pendingCheckout && course && isInCart(course.id)) {
      setPendingCheckout(false);
      navigate('/checkout');
    }
  }, [pendingCheckout, course, isInCart, navigate]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Course Overview */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-7/12 space-y-6">
              {/* Course badges */}
              <div className="flex gap-2">
                {course.isBestseller && (
                  <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                )}
                {course.isPopular && (
                  <Badge className="bg-red-500 text-white">Popular</Badge>
                )}
                <Badge variant="outline" className="text-white border-white">
                  {course.level}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {course.category}
                </Badge>
              </div>
              
              {/* Course title */}
              <h1 className="text-4xl font-bold">{course.title}</h1>
              
              {/* Course description */}
              <p className="text-lg opacity-90">{course.description}</p>
              
              {/* Course stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {renderStars(course.rating)}
                  </div>
                  <span>({course.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              {/* Instructor */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <p>Created by <span className="font-semibold">{course.instructor.name}</span></p>
                </div>
              </div>
            </div>
            
            {/* Course Card */}
            <div className="w-full lg:w-5/12">
              <Card className="bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
                {/* Course Image */}
                <div className="aspect-video w-full relative overflow-hidden">
                  <img
                    src={course.thumbnail || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xODcuNSAxMTIuNUwyMTIuNSA5N1YxMjhMMTg3LjUgMTEyLjVaIiBmaWxsPSIjOTMzM0VBIi8+CjwvU3ZnPgo="}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Course Price and Enrollment */}
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${course.price.current}
                    </span>
                    {course.price.original && (
                      <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                        ${course.price.original}
                      </span>
                    )}
                    {course.price.original && (
                      <Badge className="ml-2 bg-green-600 text-white">
                        {Math.round((1 - course.price.current / course.price.original) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
                      onClick={handleEnrollNow}
                    >
                      Enroll Now
                    </Button>
                    
                    {!isInCart(course.id) ? (
                      <Button 
                        variant="outline" 
                        className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 py-6 text-lg"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full border-gray-300 text-gray-500 py-6 text-lg cursor-default"
                        disabled
                      >
                        Added to Cart
                      </Button>
                    )}
                  </div>
                  
                  {/* Course includes */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">This course includes:</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Full lifetime access</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content - Main Course Info */}
          <div className="w-full lg:w-8/12 space-y-12">
            {/* What You'll Learn */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Course Description */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {course.longDescription || course.description}
                </p>
              </div>
            </section>
            
            {/* Student Reviews */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
                <div className="flex items-center gap-1">
                  {renderStars(course.rating)}
                  <span className="text-lg font-semibold ml-1">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-12">
                      {review.comment}
                    </p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;

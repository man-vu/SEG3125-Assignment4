import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatus } from '@/context/StatusContext';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Users, BookOpen, Play, Award, Globe, Filter, Search, DollarSign, TrendingUp } from 'lucide-react';
import { coursesData, Course } from '@/data/courses';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { showStatus } = useStatus();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Faceted Search Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity');

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      showStatus('Courses loaded', 'success');
      setLoading(false);
    }, 500);
  }, []);

  // Get unique values for filters
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = Array.from(new Set(courses.map(course => course.level)));
  const durations = Array.from(new Set(courses.map(course => course.duration)));
  const maxPrice = Math.max(...courses.map(course => course.price.current));

  // Apply faceted search filters
  useEffect(() => {
    let filtered = courses;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => selectedCategories.includes(course.category));
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course => selectedLevels.includes(course.level));
    }

    // Price range filter
    filtered = filtered.filter(course => 
      course.price.current >= priceRange[0] && course.price.current <= priceRange[1]
    );

    // Duration filter
    if (selectedDurations.length > 0) {
      filtered = filtered.filter(course => selectedDurations.includes(course.duration));
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(course => selectedRatings.includes(Math.floor(course.rating)));
    }

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price.current - b.price.current);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price.current - a.price.current);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'students':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => {
          const aScore = (a.isPopular ? 10 : 0) + (a.isBestseller ? 5 : 0) + a.rating;
          const bScore = (b.isPopular ? 10 : 0) + (b.isBestseller ? 5 : 0) + b.rating;
          return bScore - aScore;
        });
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedCategories, selectedLevels, priceRange, selectedDurations, selectedRatings, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDurations(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedRatings([]);
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
    setSortBy('popularity');
  };

  const renderStars = (rating: number, count: number) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {rating} ({(count ?? 0).toLocaleString()})
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-500"></div>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Loading courses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Enhanced Communication */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Web Development with Expert Guidance! 🚀
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join 50,000+ successful developers who launched their careers with our proven methods
          </p>
          
          {/* Incite to Action Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-3">🔥 Limited Time Offer!</h2>
            <p className="text-lg mb-4">
              Get up to 40% off on our most popular courses. Don't miss this opportunity to transform your coding career!
            </p>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 text-lg"
              onClick={() => {
                setSelectedCategories(['Full Stack']);
                setShowFilters(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              🚀 Start Your Coding Journey Today!
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>50,000+ Developers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Sort Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, instructors, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="students">Most Students</option>
            </select>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Faceted Search Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="text-sm"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty Level</h4>
                <div className="space-y-2">
                  {levels.map(level => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => handleLevelChange(level)}
                      />
                      <label htmlFor={`level-${level}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Duration</h4>
                <div className="space-y-2">
                  {durations.map(duration => (
                    <div key={duration} className="flex items-center space-x-2">
                      <Checkbox
                        id={`duration-${duration}`}
                        checked={selectedDurations.includes(duration)}
                        onCheckedChange={() => handleDurationChange(duration)}
                      />
                      <label htmlFor={`duration-${duration}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <Separator className="my-6" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
              <div className="flex flex-wrap gap-3">
                {[4, 4.5, 4.8, 4.9].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => handleRatingChange(rating)}
                    />
                    <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex items-center">
                      {rating}+ <Star className="w-4 h-4 text-yellow-400 ml-1" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          {(selectedCategories.length > 0 || selectedLevels.length > 0 || selectedDurations.length > 0 || selectedRatings.length > 0 || searchQuery) && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category} ×
                </Badge>
              ))}
              {selectedLevels.map(level => (
                <Badge key={level} variant="secondary" className="text-xs">
                  {level} ×
                </Badge>
              ))}
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  "{searchQuery}" ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-xl transition-all duration-300 group overflow-hidden">
              {/* Course Thumbnail */}
              <div 
                className="relative overflow-hidden cursor-pointer" 
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <img
                  src={course.thumbnail || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xODcuNSAxMTIuNUwyMTIuNSA5N1YxMjhMMTg3LjUgMTEyLjVaIiBmaWxsPSIjOTMzM0VBIi8+CjwvU3ZnPgo="}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {course.isBestseller && (
                    <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                  )}
                  {course.isPopular && (
                    <Badge className="bg-red-500 text-white">Popular</Badge>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                  {renderStars(Math.floor(course.rating), course.reviewCount)}
                </div>
                <CardTitle 
                  className="text-lg leading-tight mb-2 cursor-pointer hover:text-purple-600 transition-colors duration-200"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  {course.title}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Instructor */}
                <div className="flex items-center space-x-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                      {course.instructor.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {course.instructor.experience}
                    </p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Duration</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{(course.students ?? 0).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-300">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-medium">{course.skills.length}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Skills</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {course.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{course.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {course.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ${course.price.current}
                    </span>
                    {course.price.original && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ${course.price.original}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters to see more courses
            </p>
            <Button onClick={clearAllFilters} className="bg-purple-600 hover:bg-purple-700 text-white">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Enhanced CTA Section with Connection Language */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your IELTS Journey? 🌟</h2>
          <p className="text-lg mb-6 opacity-90">
            We'd love to hear about your experience! Join our community of successful learners and share your story with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => {
                clearAllFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Explore All Courses
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3"
              onClick={() => navigate('/survey')}
            >
              Share Your Experience
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatus } from '@/context/StatusContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, MessageCircle, Users, Award, CheckCircle } from 'lucide-react';

interface SurveyData {
  name: string;
  email: string;
  experience: string;
  rating: number;
  courseInterests: string[];
  feedback: string;
  wouldRecommend: boolean;
  improvementSuggestions: string;
}

const SurveyPage: React.FC = () => {
  const navigate = useNavigate();
  const { showStatus } = useStatus();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: '',
    email: '',
    experience: '',
    rating: 0,
    courseInterests: [],
    feedback: '',
    wouldRecommend: false,
    improvementSuggestions: ''
  });

  const courseCategories = [
    'Full Stack', 'Frontend', 'Backend', 'JavaScript', 'Database', 
    'DevOps', 'Security', 'Mobile', 'Testing', 'Performance', 'Tools', 'Accessibility'
  ];

  const experienceLevels = [
    'Complete Beginner',
    'Some Experience',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  const handleInputChange = (field: keyof SurveyData, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseInterestToggle = (category: string) => {
    setSurveyData(prev => ({
      ...prev,
      courseInterests: prev.courseInterests.includes(category)
        ? prev.courseInterests.filter(c => c !== category)
        : [...prev.courseInterests, category]
    }));
  };

  const handleSubmit = () => {
    // Simulate survey submission
    showStatus('Thank you for your valuable feedback! 🌟', 'success');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
            onClick={() => interactive && handleInputChange('rating', star)}
          />
        ))}
      </div>
    );
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Basic Info', icon: Users },
      { number: 2, title: 'Experience', icon: MessageCircle },
      { number: 3, title: 'Feedback', icon: Heart }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                currentStep >= step.number
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                <step.icon className="w-6 h-6" />
              </div>
              <span className="text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 transition-colors ${
                currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Engaging Language */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            We'd Love to Hear From You! 💬
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Your feedback helps us create better learning experiences for developers like you. 
            Share your thoughts and help shape the future of web development education!
          </p>
          
          {/* Connection Language Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3">
              Join Our Community of Successful Developers! 🌟
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Every piece of feedback makes a difference. Together, we're building a world-class 
              learning platform that transforms careers and opens doors to new opportunities.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Survey Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
              {currentStep === 1 && "Tell Us About Yourself"}
              {currentStep === 2 && "Share Your Experience"}
              {currentStep === 3 && "Help Us Improve"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What's your name? *
                  </label>
                  <input
                    type="text"
                    value={surveyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={surveyData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What's your current web development experience level? *
                  </label>
                  <select
                    value={surveyData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Which course categories interest you most? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {courseCategories.map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCourseInterestToggle(category)}
                        className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                          surveyData.courseInterests.includes(category)
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How would you rate your overall experience with our platform? *
                  </label>
                  <div className="text-center">
                    {renderStars(surveyData.rating, true)}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {surveyData.rating === 0 && "Click the stars to rate"}
                      {surveyData.rating > 0 && `${surveyData.rating} out of 5 stars`}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What aspects of our platform did you find most valuable?
                  </label>
                  <textarea
                    value={surveyData.feedback}
                    onChange={(e) => handleInputChange('feedback', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Share what you loved about our courses, instructors, or platform features..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Would you recommend our platform to friends or colleagues? *
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('wouldRecommend', true)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                        surveyData.wouldRecommend === true
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                      Yes, definitely!
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('wouldRecommend', false)}
                      className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                        surveyData.wouldRecommend === false
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300'
                      }`}
                    >
                      <Heart className="w-6 h-6 mx-auto mb-2" />
                      Maybe, with improvements
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How can we make our platform even better for you?
                  </label>
                  <textarea
                    value={surveyData.improvementSuggestions}
                    onChange={(e) => handleInputChange('improvementSuggestions', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your suggestions help us improve and create better learning experiences..."
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Survey Summary
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Name:</strong> {surveyData.name || 'Not provided'}</p>
                    <p><strong>Experience Level:</strong> {surveyData.experience || 'Not selected'}</p>
                    <p><strong>Rating:</strong> {surveyData.rating > 0 ? `${surveyData.rating}/5 stars` : 'Not rated'}</p>
                    <p><strong>Would Recommend:</strong> {
                      surveyData.wouldRecommend === true ? 'Yes, definitely!' :
                      surveyData.wouldRecommend === false ? 'Maybe, with improvements' : 'Not answered'
                    }</p>
                    <p><strong>Interested Categories:</strong> {surveyData.courseInterests.length > 0 ? surveyData.courseInterests.join(', ') : 'None selected'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!surveyData.name || !surveyData.email || !surveyData.experience}
                >
                  Submit Survey
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer with Connection Language */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for taking the time to share your thoughts with us! 💝
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Your feedback directly influences how we improve our platform and help more students succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 
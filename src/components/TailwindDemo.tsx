import React from 'react';

/**
 * Demo component showcasing Tailwind CSS with Chakra UI-inspired design patterns
 **/

const TailwindDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section - Chakra UI inspired */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tailwind CSS + Chakra UI Demo
          </h1>
          <p className="text-lg text-gray-600">
            Professional styling system now available
          </p>
        </div>

        {/* Card Grid Layout - Elegant and Modern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 text-white text-xl">
              <span>⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Fast Development
            </h3>
            <p className="text-gray-600 mb-4">
              Rapid styling with utility-first approach, perfect for modern web applications.
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Get Started
            </button>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 text-white text-xl">
              <span>🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600 mb-4">
              Built-in responsive breakpoints for seamless mobile and desktop experiences.
            </p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 text-white text-xl">
              <span>🛠</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Developer Friendly
            </h3>
            <p className="text-gray-600 mb-4">
              Intuitive utility classes that work alongside Chakra UI design systems.
            </p>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Explore Tools
            </button>
          </div>
        </div>

        {/* Enhanced UI Elements */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What You Can Build
          </h2>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✅ Responsive
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              📱 Mobile-First
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              🎨 Customizable
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              ⚡ Fast
            </span>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Development Speed</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{width: '95%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Responsiveness</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Customization</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TailwindDemo;

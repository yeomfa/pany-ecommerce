import { Star, Heart, Coffee, Award } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Bakery background"
            className="h-full w-full object-cover object-center opacity-30"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
            The Art of Baking
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            At Pany, we believe that every loaf of bread tells a story. A story
            of tradition, patience, and the finest ingredients.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif mb-6">
              Our Story
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-6">
              Founded in 2023, Pany began as a small home kitchen project driven
              by a passion for authentic sourdough. What started as a weekend
              hobby quickly grew into a community favorite.
            </p>
            <p className="text-lg leading-8 text-gray-600">
              We are dedicated to reviving age-old baking techniques while
              embracing modern flavors. Our bakers arrive before dawn every day
              to ensure that when you walk through our doors, you are greeted by
              the warm, comforting aroma of freshly baked goods.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515823808611-65fd8e56c71a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bakers at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We don't just bake bread; we cultivate experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality First
              </h3>
              <p className="text-gray-600">
                We never compromise on ingredients. Only the best flour, butter,
                and yeast enter our kitchen.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Made with Love
              </h3>
              <p className="text-gray-600">
                Every pastry is shaped by hand with care and attention to
                detail.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                We are more than a bakery; we are a gathering place for friends
                and neighbors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for perfection in every crust, crumb, and flake.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

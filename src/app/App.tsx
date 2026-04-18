import { useState, useMemo } from "react";
import {
  Globe, Shield, Award, Clock, Menu, X, Plane, Search,
  MapPin, Star, Calendar, Users, Mail, Phone, User,
  Facebook, Twitter, Instagram, Filter
} from "lucide-react";

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  days: number;
  category: string;
  description: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Destination data
  const allDestinations: Destination[] = [
    {
      id: 1,
      name: "Swiss Alps Adventure",
      location: "Switzerland",
      image: "https://images.unsplash.com/photo-1631684188521-28b3fd9f40e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 2499,
      rating: 4.9,
      days: 7,
      category: "Mountain",
      description: "Experience breathtaking alpine views, pristine valleys, and world-class hiking trails in the heart of the Swiss Alps."
    },
    {
      id: 2,
      name: "Maldives Paradise",
      location: "Maldives",
      image: "https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 3299,
      rating: 5.0,
      days: 5,
      category: "Beach",
      description: "Luxury overwater villas, crystal-clear turquoise waters, and pristine white sand beaches await you in this tropical paradise."
    },
    {
      id: 3,
      name: "Chicago Urban Explorer",
      location: "United States",
      image: "https://images.unsplash.com/photo-1760440315603-5d313f74a67b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 1899,
      rating: 4.7,
      days: 4,
      category: "City",
      description: "Discover iconic architecture, world-class museums, vibrant culture, and stunning lakefront views in the Windy City."
    },
    {
      id: 4,
      name: "Sahara Desert Odyssey",
      location: "Morocco",
      image: "https://images.unsplash.com/photo-1762813327166-0015a9b89408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 2799,
      rating: 4.8,
      days: 6,
      category: "Desert",
      description: "Embark on a journey through golden sand dunes, ancient kasbahs, and experience traditional Berber culture under starlit skies."
    },
    {
      id: 5,
      name: "Rainbow Mountain Trek",
      location: "Peru",
      image: "https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 1999,
      rating: 4.8,
      days: 5,
      category: "Mountain",
      description: "Trek through stunning landscapes to witness the colorful geological wonder of Vinicunca, the Rainbow Mountain of Peru."
    },
    {
      id: 6,
      name: "Tropical Beach Escape",
      location: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1660207766597-b3ea1c6d5c37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 2199,
      rating: 4.9,
      days: 7,
      category: "Beach",
      description: "Relax on pristine beaches, explore ancient temples, and immerse yourself in the rich Balinese culture and cuisine."
    },
    {
      id: 7,
      name: "Desert Rock Formations",
      location: "Arizona, USA",
      image: "https://images.unsplash.com/photo-1768519926223-fea09f9d74fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 1599,
      rating: 4.6,
      days: 4,
      category: "Desert",
      description: "Explore dramatic desert landscapes, towering red rock formations, and experience stunning sunsets in the American Southwest."
    },
    {
      id: 8,
      name: "European City Tour",
      location: "Germany",
      image: "https://images.unsplash.com/photo-1761472871833-16399fde43fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 2899,
      rating: 4.7,
      days: 8,
      category: "City",
      description: "Journey through historic European cities, experiencing rich culture, stunning architecture, and world-renowned cuisine."
    }
  ];

  const categories = ["All", "Mountain", "Beach", "City", "Desert"];

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let result = [...allDestinations];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((dest) => dest.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popular - keep original order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to destinations section
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Plane className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TravelHub</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
                Destinations
              </a>
              <a href="#packages" className="text-gray-700 hover:text-blue-600 transition-colors">
                Packages
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </a>
                <a href="#destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Destinations
                </a>
                <a href="#packages" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Packages
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </a>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1764022398523-cb127ab75581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            Explore amazing destinations around the world with the best travel packages
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get("search") as string;
              handleSearch(query);
            }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Where do you want to go?"
                  className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelHub</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best travel experiences with unmatched service and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">200+ Destinations</h3>
              <p className="text-gray-600">Explore amazing places across the globe</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your safety is our top priority</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600">Recognized for excellence in travel</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of amazing travel packages
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Filter by Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full text-sm font-medium">
                      {destination.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.location}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {destination.name}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {destination.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{destination.days} Days</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-gray-600 text-sm">From</span>
                        <p className="text-2xl font-bold text-blue-600">
                          ${destination.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleBook(destination)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No destinations found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get in touch with our travel experts and plan your dream vacation today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Contact Us
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              View All Packages
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold">TravelHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for unforgettable travel experiences around the world.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="text-gray-400 hover:text-white transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#packages" className="text-gray-400 hover:text-white transition-colors">
                    Packages
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Travel Street</li>
                <li>New York, NY 10001</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Email: info@travelhub.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TravelHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Book Your Trip</h2>
              <button
                onClick={() => setSelectedDestination(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 bg-blue-50 border-b">
              <div className="flex gap-4">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedDestination.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{selectedDestination.location}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${selectedDestination.price}{" "}
                    <span className="text-sm font-normal text-gray-600">per person</span>
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Booking submitted! We'll contact you soon.");
                setSelectedDestination(null);
              }}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    defaultValue="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

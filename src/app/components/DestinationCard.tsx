import { MapPin, Star, Calendar } from "lucide-react";

export interface Destination {
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

interface DestinationCardProps {
  destination: Destination;
  onBook: (destination: Destination) => void;
}

export function DestinationCard({ destination, onBook }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
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

      {/* Content */}
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
            onClick={() => onBook(destination)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

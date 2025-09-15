export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  continent: string;
  visaRequired: boolean;
  visaType: string;
  duration: string;
  cost: string;
  description: string;
}

export interface Hotspot {
  id: string;
  name: string;
  type: 'accommodation' | 'food' | 'activity' | 'transport';
  location: string;
  country: string;
  price: string;
  rating: number;
  description: string;
  image: string;
  tags: string[];
}

export interface CommunityTip {
  id: string;
  title: string;
  content: string;
  author: string;
  country: string;
  category: 'safety' | 'budget' | 'transportation' | 'accommodation' | 'food' | 'general';
  likes: number;
  timestamp: string;
  tags: string[];
}

export interface Itinerary {
  id: string;
  title: string;
  description: string;
  duration: string;
  countries: string[];
  totalBudget: string;
  activities: ItineraryActivity[];
  isPublic: boolean;
  author: string;
  likes: number;
}

export interface ItineraryActivity {
  id: string;
  day: number;
  title: string;
  location: string;
  type: 'travel' | 'accommodation' | 'activity' | 'food';
  budget: string;
  notes: string;
}
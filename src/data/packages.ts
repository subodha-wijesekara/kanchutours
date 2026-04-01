export type TourPackage = {
  id: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  category: "Budget" | "Luxury" | "Honeymoon" | "Adventure";
  highlights: string[];
};

export const tourPackages: TourPackage[] = [
  {
    id: "budget-explorer",
    title: "Backpacker Explorer",
    duration: "7 Days",
    price: 499,
    category: "Budget",
    image: "/images/ella_train_1775030054193.png",
    highlights: ["Hostel Stays", "Train Rides", "Local Food Tasting", "Hike Ella Rock"],
  },
  {
    id: "luxury-escape",
    title: "Luxury Island Escape",
    duration: "10 Days",
    price: 2499,
    category: "Luxury",
    image: "/images/sigiriya_rock_1775030006860.png",
    highlights: ["5-Star Beach Resorts", "Private Driver", "Helicopter Tour", "Fine Dining"],
  },
  {
    id: "romantic-honeymoon",
    title: "Romantic Getaway",
    duration: "8 Days",
    price: 1899,
    category: "Honeymoon",
    image: "/images/honeymoon_tour_1775030234833.png",
    highlights: ["Beachfront Villas", "Candlelight Dinners", "Couples Spa", "Sunset Cruise"],
  },
  {
    id: "wild-adventure",
    title: "Wild Adventure Trip",
    duration: "5 Days",
    price: 899,
    category: "Adventure",
    image: "/images/adventure_tour_1775030286039.png",
    highlights: ["White Water Rafting", "Jungle Trekking", "Jeep Safari", "Camping"],
  }
];

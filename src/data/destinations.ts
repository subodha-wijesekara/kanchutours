export type Destination = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: "Beach" | "Cultural" | "Wildlife" | "Adventure";
  activities: string[];
  travelTips: string[];
  mapX: number; // percentage from left
  mapY: number; // percentage from top
};

export const destinations: Destination[] = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    shortDescription: "An ancient rock fortress with stunning frescoes and water gardens.",
    fullDescription: "Sigiriya, or Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance that is dominated by a massive column of rock around 200 meters high. Built by King Kasyapa (477–495 AD), it includes a palace on top, spectacular frescoes, and a gateway in the form of an enormous lion.",
    image: "/images/sigiriya_rock_1775030006860.png",
    category: "Cultural",
    activities: ["Rock climbing", "Photography", "Historical tours"],
    travelTips: ["Visit early morning to avoid heat and crowds.", "Wear comfortable shoes.", "Carry plenty of water."],
    mapX: 55,
    mapY: 34,
  },
  {
    id: "ella",
    name: "Ella",
    shortDescription: "A beautiful hillside village with tea plantations and waterfalls.",
    fullDescription: "Ella is a small town in the Badulla District of Uva Province, Sri Lanka. It is situated at an elevation of 1,041 meters above sea level to the east of the central highlands and has a rich biodiversity. Known for its laid-back atmosphere, Ella is surrounded by hills covered with cloud forests and tea plantations. The iconic Nine Arch Bridge is a must-visit.",
    image: "/images/ella_train_1775030054193.png",
    category: "Adventure",
    activities: ["Hiking Little Adam's Peak", "Visiting Nine Arch Bridge", "Tea factory tours"],
    travelTips: ["The weather can be chilly; pack a light jacket.", "The train ride from Kandy to Ella is highly recommended.", "Beware of leeches during rainy season hikes."],
    mapX: 62,
    mapY: 70,
  },
  {
    id: "kandy",
    name: "Kandy",
    shortDescription: "The cultural capital featuring the sacred Temple of the Tooth.",
    fullDescription: "Kandy is a large city in central Sri Lanka. It's set on a plateau surrounded by mountains, which are home to tea plantations and biodiverse rainforest. The city's heart is scenic Kandy Lake, which is popular for strolling. Kandy is famous for sacred Buddhist sites, including the Temple of the Tooth Relic, celebrated with the grand Esala Perahera annual festival.",
    image: "/images/kandy_temple_1775030099483.png",
    category: "Cultural",
    activities: ["Temple of the Tooth visit", "Botanic Gardens stroll", "Cultural dance shows"],
    travelTips: ["Dress modestly when visiting temples.", "Try the local street food around the lake.", "Book train tickets in advance due to high demand."],
    mapX: 52,
    mapY: 52,
  },
  {
    id: "galle",
    name: "Galle",
    shortDescription: "A historic coastal city with a beautiful Dutch fort and beaches.",
    fullDescription: "Galle is a city on the southwest coast of Sri Lanka. It’s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. Stone sea walls, expanded by the Dutch, encircle car-free streets with architecture reflecting Portuguese, Dutch and British rule. It is a charming city with boutique shops, cafes, and historic landmarks.",
    image: "/images/galle_fort_1775030151642.png",
    category: "Beach",
    activities: ["Walking the Fort walls", "Shopping for gems", "Sunset watching"],
    travelTips: ["Explore the fort in the late afternoon.", "Try the seafood at local restaurants.", "A great spot to buy authentic Ceylon tea and spices."],
    mapX: 38,
    mapY: 88,
  },
  {
    id: "yala",
    name: "Yala",
    shortDescription: "Sri Lanka's most popular national park, famous for leopards.",
    fullDescription: "Yala National Park is a huge area of forest, grassland and lagoons bordering the Indian Ocean, in southeast Sri Lanka. It’s home to wildlife such as leopards, elephants and crocodiles, as well as hundreds of bird species. Taking a safari through Yala offers one of the best chances in the world to spot the elusive Sri Lankan Leopard in its natural habitat.",
    image: "/images/yala_leopard_1775030195268.png",
    category: "Wildlife",
    activities: ["Jeep Safari", "Bird watching", "Nature photography"],
    travelTips: ["Book your safari in advance during peak season.", "Wear neutral, earthy colors.", "Don't forget your binoculars and zoom lens."],
    mapX: 75,
    mapY: 80,
  },
  {
    id: "colombo",
    name: "Colombo",
    shortDescription: "Sri Lanka's bustling commercial capital and the gateway to the island.",
    fullDescription: "Colombo is the largest city on the island and its commercial hub. A city of contrasts, it features colonial-era architecture alongside modern skyscrapers and bustling street markets. Visit the historic Fort area, explore the lively Pettah neighborhood, or relax on the Galle Face Green as the sun sets over the Indian Ocean.",
    image: "/images/hero_sri_lanka_1775029955307.png",
    category: "Cultural",
    activities: ["Galle Face Green stroll", "Pettah market tour", "Lotus Tower visit"],
    travelTips: ["Use 'PickMe' or 'Uber' for easy city travel.", "Try the egg hoppers and street food.", "Visit the Gangaramaya Temple for cultural heritage."],
    mapX: 22,
    mapY: 65,
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    shortDescription: "The misty city in the mountains, known for Ceylon tea and waterfalls.",
    fullDescription: "Nuwara Eliya, known as 'Little England,' is located in the heart of Sri Lanka's hill country. Famous for its temperate climate and sprawling tea plantations, it offers breathtaking views, colonial-style bungalows, and the iconic Gregory Lake. It is the perfect escape for those looking for cool mountain air and scenic landscapes.",
    image: "/images/ella_train_1775030054193.png",
    category: "Adventure",
    activities: ["Tea factory visit", "Gregory Lake boating", "Hiking Horton Plains"],
    travelTips: ["It gets very cold at night; pack warm clothes.", "Try the fresh strawberries at local farms.", "The drive from Kandy is incredibly scenic."],
    mapX: 55,
    mapY: 62,
  },
  {
    id: "mirissa",
    name: "Mirissa",
    shortDescription: "A tropical beach paradise famous for whale watching and surf.",
    fullDescription: "Mirissa is a small town on the south coast of Sri Lanka. It is one of the most popular beach destinations, famous for its crescent-shaped beach, vibrant nightlife, and whale watching tours. Whether you want to catch a wave, spot a blue whale, or just relax under a palm tree, Mirissa is the place to be.",
    image: "/images/galle_fort_1775030151642.png",
    category: "Beach",
    activities: ["Whale watching", "Surfing", "Coconut Tree Hill visit"],
    travelTips: ["Whale watching season is from November to April.", "Visit the Secret Beach for a quiet afternoon.", "Stay overnight to enjoy the beach party culture."],
    mapX: 45,
    mapY: 90,
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    shortDescription: "The sacred ancient capital with majestic dagobas and ruins.",
    fullDescription: "Anuradhapura is one of the ancient capitals of Sri Lanka, a major city of the island from the 4th century BC until the beginning of the 11th century AD. It is a UNESCO World Heritage Site, famous for its well-preserved ruins of ancient Sri Lankan civilization, including massive dagobas, monasteries, and the sacred Jaya Sri Maha Bodhi tree.",
    image: "/images/sigiriya_rock_1775030006860.png",
    category: "Cultural",
    activities: ["Stupa hopping", "Museum tours", "Exploring ancient ruins"],
    travelTips: ["Hire a bicycle to explore the vast archaeological site.", "Wear socks; the stone floors get very hot in the sun.", "A full day is needed to see the major sites."],
    mapX: 48,
    mapY: 22,
  }
];

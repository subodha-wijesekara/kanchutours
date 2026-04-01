export type Destination = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: "Beach" | "Cultural" | "Wildlife" | "Adventure";
  activities: string[];
  travelTips: string[];
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
  }
];

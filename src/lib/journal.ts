export interface JournalArticle {
  id: string;
  title: string;
  title_ka?: string;
  excerpt: string;
  excerpt_ka?: string;
  category: string;
  category_ka?: string;
  readTime: string;
  readTime_ka?: string;
  image_url: string;
  video_url?: string;
  media_type?: 'image' | 'video';
  location?: string;
  location_ka?: string;
  client?: string;
  client_ka?: string;
}

export function getJournalCategoryLabel(category: string, isGeorgian: boolean): string {
  if (!isGeorgian) return category;
  switch (category) {
    case 'All': return 'ყველა';
    case 'Commercial Commission': return 'კომერციული შეკვეთა';
    case 'Hospitality Interior': return 'სასტუმროს ინტერიერი';
    case 'Corporate Architecture': return 'კორპორატიული არქიტექტურა';
    case 'On-Site Walkthrough': return 'ვიდეო მიმოხილვა';
    case 'Spatial Design': return 'სივრცითი დიზაინი';
    case 'Project Showcase': return 'პროექტის პრეზენტაცია';
    case 'Materials & Craft': return 'მასალები & ოსტატობა';
    case 'Interior Architecture': return 'ინტერიერის არქიტექტურა';
    default: return category;
  }
}

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    category: 'Commercial Commission',
    category_ka: 'კომერციული შეკვეთა',
    readTime: '5 Min Read',
    readTime_ka: '5 წთ საკითხავი',
    title: 'Corporate Headquarters: Custom Acoustic Carpet Architecture for Coca-Cola',
    title_ka: 'კორპორატიული სათავო ოფისი: ინდივიდუალური აკუსტიკური ხალიჩის არქიტექტურა Coca-Cola-სთვის',
    excerpt: 'A bespoke corporate transformation integrating precision quarter-turn linear acoustic carpet tiles with contemporary architectural concrete, lush interior planters, and corporate branding.',
    excerpt_ka: 'ინდივიდუალური კორპორატიული ტრანსფორმაცია, რომელიც აერთიანებს ზუსტი ხაზოვანი აკუსტიკური ხალიჩის ფილებს თანამედროვე არქიტექტურულ ბეტონთან, ცოცხალ მცენარეებთან და ბრენდინგთან.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (7).jpeg',
    location: 'Tbilisi HQ',
    location_ka: 'თბილისის სათავო ოფისი',
    client: 'Coca-Cola',
    client_ka: 'Coca-Cola'
  },
  {
    id: '2',
    category: 'Hospitality Interior',
    category_ka: 'სასტუმროს ინტერიერი',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Alpine Sanctuary: Wool-Blend Ribbed Carpeting Overlooking Snowy Pines',
    title_ka: 'ალპური თავშესაფარი: შალის ნაზავის რელიეფური ხალიჩა დათოვლილი ფიჭვების ხედით',
    excerpt: 'Softening brutalist floorplans through deeply textured, earth-toned striated wool carpeting that extends naturally toward floor-to-ceiling panoramic mountain terrace glass.',
    excerpt_ka: 'ბრუტალისტური სივრცეების შერბილება ღრმად ტექსტურირებული, მიწისფერი შალის ხალიჩით, რომელიც ბუნებრივად ერწყმის პანორამულ მთის ტერასას.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.47.25.jpeg',
    location: 'Gudauri Mountain Resort',
    location_ka: 'გუდაურის სამთო კურორტი',
    client: 'Alpine Hotel Suites',
    client_ka: 'Alpine Hotel Suites'
  },
  {
    id: '3',
    category: 'Corporate Architecture',
    category_ka: 'კორპორატიული არქიტექტურა',
    readTime: '7 Min Read',
    readTime_ka: '7 წთ საკითხავი',
    title: 'Executive Boardroom Architecture: Sound Absorption & Monumental Scale',
    title_ka: 'მმართველთა საბჭოს დარბაზი: ბგერის შთანთქმა & მონუმენტური მასშტაბი',
    excerpt: 'Equipping high-profile conference halls with heavy-traffic textured modular tile systems engineered for superior acoustic dampening and effortless spatial refinement.',
    excerpt_ka: 'მაღალი კლასის საკონფერენციო დარბაზების აღჭურვა მაღალი დატვირთვის მოდულური ფილების სისტემით, შექმნილი უმაღლესი აკუსტიკური იზოლაციისა და ელეგანტურობისთვის.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.09.jpeg',
    location: 'Executive Wing',
    location_ka: 'ადმინისტრაციული ფლიგელი',
    client: 'Conference Facility',
    client_ka: 'საკონფერენციო ცენტრი'
  },
  {
    id: '4',
    category: 'On-Site Walkthrough',
    category_ka: 'ვიდეო მიმოხილვა',
    readTime: '3 Min Watch',
    readTime_ka: '3 წთ სანახავად',
    title: 'Hospitality Wayfinding: Seamless Corridor Flow & Geometric Tile Layout',
    title_ka: 'სასტუმროს ნავიგაცია: უწყვეტი კორიდორების დინება & გეომეტრიული ფილების განლაგება',
    excerpt: 'A continuous walkthrough capturing how textured modular flooring guides guest circulation through executive corridors, frosted glass doors, and sunlit transition lounges.',
    excerpt_ka: 'ვიდეო მიმოხილვა, თუ როგორ წარმართავს ტექსტურირებული მოდულური იატაკი სტუმრების გადაადგილებას დერეფნებსა და მზით განათებულ ლაუნჯებში.',
    media_type: 'video',
    video_url: '/album/WhatsApp Video 2026-06-17 at 08.40.48.mp4',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.14.jpeg',
    location: 'Hotel Administration & Wings',
    location_ka: 'სასტუმროს ადმინისტრაცია & ფლიგელი'
  },
  {
    id: '5',
    category: 'Spatial Design',
    category_ka: 'სივრცითი დიზაინი',
    readTime: '5 Min Read',
    readTime_ka: '5 წთ საკითხავი',
    title: 'Biophilic Balance: Framing Bamboo Groves Through Earthy Woven Geometry',
    title_ka: 'ბიოფილიური ბალანსი: ბამბუკის ხედების ჩარჩოება მიწისფერი გეომეტრიული ქსოვილებით',
    excerpt: 'Harmonizing natural outdoor greenery with multi-tonal earthy carpet tiles, creating visual serenity across expansive sun-drenched event halls.',
    excerpt_ka: 'გარე ბუნებრივი სიმწვანისა და მრავალტონიანი მიწისფერი ხალიჩის ფილების ჰარმონია, რომელიც ქმნის ვიზუალურ სიმშვიდეს ვრცელ საზეიმო დარბაზებში.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.27.jpeg',
    location: 'Garden Pavilion',
    location_ka: 'ბაღის პავილიონი'
  },
  {
    id: '6',
    category: 'Project Showcase',
    category_ka: 'პროექტის პრეზენტაცია',
    readTime: '4 Min Watch',
    readTime_ka: '4 წთ სანახავად',
    title: 'Grand Scale Refinement: Mirrored Columns & Sweeping Herringbone Geometry',
    title_ka: 'დიდი მასშტაბის სინატიფე: სარკისებრი სვეტები & ფრანგული ნაძვისებრი გეომეტრია',
    excerpt: 'Watch the full architectural pan across a grand banquet hall where mirror-clad pillars reflect interlocking textured tiles bathed in recessed ambient lighting.',
    excerpt_ka: 'უყურეთ სრულ არქიტექტურულ მიმოხილვას საზეიმო დარბაზში, სადაც სარკეები ირეკლავს ურთიერთდაკავშირებულ ტექსტურირებულ ფილებსა და ჩაშენებულ განათებას.',
    media_type: 'video',
    video_url: '/album/WhatsApp Video 2026-06-17 at 08.41.16.mp4',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.31.jpeg',
    location: 'Grand Event Center',
    location_ka: 'მთავარი ივენთ ცენტრი'
  },
  {
    id: '7',
    category: 'Materials & Craft',
    category_ka: 'მასალები & ოსტატობა',
    readTime: '3 Min Read',
    readTime_ka: '3 წთ საკითხავი',
    title: 'Material Anatomy: The Resilient Architecture of Multi-Tonal Tile Weaves',
    title_ka: 'მასალის ანატომია: მრავალტონიანი ნაქსოვი ფილების გამძლე არქიტექტურა',
    excerpt: 'A macro study into yarn composition, abrasion resistance, and organic variegated coloring designed to disguise heavy commercial foot traffic.',
    excerpt_ka: 'ძაფის შემადგენლობის, ცვეთისადმი გამძლეობისა და ორგანული შეფერილობის მაკრო ანალიზი, შექმნილი მაღალი ინტენსივობის მოძრაობისთვის.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.42.jpeg',
    location: 'Craft Studio',
    location_ka: 'ოსტატობის სტუდია'
  },
  {
    id: '8',
    category: 'Interior Architecture',
    category_ka: 'ინტერიერის არქიტექტურა',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Lobby & Lounge Dynamics: Quarter-Turn Tile Patterns in Commercial Spaces',
    title_ka: 'ფოიესა და ლაუნჯის დინამიკა: ფილების 90-გრადუსიანი განლაგება კომერციულ სივრცეებში',
    excerpt: 'Creating subtle rhythmic depth in large reception areas through alternating grain directions, complemented by sculptural lounge seating.',
    excerpt_ka: 'რითმული სიღრმის შექმნა დიდ მისაღებ სივრცეებში მიმართულებების მონაცვლეობით, შეხამებული სკულპტურულ ავეჯთან.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (2).jpeg',
    location: 'Corporate Atrium',
    location_ka: 'კორპორატიული ატრიუმი'
  }
];

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
    case 'Commercial Architecture': return 'კომერციული არქიტექტურა';
    case 'Hospitality Interior': return 'სასტუმროს ინტერიერი';
    case 'Corporate Commission': return 'კორპორატიული შეკვეთა';
    case 'Spatial Design': return 'სივრცითი დიზაინი';
    case 'Project Showcase': return 'პროექტის პრეზენტაცია';
    case 'On-Site Walkthrough': return 'ვიდეო მიმოხილვა';
    case 'Biophilic Architecture': return 'ბიოფილიური არქიტექტურა';
    case 'Materials & Craft': return 'მასალები & ოსტატობა';
    default: return category;
  }
}

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    category: 'Commercial Architecture',
    category_ka: 'კომერციული არქიტექტურა',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Contemporary Corporate Atrium: Directional Acoustic Carpet Tile Systems',
    title_ka: 'თანამედროვე კორპორატიული ატრიუმი: მიმართულებითი აკუსტიკური ხალიჩის ფილების სისტემები',
    excerpt: 'Quarter-turn alternating linear loop carpet tiles engineered for heavy commercial traffic, providing superior acoustic dampening and a sleek monochrome architectural floor texture.',
    excerpt_ka: '90-გრადუსიანი მონაცვლეობით დაგებული ხაზოვანი აკუსტიკური ხალიჩის ფილები მაღალი დატვირთვის კომერციული სივრცეებისთვის, რაც უზრუნველყოფს ბგერის იზოლაციას და დახვეწილ მონოქრომულ ტექსტურას.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (1).jpeg',
    location: 'Central Atrium Pavilion',
    location_ka: 'ცენტრალური ატრიუმის პავილიონი',
    client: 'Metropolitan Financial Center',
    client_ka: 'მეტროპოლიტენ ფინანსური ცენტრი'
  },
  {
    id: '2',
    category: 'Hospitality Interior',
    category_ka: 'სასტუმროს ინტერიერი',
    readTime: '5 Min Read',
    readTime_ka: '5 წთ საკითხავი',
    title: 'Alpine Panoramic Suite: Ribbed Wool-Blend Broadloom Overlooking Snowy Pines',
    title_ka: 'ალპური პანორამული სუიტი: შალის ნაზავის რელიეფური ხალიჩა დათოვლილი ფიჭვების ხედით',
    excerpt: 'Softening luxury mountain suites through deeply textured, natural earth-toned striated wool carpeting that extends seamlessly toward floor-to-ceiling panoramic terrace glass.',
    excerpt_ka: 'მთის ბუტიკ-სასტუმროს სუიტების შერბილება ღრმად ტექსტურირებული, ბუნებრივი მიწისფერი შალის ხალიჩით, რომელიც ჰარმონიულად ერწყმის პანორამულ მინის აივანს.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.47.25 (1).jpeg',
    location: 'Alpine Summit Chalet',
    location_ka: 'ალპური სამთო შალე',
    client: 'Mount Panorama Resort',
    client_ka: 'მთა პანორამა რეზორტი'
  },
  {
    id: '3',
    category: 'Corporate Commission',
    category_ka: 'კორპორატიული შეკვეთა',
    readTime: '5 Min Read',
    readTime_ka: '5 წთ საკითხავი',
    title: 'Executive Boardroom Architecture: Acoustic Modulation Under Monumental Scales',
    title_ka: 'მმართველთა საბჭოს დარბაზი: აკუსტიკური მოდულაცია მონუმენტური მასშტაბებისთვის',
    excerpt: 'Equipping high-profile conference halls with heavy-traffic textured modular tile systems beneath expansive meeting tables, optimizing speech clarity and spatial poise.',
    excerpt_ka: 'მაღალი კლასის საკონფერენციო დარბაზების აღჭურვა მაღალი დატვირთვის მოდულური ფილებით დიდი მაგიდების ქვეშ, რაც აუმჯობესებს მეტყველების სიცხადესა და სივრცის ესთეტიკას.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.08.jpeg',
    location: 'Executive Summit Hall',
    location_ka: 'მმართველთა სამიტის დარბაზი',
    client: 'International Congress Center',
    client_ka: 'საერთაშორისო საკონგრესო ცენტრი'
  },
  {
    id: '4',
    category: 'Spatial Design',
    category_ka: 'სივრცითი დიზაინი',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Minimalist Office Circulation: Seamless Linear Loop Tile Corridors',
    title_ka: 'მინიმალისტური ოფისის ნავიგაცია: უწყვეტი ხაზოვანი ფილების დერეფნები',
    excerpt: 'Directional grey linear carpet tiles guiding guest movement through private executive suites, acoustic partitions, and sunlit transition lounges.',
    excerpt_ka: 'ნაცრისფერი ხაზოვანი ხალიჩის ფილები, რომლებიც წარმართავს მოძრაობას კაბინეტებს, აკუსტიკურ ტიხრებსა და მზით განათებულ მოსასვენებელ სივრცეებს შორის.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (3).jpeg',
    location: 'Commerce Suite Wing',
    location_ka: 'ბიზნეს სუიტების ფლიგელი',
    client: 'Metropolitan Commercial Guild',
    client_ka: 'მეტროპოლიტენ ბიზნეს გილდია'
  },
  {
    id: '5',
    category: 'Project Showcase',
    category_ka: 'პროექტის პრეზენტაცია',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Grand Gala Hall: Mirrored Architecture Reflecting Geometric Floor Weaves',
    title_ka: 'საზეიმო დარბაზი: სარკისებრი არქიტექტურა და გეომეტრიული იატაკის ორნამენტები',
    excerpt: 'An expansive celebration hall where full-height mirrored columns multiply ambient illumination across interlocking textured carpet tiles, elevating the event experience.',
    excerpt_ka: 'ვრცელი საზეიმო დარბაზი, სადაც სრულსიმაღლიანი სარკისებრი სვეტები ამრავლებს სინათლეს ურთიერთდაკავშირებულ ტექსტურულ ხალიჩის ფილებზე.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.31.jpeg',
    location: 'Civic Cultural Center',
    location_ka: 'საქალაქო კულტურული ცენტრი',
    client: 'Grand Gala & Banquet Pavilion',
    client_ka: 'საზეიმო & გალა პავილიონი'
  },
  {
    id: '6',
    category: 'On-Site Walkthrough',
    category_ka: 'ვიდეო მიმოხილვა',
    readTime: '3 Min Watch',
    readTime_ka: '3 წთ სანახავად',
    title: 'Hospitality Wayfinding: Seamless Hotel Corridor Circulation & Herringbone Lay',
    title_ka: 'სასტუმროს ნავიგაცია: დერეფნების უწყვეტი დინება & ფრანგული ნაძვისებრი განლაგება',
    excerpt: 'A continuous walkthrough capturing how multi-tonal modular flooring guides guest circulation through executive wings, frosted glass portals, and transition lounges.',
    excerpt_ka: 'ვიდეო მიმოხილვა, თუ როგორ წარმართავს მრავალტონიანი მოდულური იატაკი სტუმრების გადაადგილებას დერეფნებსა და მზით განათებულ სივრცეებში.',
    media_type: 'video',
    video_url: '/album/WhatsApp Video 2026-06-17 at 08.40.48.mp4',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.14.jpeg',
    location: 'Suites & Residential Wings',
    location_ka: 'სასტუმროს სუიტები & ფლიგელი',
    client: 'Heritage Boutique Hotel',
    client_ka: 'ჰერიტიჯ ბუტიკ სასტუმრო'
  },
  {
    id: '7',
    category: 'Biophilic Architecture',
    category_ka: 'ბიოფილიური არქიტექტურა',
    readTime: '4 Min Read',
    readTime_ka: '4 წთ საკითხავი',
    title: 'Biophilic Event Pavilion: Framing Bamboo Groves Through Earthy Modular Weaves',
    title_ka: 'ბიოფილიური პავილიონი: ბამბუკის ხედების ჩარჩოება მიწისფერი მოდულური ქსოვილებით',
    excerpt: 'Harmonizing natural outdoor greenery with multi-tonal earthy carpet tiles, creating visual serenity across expansive sun-drenched event suites.',
    excerpt_ka: 'გარე ბუნებრივი სიმწვანისა და მრავალტონიანი მიწისფერი ხალიჩის ფილების ჰარმონია, რომელიც ქმნის ვიზუალურ სიმშვიდეს ვრცელ საზეიმო დარბაზებში.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.24.jpeg',
    location: 'Conservatory Pavilion',
    location_ka: 'ორანჟერეის პავილიონი',
    client: 'Botanical Glasshouse Conservatory',
    client_ka: 'ბოტანიკური ორანჟერეა'
  },
  {
    id: '8',
    category: 'Materials & Craft',
    category_ka: 'მასალები & ოსტატობა',
    readTime: '3 Min Read',
    readTime_ka: '3 წთ საკითხავი',
    title: 'Material Transition Architecture: Acoustic Tile to Hardwood Border Systems',
    title_ka: 'მასალათა გადასვლის არქიტექტურა: აკუსტიკური ფილებიდან ხის იატაკზე გადასვლა',
    excerpt: 'Precision junction detailing between high-density acoustic linear carpet tiles and natural timber flooring across executive office thresholds.',
    excerpt_ka: 'ზუსტი შეერთების დეტალიზაცია მაღალი სიმკვრივის აკუსტიკურ ხაზოვან ხალიჩის ფილებსა და ბუნებრივ ხის იატაკს შორის კაბინეტების ზღურბლზე.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.12 (1).jpeg',
    location: 'Design & Materials Lab',
    location_ka: 'დიზაინისა და მასალების ლაბორატორია',
    client: 'Architectural Craft Guild',
    client_ka: 'არქიტექტურული გილდია'
  }
];

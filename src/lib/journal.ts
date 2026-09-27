export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image_url: string;
  video_url?: string;
  media_type?: 'image' | 'video';
  location?: string;
  client?: string;
}

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    category: 'Commercial Commission',
    readTime: '5 Min Read',
    title: 'Corporate Headquarters: Custom Acoustic Carpet Architecture for Coca-Cola',
    excerpt: 'A bespoke corporate transformation integrating precision quarter-turn linear acoustic carpet tiles with contemporary architectural concrete, lush interior planters, and corporate branding.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (7).jpeg',
    location: 'Tbilisi HQ',
    client: 'Coca-Cola'
  },
  {
    id: '2',
    category: 'Hospitality Interior',
    readTime: '4 Min Read',
    title: 'Alpine Sanctuary: Wool-Blend Ribbed Carpeting Overlooking Snowy Pines',
    excerpt: 'Softening brutalist floorplans through deeply textured, earth-toned striated wool carpeting that extends naturally toward floor-to-ceiling panoramic mountain terrace glass.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.47.25.jpeg',
    location: 'Gudauri Mountain Resort',
    client: 'Alpine Hotel Suites'
  },
  {
    id: '3',
    category: 'Corporate Architecture',
    readTime: '7 Min Read',
    title: 'Executive Boardroom Architecture: Sound Absorption & Monumental Scale',
    excerpt: 'Equipping high-profile conference halls with heavy-traffic textured modular tile systems engineered for superior acoustic dampening and effortless spatial refinement.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.09.jpeg',
    location: 'Executive Wing',
    client: 'Conference Facility'
  },
  {
    id: '4',
    category: 'On-Site Walkthrough',
    readTime: '3 Min Watch',
    title: 'Hospitality Wayfinding: Seamless Corridor Flow & Geometric Tile Layout',
    excerpt: 'A continuous walkthrough capturing how textured modular flooring guides guest circulation through executive corridors, frosted glass doors, and sunlit transition lounges.',
    media_type: 'video',
    video_url: '/album/WhatsApp Video 2026-06-17 at 08.40.48.mp4',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.14.jpeg',
    location: 'Hotel Administration & Wings'
  },
  {
    id: '5',
    category: 'Spatial Design',
    readTime: '5 Min Read',
    title: 'Biophilic Balance: Framing Bamboo Groves Through Earthy Woven Geometry',
    excerpt: 'Harmonizing natural outdoor greenery with multi-tonal earthy carpet tiles, creating visual serenity across expansive sun-drenched event halls.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.27.jpeg',
    location: 'Garden Pavilion'
  },
  {
    id: '6',
    category: 'Project Showcase',
    readTime: '4 Min Watch',
    title: 'Grand Scale Refinement: Mirrored Columns & Sweeping Herringbone Geometry',
    excerpt: 'Watch the full architectural pan across a grand banquet hall where mirror-clad pillars reflect interlocking textured tiles bathed in recessed ambient lighting.',
    media_type: 'video',
    video_url: '/album/WhatsApp Video 2026-06-17 at 08.41.16.mp4',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.31.jpeg',
    location: 'Grand Event Center'
  },
  {
    id: '7',
    category: 'Materials & Craft',
    readTime: '3 Min Read',
    title: 'Material Anatomy: The Resilient Architecture of Multi-Tonal Tile Weaves',
    excerpt: 'A macro study into yarn composition, abrasion resistance, and organic variegated coloring designed to disguise heavy commercial foot traffic.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.40.42.jpeg',
    location: 'Craft Studio'
  },
  {
    id: '8',
    category: 'Interior Architecture',
    readTime: '4 Min Read',
    title: 'Lobby & Lounge Dynamics: Quarter-Turn Tile Patterns in Commercial Spaces',
    excerpt: 'Creating subtle rhythmic depth in large reception areas through alternating grain directions, complemented by sculptural lounge seating.',
    image_url: '/album/WhatsApp Image 2026-06-17 at 08.46.13 (2).jpeg',
    location: 'Corporate Atrium'
  }
];

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image_url: string;
}

export const MOCK_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    category: 'Design Theory',
    readTime: '6 Min Read',
    title: 'The Resurgence of Raw Stone in Modern Interiors',
    excerpt: 'Exploring how architects and designers are moving away from hyper-polished surfaces, embracing the authentic, raw textures of natural travertine and marble to ground their spaces.',
    image_url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996ec?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    category: 'Behind The Scenes',
    readTime: '4 Min Read',
    title: 'A Mastery of Joinery: Inside the Kusinox Workshop',
    excerpt: 'Step off the showroom floor and into the dust-filled air of our Tbilisi workshop, where master craftsmen transform raw, sustainably sourced oak into seamless art.',
    image_url: 'https://images.unsplash.com/photo-1610224426217-1011d8825838?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    category: 'Architecture',
    readTime: '8 Min Read',
    title: 'Case Study: A Brutalist Villa in the Swiss Alps',
    excerpt: 'How strict architectural lines and cold concrete can be softened and humanized entirely through the deliberate staging of structural oak furniture and warm lighting.',
    image_url: 'https://images.unsplash.com/photo-1545620958-69279093ed71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    category: 'Materials',
    readTime: '3 Min Read',
    title: 'Sourcing the World’s Finest New Zealand Wool',
    excerpt: 'A photo essay traversing the rolling hills of the southern hemisphere, detailing exactly where our artisan weavers source the deep, rich fibers for our rug collection.',
    image_url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '5',
    category: 'Designer Spotlight',
    readTime: '5 Min Read',
    title: 'In Conversation with Lead Architect Elena Rossi',
    excerpt: 'Rossi discusses the philosophy behind "The Nordic Series", her obsession with tactile ergonomics, and why we should stop designing for screens.',
    image_url: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1000&auto=format&fit=crop'
  }
];

import Rattan from '@/public/rattan_siesta.jpg';
import Contract from '@/public/contract_siesta.jpg';
import Garden from '@/public/garden_siesta.jpg';
import TheTile from '@/public/tile_samur.jpg';
import Protocol from '@/public/protocol_samur.jpg';
import Broadloom from '@/public/broadloom_samur.jpg';
import Beach from '@/public/beach_umbrella.jpg';
import Telescopic from '@/public/telescopic_umbrella.jpg';
import SideArm from '@/public/sidearm_umbrella.jpg';
import Pergo from '@/public/pergo_umbrella.jpg';
import Mega from '@/public/mega_umbrella.jpg';

export interface CollectionItem {
  name: string;
  image: string;
  brand?: string;
  category?: string;
}

export const collections: CollectionItem[] = [
  { name: "Contract", image: Contract.src, brand: "Siesta", category: "Seating" },
  { name: "Rattan", image: Rattan.src, brand: "Siesta", category: "Seating" },
  { name: "Garden", image: Garden.src, brand: "Siesta", category: "Seating" },
  { name: "The Tile", image: TheTile.src, brand: "Samur", category: "Rugs" },
  { name: "Protocol", image: Protocol.src, brand: "Samur", category: "Rugs" },
  { name: "Broadloom", image: Broadloom.src, brand: "Samur", category: "Rugs" },
  { name: "Beach", image: Beach.src, brand: "Şemsiye Evi", category: "Umbrellas" },
  { name: "Telescopic", image: Telescopic.src, brand: "Şemsiye Evi", category: "Umbrellas" },
  { name: "Side-Arm", image: SideArm.src, brand: "Şemsiye Evi", category: "Umbrellas" },
  { name: "Pergo", image: Pergo.src, brand: "Şemsiye Evi", category: "Umbrellas" },
  { name: "Mega", image: Mega.src, brand: "Şemsiye Evi", category: "Umbrellas" },
  { name: "Ormel", image: "/collection/Ormel/3a32f5d4ecb948778fbf89585563a293_511.png", brand: "Ormel", category: "Hospitality" }
];

'use client';
import { motion } from 'framer-motion';

type SigilName = 'owl' | 'skull' | 'serpent' | 'rose';
interface RelicNavigationProps { readonly onNavigate: (target: string) => void; }
const relics: ReadonlyArray<{ readonly name: SigilName; readonly label: string; readonly target: string }> = [
  { name: 'owl', label: 'A note for you', target: 'letter' },
  { name: 'skull', label: 'Notes from friends', target: 'messages' },
  { name: 'serpent', label: 'Photos & memories', target: 'gallery' },
  { name: 'rose', label: 'One more thing', target: 'finale' }
];
export function RelicNavigation({ onNavigate }: Readonly<RelicNavigationProps>) {
  return <nav aria-label="Explore Rizz's birthday surprise" className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4"><p className="col-span-full text-center text-[10px] font-bold tracking-[.18em] text-bone/60">A FEW THINGS WE SAVED FOR YOU.</p>{relics.map((relic, index) => <motion.button key={relic.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + index * .1 }} whileHover={{ y: -8 }} onClick={() => onNavigate(relic.target)} className="group grid min-h-40 place-items-center border border-bone/20 bg-black/35 p-3 text-center backdrop-blur-sm hover:border-wine"><span className={`sigil sigil-${relic.name} h-24 w-24 transition group-hover:scale-110`} /><span className="text-[10px] font-bold tracking-[.12em] text-bone/80">{relic.label}</span></motion.button>)}</nav>;
}

'use client';
import { motion } from 'framer-motion';
import type { MessageCard } from '../src/data/mockData';

interface MessageGridProps { readonly cards: readonly MessageCard[]; readonly onOpen: (card: MessageCard) => void; }
export function MessageGrid({ cards, onOpen }: Readonly<MessageGridProps>) {
  return <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cards.map((card, index) => <motion.button whileHover={{ y: -8 }} key={card.id} onClick={() => onOpen(card)} className={`card-art card-${card.style} relative aspect-[.82] overflow-hidden text-left shadow-xl`}><span className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"/><span className="absolute inset-x-5 bottom-5 z-10 text-[10px] font-bold tracking-[.13em] text-bone">OPEN SIGNAL {String(index + 1).padStart(2, '0')}</span></motion.button>)}</div>;
}

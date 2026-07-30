'use client';
import { motion } from 'framer-motion';
import type { MessageCard } from '../src/data/mockData';

interface MessageDialogProps { readonly card: MessageCard; readonly onClose: () => void; }
export function MessageDialog({ card, onClose }: Readonly<MessageDialogProps>) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-5 backdrop-blur-sm"><motion.article initial={{ y: 30, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20 }} onClick={event => event.stopPropagation()} className="relative max-h-[90vh] max-w-xl overflow-y-auto border border-bone/25 bg-[#12100f] p-8 shadow-2xl"><button onClick={onClose} className="absolute right-4 top-3 text-2xl" aria-label="Close message">×</button><p className="text-xs font-bold tracking-[.16em] text-[#c8929b]">FROM / {card.sender}</p>{card.imageUrl && <img src={card.imageUrl} alt={`Memory from ${card.sender}`} className="mt-6 w-full"/>}<p className="mt-6 text-lg leading-9">{card.text}</p>{card.memory && <p className="mt-6 border-l border-[#c8929b] pl-4 text-sm leading-7 text-bone/70">{card.memory}</p>}{card.link && <a href={card.link} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#c8929b] pb-1 text-xs font-bold tracking-[.12em] text-[#c8929b]">OPEN THEIR LINK ↗</a>}</motion.article></motion.div>;
}

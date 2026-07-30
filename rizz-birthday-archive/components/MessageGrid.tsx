'use client';

import { motion } from 'framer-motion';
import type { MessageCard } from '../src/data/mockData';

interface MessageGridProps {
  readonly cards: readonly MessageCard[];
  readonly onOpen: (card: MessageCard) => void;
}

const rotations = [-4, 3, -2, 4, -3, 2, -1, 1];

export function MessageGrid({
  cards,
  onOpen,
}: Readonly<MessageGridProps>) {
  return (
    <div
      className="
        mt-20
        grid
        grid-cols-1
        gap-x-10
        gap-y-16
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {cards.map((card, index) => (
        <motion.button
          key={card.id}
          onClick={() => onOpen(card)}
          initial={{
            opacity: 0,
            y: 40,
            rotate: rotations[index % rotations.length],
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: rotations[index % rotations.length],
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -18,
            rotate: 0,
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            group
            relative
            mx-auto
            aspect-[0.88]
            w-full
            max-w-[290px]
            overflow-visible
            rounded-lg
            text-left
          "
        >
          {/* Shadow */}
          <div
            className="
              absolute
              inset-0
              rounded-lg
              bg-black/30
              blur-xl
              transition-all
              duration-300
              group-hover:translate-y-4
              group-hover:blur-2xl
            "
          />

          {/* Envelope */}
          <div
            className="
              card-art
              card-envelope
              absolute
              inset-0
              rounded-lg
              bg-contain
              bg-center
              bg-no-repeat
              transition-all
              duration-300
              group-hover:scale-[1.02]
            "
          />

          {/* Soft vignette */}
          <div
            className="
              absolute
              inset-0
              rounded-lg
              bg-gradient-to-b
              from-transparent
              via-transparent
              to-black/15
            "
          />

          {/* Wax seal glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[48%]
              h-10
              w-10
              -translate-x-1/2
              rounded-full
              bg-red-900/20
              blur-md
              transition
              duration-300
              group-hover:bg-red-800/35
            "
          />

          {/* Bottom text */}
          <div
            className="
              absolute
              bottom-7
              left-1/2
              flex
              w-[82%]
              -translate-x-1/2
              flex-col
              items-center
              justify-center
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.55em]
                text-[#d8c7a5]/80
              "
            >
              FROM
            </p>

            <p
              className="
                mt-3
                text-center
                font-display
                text-[1.15rem]
                uppercase
                tracking-[0.18em]
                text-[#f7edd8]
                drop-shadow-[0_2px_8px_rgba(0,0,0,.55)]
                transition
                duration-300
                group-hover:tracking-[0.24em]
              "
            >
              {card.sender}
            </p>
          </div>

          {/* Hover hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-6
              flex
              justify-center
            "
          >
            <span
              className="
                rounded-full
                border
                border-[#d9c6a0]/30
                bg-black/40
                px-4
                py-1
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-[#f5ead3]
                backdrop-blur-sm
              "
            >
              Open Letter
            </span>
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}
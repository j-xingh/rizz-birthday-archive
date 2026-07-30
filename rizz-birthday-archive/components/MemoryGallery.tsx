'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import type { MessageCard } from '../src/data/mockData';

interface MemoryGalleryProps {
  readonly id: string;
  readonly cards: readonly MessageCard[];
}

const rotations = [-10, -8, -6, -4, 4, 6, 8, 10];

const offsets = [-30, 12, -18, 28, -10, 24, -22, 15, -8, 30];

export function MemoryGallery({
  id,
  cards,
}: Readonly<MemoryGalleryProps>) {
  const images = useMemo(
    () => cards.filter((card) => card.imageUrl),
    [cards]
  );

  const [selected, setSelected] = useState<MessageCard | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelected(null);
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () =>
      window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <section
        id={id}
        className="relative overflow-hidden bg-[#0b0909] px-6 py-28 md:px-14 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[.3em] text-[#c8929b]"
          >
            03 / SHARED MOMENTS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            viewport={{ once: true }}
            className="mt-5 font-display text-5xl md:text-6xl"
          >
            A Box of Memories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-7 max-w-2xl text-lg leading-8 text-white/65"
          >
            Like old photographs scattered across a desk,
            every picture here carries a story shared by
            someone who loves you.
          </motion.p>

          {images.length === 0 ? (
            <div className="mt-20 rounded-xl border border-dashed border-white/15 p-16 text-center text-white/50">
              No shared memories yet.
            </div>
          ) : (
            <div
              className="
                mt-24
                flex
                flex-wrap
                justify-center
                gap-x-10
                gap-y-16
              "
            >
              {images.map((card, index) => {
                const rotation =
                  rotations[index % rotations.length];

                const offset =
                  offsets[index % offsets.length];

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => setSelected(card)}
                    initial={{
                      opacity: 0,
                      y: 40,
                      rotate: rotation,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: offset,
                      rotate: rotation,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: offset - 12,
                      rotate:
                        rotation > 0
                          ? rotation - 3
                          : rotation + 3,
                      scale: 1.06,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    style={{
                      marginTop: offset,
                    }}
                    className="group relative"
                  >
                    {/* Shadow */}

                    <div
                      className="
                        absolute
                        inset-0
                        translate-y-7
                        rounded-xl
                        bg-black/45
                        blur-2xl
                        transition-all
                        duration-300
                        group-hover:translate-y-9
                      "
                    />

                    {/* Polaroid */}

                    <div
                      className="
                        relative
                        w-[260px]
                        overflow-hidden
                        rounded-md
                        border
                        border-[#2d2a2a]
                        bg-[#0d0d0d]
                        p-3
                        shadow-[0_20px_45px_rgba(0,0,0,.55)]
                        transition-all
                        duration-300
                        group-hover:border-[#514949]
                      "
                    >
                      {/* Photo */}

                      <div className="relative h-[260px] overflow-hidden bg-black">
                        <Image
                          src={card.imageUrl!}
                          alt={card.sender}
                          fill
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/60
                            via-transparent
                            to-transparent
                          "
                        />
                      </div>

                      {/* Polaroid Footer */}

                      <div
                        className="
                          flex
                          h-16
                          items-center
                          justify-center
                        "
                      >
                        <p
                          className="
                            font-type
                            text-2xl
                            text-[#efe6dc]
                          "
                        >
                          — {card.sender}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelected(null)}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/95
              p-6
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.88,
                y: 30,
              }}
              transition={{
                type: 'spring',
                stiffness: 170,
                damping: 18,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              {/* Close */}

              <button
                onClick={() => setSelected(null)}
                aria-label="Close image"
                className="
                  absolute
                  -top-16
                  right-0
                  z-20
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-black/70
                  text-white
                  transition-all
                  duration-300
                  hover:rotate-90
                  hover:border-[#c8929b]
                  hover:bg-[#1a1516]
                "
              >
                <X size={22} />
              </button>

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#141111]
                  shadow-[0_35px_90px_rgba(0,0,0,.8)]
                "
              >
                {/* Image */}

                <div className="relative h-[72vh] w-full bg-black">
                  <Image
                    src={selected.imageUrl!}
                    alt={selected.sender}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Caption */}

                <div
                  className="
                    border-t
                    border-white/10
                    bg-[#171313]
                    px-8
                    py-7
                  "
                >
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[.35em]
                      text-[#c8929b]
                    "
                  >
                    Shared By
                  </p>

                  <h3
                    className="
                      mt-3
                      font-type
                      text-4xl
                      text-[#f4e9df]
                    "
                  >
                    — {selected.sender}
                  </h3>

                  {selected.memory && (
                    <p
                      className="
                        mt-5
                        max-w-3xl
                        text-lg
                        leading-8
                        text-white/70
                      "
                    >
                      {selected.memory}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
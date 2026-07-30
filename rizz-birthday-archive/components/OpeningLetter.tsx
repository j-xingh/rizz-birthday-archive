'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface OpeningLetterProps {
  readonly id: string;
}

export function OpeningLetter({
  id,
}: Readonly<OpeningLetterProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id={id}
      className="bg-[#100e0d] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">

        <p className="text-xs font-bold tracking-[.22em] uppercase text-[#c8929b]">
          01 / A NOTE FROM US
        </p>

        <AnimatePresence mode="wait">

          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: .45 }}
              className="mt-12 flex flex-col items-center"
            >

              <motion.button
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: .98,
                }}
                transition={{
                  duration: .25,
                }}
                onClick={() => setIsOpen(true)}
                aria-label="Open our letter"
                className="
                  card-art
                  card-envelope
                  relative
                  aspect-[0.9]
                  w-full
                  max-w-[430px]
                  overflow-hidden
                  rounded-md
                  shadow-[0_35px_80px_rgba(0,0,0,.55)]
                "
              >

                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">

                  <p className="text-[10px] uppercase tracking-[.35em] text-bone/70">
                    Tap To Begin
                  </p>

                  <p className="mt-2 font-display text-lg tracking-[.18em] text-bone">
                    OPEN OUR LETTER
                  </p>

                </div>

              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: .25,
                }}
                className="mt-10 max-w-xl text-center"
              >

                <h2 className="font-display text-4xl md:text-5xl">
                  Start Here.
                </h2>

                <p className="mt-6 leading-8 text-bone/75">
                  Before you explore the memories, photos and birthday
                  letters waiting for you, there's one small note we'd
                  love you to read first.
                </p>

              </motion.div>

            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: .35,
              }}
              className="
                mt-12
                flex
                flex-col
                gap-10
                lg:flex-row
                lg:items-start
              "
            >

              <motion.div
                initial={{
                  x: 80,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: .45,
                }}
                className="
                  mx-auto
                  w-full
                  max-w-[340px]
                  shrink-0
                "
              >

                <div
                  className="
                    card-art
                    card-envelope
                    aspect-[0.9]
                    w-full
                    rounded-md
                    shadow-[0_25px_60px_rgba(0,0,0,.55)]
                  "
                />

              </motion.div>

              <motion.article
                initial={{
                  x: -60,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: .15,
                  duration: .45,
                }}
                className="
                  relative
                  mx-auto
                  w-full
                  max-w-3xl
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#8b6d4b]
                  bg-[#f4e3bf]
                  bg-[url('/assets/parchment.png')]
                  bg-cover
                  bg-center
                  p-8
                  text-[#3a2618]
                  shadow-[0_40px_100px_rgba(0,0,0,.55)]
                  md:p-12
                "
              >

                <button
                  onClick={() => setIsOpen(false)}
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-black/10
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition
                    hover:bg-black/20
                  "
                >

                  <X size={18} />

                  Close

                </button>

                <p className="text-xs font-bold uppercase tracking-[.28em] text-[#8c5d52]">
                  Before You Begin
                </p>

                <h2 className="mt-5 font-display text-5xl leading-none md:text-6xl">
                  Happy Birthday,
                  <br />
                  You Wonderful Human.
                </h2>

                <hr className="my-8 border-[#b88b67]/50" />

                <div className="space-y-6 font-serif text-lg leading-9">
                                    <p>
                    Dear Rizz,
                  </p>

                  <p>
                    Before you start exploring this little website,
                    we just wanted to leave you one small letter from
                    the three of us.
                  </p>

                  <p>
                    This whole idea actually came from Bubble and Yads.
                    They thought it would be such a cute way to celebrate
                    you, and somehow all of us ended up building this
                    together. Every little page, every tiny animation,
                    every letter and photograph exists because we wanted
                    you to smile.
                  </p>

                  <p>
                    Thank you for being someone who makes ordinary days
                    feel a little brighter. Thank you for every random
                    conversation, every laugh, every memory, and for
                    simply being the wonderful person you are.
                  </p>

                  <p>
                    We hope this tiny corner of the internet reminds you
                    how deeply appreciated and loved you are. Take your
                    time opening every envelope and looking through every
                    memory. Everything here was made especially for you.
                  </p>

                  <p>
                    Happy Birthday once again.
                    We love you more than words could ever explain.
                  </p>

                </div>

                <div className="mt-12 border-t border-[#b88b67]/40 pt-8">

                  <p className="font-type text-2xl text-[#8c5d52]">
                    With all our love,
                  </p>

                  <div className="mt-6 space-y-2 font-type text-3xl text-[#8c5d52]">

                    <p>Jay</p>

                    <p>Bubble</p>

                    <p>Yads</p>

                  </div>

                </div>

              </motion.article>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </section>
  );
}
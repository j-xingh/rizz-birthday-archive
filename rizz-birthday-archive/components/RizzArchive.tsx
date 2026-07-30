'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import {
  type MessageCard,
  type StoredMessage,
  mapStoredMessage,
} from '../src/data/mockData';

import { MemoryGallery } from './MemoryGallery';
import { MessageDialog } from './MessageDialog';
import { MessageGrid } from './MessageGrid';
import { OpeningLetter } from './OpeningLetter';
import { RelicNavigation } from './RelicNavigation';

export function RizzArchive() {
  const [messages, setMessages] = useState<readonly MessageCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCard, setOpenCard] = useState<MessageCard | null>(null);

  const reduceMotion = useReducedMotion();

  const navigate = (target: string) =>
    document.getElementById(target)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
    });

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/letters', {
        cache: 'no-store',
      });

      if (!response.ok) return;

      const result: {
        messages: StoredMessage[];
      } = await response.json();

      setMessages(result.messages.map(mapStoredMessage));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();

    const timer = window.setInterval(loadMessages, 15000);

    return () => window.clearInterval(timer);
  }, [loadMessages]);

  const finalUrl = process.env.NEXT_PUBLIC_FINAL_SURPRISE_URL;

  return (
    <main className="overflow-hidden bg-ink">
      {/* HERO */}

      <section className="hero-scene relative min-h-screen px-5 pb-36 pt-28 md:px-14 lg:px-28">
        <div className="absolute inset-0 texture opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-2xl"
        >
          <p className="text-xs font-bold tracking-[.2em] text-bone/70">
            A BIRTHDAY SURPRISE FOR RIZZ
          </p>

          <h1 className="mt-5 font-display text-7xl font-black tracking-tight md:text-9xl">
            Rizz.
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-bone/90">
            We made this little corner of the internet
            <br />
            just to celebrate you.
          </p>

          <button
            onClick={() => navigate('letter')}
            className="mt-10 border-b border-bone pb-2 text-xs font-bold tracking-[.16em]"
          >
            START HERE ↓
          </button>
        </motion.div>

        <RelicNavigation onNavigate={navigate} />
      </section>

      {/* OPENING LETTER */}

      <OpeningLetter id="letter" />

      {/* LETTERS */}

      <section
        id="messages"
        className="px-5 py-24 md:px-14 lg:px-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[.18em] text-[#c8929b]">
            02 / LETTERS LEFT FOR YOU
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_.55fr]">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Letters from the
              <br />
              people who love you.
            </h2>
          </div>

          {loading ? (
            <div className="mt-12 grid min-h-56 place-items-center border border-dashed border-bone/20">
              Loading letters...
            </div>
          ) : messages.length === 0 ? (
            <div className="mt-12 grid min-h-56 place-items-center border border-dashed border-bone/20 text-bone/60">
              Nobody has written a letter yet.
            </div>
          ) : (
            <MessageGrid
              cards={messages}
              onOpen={setOpenCard}
            />
          )}
        </div>
      </section>

      {/* SHARED MOMENTS */}

      <MemoryGallery
        id="gallery"
        cards={messages}
      />

      {/* FINAL SURPRISE */}

      <section
        id="finale"
        className="
          relative
          overflow-hidden
          bg-[radial-gradient(circle_at_center,#3b1620_0%,transparent_38%),#090909]
          px-6
          py-32
          text-center
        "
      >
        {/* Floating particles */}

        <motion.div
          animate={{
            y: [-10, 12, -10],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
          className="absolute left-[12%] top-20 h-3 w-3 rounded-full bg-[#c8929b]"
        />

        <motion.div
          animate={{
            y: [15, -15, 15],
            opacity: [0.15, 0.55, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
          }}
          className="absolute right-[15%] top-40 h-2 w-2 rounded-full bg-[#f7d2d8]"
        />

        <motion.div
          animate={{
            y: [-20, 18, -20],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute bottom-24 left-[22%] h-2.5 w-2.5 rounded-full bg-[#d59ca8]"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="
            relative
            mx-auto
            max-w-3xl
            rounded-2xl
            border
            border-white/10
            bg-[#120f10]/70
            p-10
            shadow-[0_35px_80px_rgba(0,0,0,.45)]
            backdrop-blur-md
            md:p-16
          "
        >
          <p className="text-xs font-bold tracking-[.35em] text-[#c8929b]">
            ONE LAST THING...
          </p>

          <h2 className="mt-6 font-display text-5xl leading-none md:text-8xl">
            Happy Birthday,
            <br />
            <span className="text-[#c8929b]">Rizz.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-9 text-white/70">
            Every letter you've read,
            every memory you've revisited,
            and every smile you've shared
            has led to one final surprise.
          </p>

          {finalUrl ? (
            <motion.a
              href={finalUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.06,
                y: -6,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                relative
                mt-14
                inline-flex
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border-2
                border-[#c8929b]
                px-12
                py-5
                font-bold
                uppercase
                tracking-[.28em]
                text-white
              "
            >
              {/* Animated Glow */}

              <motion.div
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[#c8929b]
                  blur-2xl
                "
              />

              {/* Shimmer */}

              <motion.div
                animate={{
                  x: ['-140%', '180%'],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
                className="
                  absolute
                  inset-y-0
                  w-20
                  -rotate-12
                  bg-white/20
                  blur-md
                "
              />

              {/* Floating sparkles */}

              <motion.span
                animate={{
                  y: [-5, 5, -5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -left-5 text-xl"
              >
                ✦
              </motion.span>

              <motion.span
                animate={{
                  y: [5, -5, 5],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                }}
                className="absolute -right-5 text-xl"
              >
                ✦
              </motion.span>

              <span className="relative z-10">
                OPEN YOUR FINAL SURPRISE
              </span>
            </motion.a>
          ) : (
            <div
              className="
                mt-14
                inline-flex
                rounded-full
                border
                border-white/15
                px-10
                py-5
                text-sm
                tracking-[.25em]
                text-white/40
              "
            >
              SURPRISE COMING SOON
            </div>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {openCard && (
          <MessageDialog
            card={openCard}
            onClose={() => setOpenCard(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
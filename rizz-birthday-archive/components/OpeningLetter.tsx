'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface OpeningLetterProps { readonly id: string; }

export function OpeningLetter({ id }: Readonly<OpeningLetterProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id={id} className="bg-[#100e0d] px-5 py-24 md:px-14 lg:px-28">
      <p className="text-xs font-bold tracking-[.18em] text-[#c8929b]">01 / A NOTE FROM US</p>
      <div className="mx-auto mt-10 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <motion.button
          layout
          onClick={() => setIsOpen(true)}
          className="card-art card-envelope relative aspect-[.92] w-full overflow-hidden text-left shadow-2xl"
          aria-label="Open Rizz's letter"
        >
          <span className="absolute inset-x-8 bottom-8 text-center text-xs font-bold tracking-[.18em] text-bone">
            {isOpen ? 'OPENED' : 'OPEN THIS NOTE'}
          </span>
        </motion.button>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl"
            >
              <p className="text-xs font-bold tracking-[.18em] text-[#c8929b]">DEAR RIZZ, ❤️</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Happy Birthday, you wonderful human.</h2>
              <p className="mt-6 leading-8 text-bone/80">Before you start exploring this little website, we just wanted to leave you a small note from the three of us.</p>
              <p className="mt-4 leading-8 text-bone/80">This whole idea actually came from Yads and Bubble. They thought it would be such a cute way to celebrate you, and we all ended up working together to make it happen. Every little page, every tiny detail, and every surprise here was made with one thing in mind… you.</p>
              <p className="mt-4 leading-8 text-bone/80">We honestly do not know if words are enough to explain how much you mean to us. You are one of those people who make life brighter just by being in it. Thank you for all the laughs, the random conversations, the memories, and for simply being the amazing person you are.</p>
              <p className="mt-4 leading-8 text-bone/80">We hope this website makes you smile, laugh, maybe get a little emotional, and reminds you of how loved you truly are. Take your time exploring everything—we hid lots of little things around just for you.</p>
              <p className="mt-4 leading-8 text-bone/80">You deserve all the happiness in the world, not just today but every single day. Never forget that you will always have three people cheering for you, believing in you, and caring about you more than you probably realize.</p>
              <p className="mt-4 leading-8 text-bone/80">Happy Birthday once again, Rizz. We love you so, so much.</p>
              <p className="mt-7 font-type text-lg text-[#c8929b]">With all our love,</p>
              <p className="mt-2 font-type text-lg text-[#c8929b]"><strong>Jay</strong><br /><strong>Bubble</strong><br /><strong>Yads</strong></p>
            </motion.article>
          ) : (
            <div>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">Start here.</h2>
              <p className="mt-5 leading-8 text-bone/70">Open the envelope to read a birthday note from the three people who made this surprise.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

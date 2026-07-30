'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { MessageCard } from '../src/data/mockData';

interface MessageDialogProps {
  readonly card: MessageCard;
  readonly onClose: () => void;
}

export function MessageDialog({
  card,
  onClose,
}: Readonly<MessageDialogProps>) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl"
        >
          <button
            onClick={onClose}
            aria-label="Close Letter"
            className="
              absolute
              right-6
              top-6
              z-50
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-black/80
              text-white
              transition
              duration-300
              hover:rotate-90
              hover:bg-black
            "
          >
            <X size={22} />
          </button>

          <div className="parchment relative h-[90vh] overflow-hidden rounded-lg">
            <div
              className="
                h-full
                overflow-y-auto
                px-10
                py-14
                md:px-28
                md:py-20
              "
            >
              <div className="mx-auto max-w-2xl text-[#24130b]">
                <p className="font-type text-[2.3rem] leading-none">
                  Dear Rizz,
                </p>

                <div
                  className="
                    prose
                    mt-8
                    max-w-none
                    font-type
                    text-[1.7rem]
                    leading-[2.8rem]
                  "
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {card.text}
                  </ReactMarkdown>
                </div>

                {card.memory && (
                  <section className="mt-16 border-t border-[#5a382c]/20 pt-10">
                    <h2 className="mb-6 font-type text-[2rem]">
                      Favorite Memory
                    </h2>

                    <p
                      className="
                        font-type
                        text-[1.65rem]
                        leading-[2.7rem]
                        text-[#24130b]
                      "
                    >
                      {card.memory}
                    </p>
                  </section>
                )}

                {card.link && (
                  <section className="mt-16 border-t border-[#5a382c]/20 pt-10">
                    <h2 className="mb-6 font-type text-[2rem]">
                      Shared Link
                    </h2>

                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        font-type
                        text-[1.6rem]
                        underline
                        underline-offset-4
                        transition
                        hover:opacity-70
                      "
                    >
                      Open Memory ↗
                    </a>
                  </section>
                )}

                <div className="mt-20 text-right">
                  <p className="font-type text-[2rem]">
                    With love,
                  </p>

                  <p
                    className="mt-3 font-type text-[3.4rem] text-[#5a382c]"
                    style={{
                      transform: 'rotate(-2deg)',
                    }}
                  >
                    {card.sender}
                  </p>
                </div>

                <div className="h-8" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
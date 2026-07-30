'use client';

import { useState } from 'react';

export function ContributionPortal() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const [feedback, setFeedback] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setStatus('sending');
    setFeedback('Sealing your letter...');

    try {
      const response = await fetch('/api/letters', {
        method: 'POST',
        body: new FormData(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'Something went wrong while saving.'
        );
      }

      form.reset();

      setStatus('success');

      setFeedback(
        '❤️ Your letter has been safely placed inside Rizz’s Birthday Archive.'
      );
    } catch (error) {
      console.error(error);

      setStatus('error');

      setFeedback(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#38141d,transparent_35%),#090808] px-6 py-20 md:px-14 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="self-center">
          <p className="text-xs font-bold tracking-[.3em] text-[#c8929b]">
            WRITE A LETTER
          </p>

          <h1 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            Leave behind
            <br />
            <span className="text-[#c8929b]">
              a memory she'll treasure.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-9 text-white/65">
            This page is where every birthday letter begins. Share a heartfelt
            message, an unforgettable memory, a favourite photo, or a song that
            reminds you of her. Once sealed, your letter becomes a permanent
            part of Rizz&apos;s Birthday Archive.
          </p>

          <div
            className="
              mt-14
              rounded-xl
              border
              border-[#ffffff10]
              bg-white/[0.03]
              p-6
              backdrop-blur-sm
            "
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#c8929b]">
              Before You Begin
            </p>

            <ul className="mt-5 space-y-3 text-white/70">
              <li>• Write from the heart.</li>
              <li>• Photos are completely optional.</li>
              <li>• GIFs and memes are welcome.</li>
              <li>• Songs and videos make wonderful memories.</li>
            </ul>
          </div>
        </section>

        <form
          onSubmit={submit}
          className="
            rounded-2xl
            border
            border-white/10
            bg-[#121010]/80
            p-7
            shadow-[0_30px_80px_rgba(0,0,0,.45)]
            backdrop-blur-md
            md:p-10
          "
        >
          <div className="grid gap-6">
            <Field label="YOUR NAME">
              <input
                required
                name="name"
                maxLength={45}
                placeholder="Who is writing this letter?"
              />
            </Field>

            <Field label="YOUR LETTER">
              <textarea
                required
                name="message"
                maxLength={1000}
                placeholder="Dear Rizz..."
              />
            </Field>

            <Field label="FAVOURITE MEMORY (OPTIONAL)">
              <textarea
                name="memory"
                maxLength={500}
                placeholder="Share a moment you'll never forget..."
              />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="PHOTO / GIF / MEME">
                <input
                  name="media"
                  type="file"
                  accept="image/*,.gif"
                />
              </Field>

              <Field label="SONG / VIDEO LINK">
                <input
                  name="link"
                  type="url"
                  placeholder="https://"
                />
              </Field>
            </div>

            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
              <button
                disabled={status === 'sending'}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-full
                  border
                  border-[#c8929b]
                  bg-[#c8929b]
                  px-8
                  py-4
                  text-sm
                  font-bold
                  uppercase
                  tracking-[.28em]
                  text-black
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_40px_rgba(200,146,155,.35)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {status === 'sending'
                  ? 'SEALING...'
                  : 'SEAL THE LETTER'}
              </button>

              <div className="min-h-[56px]">
                {feedback && (
                  <p
                    aria-live="polite"
                    className={`rounded-lg border px-5 py-4 text-sm leading-7 ${
                      status === 'error'
                        ? 'border-red-500/30 bg-red-500/10 text-red-300'
                        : status === 'success'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-[#c8929b]/20 bg-[#c8929b]/10 text-[#e8b8c0]'
                    }`}
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-3">
      <span
        className="
          text-[11px]
          font-bold
          uppercase
          tracking-[.28em]
          text-[#c8929b]
        "
      >
        {label}
      </span>

      <span
        className="
          [&>input]:w-full
          [&>textarea]:w-full

          [&>input]:rounded-xl
          [&>textarea]:rounded-xl

          [&>input]:border
          [&>textarea]:border

          [&>input]:border-white/10
          [&>textarea]:border-white/10

          [&>input]:bg-[#1a1717]
          [&>textarea]:bg-[#1a1717]

          [&>input]:px-5
          [&>input]:py-4

          [&>textarea]:min-h-40
          [&>textarea]:px-5
          [&>textarea]:py-4

          [&>input]:text-white
          [&>textarea]:text-white

          [&>textarea]:font-type

          [&>input]:placeholder:text-white/30
          [&>textarea]:placeholder:text-white/30

          [&>input]:outline-none
          [&>textarea]:outline-none

          [&>input]:transition
          [&>textarea]:transition

          [&>input]:duration-300
          [&>textarea]:duration-300

          [&>input:focus]:border-[#c8929b]
          [&>textarea:focus]:border-[#c8929b]

          [&>input:focus]:ring-4
          [&>textarea:focus]:ring-4

          [&>input:focus]:ring-[#c8929b]/15
          [&>textarea:focus]:ring-[#c8929b]/15

          [&>input[type=file]]:cursor-pointer
          [&>input[type=file]]:file:mr-4
          [&>input[type=file]]:file:rounded-lg
          [&>input[type=file]]:file:border-0
          [&>input[type=file]]:file:bg-[#c8929b]
          [&>input[type=file]]:file:px-4
          [&>input[type=file]]:file:py-2
          [&>input[type=file]]:file:font-semibold
          [&>input[type=file]]:file:text-black
          [&>input[type=file]]:file:transition
          [&>input[type=file]]:file:hover:bg-[#ddb0b7]
        "
      >
        {children}
      </span>
    </label>
  );
}
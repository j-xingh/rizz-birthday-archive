# 🎂 Rizz's Birthday Archive

> *A handcrafted digital scrapbook built to celebrate someone truly special.*

**Rizz's Birthday Archive** is a cinematic, interactive birthday web experience where friends can leave heartfelt letters, memories, photographs, GIFs, and messages that are beautifully displayed in a curated digital archive.

Instead of a traditional birthday card, this project creates an immersive journey through memories—ending with one final surprise.

---

# ✨ Features

### 💌 Opening Letter

A beautifully animated introduction that welcomes Rizz into the experience.

### 📝 Letters Archive

Friends can write heartfelt birthday letters that appear as elegant cards throughout the website.

### 📸 Memory Gallery

A polaroid-inspired gallery showcasing shared photos, GIFs, and memories from friends.

### 🎁 Final Surprise

The experience concludes with a dramatic animated reveal that opens a secret surprise (playlist, video, gift, website, etc.).

### ⚡ Live Updates

New letters submitted by friends appear automatically on the main website within **15 seconds** without requiring a redeployment.

### 🌙 Premium Design

* Dark gothic aesthetic
* Punk-inspired visuals
* Smooth Framer Motion animations
* Responsive across desktop and mobile
* Cinematic transitions throughout

---

# 🛠️ Tech Stack

* **Next.js 15**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Supabase**
* **Vercel**

---

# 🌐 Project Routes

## 🎂 Birthday Experience

```
/
```

This is the main experience intended **only for Rizz**.

It contains:

* Opening Letter
* Friends' Letters
* Memory Gallery
* Final Surprise

---

## ✍️ Friend Submission Portal

```
/write
```

Share this page with friends.

Each friend can submit:

* Name
* Birthday Letter
* Memory
* Optional Image or GIF
* Optional Link

Every submission is stored immediately in Supabase and automatically appears on the birthday page.

---

# 🗄️ Supabase Setup

## 1. Create a Supabase Project

Create a new project from the Supabase dashboard.

---

## 2. Create the Database

Open:

```
SQL Editor
```

Run:

```
supabase/setup.sql
```

This creates all required tables and policies.

---

## 3. Get API Credentials

Navigate to:

```
Project Settings
→ API
```

Copy:

* Project URL
* Service Role Key

---

## 4. Configure Local Environment

Copy:

```
.env.example
```

Rename it to:

```
.env.local
```

Add the following variables:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_FINAL_SURPRISE_URL=
```

`NEXT_PUBLIC_FINAL_SURPRISE_URL` can point to:

* Spotify Playlist
* YouTube Video
* Google Drive Folder
* Secret Website
* Digital Gift
* Anything you want the final surprise button to open

---

## 5. Configure Vercel

Add the same environment variables inside:

```
Project
→ Settings
→ Environment Variables
```

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_FINAL_SURPRISE_URL
```

> **Important:** Never expose the Service Role Key publicly. It is only used server-side by the `/api/letters` route.

---

# 🚀 Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

or

```
http://localhost:3000/write
```

---

# 🚀 Deployment

This project is optimized for **Vercel**.

Simply connect the GitHub repository to Vercel, add the required environment variables, and every push to the main branch will automatically trigger a production deployment.

---

# 📁 Project Structure

```
app/
 ├── api/
 ├── write/
 ├── page.tsx

components/
 ├── MemoryGallery.tsx
 ├── MessageDialog.tsx
 ├── MessageGrid.tsx
 ├── OpeningLetter.tsx
 ├── RelicNavigation.tsx
 └── RizzArchive.tsx

supabase/
 └── setup.sql

public/
```

---

# ❤️ Built With Love

This project wasn't built as a portfolio piece or a coding challenge.

It was built as a birthday gift.

Every animation, every transition, every letter, and every memory was designed to make one person smile and to preserve moments that deserve to be remembered.

Sometimes the best software isn't made to solve a problem.

Sometimes it's made to celebrate someone.

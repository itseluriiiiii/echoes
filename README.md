# Echoes - Anonymous Advice Platform

A web application for asking anonymous questions and receiving honest advice from strangers.

## Features

- 🔐 **Anonymous Posting** - Ask questions without revealing your identity
- 💬 **Categorized Advice** - Replies are categorized as Emotional, Practical, or Tough Love
- ⏰ **Time-Limited Questions** - Questions expire after 48 hours
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🎨 **Retro Pixel Aesthetic** - Unique pixel-art inspired design
- 🚀 **Real-time Database** - Powered by Supabase

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn-ui
- **Database:** Supabase (PostgreSQL)
- **State Management:** React Query
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free at [supabase.com](https://supabase.com))

### Local Development

1. **Clone the repository:**
```bash
git clone <YOUR_GIT_URL>
cd echoes
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env.local` file in the root directory:
```
VITE_SUPABASE_URL=https://dmyrzdjofvuadcmixjvr.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

4. **Set up Supabase database:**
Go to your Supabase dashboard and run this SQL in the SQL Editor:

```sql
-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT question_not_empty CHECK (LENGTH(question) > 0)
);

-- Create replies table
CREATE TABLE replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('emotional', 'practical', 'tough-love')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT reply_not_empty CHECK (LENGTH(content) > 0)
);

-- Create indexes
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX idx_questions_expires_at ON questions(expires_at);
CREATE INDEX idx_replies_question_id ON replies(question_id);
CREATE INDEX idx_replies_created_at ON replies(created_at);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read on questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public read on replies" ON replies FOR SELECT USING (true);
CREATE POLICY "Allow public insert on questions" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on replies" ON replies FOR INSERT WITH CHECK (true);
```

5. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/echoes.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your echoes repository
5. Click **"Import"**

### Step 3: Add Environment Variables

1. In Vercel project settings, go to **Settings > Environment Variables**
2. Add these variables:
   - `VITE_SUPABASE_URL`: `https://dmyrzdjofvuadcmixjvr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
3. Click **"Save"**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Your app is now live! 🚀

### Step 5: Verify

- Visit your deployed URL
- Test posting a question in /ask
- Browse questions in /browse
- Post a reply to verify everything works

## Project Structure

```
echoes/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── Header.tsx
│   │   ├── Preloader.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   ├── Browse.tsx
│   │   ├── Ask.tsx
│   │   └── QuestionView.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useQuestions.ts
│   ├── lib/                # Utilities and services
│   │   ├── supabase.ts
│   │   ├── database.ts
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # Static assets
├── .env.local             # Environment variables (not committed)
├── .env.example           # Environment template
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## How It Works

### Mock Data vs Supabase

The app automatically detects if Supabase is configured:
- **Without env vars** → Uses mock data (development)
- **With env vars** → Uses Supabase (production)

### Data Flow

1. User asks a question → Stored in Supabase `questions` table
2. Question expires after 48 hours
3. Other users browse questions and post replies
4. Replies are categorized and stored in `replies` table
5. All data is anonymous - no user tracking

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check that `package-lock.json` is committed to git

### Questions Not Loading
- Verify Supabase credentials in `.env.local`
- Check that database tables exist in Supabase
- Verify RLS policies allow public read access

### Environment Variables Not Working
- Restart dev server after updating `.env.local`
- For Vercel: redeploy after adding environment variables

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the [Supabase docs](https://supabase.com/docs)
- Check the [Vercel docs](https://vercel.com/docs)
- Review the [React docs](https://react.dev)

## Roadmap

- [ ] User authentication
- [ ] Question search and filtering
- [ ] Upvote/downvote replies
- [ ] Report inappropriate content
- [ ] Email notifications
- [ ] Dark/light theme toggle

---

Built with ❤️ using React, Supabase, and Vercel

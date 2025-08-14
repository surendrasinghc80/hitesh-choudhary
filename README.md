# 🤖 AI Persona Chat

A modern, interactive chat application where you can have conversations with AI-powered personas of popular tech educators and YouTubers. Built with Next.js 15, React 19, and featuring a beautiful glassmorphism design with dark/light theme support.

![AI Persona Chat](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎭 **AI Personas**

- **Hitesh Choudhary**: Retired corporate executive, full-time YouTuber, ex-founder of LCO (acquired), ex-CTO, Sr. Director at PW with 2 YouTube channels (950k & 470k subscribers)
- **Piyush Garg**: Building Teachyst platform for educators and creators, YouTuber, Educator, Founder of pro.piyushgarg.dev

### 🎨 **Modern UI/UX**

- **Glassmorphism Design**: Beautiful frosted glass effects with backdrop blur
- **Gradient Backgrounds**: Dynamic color gradients that adapt to themes
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices

### 🌙 **Theme Support**

- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **System Theme Detection**: Automatically adapts to your system preferences
- **Persistent Theme**: Remembers your theme choice across sessions

### 💬 **Chat Features**

- **Real-time Messaging**: Instant responses from AI personas
- **Typing Indicators**: Animated typing dots when AI is responding
- **Message History**: Scroll through conversation history
- **Auto-scroll**: Automatically scrolls to latest messages
- **Enter to Send**: Press Enter to send messages quickly
- **Character Context**: Each persona maintains their unique personality and expertise

### 🎯 **Interactive Elements**

- **Character Selection**: Choose from available AI personas
- **Smooth Navigation**: Easy switching between landing page and chat interface
- **Loading States**: Beautiful loading animations and states
- **Error Handling**: Graceful error messages for API failures

### 🏗️ **Technical Features**

- **Next.js 15**: Latest Next.js with App Router and React Server Components
- **React 19**: Latest React with improved performance and features
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS 4**: Latest Tailwind with improved performance
- **Axios**: HTTP client for API communication
- **Lucide React**: Beautiful, customizable icons
- **Geist Font**: Modern, clean typography

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-persona-chat
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Backend API Setup

The application requires a backend API server for AI persona responses. Make sure you have:

- **Hitesh Choudhary API**: `http://localhost:5000/api/hitesh/chat`
- **Piyush Garg API**: `http://localhost:5000/api/piyush/chat`

Each API endpoint should accept POST requests with the following structure:

```json
{
  "message": "Your message here"
}
```

And return responses in this format:

```json
{
  "reply": "AI response here"
}
```

## 📁 Project Structure

```
ai-persona-chat/
├── app/
│   ├── favicon.ico          # App favicon
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.jsx           # Root layout with theme provider
│   └── page.jsx             # Main application component
├── components/
│   └── theme-provider.jsx   # Theme context provider
├── lib/                     # Utility functions
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.ts           # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## 🛠️ Available Scripts

- **`npm run dev`**: Start development server with Turbopack
- **`npm run build`**: Build the application for production
- **`npm run start`**: Start the production server
- **`npm run lint`**: Run ESLint for code quality checks

## 🎨 Customization

### Adding New Personas

To add new AI personas, edit the `characters` array in `app/page.jsx`:

```javascript
const characters = [
  {
    id: 3,
    name: "Your Persona Name",
    description: "Persona description",
    image: "https://your-image-url.com/image.jpg",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-500",
    specialty: "Your specialty",
    apiEndpoint: "http://localhost:5000/api/your-persona/chat",
  },
  // ... existing personas
];
```

### Styling Customization

The application uses Tailwind CSS for styling. Key customization areas:

- **Colors**: Modify gradient colors in the character objects
- **Animations**: Adjust transition durations and effects
- **Layout**: Modify responsive breakpoints and spacing
- **Typography**: Change font families in `layout.jsx`

### Theme Customization

Themes are managed by `next-themes`. Customize in `components/theme-provider.jsx`:

```javascript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 API Integration

The app integrates with backend APIs for each persona. Ensure your backend:

1. **Accepts POST requests** to persona-specific endpoints
2. **Returns JSON responses** with a `reply` field
3. **Handles CORS** for frontend requests
4. **Implements error handling** for graceful failures

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
2. **Connect to Vercel**
3. **Deploy automatically**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Hitesh Choudhary** - For inspiring tech education content
- **Piyush Garg** - For innovative educational platforms
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For seamless deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** in the repository
2. **Create a new issue** with detailed information
3. **Join our community** discussions

---

**Built with ❤️ using Next.js 15, React 19, and modern web technologies.**

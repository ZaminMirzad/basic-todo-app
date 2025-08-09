# 🚀 Modern Todo App - Next.js 15 & TypeScript

A feature-rich, mobile-first todo application built with Next.js 15, TypeScript, and modern web technologies. Experience seamless task management with real-time synchronization, user authentication, and responsive design.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Synchronization** - Instant updates across devices with InstantDB
- **User Authentication** - Secure login with Clerk Auth
- **Mobile-First Design** - Optimized for mobile devices with responsive layout
- **Task Management** - Create, edit, delete, and categorize todos
- **Smart Filtering** - Filter by status: all, active, completed
- **Overdue Tracking** - Visual indicators for overdue tasks
- **Priority System** - Organize tasks by priority levels
- **Category Management** - Group tasks by custom categories

### 🎨 UI/UX Excellence
- **Dark/Light Mode** - Automatic theme switching
- **Smooth Animations** - Framer Motion powered transitions
- **Mobile Optimized** - Touch-friendly interface
- **Clean Interface** - Minimal, distraction-free design
- **Loading States** - Skeleton screens for better UX

### ⚡ Technical Stack
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **InstantDB** - Real-time database synchronization
- **Clerk Auth** - Modern authentication solution
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd basic-todo-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
NEXT_PUBLIC_INSTANT_APP_ID=your_instantdb_app_id
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. **Start development server**
```bash
npm run dev
# Visit http://localhost:3000
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Usage

### Creating Tasks
1. Sign in with your preferred method
2. Click "Add Task" to create new todos
3. Set title, category, priority, and due date
4. Save and see real-time updates

### Managing Tasks
- **Mark Complete** - Toggle task completion
- **Edit** - Click on any task to edit
- **Delete** - Remove unwanted tasks
- **Filter** - Use filter tabs for focused views
- **Search** - Find tasks quickly

### Mobile Experience
- **Swipe Gestures** - Intuitive mobile interactions
- **Touch Optimized** - Large touch targets
- **Offline Support** - Works without internet
- **Responsive** - Adapts to any screen size

## 📁 Project Structure

```
basic-todo-app/
├── app/
│   ├── page.tsx              # Main todo page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── TodoItem.tsx          # Individual todo component
│   ├── AddTodo.tsx           # Add todo form
│   ├── Stats.tsx             # Statistics display
│   ├── FilterBar.tsx         # Filter controls
│   └── AuthButton.tsx        # Authentication UI
├── lib/
│   ├── instantdb.ts          # Database configuration
│   ├── hooks/
│   │   └── useInstantTodos.ts # Custom hook for todos
│   └── types/                # TypeScript definitions
└── public/
    └── icons/               # Static assets
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript checking

### Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

## 🐛 Troubleshooting

### Common Issues
- **Database connection**: Ensure InstantDB credentials are correct
- **Authentication**: Check Clerk configuration
- **Build errors**: Run `npm run type-check`
- **Styling issues**: Clear browser cache

### Performance Tips
- Use React DevTools Profiler
- Monitor bundle size with `npm run analyze`
- Implement code splitting for large features

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/basic-todo-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/basic-todo-app/discussions)
- **Email**: your-email@example.com

---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

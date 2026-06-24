# MockupGallery - Design Mockup Sharing Platform

A modern web application for designers to upload, showcase, and share their UI/UX design mockups.

## Features

- 🔐 **User Authentication** - Secure sign up and login with Firebase
- 📸 **Upload Mockups** - Easily upload your design images
- 🎨 **Beautiful Gallery** - Showcase your work in a stunning grid layout
- 🔗 **Share Easily** - Generate shareable links for your mockups
- 👤 **User Profiles** - Personalized profile pages
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Vercel
- **State Management**: Zustand

## Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arifuluix/mockup-gallery.git
   cd mockup-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Create a Storage bucket
   - Get your Firebase config keys

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update `.env.local` with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── signup/            # Sign up page
│   ├── dashboard/         # User dashboard
│   ├── upload/            # Upload page
│   └── profile/           # User profile
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── AuthProvider.tsx  # Firebase auth provider
│   └── ProtectedRoute.tsx # Route protection
├── lib/                   # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   └── store.ts          # Zustand stores
├── public/                # Static assets
├── .env.local.example    # Environment variables example
└── package.json          # Dependencies
```

## Usage

1. **Sign Up** - Create a new account
2. **Upload** - Click "Upload" to add your design mockups
3. **Manage** - View and delete mockups from your dashboard
4. **Share** - Generate shareable links for your projects

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your Firebase environment variables
4. Deploy!

## Firestore Database Structure

### Collections

**users** collection:
```
{
  uid: string
  email: string
  displayName: string
  createdAt: timestamp
  bio: string
  profileImage: string
}
```

**mockups** collection:
```
{
  title: string
  description: string
  imageUrl: string
  userId: string (reference to users.uid)
  createdAt: timestamp
  isPublic: boolean
}
```

## Firebase Security Rules

### Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /mockups/{mockupId} {
      allow read: if request.auth != null || resource.data.isPublic == true;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /mockups/{userId}/{allPaths=**} {
      allow read: if request.auth != null || resource.metadata.isPublic == true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Future Enhancements

- [ ] Social features (likes, comments, followers)
- [ ] Advanced search and filtering
- [ ] Mockup categories and tags
- [ ] Analytics and view tracking
- [ ] Collaboration features
- [ ] Mobile app (React Native)
- [ ] Payment integration for premium features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you have any questions or need help, please open an issue on GitHub.

## Author

Created with ❤️ by [arifuluix](https://github.com/arifuluix)

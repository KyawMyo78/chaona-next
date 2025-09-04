# ChaonaNext 🌱

**Powering the Next Generation of Farmers**

ChaonaNext is a cross-platform agricultural waste marketplace application that connects farmers with businesses to transform agricultural waste into valuable products, creating a circular economy that benefits everyone.

---

## 📝 Changelog & Major Updates

### Navigation & Structure
- Switched to Expo Router for file-based navigation.
- Tab-based navigation for Home, Dashboard, Marketplace, Profile, Help, Notifications, Settings, Submit Waste.
- Cleaned up routes and removed references to deleted files for a warning-free project.

### Internationalization
- Full bilingual support (English/Thai) using i18next and react-i18next.
- Easy language toggle in navbar and mobile menu.

### UI/UX & Branding
- Responsive design for mobile and desktop.
- Two-color logo branding for "ChaonaNext" (Chaona green, Next black/blue).
- Modern navbar with logo, language selector, and navigation links.
- Hamburger menu for mobile navigation.
- Consistent card layouts and touch-friendly interface.

### Marketplace & E-commerce
- Marketplace tab for browsing, buying, and selling agricultural products.
- Product cards with real images, pricing, seller info, and conditions.
- Search and filter by category and keywords.

### Waste Submission
- Submit Waste tab and form for agricultural waste recycling/disposal.
- Step-by-step instructions and confirmation prompts via AI chat.

### AI Chat Bot ("Chaona Buddy")
- Integrated Gemini API (REST and official SDK) for AI chat.
- Secure API key management via `.env` (never committed to repo).
- System prompt with rules, app features, and example Q&A for contextual, bilingual, agricultural expertise.
- Chat history context for smarter AI responses.
- Floating AI chat button with mascot image, arc text, and close button.
- Help & Support page links to live AI chat.

### Security & Best Practices
- Removed `.env` from repo and added to `.gitignore`.
- No API keys exposed in public codebase.

### Visuals & Assets
- Mascot image (`chaona_buddy.jpeg`) used in floating button and chat navbar.
- All images stored in `assets/images/`.

### Component Improvements
- Refactored floating button and navbar AI button for consistent mascot display and centering.
- Improved button positioning to avoid footer overlap.
- Clean, minimal close button in chat page.

### Project Cleanup
- Removed unnecessary files, code, and route references.
- Updated type definitions and router config for only existing routes.

---

## 🚀 Live Demo

- **Web Version**: Coming soon (Will be deployed to Netlify/Vercel)
- **Mobile**: Available via Expo Go app using QR code

## 📱 Features

### ✅ Currently Implemented
- 🌍 **Bilingual Support**: Full English/Thai localization
- 📱 **Cross-Platform**: Works on Web, iOS, and Android
- 🏪 **Marketplace**: Browse agricultural waste products with real images
- 📝 **Submit Waste**: Comprehensive form for listing agricultural waste
- 💰 **E-commerce Ready**: Pricing, conditions, seller info, payment methods
- 🎨 **Responsive Design**: Optimized for both mobile and desktop
- 📸 **Photo Upload**: Camera and gallery integration
- 🔍 **Search & Filter**: Find products by category and search terms
- 📍 **Location Support**: Multiple Thai provinces supported

### 🚧 In Development
- 👤 **User Authentication**: Login/register system
- 💬 **Messaging**: Direct communication between buyers and sellers
- 💳 **Payment Integration**: Secure payment processing
- 📊 **Dashboard**: Analytics and management tools
- 🔔 **Notifications**: Push notifications for updates
- 🌟 **Reviews & Ratings**: User feedback system

## 🛠 Tech Stack

- **Framework**: Expo (React Native + Expo Router)
- **Language**: TypeScript
- **Internationalization**: i18next + react-i18next
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet
- **Images**: Expo Image Picker
- **Icons**: FontAwesome via @expo/vector-icons
- **Development**: Expo CLI with hot reloading

## 🚀 Quick Start & Live Demo

### 🌐 Live Application
**Production URL**: https://chaona-next.vercel.app *(Available after Vercel deployment)*

### 🛠 Local Development

#### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

#### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/KyawMyo78/chaona-next.git
   cd chaona-next
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

#### Platform Access
- **🌐 Web**: Press `w` or visit `http://localhost:8081`
- **📱 iOS**: Press `i` or scan QR with Camera app  
- **🤖 Android**: Press `a` or scan QR with Expo Go app

### 🚀 Deployment
Ready for production deployment on:
- ✅ **Vercel** (Recommended) - See `VERCEL_SETUP.md`
- ✅ **Netlify** - Auto-configured with `netlify.toml`
- ✅ **Expo Hosting** - For development builds

## 📱 Platform Support

| Platform | Status | Access Method |
|----------|--------|---------------|
| 🌐 **Web** | ✅ Live | Direct browser access |
| 📱 **iOS** | ✅ Ready | Expo Go app |
| 🤖 **Android** | ✅ Ready | Expo Go app |
| 🖥 **Desktop** | 🔄 Planned | Future Electron build |

## 📱 Screenshots

### Desktop View
- Modern navbar with logo and navigation links
- Language selector dropdown
- Responsive card layout

### Mobile View
- Hamburger menu navigation
- Mobile-optimized language selector
- Touch-friendly interface

## 🌍 Internationalization

The app supports multiple languages using i18next:

- **Adding new languages**: 
  1. Create a new JSON file in `/locales/` (e.g., `fr.json`)
  2. Add translations following the existing structure
  3. Update the language options in `components/LanguageSelector/index.tsx`

- **Translation structure**:
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "contact": "Contact"
  },
  "content": {
    "welcome": "Welcome to Chaona",
    "subtitle": "Building a Sustainable Future"
  }
}
```

## 🏗️ Project Structure

```
chaona-next/
├── app/                          # Main app screens and navigation
│   ├── (tabs)/                   # Tab-based navigation (Home, Dashboard, Marketplace, Profile, Help, etc.)
│   │   ├── chaona_buddy.tsx      # AI chat bot page (mascot image, chat UI)
│   │   ├── marketplace.tsx       # Marketplace screen
│   │   ├── submit-waste.tsx      # Waste submission form
│   │   ├── profile.tsx           # User profile
│   │   ├── dashboard.tsx         # Dashboard/analytics
│   │   ├── login.tsx             # Login screen
│   │   ├── register.tsx          # Registration screen
│   │   ├── settings.tsx          # Settings page
│   │   ├── notifications.tsx     # Notifications page
│   │   ├── index.tsx             # Home screen
│   │   ├── _layout.tsx           # Tab layout configuration
│   │   └── index-minimal.tsx     # Minimal home screen (optional)
│   ├── _layout.tsx               # Root layout
│   └── +not-found.tsx            # 404 page
├── assets/
│   └── images/
│       └── chaona_buddy.jpeg     # Mascot image and other static assets
├── components/                   # Reusable UI components
│   ├── NavbarAIButton.tsx        # AI chat button in navbar
│   ├── AIFloatButton.tsx         # Floating AI chat button
│   ├── DemoFooter.tsx            # Demo footer component
│   ├── ProfileContent/           # Profile content components
│   ├── NotificationBell/         # Notification bell component
│   ├── LanguageSelector/         # Language selection dropdown
│   └── Themed.tsx                # Theme-aware components
├── constants/
│   └── Colors.ts                 # Color definitions
├── contexts/                     # React context providers (if any)
├── i18n/
│   └── index.ts                  # i18next configuration
├── locales/
│   ├── en.json                   # English translations
│   └── th.json                   # Thai translations
├── .env                          # API keys and secrets (gitignored)
├── .gitignore                    # Ignore sensitive files
└── package.json                  # Dependencies and scripts
```

## 🛠️ Technologies Used

- **Framework**: Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Internationalization**: i18next, react-i18next
- **Styling**: React Native StyleSheet
- **Icons**: @expo/vector-icons

## 🎨 Customization

### Adding New Screens
1. Create a new file in the `app/` directory
2. Export a default React component
3. The file name becomes the route (e.g., `about.tsx` → `/about`)

### Modifying Themes
- Update color schemes in `constants/Colors.ts`
- Modify component styling in respective component files

### Adding New Components
- Create components in the `components/` directory
- Use TypeScript for type safety
- Follow the existing naming conventions

## 📄 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run tests (Jest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **KyawMyo78** - Initial work - [GitHub](https://github.com/KyawMyo78)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community for continuous support
- i18next team for internationalization tools

---

Built with ❤️ using Expo and React Native

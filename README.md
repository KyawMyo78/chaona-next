# ChaonaNext 🌱

**Powering the Next Generation of Farmers**

ChaonaNext is a cross-platform agricultural waste marketplace application that connects farmers with businesses to transform agricultural waste into valuable products, creating a circular economy that benefits everyone.

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
├── app/                          # App screens and navigation
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   └── index.tsx            # Home screen
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx          # 404 page
├── assets/                       # Images, fonts, and static assets
├── components/                   # Reusable UI components
│   ├── LanguageSelector/        # Language selection component
│   ├── Themed.tsx              # Theme-aware components
│   └── useColorScheme.*        # Color scheme utilities
├── constants/                    # App constants and configurations
│   └── Colors.ts               # Color definitions
├── i18n/                        # Internationalization setup
│   └── index.ts                # i18next configuration
├── locales/                     # Translation files
│   ├── en.json                 # English translations
│   └── th.json                 # Thai translations
└── package.json                # Dependencies and scripts
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

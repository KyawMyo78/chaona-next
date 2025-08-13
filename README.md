# Chaona Next

A modern, cross-platform mobile and web application built with Expo and React Native, featuring internationalization and responsive design.

## 🌟 Features

- **Cross-Platform**: Works on iOS, Android, and Web
- **Internationalization (i18n)**: Multi-language support with i18next
  - English (EN)
  - Thai (TH)
  - Easily extendable for more languages
- **Responsive Design**: Adaptive UI for mobile and desktop
- **Modern UI Components**:
  - Sticky navigation bar
  - Mobile hamburger menu
  - Language selector modal
  - ESG-themed content sections
- **TypeScript**: Full type safety and better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KyawMyo78/chaona-next.git
cd chaona-next
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running on Different Platforms

- **Web**: `npm run web` or press `w` in the terminal
- **iOS Simulator**: `npm run ios` or press `i` in the terminal
- **Android Emulator**: `npm run android` or press `a` in the terminal

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

# Grocy Mobile

Grocy is a mobile shopping list application developed with Capacitor, ViteJS and p5.js.

The project was created as part of a multimedia and interactive application development practice focused on hybrid mobile applications and generative visual interaction.

---

## Features

- Add and remove products from the shopping list
- Quick product buttons
- Mark products as purchased
- LocalStorage persistence
- Native haptic feedback using Capacitor Haptics
- Visual effects generated with p5.js
- Minimalist iOS-inspired interface
- Android support through Capacitor

---

## Technologies Used

- ViteJS
- Vanilla JavaScript
- Capacitor
- Android Studio
- p5.js
- CSS3
- LocalStorage API

---

## Installation

Clone the repository:

```bash
git clone https://github.com/juanunez92/grocy-mobile.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Android Execution

Build the project:

```bash
npm run build
```

Sync Capacitor:

```bash
npx cap sync android
```

Open Android Studio:

```bash
npx cap open android
```

---

## Project Structure

```text
src/
 ├── main.js
 ├── sketch.js
 └── style.css

public/
 ├── logo.png
 └── p5.min.js
```

---

## Generative Visual Interaction

The application integrates p5.js as a visual interaction layer. Small particle effects are generated dynamically when products are added or removed from the list, creating visual feedback linked to user actions.

---

## Native Functionality

The project uses Capacitor Haptics to provide vibration feedback during interactions such as adding, removing or completing products.

---

## Future Improvements

- Supermarket geolocation using Google Maps API
- Product categories
- Dark mode
- Cloud synchronization
- Shared shopping lists

---

## Author

Juan Antonio Núñez

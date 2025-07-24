# Notes App 📝 | Aplikace pro Poznámky

**[English](#english) | [Čeština](#čeština)**

---

## English

A simple and user-friendly web application for creating and managing notes with Google OAuth authentication.

### 🚀 Features

- **Google OAuth Authentication** - Secure login via Google account
- **CRUD Operations** - Create, read, update, and delete notes
- **Note Search** - Quick search by title and content
- **Pagination** - Convenient display of large number of notes
- **Responsive Design** - Works on all devices
- **Security** - Notes are tied to individual users

### 🛠 Technologies

#### Backend
- **Node.js** - Server platform
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication
- **Express Session** - Session management

#### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Google Fonts** - Typography

#### Testing
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **MongoDB Memory Server** - Test database

### 📁 Project Structure

```
note-production-kopie/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── dashboardController.js # Notes controller
│   │   └── mainController.js      # Main controller
│   ├── middleware/
│   │   └── checkAuth.js          # Auth middleware
│   ├── models/
│   │   ├── Notes.js              # Note model
│   │   └── User.js               # User model
│   └── routes/
│       ├── auth.js               # Auth routes
│       ├── dashboard.js          # Dashboard routes
│       └── index.js              # Main routes
├── views/
│   ├── layouts/                  # Layout templates
│   │   ├── dashboard.ejs         # Dashboard layout
│   │   ├── front-page.ejs        # Front page layout
│   │   └── main.ejs              # Main layout
│   ├── dashboard/                # Dashboard pages
│   │   ├── add.ejs               # Create note
│   │   ├── index.ejs             # Notes list
│   │   ├── search.ejs            # Search notes
│   │   └── view-notes.ejs        # View note
│   ├── partials/                 # Partial templates
│   │   ├── footer.ejs            # Footer
│   │   ├── header.ejs            # Header (main)
│   │   └── header_dashboard.ejs  # Header (dashboard)
│   ├── 404.ejs                   # 404 error page
│   ├── about.ejs                 # About page
│   └── index.ejs                 # Home page
├── public/                       # Static files
│   ├── css/
│   │   └── main.css              # Main styles
│   └── img/                      # Images and SVG icons
├── test/                         # Tests
│   ├── auth.test.js
│   ├── dashboard.test.js
│   ├── mainRoutes.test.js
│   ├── setup.js
│   └── setupPassword.js
├── app.js                        # Main application file
├── server.js                     # Server entry point
└── package.json
```

### 🔧 Installation and Setup

#### Prerequisites

- Node.js (version 14 or higher)
- MongoDB
- Google Cloud Console project with configured OAuth

#### 1. Clone Repository

```bash
git clone <repository-url>
cd notes-app
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Variables Setup

Create `.env` file in project root:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/notes-app

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback

# Session
SESSION_SECRET=your_session_secret

# Server
PORT=3000
```

#### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/google/callback`

#### 5. Run Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Application will be available at: `http://localhost:3000`

### 🧪 Testing

#### Run all tests

```bash
npm test
```

#### Test Structure

- **auth.test.js** - Authentication tests
- **dashboard.test.js** - Dashboard route tests
- **mainRoutes.test.js** - Main route tests
- **setup.js** - Test database setup
- **setupPassword.js** - Passport.js mocks

### 📚 API Documentation

#### Authentication

| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/google` | Start OAuth authentication |
| GET | `/google/callback` | Google OAuth callback |
| GET | `/logout` | Logout |
| GET | `/login-failure` | Login failure page |

#### Main Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page |
| GET | `/about` | About page |

#### Dashboard (requires authentication)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/dashboard` | Notes list with pagination |
| GET | `/dashboard/add` | Create note form |
| POST | `/dashboard/add` | Create new note |
| GET | `/dashboard/item/:id` | View specific note |
| PUT | `/dashboard/item/:id` | Update note |
| DELETE | `/dashboard/item/:id` | Delete note |
| GET | `/dashboard/add/search` | Search form |
| POST | `/dashboard/add/search` | Search notes |

### Data Models

#### User
```javascript
{
  googleId: String,      // Google account ID
  displayName: String,   // Display name
  firstName: String,     // First name
  lastName: String,      // Last name
  profileImage: String,  // Avatar URL
  createdAt: Date       // Creation date
}
```

#### Note
```javascript
{
  title: String,        // Note title
  body: String,         // Note content
  user: ObjectId,       // User ID
  createdAt: Date,      // Creation date
  updatedAt: Date       // Update date
}
```

---

## Čeština

Jednoduchá a uživatelsky přívětivá webová aplikace pro vytváření a správu poznámek s autentizací přes Google OAuth.

### 🚀 Funkce

- **Google OAuth Autentizace** - Bezpečné přihlášení přes Google účet
- **CRUD Operace** - Vytváření, čtení, aktualizace a mazání poznámek
- **Vyhledávání Poznámek** - Rychlé vyhledávání podle názvu a obsahu
- **Stránkování** - Pohodlné zobrazení velkého množství poznámek
- **Responzivní Design** - Funguje na všech zařízeních
- **Bezpečnost** - Poznámky jsou vázané na jednotlivé uživatele

### 🛠 Technologie

#### Backend
- **Node.js** - Serverová platforma
- **Express.js** - Webový framework
- **MongoDB** - Databáze
- **Mongoose** - ODM pro MongoDB
- **Passport.js** - Autentizace
- **Express Session** - Správa sessions

#### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **Google Fonts** - Typografie

#### Testování
- **Jest** - Testovací framework
- **Supertest** - HTTP testování
- **MongoDB Memory Server** - Testovací databáze

### 🔧 Instalace a Nastavení

#### Předpoklady

- Node.js (verze 14 nebo vyšší)
- MongoDB
- Google Cloud Console projekt s nakonfigurovaným OAuth

#### 1. Klonování Repozitáře

```bash
git clone <repository-url>
cd notes-app
```

#### 2. Instalace Závislostí

```bash
npm install
```

#### 3. Nastavení Proměnných Prostředí

Vytvořte soubor `.env` v kořeni projektu:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/notes-app

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback

# Session
SESSION_SECRET=your_session_secret

# Server
PORT=3000
```

#### 4. Nastavení Google OAuth

1. Přejděte do [Google Cloud Console](https://console.cloud.google.com/)
2. Vytvořte nový projekt nebo vyberte existující
3. Povolte Google+ API
4. Vytvořte OAuth 2.0 přihlašovací údaje
5. Přidejte autorizovanou redirect URI: `http://localhost:3000/google/callback`

#### 5. Spuštění Aplikace

```bash
# Vývojový režim
npm run dev

# Produkční režim
npm start
```

Aplikace bude dostupná na: `http://localhost:3000`

### 🧪 Testování

#### Spuštění všech testů

```bash
npm test
```

#### Struktura Testů

- **auth.test.js** - Testy autentizace
- **dashboard.test.js** - Testy dashboard routes
- **mainRoutes.test.js** - Testy hlavních routes
- **setup.js** - Nastavení testovací databáze
- **setupPassword.js** - Mocky pro Passport.js

### 📚 Dokumentace API

#### Autentizace

| Metoda | Cesta | Popis |
|--------|-------|-------|
| GET | `/auth/google` | Zahájení OAuth autentizace |
| GET | `/google/callback` | Google OAuth callback |
| GET | `/logout` | Odhlášení |
| GET | `/login-failure` | Stránka neúspěšného přihlášení |

#### Hlavní Routes

| Metoda | Cesta | Popis |
|--------|-------|-------|
| GET | `/` | Domovská stránka |
| GET | `/about` | O nás stránka |

#### Dashboard (vyžaduje autentizaci)

| Metoda | Cesta | Popis |
|--------|-------|-------|
| GET | `/dashboard` | Seznam poznámek se stránkováním |
| GET | `/dashboard/add` | Formulář pro vytvoření poznámky |
| POST | `/dashboard/add` | Vytvoření nové poznámky |
| GET | `/dashboard/item/:id` | Zobrazení konkrétní poznámky |
| PUT | `/dashboard/item/:id` | Aktualizace poznámky |
| DELETE | `/dashboard/item/:id` | Smazání poznámky |
| GET | `/dashboard/add/search` | Vyhledávací formulář |
| POST | `/dashboard/add/search` | Vyhledávání poznámek |

### Datové Modely

#### User (Uživatel)
```javascript
{
  googleId: String,      // ID Google účtu
  displayName: String,   // Zobrazované jméno
  firstName: String,     // Křestní jméno
  lastName: String,      // Příjmení
  profileImage: String,  // URL avataru
  createdAt: Date       // Datum vytvoření
}
```

#### Note (Poznámka)
```javascript
{
  title: String,        // Název poznámky
  body: String,         // Obsah poznámky
  user: ObjectId,       // ID uživatele
  createdAt: Date,      // Datum vytvoření
  updatedAt: Date       // Datum aktualizace
}
```

### 🔒 Bezpečnost

- **Autentizace** přes Google OAuth 2.0
- **Autorizace** přes middleware `isLoggedIn`
- **Izolace dat** - uživatelé vidí pouze své poznámky
- **Validace vstupních dat** ve formulářích
- **Bezpečné sessions** s tajným klíčem

### 🎨 UI/UX

- **Responzivní design** s Bootstrap 5
- **Intuitivní navigace** s breadcrumbs
- **Modální okna** pro potvrzení mazání
- **Vyhledávání v reálném čase**
- **Stránkování** pro velké seznamy
- **Krásná typografie** s Google Fonts

### 🚀 Nasazení

#### Heroku

1. Vytvořte aplikaci na Heroku
2. Nastavte proměnné prostředí
3. Připojte MongoDB Atlas
4. Aktualizujte GOOGLE_CALLBACK_URL

#### Vercel/Netlify

1. Připojte repozitář
2. Nastavte proměnné prostředí
3. Aktualizujte callback URL

### 📄 Licence

MIT License

### 🤝 Přispívání do Projektu

1. Fork projektu
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

### 📞 Podpora

Pokud máte otázky nebo návrhy, vytvořte Issue v repozitáři.

---

Vytvořeno s ❤️ pomocí Node.js, Express.js a MongoDB
# 🎫 EventZone 

Una piattaforma moderna e intuitiva per la gestione, creazione e prenotazione di biglietti per vari tipi di eventi (concerti, festival, spettacoli teatrali, cinema). Il progetto offre un'esperienza utente fluida grazie al filtraggio dinamico lato client e a una gestione dello stato centralizzata.

---

## 🚀 Caratteristiche Principali

- 🔍 **Ricerca e Filtraggio in Tempo Reale:** 
  - Ricerca testuale immediata per titolo dell'evento o luogo.
  - Filtro dinamico per categoria (*Concerti, Festival, Teatro, Cinema*).
  - Filtro avanzato tramite side-bar per **budget massimo** e **data dell'evento**.
- 🛒 **Gestione Carrello:** Aggiunta/rimozione prodotti, calcolo dinamico del totale e conteggio articoli direttamente dalla Navbar.
- ❤️ **Lista Preferiti:** Possibilità di salvare gli eventi preferiti con persistenza dei dati nel `localStorage`.
- 🎨 **Interfaccia Dinamica e Responsive:** Layout fluido adattabile a qualsiasi dispositivo (Desktop, Tablet, Mobile) realizzato con React-Bootstrap e animazioni `framer-motion`.
- ⚡ **Gestione Stato Centralizzata:** Utilizzo di **Redux Toolkit** per coordinare gli stati di eventi, filtri, carrello e utente in modo pulito e scalabile.

---

## 🛠️ Tech Stack

**Frontend:**
- **Core:** React.js, JavaScript (ES6+)
- **State Management:** Redux Toolkit
- **UI & Styling:** React-Bootstrap, Bootstrap 5, CSS3, `rc-slider`
- **Routing:** React Router DOM
- **Icons & Animations:** React Icons, Framer Motion

**Backend**
- **Core Framework:** Spring Boot (Java)
- **Architettura:** RESTful API con pattern Controller-Service-Repository
- **Autenticazione & Sicurezza:** Spring Security, JWT (JSON Web Token) per l'autorizzazione basata su ruoli (CUSTOMER / ADMIN / ORGANIZER)
- **Persistenza Dati:** Spring Data JPA / Hibernate
- **Database:** PostgreSQL
- **Validazione:** Jakarta Bean Validation 

---

## 📁 Struttura della Cartella `src`

**Frontend**
src/
├── components/          # Componenti riutilizzabili (Navbar, LoadingCard, EventCard...)
├── pages/               # Pagine della rotta (Home, EventDetails, Checkout, Profile...)
├── redux/               # oppure 'store/'
│   ├── slices/          # eventSlice.js, cartSlice.js, userSlice.js
│   └── store.js         # Configurazione principale di Redux (configureStore)
├── services/            # Client Axios e chiamate backend (eventService.js, api.js)
├── helpers/             # Funzioni utility pure (formatters, costanti, badgeColor...)
├── assets/              # Immagini, loghi, stili globali / CSS
├── App.jsx
└── main.jsx / index.js

**Backend**
src/
    └── main/
        ├── 
        │   ├── config/             # Configurazioni (Spring Security, CORS, Beans)
        │   ├── controllers/        # Endpoints REST (ricevono le richieste HTTP e ritornano JSON)
        │   ├── dtos/               # Data Transfer Objects (classi Request e Response)
        │   ├── exceptions/         # Gestione centralizzata errori (@ControllerAdvice, custom exceptions)
        │   ├── models/             # Entità JPA / DB (Event, User, Order, Category)
        │   ├── repositories/       # Interfacce Spring Data JPA per le query SQL
        │   ├── security/           # Filtri JWT, UserDetailsService, Token Provider
          └── services/           # Business Logic (servizi e interfacce)
        

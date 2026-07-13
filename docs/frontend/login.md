# Login Page

## Scopo

La Login Page è il punto di ingresso dell'applicazione PeakAnimeEnjoyer.

Ha due obiettivi principali:

1. Permettere l'autenticazione degli utenti tramite Supabase.
2. Comunicare immediatamente l'identità grafica dell'applicazione.

La schermata è progettata per ricordare servizi di streaming come Netflix, ma con un'identità dedicata agli anime e ai club di visione.

---

# Architettura

La pagina è composta da componenti completamente separati.

Ogni componente ha una singola responsabilità.

```
app/login/page.tsx
│
├── AuthLayout
│
├── Background
│   └── Poster
│
├── LoginForm
│   └── Logo
│
└── Hero
    └── FeatureItem
```

La pagina (`page.tsx`) contiene esclusivamente la logica.

Tutta la grafica è delegata ai componenti.

---

# Flusso della pagina

```
Utente

↓

Inserisce Email

↓

Inserisce Password

↓

LoginForm

↓

page.tsx

↓

Supabase Authentication

↓

Login completato

↓

Redirect all'app
```

---

# Struttura delle cartelle

```
app
└── login
    └── page.tsx

components
└── auth
    ├── layout
    │   └── auth-layout.tsx
    │
    ├── login
    │   ├── feature-item.tsx
    │   ├── hero.tsx
    │   ├── login-form.tsx
    │   └── logo.tsx
    │
    └── shared
        ├── background.tsx
        ├── glass-card.tsx
        └── poster.tsx
```

---

# Descrizione dei file

## page.tsx

Responsabilità:

- gestisce gli state React
- email
- password
- loginLoading
- signupLoading

Comunica direttamente con Supabase.

Non contiene grafica.

È il controller della pagina.

---

## auth-layout.tsx

Responsabilità:

- costruisce il layout generale
- divide la pagina in due colonne
- posiziona Login Form e Hero
- gestisce overlay
- glow
- background

Qualsiasi modifica alla disposizione della pagina va fatta qui.

---

## background.tsx

Responsabilità:

- costruisce il muro di poster
- gestisce overlay
- gradienti
- profondità della pagina

Qui NON deve esserci alcuna logica.

Solo grafica.

---

## poster.tsx

Responsabilità:

Rappresenta un singolo poster.

Riceve:

- immagine
- dimensioni
- classi CSS

In futuro verranno utilizzate immagini reali degli anime.

---

## glass-card.tsx

Responsabilità:

Gestisce l'effetto vetro della card principale.

Tutte le modifiche al blur, ai bordi o alle ombre devono essere effettuate qui.

---

## login-form.tsx

Responsabilità:

Costruisce il form di autenticazione.

Contiene:

- Email
- Password
- Forgot Password
- Login
- Sign Up

Non comunica direttamente con Supabase.

Riceve solamente callback dal page.tsx.

---

## logo.tsx

Responsabilità:

Mostra il branding dell'applicazione.

Questo componente dovrà essere riutilizzato anche nella Navbar e nelle future pagine.

---

## hero.tsx

Responsabilità:

Parte descrittiva della Login.

Serve a spiegare il funzionamento dell'applicazione.

Contiene:

- Badge superiore
- Titolo principale
- Descrizione
- Lista funzionalità

---

## feature-item.tsx

Responsabilità:

Visualizza una singola card informativa.

Riceve:

- Icona
- Titolo
- Descrizione

Viene utilizzato esclusivamente da Hero.

---

# Flusso dei dati

```
Utente

↓

LoginForm

↓

onLogin()

↓

page.tsx

↓

Supabase Auth

↓

Successo

↓

Redirect
```

---

# Dove modificare ogni elemento

| Modifica | File |
|----------|------|
| Layout pagina | auth-layout.tsx |
| Sfondo | background.tsx |
| Poster | poster.tsx |
| Card Login | glass-card.tsx |
| Form Login | login-form.tsx |
| Logo | logo.tsx |
| Testi Hero | hero.tsx |
| Card informative | feature-item.tsx |
| Login Supabase | page.tsx |

---

# Palette colori

Background

```
#090B14
```

Card

```
#17171D
```

Primary

```
#EC4899
```

Secondary

```
#D946EF
```

Testo principale

```
#FFFFFF
```

Testo secondario

```
#A1A1AA
```

---

# Responsive

Desktop

Layout a due colonne.

Sinistra:

- Login

Destra:

- Hero

Tablet

Hero ridimensionato.

Mobile

Hero nascosto.

Rimane solamente la Login Card.

---

# Come cambiare i poster

I poster vengono renderizzati tramite il componente Poster.

Il Background decide:

- quantità
- posizione
- inclinazione
- dimensioni

Poster riceve solamente l'immagine.

Esempio:

```tsx
<Poster image="/images/posters/naruto.jpg" />
```

---

# Stato della Login

## Completato

- Layout
- Hero
- Login Form
- Branding
- Glass Card
- Background
- Componentizzazione
- Responsive Base

---

## Da completare

- Poster reali
- Remember Me
- Login Google
- Forgot Password
- Micro animazioni
- Accessibilità
- Ottimizzazione Mobile

---

# Filosofia

Ogni componente deve avere una sola responsabilità.

La logica deve rimanere all'interno della pagina (`page.tsx`).

I componenti devono essere il più possibile riutilizzabili nelle future schermate dell'applicazione.

La Login rappresenta il punto di ingresso del progetto e definisce lo stile grafico che verrà mantenuto in tutta l'app.
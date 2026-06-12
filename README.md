# Sales Admin Dashboard

A modern sales admin dashboard built with **React**, **Vite**, **Redux Toolkit**, **Tailwind CSS**, and **React Router**. The app provides an overview of sales metrics, navigation across admin sections, and a user table with search, filter, and sort capabilities.

**Live Demo:** [https://react-vite-sales-dashboard.vercel.app/](https://react-vite-sales-dashboard.vercel.app/)

**Repository:** [https://github.com/masaiff210880/react-vite-sales-dashboard](https://github.com/masaiff210880/react-vite-sales-dashboard)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router 7 |
| State & API | Redux Toolkit (RTK Query) |
| Styling | Tailwind CSS v4 |
| Linting | ESLint |

## Features

- **Login** — Simple login screen that navigates to the dashboard
- **Dashboard** — Sales overview widgets (today's sales, revenue, visitor insights, top products, and more)
- **Sidebar navigation** — Dashboard, Leaderboard, User, Order, Products, Sales Report, Messages, Settings
- **User table** — Fetches users from the API with search, city filter, and name sorting
- **404 page** — Custom not-found page

### User Table

The **User** page (`/user`) displays a data table with Name, Email, Company Name, and City columns.

| Capability | How it works |
|------------|--------------|
| **Search** | Debounced (300ms) text search sent to the API via the `q` query parameter (`GET /users?q=...`) |
| **City filter** | Applied locally on the client after data is fetched |
| **Sort (A–Z / Z–A)** | Applied locally by user name |

Search is handled server-side through RTK Query; filtering and sorting run in the browser using `useMemo` in `UserTable.jsx`.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js) or yarn
- Git

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/masaiff210880/react-vite-sales-dashboard.git
cd react-vite-sales-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment file**

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://jsonplaceholder.typicode.com
```

This base URL is used by RTK Query in `src/redux-toolkit/service.js` for API requests (e.g. `GET /users`).

4. **Start the development server**

```bash
npm run dev
```

5. **Open the app**

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/              # Static assets (icons, images)
├── components/
│   ├── common/          # Shared UI (Button, SearchInput, TableFilter, LoadingSpinner, etc.)
│   ├── dashboard/       # Dashboard widgets (TodaysSales, TotalRevenue, TopProducts, etc.)
│   ├── icons/           # Navigation icons
│   └── user/            # User table (UserTable, UserTableHeader)
├── context/             # React context providers (Toast)
├── data/                # Mock data and sidebar menu config
├── hooks/               # Custom hooks (useDebounce)
├── layouts/             # AuthLayout, DashboardLayout
├── pages/               # Route pages (Dashboard, User, Login, etc.)
├── redux-toolkit/       # RTK Query API service and Redux store
│   ├── service.js       # API endpoints (getUsers)
│   └── store.js         # configureStore + middleware
├── App.jsx              # Route definitions
├── main.jsx             # App entry (Provider, BrowserRouter)
└── index.css            # Global styles + Tailwind
```

## Redux Store

The Redux store is configured in `src/redux-toolkit/store.js`:

- **Reducer** — `avidusApi` from RTK Query (`service.js`)
- **Middleware** — RTK Query middleware for caching and request lifecycle
- **Listeners** — `setupListeners` for refetch-on-focus/reconnect behavior

API endpoints are defined in `src/redux-toolkit/service.js`:

```js
getUsers: builder.query({
  query: ({ q } = {}) => ({
    url: '/users',
    ...(q && { params: { q } }),
  }),
})
```

The store is provided at the app root in `main.jsx` via `<Provider store={store}>`.

## Routing

Routes are defined in `src/App.jsx`:

| Path | Page |
|------|------|
| `/login` | Login |
| `/dashboard` | Dashboard |
| `/leaderboard` | Leaderboard |
| `/user` | User table |
| `/order` | Order |
| `/products` | Products |
| `/sales-report` | Sales Report |
| `/messages` | Messages |
| `/settings` | Settings |

## Styling

The UI uses **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`). Global styles and theme tokens live in `src/index.css`. Shared components keep spacing, colors, and typography consistent across pages.

## Deployment (Vercel)

**Live site:** [https://react-vite-sales-dashboard.vercel.app/](https://react-vite-sales-dashboard.vercel.app/)

This project is set up for deployment on [Vercel](https://vercel.com/).

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add the environment variable `VITE_BASE_URL` in the Vercel project settings
4. Deploy

The included `vercel.json` configures SPA rewrites so client-side routes (e.g. `/user`, `/dashboard`) work correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

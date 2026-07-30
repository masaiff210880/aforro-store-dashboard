# Shelf OS Dashboard

A modern, high-performance Inventory and Management Admin Dashboard built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **Redux Toolkit**, and **React Router 7**.

---

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router 7 |
| **State Management** | Redux Toolkit (RTK Query) |
| **Styling** | Tailwind CSS v4 |
| **Icons** | React Icons (`hi2`, `bs`) |

---

## ✨ Features & Functionality

### 🔐 Authentication & Branding (`/login`)
- Custom **Shelf OS** Login interface with primary theme accents (`#2563EB`).
- Integrated demo credentials badge (`admin@shelfos.com` / `password123`).
- Interactive password visibility toggle and form handling.

### 🛒 Purchase Management (`/purchase`)
- **Add New Purchase Modal**:
  - Item SKU search with automatic Loose vs. Packaged item type detection.
  - PDF Purchase Order file upload handler.
  - **Dynamic Multi-Batch Rows**: Add & delete batch rows dynamically with auto-calculated total weights.
  - **UnitSelectDropdown**: Custom unit selection popup positioned above controls (`bottom-full`) to avoid layout jumps.
  - **Flat UI Inputs**: Standardized `rounded-lg` borders without heavy drop shadows.
- **Outlined Status Badges**:
  - `Loose Item` outline badge (`#615FFF`).
  - `Packaged Item` outline badge (`#E17100`).

### 📦 Inventory Adjustment (`/inventory-adjustment`)
- **Interactive Table Sorting**: Toggle chronological sorting on the **Date** column using double-arrow indicators (`HiChevronUpDown`).
- **Add Adjustment Modal**: Searchable SKU dropdowns, reason selectors (with sub-conditional pill cards), and quantity stepper controls.
- **Clean Table Formatting**: Standardized title-case headers and `rounded-md` product file icon badges.

### 🎨 Unified Page Shell & Navigation
- **Edge-to-Edge Layout**: Standardized `bg-white` full-width section headers with `BreadcrumbHeader` across all page routes.
- **Collapsible Sidebar**: Interactive navigation sidebar supporting grouped menus and active route highlighting.

### 🚫 Redesigned 404 Page (`/404`)
- Ambient background light glows with primary theme branding.
- Live 5-second automatic redirect countdown to the dashboard.

---

## 📁 Folder Structure

```
react-vite-sales-dashboard/
├── src/
│   ├── assets/                # Static assets & brand media
│   ├── components/            # UI Components
│   │   ├── common/            # Reusable UI (Button, StatusBadge, BreadcrumbHeader, PageShell, etc.)
│   │   ├── modal/             # Modal dialogs & custom dropdowns
│   │   │   ├── AddPurchaseModal.jsx
│   │   │   ├── AddInventoryAdjustmentModal.jsx
│   │   │   ├── SelectDropdown.jsx
│   │   │   └── UnitSelectDropdown.jsx
│   │   ├── icons/             # Custom SVG & Navigation Icons
│   │   ├── InventoryAdjustmentTable.jsx
│   │   ├── PurchaseTable.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── context/               # React Context (Toast notifications)
│   ├── data/                  # Mock data & sidebar menu configuration
│   ├── layouts/               # App Layouts (AuthLayout, DashboardLayout)
│   ├── pages/                 # Page Views
│   │   ├── Dashboard.jsx
│   │   ├── Purchase.jsx
│   │   ├── InventoryAdjustment.jsx
│   │   ├── Login.jsx
│   │   └── NotFound.jsx
│   ├── redux-toolkit/         # Redux store & RTK Query services
│   ├── App.jsx                # Application routes configuration
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles & Tailwind configuration
├── public/                    # Static public files
├── package.json               # Project dependencies & scripts
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/masaiff210880/react-vite-sales-dashboard.git
   cd react-vite-sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Launches the local Vite development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint checks across the codebase |

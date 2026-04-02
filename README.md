# Money Pulse

Money Pulse is a frontend-only fintech dashboard with a premium SaaS-style UI.

It uses mocked data, simulated API loading, and client-side state management to deliver a complete product-like experience without backend dependencies.

## Highlights

- Multipage dashboard with route-based navigation
- Premium dark-first UI with glassmorphism cards and gradient accents
- Improved light mode with theme-aware color tokens
- 3-column desktop layout:
	- Left sidebar navigation
	- Main workspace
	- Right utility sidebar (profile, quick stats, activity, goals)
- Role simulation on frontend:
	- Viewer: read-only data
	- Admin: add/edit transactions and update budget

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Recharts
- Framer Motion
- Zustand
- React Router
- React Hot Toast
- Lucide React

## Core Features

### Dashboard & Navigation

- Route-based pages:
	- `/overview`
	- `/transactions`
	- `/transactions/:transactionId`
	- `/analytics`
	- `/budget`
	- `/settings`
- Responsive mobile top-nav chips
- Sticky header with search, notifications, role selector, theme toggle, and quick add

### Financial Tracking

- Total balance, income, expense, and savings metrics
- Budget tracking with progress and exceeded-state warning
- Dynamic smart insights:
	- Highest spending category
	- Month-over-month expense delta
	- Savings trend summary

### Transactions

- Search, filter, sort, and pagination
- Date range, type, and category filters
- Click row for transaction detail page
- Category drill-down modal
- Add transaction modal (frontend only)
- Admin-only edit mode on detail page

### Analytics

- Balance trend line chart
- Expense category donut chart
- Income vs expenses monthly bar chart
- Top spending categories horizontal bar chart
- Chart tooltips and responsive behavior

## Role Simulation (Frontend Only)

Role is managed in global state and switchable from the header.

- `admin`
	- Can add transactions
	- Can edit transactions
	- Can update budget
- `viewer`
	- Read-only access

No backend authorization is implemented.

## Data & State

- Mock transaction data source: `src/data/mockTransactions.js`
- Simulated fetch delay via timeout in store initializer
- Global state store: `src/store/useFinanceStore.js`
- Derived analytics and transformation utilities: `src/utils/finance.js`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
src/
	components/
		AddTransactionModal.jsx
		BudgetTracker.jsx
		CategoryDrilldownModal.jsx
		ChartCard.jsx
		ChartsGrid.jsx
		FiltersPanel.jsx
		Header.jsx
		InsightsPanel.jsx
		LoadingSkeleton.jsx
		Modal.jsx
		Navbar.jsx
		ProfileCard.jsx
		RightSidebar.jsx
		Sidebar.jsx
		StatCard.jsx
		TransactionsTable.jsx
	data/
		mockTransactions.js
	hooks/
		useAnimatedNumber.js
	pages/
		AnalyticsPage.jsx
		BudgetPage.jsx
		OverviewPage.jsx
		SettingsPage.jsx
		TransactionDetailPage.jsx
		TransactionsPage.jsx
	store/
		useFinanceStore.js
	utils/
		finance.js
		format.js
	App.jsx
	index.css
	main.jsx
```

## Notes

- This repository is intentionally frontend-only.
- Currency is formatted in INR (`en-IN`, `INR`).
- Build may show a bundle-size warning due to charting/animation libraries; functionality is unaffected.

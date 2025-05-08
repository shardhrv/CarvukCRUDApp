# Carvuk Technical Assessment
## Overview
For the Technical Assessment, I have built the following app with **Vite + React + TypeScript** for the frontend, and **Supabase** on the backend. 
There is currently a running demo of the application deployed with **Vercel** at: [CRUDvuk](https://crudvuk-app.vercel.app/)

Users can:
- Sign up / log in (email + GitHub OAuth)  
- Browse a paginated list of car services  
- Book a service (auto‑assigning an available driver)  
- View, paginate, and cancel bookings  
- Auto‑complete past bookings  
- Edit user profile (name & email)

---

## Tech Stack
- **Frontend**: Vite, React, TypeScript, React Router, React‑Query  
- **Styling**: Tailwind‑inspired utility classes  
- **Backend**: Supabase (PostgreSQL, Auth, RLS)  
- **Deployment**: Vercel  

---

## Getting Started

1. **Clone & install dependencies**  
   ```bash
   git clone https://github.com/shardhrv/CarvukCRUDApp.git
   cd CarvukCRUDApp
   npm install
   ```
2. **Connect to Supabase**
   I will share the env file variables via email.
   Please use thoese to connect to Supabase backend.
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   VITE_BASE_PATH=/
   ```
3. **Run the app locally**
   In the project root, run
   ```bash
   npm run dev
   ```
   The project will run on a localhost. 

--- 

## Code Structure

assets - Contains static images
components - Contains TS shared components
context - Contains context provider for auth 
hooks - Contains separated logic and mutations for hooks
pages - Contains route level components
utils - Contains helper functions

## CRUD Breakdown

| Operation | Description                                                                 | Where it's implemented                        |
|-----------|-----------------------------------------------------------------------------|------------------------------------------------|
| **Create** | Users can book a new automotive service by selecting a date & time         | `BookingPage.tsx`, `useBookingForm.ts` |
| **Read**   | Users can browse all available services and see their own bookings         | `ServicesPage.tsx`, `HomePage.tsx`, `usePaginatedBookings.ts` |
| **Update** | - Auto-assign driver on booking<br> - Auto-complete booking after due date | `BookingPage.tsx`, `useAutoCompleteBookings.ts` |
| **Delete** | Users can cancel an upcoming booking (soft delete via status update)       | `BookingCard.tsx`, `useCancelBooking.ts`       |

> Note: The app focuses on **user-side service interaction** (e.g. booking, viewing, cancelling) rather than admin-level service management. This aligns with the goal of demonstrating CRUD capabilities in a user-flow context.

If needed, admin-style service management can be added by enabling full CRUD to the `services` table.






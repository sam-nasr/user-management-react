# Frontend Documentation

This document explains the architecture, structure, and key flows of the React + TypeScript frontend application. This is designed with a focus on learning, clean code, and avoiding overengineering.

## Project Structure

The codebase is organized into small, focused directories under `src/` to cleanly separate concerns:

- `api/`: Contains the Axios client setup (`client.ts`) and specific API modules (`auth.ts`, `users.ts`). This layer isolates all backend communication from our React components.
- `components/`: Contains reusable generic UI components (e.g., `Layout.tsx`, `ProtectedRoute.tsx`).
- `context/`: Contains React Context definitions. We use `AuthContext.tsx` to hold the global authentication state, avoiding the need for Redux.
- `pages/`: Contains the main route components (`Login.tsx`, `Dashboard.tsx`, etc.). Each page manages its own local state.
- `types/`: Contains TypeScript interfaces used across the app (e.g., `User`, `ApiResponse`).

## Auth Flow

1. **Login / Register**: 
   When a user submits the form, the `authApi` sends a POST request. Upon success, the backend returns a `{ token, user }` object. We call the `login(token, user)` function from our `AuthContext`.
2. **State & Storage**: 
   The `login` function saves the `token` to the browser's `localStorage` and updates the React state with the current user.
3. **Session Rehydration**: 
   When the app is reloaded, the `AuthContext` checks `localStorage` for a token. If found, it calls `GET /auth/me` to validate the token and rehydrate the `user` state. If the API returns an error (e.g., token expired), the local token is cleared, and the user is logged out.

## API Layer

We use a centrally configured `Axios` instance (`src/api/client.ts`).

- **Base URL**: Configured via the `VITE_API_BASE_URL` environment variable (see `.env.example`).
- **Interceptors**: An Axios interceptor automatically attaches the `Authorization: Bearer <token>` header to every outgoing request if a token is present in `localStorage`. This means we don't have to manually pass the token when calling protected endpoints.
- **Typed Responses**: All API calls return a Promise wrapping an `ApiResponse<T>`, which matches the backend structure: `{ data: T, error: string | null }`. This ensures type safety when handling responses.

## Route Protection

We use `react-router-dom` for application routing. Protected routes (like the Dashboard and Users list) are wrapped in a `<ProtectedRoute />` component.

```tsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

The `ProtectedRoute` reads the `isAuthenticated` state from the `AuthContext`. If it is `false` (and the initial load is complete), it renders a `<Navigate to="/login" />` component to redirect the user back to the login page.

## Data Fetching & State

We keep it simple by using React's built-in `useState` and `useEffect` hooks for data fetching (e.g., in `UsersList.tsx`). We track three main states for network requests:
1. `data`: The actual data (users list, user details).
2. `loading`: A boolean to show loading spinners or text.
3. `error`: A string to display an error message if the request fails.

## Running the Application

1. Copy `.env.example` to `.env`. Adjust `VITE_API_BASE_URL` if your backend is running on a port other than `8080`.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the Vite development server.

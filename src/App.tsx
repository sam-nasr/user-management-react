
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { UsersList } from './pages/UsersList';
import { EditUser } from './pages/EditUser';

function App() {
  return (
    // The AuthProvider wraps the whole app so auth state is globally accessible
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* We use Layout as a wrapper to provide the navbar to all these routes */}
          <Route element={<Layout />}>
            {/* Redirect the root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes are wrapped by ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id/edit" element={<EditUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { BadgeForm } from './BadgeForm';
import { BadgeList } from './BadgeList';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LoginView } from './LoginView';
import type { JSX } from 'react';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Create Badge</Link>
      <Link to="/saved" style={{ marginRight: '1rem' }}>Saved Badges</Link>
      <Link to="/login">Login</Link>
    </nav>
    <Routes>
      <Route path="/" element={<ProtectedRoute element={
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
          <h1>Create Open Badge</h1>
          <BadgeForm />
          <hr style={{ margin: '2rem 0' }} />
          <BadgeList />
        </div>
      } />} />
      <Route path="/login" element={<LoginView />} />
    </Routes>
  </Router>
  );
}

export default App;

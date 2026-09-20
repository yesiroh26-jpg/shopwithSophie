import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuItemDetails from './pages/MenuItemDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import CustomerAccess from './admin/CustomerAccess'
import { ADMIN_SESSION_KEY } from './admin/adminData'

function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(ADMIN_SESSION_KEY) === 'active')

  useEffect(() => {
    function syncLogin() {
      setIsLoggedIn(localStorage.getItem(ADMIN_SESSION_KEY) === 'active')
    }

    window.addEventListener('storage', syncLogin)
    return () => window.removeEventListener('storage', syncLogin)
  }, [])

  return isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuItemDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/customer-access" element={<CustomerAccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

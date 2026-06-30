import { Routes, Route, Navigate } from 'react-router-dom'

// Public pages
import Home            from './pages/public/Home'
import About           from './pages/public/About'
import ProductionsList from './pages/public/Productions'
import ProductionDetail from './pages/public/ProductionDetail'
import EventsList      from './pages/public/Events'
import EventDetail     from './pages/public/EventDetail'
import StudiosPage     from './pages/public/Studios'
import StudioBooking   from './pages/public/StudioBooking'
import AudioServices   from './pages/public/AudioServices'
import CreativeNetwork from './pages/public/CreativeNetwork'
import CreativeProfile from './pages/public/CreativeProfile'
import CreativeRegister from './pages/public/CreativeRegister'
import Services        from './pages/public/Services'
import RentalsPage     from './pages/public/Rentals'
import CostumesPage    from './pages/public/Costumes'
import Blog            from './pages/public/Blog'
import Contact         from './pages/public/Contact'
import SearchPage      from './pages/public/Search'

// Auth
import SignIn          from './pages/auth/SignIn'
import SignUp          from './pages/auth/SignUp'
import ForgotPassword  from './pages/auth/ForgotPassword'

// User dashboard
import UserDashboard      from './pages/user/Dashboard'
import UserTickets        from './pages/user/MyTickets'
import UserBookings       from './pages/user/MyBookings'
import UserProjects       from './pages/user/MyProjects'
import UserPayments       from './pages/user/PaymentHistory'
import UserNotifications  from './pages/user/Notifications'
import UserProfile        from './pages/user/Profile'

// Brand (creative services client flow)
import Onboarding      from './pages/brand/Onboarding'
import Subscription    from './pages/brand/Subscription'
import BrandDashboard  from './pages/brand/Dashboard'
import Projects        from './pages/brand/Projects'
import CreateProject   from './pages/brand/CreateProject'
import ProjectDetail   from './pages/brand/ProjectDetail'
import ContentReview   from './pages/brand/ContentReview'
import BrandTeam       from './pages/brand/Team'

// Production (internal team)
import ProdDashboard   from './pages/production/Dashboard'
import ProdProjects    from './pages/production/Projects'
import ProdProjectDetail from './pages/production/ProjectDetail'
import Brands          from './pages/production/Brands'
import Analytics       from './pages/production/Analytics'
import ProdTeam        from './pages/production/Team'

// Admin
import AdminDashboard  from './pages/admin/Dashboard'
import AdminProductions from './pages/admin/Productions'
import AdminEvents     from './pages/admin/Events'
import AdminStudios    from './pages/admin/Studios'
import AdminRentals    from './pages/admin/Rentals'
import AdminCreatives  from './pages/admin/Creatives'
import AdminAnalytics  from './pages/admin/Analytics'
import AdminUsers      from './pages/admin/Users'
import AdminPayments   from './pages/admin/Payments'
import AdminCostumes   from './pages/admin/Costumes'
import AdminPricing    from './pages/admin/Pricing'
import PricingPage     from './pages/public/Pricing'
import Academy         from './pages/public/Academy'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"                       element={<Home />} />
      <Route path="/about"                  element={<About />} />
      <Route path="/productions"            element={<ProductionsList />} />
      <Route path="/productions/:id"        element={<ProductionDetail />} />
      <Route path="/events"                 element={<EventsList />} />
      <Route path="/events/:id"             element={<EventDetail />} />
      <Route path="/studios"                element={<StudiosPage />} />
      <Route path="/studios/book"           element={<StudioBooking />} />
      <Route path="/audio"                  element={<AudioServices />} />
      <Route path="/network"                element={<CreativeNetwork />} />
      <Route path="/network/:id"            element={<CreativeProfile />} />
      <Route path="/network/register"       element={<CreativeRegister />} />
      <Route path="/services"               element={<Services />} />
      <Route path="/rentals"                element={<RentalsPage />} />
      <Route path="/costumes"               element={<CostumesPage />} />
      <Route path="/blog"                   element={<Blog />} />
      <Route path="/contact"                element={<Contact />} />
      <Route path="/search"                 element={<SearchPage />} />
      <Route path="/pricing"                element={<PricingPage />} />
      <Route path="/academy"                element={<Academy />} />

      {/* Auth */}
      <Route path="/signin"                 element={<SignIn />} />
      <Route path="/signup"                 element={<SignUp />} />
      <Route path="/forgot-password"        element={<ForgotPassword />} />

      {/* User dashboard */}
      <Route path="/dashboard"              element={<UserDashboard />} />
      <Route path="/dashboard/tickets"      element={<UserTickets />} />
      <Route path="/dashboard/bookings"     element={<UserBookings />} />
      <Route path="/dashboard/projects"      element={<UserProjects />} />
      <Route path="/dashboard/payments"     element={<UserPayments />} />
      <Route path="/dashboard/notifications" element={<UserNotifications />} />
      <Route path="/dashboard/profile"      element={<UserProfile />} />

      {/* Brand / Creative Services client */}
      <Route path="/brand/onboarding"       element={<Onboarding />} />
      <Route path="/brand/subscription"     element={<Subscription />} />
      <Route path="/brand/dashboard"        element={<BrandDashboard />} />
      <Route path="/brand/projects"         element={<Projects />} />
      <Route path="/brand/projects/new"     element={<CreateProject />} />
      <Route path="/brand/projects/:id"     element={<ProjectDetail />} />
      <Route path="/brand/projects/:id/review" element={<ContentReview />} />
      <Route path="/brand/team"             element={<BrandTeam />} />

      {/* Production team */}
      <Route path="/production/signin"      element={<SignIn role="production" />} />
      <Route path="/production/dashboard"   element={<ProdDashboard />} />
      <Route path="/production/projects"    element={<ProdProjects />} />
      <Route path="/production/projects/:id" element={<ProdProjectDetail />} />
      <Route path="/production/brands"      element={<Brands />} />
      <Route path="/production/analytics"   element={<Analytics />} />
      <Route path="/production/team"        element={<ProdTeam />} />

      {/* Admin */}
      <Route path="/admin"                  element={<AdminDashboard />} />
      <Route path="/admin/productions"      element={<AdminProductions />} />
      <Route path="/admin/events"           element={<AdminEvents />} />
      <Route path="/admin/studios"          element={<AdminStudios />} />
      <Route path="/admin/rentals"          element={<AdminRentals />} />
      <Route path="/admin/creatives"        element={<AdminCreatives />} />
      <Route path="/admin/analytics"        element={<AdminAnalytics />} />
      <Route path="/admin/users"            element={<AdminUsers />} />
      <Route path="/admin/payments"         element={<AdminPayments />} />
      <Route path="/admin/costumes"         element={<AdminCostumes />} />
      <Route path="/admin/pricing"          element={<AdminPricing />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

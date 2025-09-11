import { Routes, Route, Navigate } from "react-router-dom";

// --- Layouts and Protection ---
import RootLayout from "./components/layout/RootLayout";
import PrivateRoute from "./components/features/route/PrivateRoute";
import PublicRoute from "./components/features/route/PublicRoute";

// --- Page Components ---
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import BlogPreviewPage from "./pages/PreviewPage";
import {ProfilePage} from "./pages/UserProfilePage";
import EditorPage from "./pages/EditorPage";
import Loader from "./components/ui/Loader"; // For OAuth callbacks

function App() {
  return (
    <Routes>
      {/* --- PRIVATE ROUTES (Require Login) --- */}
      {/* The main app homepage for logged-in users is now at '/home' */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      {/* Assuming viewing other profiles is also a private feature */}
      <Route
        path="/profile/:username"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog/:blogId"
        element={
          <PrivateRoute>
            <BlogPreviewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog/write"
        element={
          <PrivateRoute>
            <EditorPage />
          </PrivateRoute>
        }
      />

      {/* --- PUBLIC ROUTES & MODAL AUTHENTICATION --- */}
      {/* This parent route renders the RootLayout (with the LandingPage background).
          Its children will appear as modals on top. */}
      <Route path="/" element={<RootLayout />}>
        {/* These auth routes are nested, making them modals. */}
        {/* They are ALSO wrapped in PublicRoute to block access for logged-in users. */}
        <Route
          path="auth/login"
          element={
            <PublicRoute>
              <AuthPage mode="login" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/register"
          element={
            <PublicRoute>
              <AuthPage mode="register" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/profile-setup"
          element={
            <PublicRoute>
              <AuthPage mode="profile-setup" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/forgot-password"
          element={
            <PublicRoute>
              <AuthPage mode="forgot-password" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/verify-otp"
          element={
            <PublicRoute>
              <AuthPage mode="verify-otp" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/restore-password"
          element={
            <PublicRoute>
              <AuthPage mode="reset-password" />
            </PublicRoute>
          }
        />
        <Route
          path="auth/restore-password/:token"
          element={
            <PublicRoute>
              <AuthPage mode="reset-password" />
            </PublicRoute>
          }
        />
      </Route>

      {/* --- OAUTH CALLBACK ROUTES --- */}
      {/* These routes just show a loader while the AuthContext handles the redirect. */}
      <Route path="/auth/google/callback" element={<Loader />} />
      <Route path="/auth/github/callback" element={<Loader />} />

      {/* --- LEGACY REDIRECTS --- */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route
        path="/register"
        element={<Navigate to="/auth/register" replace />}
      />
    </Routes>
  );
}

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";

// import PrivateRoute from "./components/features/route/PrivateRoute";
// import PublicRoute from "./components/features/route/PublicRoute";
// // Import your page components
// import HomePage from "./pages/HomePage";
// import AuthPage from "./pages/AuthPage";
// import BlogPreviewPage from "./pages/PreviewPage";
// import {ProfilePage as UserProfilePage} from "./pages/UserProfilePage";
// import { Loader } from "lucide-react";
// import LandingPage from "./pages/LandingPage";
// import Root from "./components/features/route/Root";
// import RootLayout from "./components/layout/RootLayout";
// function App() {
//   return (
//     <Routes>
//       {/* --- HYBRID ROOT ROUTE --- */}
//       {/* The root path '/' now renders our Root component.
//           Root decides whether to show the LandingPage or HomePage. */}
//       <Route path="/" element={<Root />} />

//       {/* --- PRIVATE ROUTES (Require Login) --- */}
//       {/* The main app homepage for logged-in users is now at '/home' */}
//       <Route
//         path="/home"
//         element={
//           <PrivateRoute>
//             <HomePage />
//           </PrivateRoute>
//         }
//       />
//       <Route path="/auth/google/callback" element={<Loader />} />
//       <Route path="/auth/github/callback" element={<Loader />} />
//       {/* <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <HomePage />
//           </PrivateRoute>
//         }
//       /> */}
//       <Route
//         path="/profile"
//         element={
//           <PrivateRoute>
//             <UserProfilePage />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/blog/:blogId"
//         element={
//           <PrivateRoute>
//             <BlogPreviewPage />
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/blog/preview"
//         element={
//           <PrivateRoute>
//             <BlogPreviewPage />
//           </PrivateRoute>
//         }
//       />
//       {/* <Route
//         path="/"
//         element={
//           <PublicRoute>
//             <LandingPage />
//           </PublicRoute>
//         }
//       /> */}
//       <Route
//         path="/auth/login"
//         element={
//           <PublicRoute>
//             <AuthPage mode="login" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/auth/register"
//         element={
//           <PublicRoute>
//             <AuthPage mode="register" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/auth/profile-setup"
//         element={
//           <PublicRoute>
//             <AuthPage mode="profile-setup" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/auth/verify-otp"
//         element={
//           <PublicRoute>
//             <AuthPage mode="verify-otp" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/auth/restore-password"
//         element={
//           <PublicRoute>
//             <AuthPage mode="reset-password" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/auth/restore-password/:token"
//         element={
//           <PublicRoute>
//             <AuthPage mode="reset-password" />
//           </PublicRoute>
//         }
//       />

//       {/* --- Legacy Redirects --- */}
//       <Route path="/login" element={<Navigate to="/auth/login" replace />} />
//       <Route
//         path="/register"
//         element={<Navigate to="/auth/register" replace />}
//       />
//       <Route
//         path="/profile-setup"
//         element={<Navigate to="/auth/profile-setup" replace />}
//       />
//       <Route
//         path="/forgot-password"
//         element={<Navigate to="/auth/forgot-password" replace />}
//       />
//       <Route
//         path="/verify-otp"
//         element={<Navigate to="/auth/verify-otp" replace />}
//       />
//       <Route
//         path="/restore-password"
//         element={<Navigate to="/auth/restore-password" replace />}
//       />
//     </Routes>
//   );
// }
// export default App;

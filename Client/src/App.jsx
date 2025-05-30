import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from "./pages/LoginLayout";
import AppLayout from "./pages/AppLayout";
import PreviewLayout from "./pages/PreviewLayout";
import Profile from "./components/Profile";
import Links from "./components/AppLinks/Links";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login/Login";
import CreateAccount from "./components/Login/CreateAccount";
import { AppFeaturesProvider } from "./contexts/AppFeaturesContext";
import BodyWrapper from "./components/BodyWrapper";
import SharedPreview from "./components/SharedPreview";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppFeaturesProvider>
            <BodyWrapper>
              <Routes>
                <Route path="/" element={<LoginLayout />}>
                  <Route index element={<Navigate to="signup" />} />
                  <Route path="signup" element={<CreateAccount />} />
                  <Route path="login" element={<Login />} />
                </Route>
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="links" />} />
                  <Route path="links" element={<Links />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route
                  path="preview"
                  element={
                    <ProtectedRoute>
                      <PreviewLayout />
                    </ProtectedRoute>
                  }
                />
                <Route path="preview/:id" element={<SharedPreview />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BodyWrapper>
          </AppFeaturesProvider>
        </AuthProvider>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
}

export default App;

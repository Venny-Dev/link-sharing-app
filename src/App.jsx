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

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppFeaturesProvider>
            <Routes>
              <Route path="/" element={<LoginLayout />}>
                <Route index element={<Navigate to="signup" />} />
                <Route path="signup" element={<CreateAccount />} />
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate to="links" />} />
                <Route path="links" element={<Links />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="preview" element={<PreviewLayout />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
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

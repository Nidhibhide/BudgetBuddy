import { Home, SignIn, Header, SignUp, SessionExpired } from "./pages/public";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Welcome,
  Setting,
  Dashboard,
  Report,
  AddEntry,
  Logout,
} from "./pages/dashboard";
import TokenAuth from "./TokenAuth";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/session-expired" element={<SessionExpired />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <TokenAuth>
                {" "}
                <Welcome />
              </TokenAuth>
            }
          >
            <Route
              path="setting"
              element={
                <TokenAuth>
                  <Setting />{" "}
                </TokenAuth>
              }
            />
            <Route
              path="home"
              element={
                <TokenAuth>
                  <Dashboard />
                </TokenAuth>
              }
            />
            <Route
              path="report"
              element={
                <TokenAuth>
                  <Report />
                </TokenAuth>
              }
            />
            <Route
              path="logout"
              element={
                <TokenAuth>
                  <Logout />
                </TokenAuth>
              }
            />
            <Route
              path="add-entry"
              element={
                <TokenAuth>
                  <AddEntry />
                </TokenAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#22c55e", // green-500
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444", // red-500
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;

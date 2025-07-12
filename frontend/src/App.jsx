import { Home, SignIn, Header, SignUp } from "./pages/public";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome, Setting, Dashboard, Report,AddEntry } from "./pages/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/dashboard" element={<Welcome />}>
            <Route path="setting" element={<Setting />} />
            <Route path="home" element={<Dashboard/>} />
            <Route path="report" element={<Report />} />
            <Route path="add-entry" element={<AddEntry />} />
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

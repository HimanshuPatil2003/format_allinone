import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Blogview from "./pages/Blogview";
import Codeeditor from "./pages/Codeeditor";
import ProtectedRoute from "./pages/ProtectedRoutes";
import { UserProvider } from "./context/UserContext";
import Createblog from "./pages/Createblog";
import Auth from "../../frontend/src/components/Auth" ; 

function App() {
  return (
    // userprovider-> to make user data in global context to be accessible in all components
    <UserProvider> 
      <BrowserRouter>
        <Routes>
          {/* index-> first page to open */}
          <Route index path="/" element={<Homepage />} /> 
          {/* initialmode -> if login then login page will appear */}
          <Route path="/login" element={<Auth initialMode="login" />} /> 

          <Route
            path="dashboard"
            element={
              //protected because visible only =when login
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="blog/:id"
            element={
              <ProtectedRoute>
                <Blogview />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="codeeditor"
            element={
              <ProtectedRoute>
                <Codeeditor />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="createblog"
            element={
              <ProtectedRoute>
                <Createblog />
              </ProtectedRoute>
            }
          /> */}
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

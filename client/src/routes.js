import { createBrowserRouter } from 'react-router-dom';

import AdminDashboard from './apps/AdminDashboard';
import AdminRegister from './apps/AdminRegister';
import Home from './apps/Home';
import PatientHome from './apps/PatientHome';
import PatientRegister from './apps/PatientRegister';

export const router = createBrowserRouter([
  {
    // initial home page
    path: "/",
    element: <Home />,
  },
  {
    // user registration
  },
  {
    // admin register
    path: "/register/admin",
    element: <AdminRegister />,
  },
  {
    // patient register
    path: "/register/patient",
    element: <PatientRegister />,
  },
  {
    // patient self data
    path: "/patient/home",
    element: <PatientHome />,
  },
  {
    // admin table
    path: "/admin/home",
    element: <AdminDashboard />,
  },
]);

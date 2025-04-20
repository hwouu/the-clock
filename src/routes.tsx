// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import ClockPage from "./pages/ClockPage";
import AboutPage from "./pages/AboutPage";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ClockPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router"
import { ValentineRequest } from "./pages/valentine-request"
import { Support } from "./pages/support"
import { Layout } from "./pages/layout"
import { Accepted } from "./pages/accepted"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ValentineRequest />,
      },
      {
        path: '/support',
        element: <Support />,
      },
      {
        path: '/accepted',
        element: <Accepted />,
      },
    ],
  },
  
])

function App() {
  return <RouterProvider router={router} />
}

export default App

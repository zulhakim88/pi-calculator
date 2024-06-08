import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext.tsx"
import SignUp from "./routes/SignUp.tsx"
import SignIn from "./routes/SignIn.tsx"
import Home from "./routes/Home.tsx"
import ProtectedRoutes from "./util/ProtectedRoutes.tsx"
import "./index.css"

export const router = createBrowserRouter([
	{ path: "/signin", element: <SignIn /> },
	{ path: "/signup", element: <SignUp /> },
	{
		path: "/",
		element: (
			<ProtectedRoutes>
				<Home />
			</ProtectedRoutes>
		),
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</React.StrictMode>
)

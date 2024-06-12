import { useNavigate } from "react-router-dom"

const Unauthorize = (): JSX.Element => {
	const navigate = useNavigate()
	return (
		<div className="flex h-screen items-center bg-sky-100">
			<div className="mx-auto flex w-[500px] flex-col items-center justify-center rounded-lg bg-white p-5 shadow-md">
				<div className="font-mono text-2xl font-bold">Unauthorized Access</div>
				<p className="my-3">Please login to access this page.</p>
				<button
					onClick={() => navigate("/signin")}
					className="my-2 w-auto cursor-pointer rounded-lg border-blue-400 bg-blue-400 p-4 text-white hover:bg-blue-600"
				>
					Go to sign in page
				</button>
			</div>
		</div>
	)
}

export default Unauthorize

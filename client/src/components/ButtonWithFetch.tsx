import React from "react"
import { LoadingSpinnerSmall } from "../assets/svg"

type ButtonWithFetchProps = {
	className?: string
	label?: string
	loading: boolean
	onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonWithFetch = ({ className, label, loading, onClick }: ButtonWithFetchProps) => {
	return (
		<button
			disabled={loading}
			onClick={onClick}
			className={`${className ? className : `my-1 ml-0 h-[50px] w-full rounded-md border-blue-400 bg-blue-400 p-3 text-white sm:my-0 sm:ml-2 sm:w-[100px] ${!loading ? "cursor-pointer hover:bg-blue-600" : "cursor-wait"}`}`}
		>
			{loading ? <LoadingSpinnerSmall /> : label ? label : "fetch"}
		</button>
	)
}
export default ButtonWithFetch

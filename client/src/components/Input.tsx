import { ComponentPropsWithoutRef } from "react"

type InputProps = ComponentPropsWithoutRef<"input"> & {
	label: string
	name: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({ label, name, value, onChange, type }: InputProps) => {
	return (
		<div className="relative py-2">
			<input
				onChange={onChange}
				id={label}
				name={name}
				type={type}
				placeholder=""
				className="peer w-full rounded-lg border bg-transparent px-4 pb-3 pt-8"
			/>
			<label
				htmlFor={label}
				className={`absolute start-3 top-2 z-10 origin-[0] bg-white px-2 duration-200 hover:cursor-text ${
					value
						? "top-5 -translate-y-1 scale-75 text-gray-400"
						: "text-inherit peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-5 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:text-gray-400"
				}`}
			>
				{label}
			</label>
		</div>
	)
}

export default Input

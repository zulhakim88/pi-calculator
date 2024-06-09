import React, { useState } from "react"
import { getCircumference } from "../services/api"
import { LoadingSpinnerBig } from "../assets/svg"
import Input from "./Input"

const CircumferenceCalculator = (): JSX.Element => {
	const [radius, setRadius] = useState<string>("")
	const [errorNoRadius, setErrorNoRadius] = useState<boolean>(false)
	const [serverPiLength, setServerPiLength] = useState<number>(0)
	const [circumference, setCircumference] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)

	const handleRadiusInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (errorNoRadius && e.target.value) setErrorNoRadius(false)
		setRadius(e.target.value)
	}

	const handleGetCircumference = async () => {
		setLoading(true)
		setServerPiLength(0)
		setCircumference("")
		const newRadius = radius ? parseInt(radius) : 0
		if (newRadius === 0) {
			setLoading(false)
			setErrorNoRadius(true)
		} else {
			try {
				const response = await getCircumference(newRadius)
				setLoading(false)
				setCircumference(response.circumference)
				setServerPiLength(response.piLength)
			} catch (e: any) {
				setLoading(false)
				console.log(e)
			}
		}
	}

	return (
		<>
			<div className="flex flex-col">
				<label className="pb-2 text-lg font-bold">Calculate Circumference</label>
				<pre className="mb-1 flex items-center justify-center rounded-md bg-slate-200 p-1 text-sm">
					<code>{`Server PI length: ${serverPiLength}`}</code>
				</pre>
				<textarea
					className="my-1 w-full resize-none overflow-x-hidden rounded-md border-2 border-solid border-gray-400 bg-gray-200 p-2 font-mono text-xs"
					rows={6}
					value={circumference}
					disabled
					placeholder="Culculated circumference..."
				></textarea>
				<Input
					className={`peer w-full rounded-md px-4 pb-3 pt-3 ${errorNoRadius ? "border-2 border-red-600" : "border-2"}`}
					label="Input Radius"
					type="number"
					name="radius"
					value={radius.toString()}
					onChange={handleRadiusInput}
					min={0}
					required
				/>
				{/* <input
					onChange={handleRadiusInput}
					className={`my-1 rounded-md p-3 ${errorNoRadius ? "border-2 border-red-600" : "border-2"}`}
					type="number"
					name="radius"
					placeholder="Input Radius..."
					required
				/> */}
			</div>
			{loading ? (
				<button
					disabled
					className="flex w-full cursor-not-allowed items-center justify-center rounded-md border-blue-400 bg-blue-400 p-4 text-white"
				>
					<LoadingSpinnerBig />
					Calculating...
				</button>
			) : (
				<button
					onClick={handleGetCircumference}
					className="w-full cursor-pointer rounded-md border-blue-400 bg-blue-400 p-4 text-white hover:bg-blue-600"
				>
					Calculate!
				</button>
			)}
		</>
	)
}

export default CircumferenceCalculator

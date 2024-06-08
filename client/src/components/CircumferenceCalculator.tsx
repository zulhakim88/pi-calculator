import React, { useState } from "react"
import { getCircumference } from "../services/api"
import { LoadingSpinnerBig } from "../assets/svg"

const CircumferenceCalculator = (): JSX.Element => {
	const [radius, setRadius] = useState<number>(0)
	const [errorNoRadius, setErrorNoRadius] = useState<boolean>(false)
	const [serverPiLength, setServerPiLength] = useState<number>(0)
	const [circumference, setCircumference] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)

	const handleRadiusInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			setRadius(0)
		} else {
			setErrorNoRadius(false)
			setRadius(parseInt(e.target.value))
		}
	}

	const handleGetCircumference = async () => {
		setLoading(true)
		setServerPiLength(0)
		setCircumference("")
		if (radius === 0) {
			setLoading(false)
			setErrorNoRadius(true)
		} else {
			try {
				const response = await getCircumference(radius)
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
				<input
					onChange={handleRadiusInput}
					className={`my-1 rounded-md p-3 ${errorNoRadius ? "border-2 border-red-600" : "border-2"}`}
					type="number"
					name="radius"
					placeholder="Input Radius..."
					required
				/>
			</div>
			{loading ? (
				<button
					disabled
					className="mt-1 flex w-full cursor-not-allowed items-center justify-center rounded-md border-blue-400 bg-blue-400 p-4 text-white"
				>
					<LoadingSpinnerBig />
					Calculating...
				</button>
			) : (
				<button
					onClick={handleGetCircumference}
					className="mt-1 w-full cursor-pointer rounded-md border-blue-400 bg-blue-400 p-4 text-white hover:bg-blue-600"
				>
					Calculate!
				</button>
			)}
		</>
	)
}

export default CircumferenceCalculator

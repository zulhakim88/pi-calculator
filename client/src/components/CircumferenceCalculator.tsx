import Input from "./Input"
import { numberFormatterWithCommas } from "../util"
import useFetchCircumference from "./hooks/useFetchCircumference"
import ButtonWithFetch from "./ButtonWithFetch"

const CircumferenceCalculator = (): JSX.Element => {
	const {
		serverPiLength,
		errorNoRadius,
		radius,
		handleGetCircumference,
		handleRadiusInput,
		loading,
		circumference,
	} = useFetchCircumference()

	return (
		<>
			<div className="flex flex-col">
				<label className="pb-2 text-lg font-bold">Calculate Circumference</label>
				<pre className="mb-2 flex items-center justify-center rounded-md bg-slate-200 p-1 text-sm">
					<code>{`PI decimal length: ${numberFormatterWithCommas(serverPiLength.toString())}`}</code>
				</pre>
			</div>
			<div className="flex flex-col items-center sm:flex-row">
				<Input
					className={`peer w-full rounded-md px-4 pb-3 pt-3 sm:w-[220px] ${errorNoRadius ? "border-2 border-red-600" : "border-2"}`}
					label="Input Radius"
					type="number"
					name="radius"
					value={radius.toString()}
					onChange={handleRadiusInput}
					min={0}
					required
				/>
				<ButtonWithFetch
					className={`mb-2 ml-0 mt-1 flex h-[50px] w-full items-center justify-center rounded-md border-blue-400 bg-blue-400 p-4 text-white ${!loading ? "cursor-pointer hover:bg-blue-600" : "cursor-wait"} sm:mb-0 sm:ml-2 sm:mt-0`}
					loading={loading}
					onClick={handleGetCircumference}
					label="Calculate"
				/>
			</div>
			<textarea
				className="mt-1 w-full resize-none overflow-x-hidden rounded-md border-2 border-solid border-gray-400 bg-gray-200 p-2 font-mono text-xs"
				rows={9}
				value={circumference}
				disabled
				placeholder="Culculated circumference..."
			></textarea>
		</>
	)
}

export default CircumferenceCalculator

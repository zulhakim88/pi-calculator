import { LoadingSpinnerSmall } from "../assets/svg"
import Input from "./Input"
import { numberFormatterWithCommas } from "../util"
import useFetchPi from "./hooks/useFetchPi"

const PiCalculator = (): JSX.Element => {
	const {
		handleFetchClick,
		handlePiPrecissionInput,
		loadingFetchButton,
		piDigit,
		piValue,
		serverPiDigit,
	} = useFetchPi()

	return (
		<>
			<div className="flex flex-col items-start">
				<h1 className="text-lg font-bold">Get Latest Pi Value!</h1>
				<p className="py-1">
					The PI digit is constantly being generated in the backend. Press "Fetch" to get the latest
					value. You can even specify the precision by specifying it manually. Free users only get
					up to 15 decimal precision. Upgrade to get unlimited precision!
				</p>
				<pre className="left-0 mx-0 my-2 flex w-full justify-center rounded-md bg-slate-200 px-2 py-1 text-sm sm:absolute sm:left-48 sm:mx-3 sm:my-0 sm:w-auto sm:justify-normal">
					<code>{`PI decimal length: ${numberFormatterWithCommas(serverPiDigit.toString())}`}</code>
				</pre>
			</div>

			<div className="mb-1 flex flex-col items-center justify-start sm:flex-row">
				<div className="w-full sm:w-auto">
					<Input
						className={`peer w-full rounded-md border-2 px-4 pb-3 pt-3 sm:w-[400px]`}
						label="Decimal Precision"
						type="number"
						onChange={handlePiPrecissionInput}
						value={piDigit}
						name="digit"
						min={0}
						required
					/>
				</div>
				<div className="mb-1 mt-0 flex w-full flex-row sm:mb-0 sm:w-auto">
					{loadingFetchButton ? (
						<button
							disabled
							className="my-1 ml-0 flex h-[50px] w-full cursor-not-allowed items-center justify-center rounded-md border-blue-400 bg-blue-400 p-3 text-white sm:my-0 sm:ml-2 sm:w-[100px]"
						>
							<LoadingSpinnerSmall />
						</button>
					) : (
						<button
							onClick={handleFetchClick}
							className="my-1 ml-0 h-[50px] w-full cursor-pointer rounded-md border-blue-400 bg-blue-400 p-3 text-white hover:bg-blue-600 sm:my-0 sm:ml-2 sm:w-[100px]"
						>
							Fetch
						</button>
					)}
				</div>
			</div>
			<textarea
				className="w-full resize-none overflow-x-hidden rounded-md border-2 border-solid border-gray-400 bg-gray-200 p-2 font-mono text-xs"
				cols={100}
				rows={8}
				value={piValue}
				disabled
			/>
		</>
	)
}

export default PiCalculator

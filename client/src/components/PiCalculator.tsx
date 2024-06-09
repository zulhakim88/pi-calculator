import { useState } from "react"
import { getLatestPi, getLatestPiWithPrecission } from "../services/api"
import { LoadingSpinnerSmall } from "../assets/svg"
import Input from "./Input"

const PiCalculator = (): JSX.Element => {
	const [piValue, setPiValue] = useState<string>("3.142")
	const [loadingFetchButton, setLoadingFetchButton] = useState<boolean>(false)
	// const [copied, setCopied] = useState<boolean>(false)
	const [piDigit, setPiDigit] = useState<string>("")
	const [serverPiDigit, setServerPiDigit] = useState<number>(0)

	const handlePiPrecissionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPiDigit(e.target.value)
	}

	// const handleCopyClick = async () => {
	// 	try {
	// 		await navigator.clipboard.writeText(typeof piValue === "string" ? piValue : "")
	// 		setCopied(true)
	// 		setTimeout(() => {
	// 			setCopied(false)
	// 		}, 1000)
	// 	} catch (e: any) {
	// 		console.log(e)
	// 	}
	// }

	const handleFetchClick = async () => {
		setLoadingFetchButton(true)
		const digit = piDigit ? parseInt(piDigit) : 0

		if (digit > 0) {
			try {
				const response = await getLatestPiWithPrecission(digit)
				setLoadingFetchButton(false)
				setPiValue(response.pi)
				setServerPiDigit(response.length)
			} catch (e: any) {
				setLoadingFetchButton(false)
				console.log(e)
			}
		} else {
			try {
				const response = await getLatestPi()
				setLoadingFetchButton(false)
				setPiValue(response.pi)
				setServerPiDigit(response.length)
			} catch (e: any) {
				setLoadingFetchButton(false)
				console.log(e)
			}
		}
	}

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
					<code>{`Server PI length: ${serverPiDigit}`}</code>
				</pre>
			</div>

			<div className="mb-1 flex flex-col items-center justify-start sm:flex-row">
				<div className="w-full sm:w-auto">
					<Input
						className={`peer w-full rounded-md border-2 px-4 pb-3 pt-3 sm:w-[400px]`}
						label="Decimal Precision"
						type="number"
						onChange={handlePiPrecissionInput}
						value={piDigit.toString()}
						name="digit"
						min={0}
						required
					/>
				</div>
				<div className="mb-1 mt-0 flex w-full flex-row sm:mb-0 sm:w-auto">
					{/* {copied ? (
						<button className="mx-2 flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-green-400 p-3 text-white hover:bg-green-500">
							Copied!
						</button>
					) : (
						<button
							onClick={handleCopyClick}
							className="mx-2 flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-green-400 p-3 text-white hover:bg-green-500"
						>
							Copy
						</button>
					)} */}
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

import { useState } from "react"
import { getLatestPi, getLatestPiWithPrecission } from "../services/api"
import { LoadingSpinnerSmall } from "../assets/svg"

const PiCalculator = (): JSX.Element => {
	const [piValue, setPiValue] = useState<string>("3.142")
	const [loadingFetchButton, setLoadingFetchButton] = useState<boolean>(false)
	const [copied, setCopied] = useState<boolean>(false)
	const [piDigit, setPiDigit] = useState<number>(0)
	const [serverPiDigit, setServerPiDigit] = useState<number>(0)

	const handlePiPrecissionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPiDigit(parseInt(e.target.value))
	}

	const handleCopyClick = async () => {
		try {
			await navigator.clipboard.writeText(typeof piValue === "string" ? piValue : "")
			setCopied(true)
			setTimeout(() => {
				setCopied(false)
			}, 1000)
		} catch (e: any) {
			console.log(e)
		}
	}

	const handleFetchClick = async () => {
		setLoadingFetchButton(true)

		if (piDigit > 0) {
			try {
				const response = await getLatestPiWithPrecission(piDigit)
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
			<div className="flex flex-col items-start sm:flex-row">
				<h1 className="text-lg font-bold">Get Latest Pi Value!</h1>
				<pre className="mx-0 my-3 rounded-md bg-slate-200 px-2 py-1 text-sm sm:mx-3 sm:my-0">
					<code>{`Server PI length: ${serverPiDigit}`}</code>
				</pre>
			</div>
			<p className="py-2">
				The PI digit is constantly being generated in the backend. Press "Fetch" to get the latest
				value. You can even specify the precision by specifying it manually. Free users only get up
				to 15 decimal precision. Upgrade to get unlimited precision!
			</p>

			<div className="mb-3 flex flex-col items-center justify-between pt-1 sm:flex-row">
				<div className="mr-2 flex w-full flex-col items-center sm:w-[550px] lg:flex-row xl:mr-0">
					<input
						onChange={handlePiPrecissionInput}
						className="w-full rounded-md border-2 p-3"
						type="number"
						min={0}
						placeholder="Manual Precision"
					/>
				</div>
				<div className="mt-3 flex flex-row sm:mt-0">
					{copied ? (
						<button className="mr-2 flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-green-400 p-3 text-white hover:bg-green-500">
							Copied!
						</button>
					) : (
						<button
							onClick={handleCopyClick}
							className="mr-2 flex h-[50px] w-[100px] cursor-pointer items-center justify-center rounded-md bg-green-400 p-3 text-white hover:bg-green-500"
						>
							Copy
						</button>
					)}

					{loadingFetchButton ? (
						<button
							disabled
							className="flex h-[50px] w-[100px] cursor-not-allowed items-center justify-center rounded-md border-blue-400 bg-blue-400 p-3 text-white"
						>
							<LoadingSpinnerSmall />
						</button>
					) : (
						<button
							onClick={handleFetchClick}
							className="h-[50px] w-[100px] cursor-pointer rounded-md border-blue-400 bg-blue-400 p-3 text-white hover:bg-blue-600"
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

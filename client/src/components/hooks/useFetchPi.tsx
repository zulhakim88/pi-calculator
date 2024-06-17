import React, { useState } from "react"
import { getLatestPi, getLatestPiWithPrecission } from "../../services/api"

const useFetchPi = () => {
	const [piValue, setPiValue] = useState<string>("3.142")
	const [loadingFetchButton, setLoadingFetchButton] = useState<boolean>(false)
	const [piDigit, setPiDigit] = useState<string>("")
	const [serverPiDigit, setServerPiDigit] = useState<number>(0)

	const handlePiPrecissionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPiDigit(e.target.value)
	}

	const handleFetchClick = async () => {
		if (loadingFetchButton) return

		setLoadingFetchButton(true)
		setServerPiDigit(0)
		setPiValue("")

		if (piDigit) {
			try {
				const response = await getLatestPiWithPrecission(parseInt(piDigit))
				setPiValue(response.pi)
				setServerPiDigit(response.length)
			} catch (e: any) {
				console.log(e)
			} finally {
				setLoadingFetchButton(false)
			}
		} else {
			try {
				const response = await getLatestPi()
				setPiValue(response.pi)
				setServerPiDigit(response.length)
			} catch (e: any) {
				console.log(e)
			} finally {
				setLoadingFetchButton(false)
			}
		}
	}

	return {
		piDigit,
		piValue,
		loadingFetchButton,
		serverPiDigit,
		handlePiPrecissionInput,
		handleFetchClick,
	}
}

export default useFetchPi

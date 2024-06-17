import React, { useState } from "react"
import { getCircumference } from "../../services/api"

const useFetchCircumference = () => {
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
		if (loading) return

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
				setCircumference(response.circumference)
				setServerPiLength(response.piLength)
			} catch (e: any) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}
	}

	return {
		radius,
		errorNoRadius,
		serverPiLength,
		circumference,
		loading,
		handleGetCircumference,
		handleRadiusInput,
	}
}

export default useFetchCircumference

export const nameInitial = (name: string): string => {
	const arrayName: string[] = name.trim().split(" ")
	const initial: string = `${arrayName && arrayName.length > 0 ? arrayName[0].charAt(0) + arrayName[1].charAt(0) : ""}`
	return initial.toUpperCase()
}

export const numberFormatterWithCommas = (inputNumber: string) => {
	if (!inputNumber) return ""
	const test = inputNumber.replace(/,/g, "")
	return parseInt(test).toLocaleString("en")
}

export const stripCommas = (text: string) => {
	return text.replace(/,/g, "")
}

export const isNumber = (input: string) => {
	const regex = /^[0-9]+$/
	return stripCommas(input).match(regex)
}

export const nameInitial = (name: string): string => {
	const arrayName: string[] = name.trim().split(" ")
	const initial: string = `${arrayName && arrayName.length > 0 ? arrayName[0].charAt(0) + arrayName[1].charAt(0) : ""}`
	return initial.toUpperCase()
}

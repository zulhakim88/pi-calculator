import { FaRocket } from "react-icons/fa"
import DropDownMenu from "./DropDownMenu"

interface HeaderPropType {
	displayName: string
}

const Header = ({ displayName }: HeaderPropType): JSX.Element => {
	return (
		<div className="sticky top-0 flex w-screen items-center justify-between bg-white p-3 shadow-md">
			<div className="flex flex-row items-center">
				<div className="rounded-md bg-purple-700 p-3 text-white">
					<FaRocket className="h-7 w-7" />
				</div>
				<div className="mx-4 text-lg font-bold">PI & Circumference Calculator</div>
			</div>
			<DropDownMenu displayName={displayName} />
		</div>
	)
}

export default Header

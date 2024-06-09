import { useState } from "react"
import { useOutsideClick } from "../util/useClickOutside"
import { nameInitial } from "../util"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/AuthContext"
import { downgradeUser, upgradeUser } from "../services/api"
import { LoadingSpinnerSmall } from "../assets/svg"

type DropDownMenuPropType = {
	displayName: string
}

const DropDownMenu = ({ displayName }: DropDownMenuPropType): JSX.Element => {
	const { isPaidUser, setIsPaidUser, logout } = useUserAuth()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [loadingUpgradeButton, setLoadingUpgradeButton] = useState<boolean>(false)
	const navigate = useNavigate()

	const ref = useOutsideClick(() => {
		setIsOpen(false)
	})

	const handleChangeUserTierClick = async () => {
		setLoadingUpgradeButton(true)

		try {
			let response
			if (isPaidUser) {
				response = await downgradeUser()
			} else {
				response = await upgradeUser()
			}
			setLoadingUpgradeButton(false)
			setIsPaidUser(response.isPaidUser)
		} catch (e: any) {
			console.log(e)
			setLoadingUpgradeButton(false)
		}
	}

	const handleAvatarClick = () => {
		setIsOpen((prev) => !prev)
	}

	const handleLogout = async () => {
		try {
			await logout()
			navigate("/signin")
		} catch (e: any) {
			console.log(e.code)
		}
	}

	return (
		<div ref={ref}>
			<button
				onClick={handleAvatarClick}
				className="inline-block h-14 w-14 cursor-pointer rounded-full bg-green-600 p-4 text-lg font-bold text-white shadow-md"
			>
				<span className="ml-[50%] mt-[50%] inline-block -translate-x-1/2 -translate-y-1/2">
					{nameInitial(displayName)}
				</span>
			</button>
			{isOpen && (
				<div className="absolute right-2 top-[70px] flex w-[200px] flex-col justify-center rounded-md border border-gray-300 bg-white p-4 shadow-md">
					{loadingUpgradeButton ? (
						<button disabled className="mr-2 flex h-[30px] w-full items-center justify-center p-3">
							<LoadingSpinnerSmall />
						</button>
					) : (
						<button
							onClick={handleChangeUserTierClick}
							className="mr-2 flex h-[30px] w-full cursor-pointer items-center justify-center rounded-md bg-amber-400 p-3 font-mono text-sm text-gray-50 hover:bg-amber-500"
						>
							{isPaidUser ? "Downgrade Tier" : "Upgrade Tier"}
						</button>
					)}
					<hr className="my-4 h-px border bg-gray-100" />
					<button onClick={handleLogout} className="mx-2 cursor-pointer text-center text-blue-400">
						Logout
					</button>
				</div>
			)}
		</div>
	)
}

export default DropDownMenu

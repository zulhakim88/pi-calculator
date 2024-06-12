import { useState } from "react"
import { useOutsideClick } from "./hooks/useClickOutside"
import { nameInitial } from "../util"
import { useUserAuth } from "../context/AuthContext"
import { downgradeUser, upgradeUser } from "../services/api"
import { LoadingSpinnerSmall } from "../assets/svg"
import { useNavigate } from "react-router-dom"

type AvatarWithDropDownMenuPropType = {
	displayName: string
}

const AvatarWithDropDownMenu = ({ displayName }: AvatarWithDropDownMenuPropType): JSX.Element => {
	const navigate = useNavigate()
	const { isPaidUser, setIsPaidUser, logout } = useUserAuth()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [loadingUpgradeButton, setLoadingUpgradeButton] = useState<boolean>(false)

	const ref = useOutsideClick(() => {
		if (!isOpen) return
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
			setIsPaidUser(response.isPaidUser)
		} catch (e: any) {
			console.log(e)
		} finally {
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
							className={`mr-2 flex h-[30px] w-full cursor-pointer items-center justify-center rounded-md p-3 font-mono text-sm text-gray-50 ${isPaidUser ? "bg-red-400 hover:bg-red-600" : "bg-amber-400 hover:bg-amber-500"}`}
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

export default AvatarWithDropDownMenu

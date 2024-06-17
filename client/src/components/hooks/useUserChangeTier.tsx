import { useState } from "react"
import { useOutsideClick } from "./useClickOutside"
import { useUserAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { downgradeUser, upgradeUser } from "../../services/api"

const useUserChangeTier = () => {
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
			if (isPaidUser) {
				const response = await downgradeUser()
				setIsPaidUser(response.isPaidUser)
			} else {
				const response = await upgradeUser()
				setIsPaidUser(response.isPaidUser)
			}
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
	return {
		isOpen,
		isPaidUser,
		loadingUpgradeButton,
		handleLogout,
		handleAvatarClick,
		handleChangeUserTierClick,
		ref,
	}
}

export default useUserChangeTier

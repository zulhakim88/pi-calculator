import { useState } from 'react'
import { getLatestPi, getLatestPiWithPrecission, upgradeUser } from '../services/api'
import { useUserAuth } from '../context/AuthContext'
import { LoadingSpinner } from '../assets/svg'

const PiCalculator = (): JSX.Element => {
    const [piValue, setPiValue] = useState<string>("3.142")
    const [loadingFetchButton, setLoadingFetchButton] = useState<boolean>(false)
    const [loadingUpgradeButton, setLoadingUpgradeButton] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)
    const [piDigit, setPiDigit] = useState<number>(0)
    const [serverPiDigit, setServerPiDigit] = useState<number>(0)

    const { isPaidUser, setIsPaidUser } = useUserAuth()

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

    const handleUpgradeClick = async () => {
        setLoadingUpgradeButton(true)
        try {
            const response = await upgradeUser();
            console.log("After upgrade:", response)
            setLoadingUpgradeButton(false)
            setIsPaidUser(response.isPaidUser)
        } catch (e: any) {
            console.log(e)
            setLoadingUpgradeButton(false)
        }
    }

    const handleFetchClick = async () => {
        setLoadingFetchButton(true)

        if (piDigit > 0) {
            try {
                const response = await getLatestPiWithPrecission(piDigit)
                console.log("Data:", response)
                setLoadingFetchButton(false)
                setPiValue(response.pi)
                setServerPiDigit(response.length - 2)
            } catch (e: any) {
                setLoadingFetchButton(false)
                console.log(e)
            }
        } else {
            try {
                const response = await getLatestPi()
                console.log("Data:", response)
                setLoadingFetchButton(false)
                setPiValue(response.pi)
                setServerPiDigit(response.length - 2)
            } catch (e: any) {
                setLoadingFetchButton(false)
                console.log(e)
            }
        }

    }

    return (
        <>
            <div>
                <div className="flex sm:flex-row flex-col sm:items-center items-start">
                    <h1 className="text-lg font-bold">Get Latest Pi Value!</h1>
                    <pre className="sm:mx-3 mx-0 sm:my-0 my-3 p-1 text-sm bg-slate-200 rounded-lg"><code>{`Current Server precision: ${serverPiDigit}`}</code></pre>
                    {
                        loadingUpgradeButton ?
                            <button className="flex justify-center items-center h-[30px] w-[130px] p-3 my-3 mr-2">
                                <LoadingSpinner />
                            </button>
                            :
                            <button onClick={handleUpgradeClick} className={`bg-green-400 hover:bg-green-500 flex items-center justify-center h-[30px] w-[130px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg ${isPaidUser ? "hidden" : ""}`} >Upgrade Now!
                            </button>
                    }
                </div>
                <p className="py-2">The PI digit is constantly being generated in the backend. Press "Fetch" to get the latest value. You can even specify the precision by specifying it manually. Free users only get up to 15 decimal precision. Upgrade to get unlimited precision!</p>
            </div>
            <div className="flex items-center justify-between sm:flex-row flex-col">
                <div className="flex lg:flex-row flex-col items-center sm:w-[550px] w-full xl:mr-0 mr-2">
                    <input onChange={handlePiPrecissionInput} className="border p-3 rounded-lg w-full" type="number" min={0} placeholder="Manual Precision" />
                </div>
                <div className='flex items-center sm:justify-normal justify-center'>
                    {
                        copied ?
                            <button className=" bg-green-400 hover:bg-green-500 flex items-center justify-center h-[50px] w-[100px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg">Copied!</button>
                            :
                            <button onClick={handleCopyClick} className=" bg-green-400 hover:bg-green-500 flex items-center justify-center h-[50px] w-[100px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg">Copy</button>
                    }

                    {
                        loadingFetchButton ?
                            <button className="flex justify-center items-center border-blue-400 bg-blue-400 h-[50px]  w-[100px] p-3 my-3 text-white cursor-not-allowed rounded-lg">
                                <LoadingSpinner />
                            </button>
                            :
                            <button onClick={handleFetchClick} className="border-blue-400 bg-blue-400 hover:bg-blue-600 h-[50px] w-[100px] p-3 my-3 text-white cursor-pointer rounded-lg">Fetch</button>
                    }
                </div>

            </div>
            <textarea className="p-4 w-full bg-gray-200 rounded-md resize-none border-solid border-2 border-gray-400 overflow-x-hidden" cols={100} rows={6} value={piValue} disabled></textarea>
        </>
    )
}

export default PiCalculator
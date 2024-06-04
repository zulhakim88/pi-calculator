import { useState } from 'react'
import { getLatestPi, getLatestPiWithPrecission } from '../services/api'

const PiCalculator = (): JSX.Element => {
    const [piValue, setPiValue] = useState<string>("3.142")
    const [loading, setLoading] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)
    const [piDigit, setPiDigit] = useState<number>(0)

    const handlePiPrecissionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPiDigit(parseInt(e.target.value))
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(typeof piValue === "string" ? piValue : "")
            setCopied(true)
            setInterval(() => {
                setCopied(false)
            }, 2000)
        } catch (e: any) {
            console.log(e)
        }

    }

    const handleFetchClick = async () => {
        setLoading(true)

        if (piDigit > 0) {
            try {
                const response = await getLatestPiWithPrecission(piDigit)
                setLoading(false)
                setPiValue(response.data.pi)
            } catch (e: any) {
                setLoading(false)
                console.log(e)
            }
        } else {
            try {
                const response = await getLatestPi()
                setLoading(false)
                setPiValue(response.data.pi)
            } catch (e: any) {
                setLoading(false)
                console.log(e)
            }
        }

    }

    return (
        <>
            <div>
                <h1 className="text-lg font-bold">Get Latest Pi Value!</h1>
                <p className="py-2">The PI digit is constantly being generated in the backend. Press "Fetch" to get the latest value. You can even specify the precision of PI by specifying manually.</p>
            </div>
            <div className="flex justify-between sm:flex-row flex-col">
                <div className="my-2">
                    <input onChange={handlePiPrecissionInput} className="border p-3 rounded-lg sm:w-auto w-full" type="number" min={0} placeholder="Precision" />
                </div>
                <div className='flex items-center sm:justify-normal justify-center'>
                    {
                        copied ?
                            <button className=" bg-green-400 hover:bg-green-500 h-[50px] w-[100px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg">Copied!</button>
                            :
                            <button onClick={handleCopyClick} className=" bg-green-400 hover:bg-green-500 w-[100px] p-3 my-3 mr-2 text-white cursor-pointer rounded-lg">Copy</button>
                    }

                    {
                        loading ?
                            <button className="border-blue-400 bg-blue-400 w-[100px] p-3 my-3 text-white cursor-not-allowed rounded-lg">
                                <svg aria-hidden="true" role="status" className="inline w-5 h-5 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </button>
                            :
                            <button onClick={handleFetchClick} className="border-blue-400 bg-blue-400 hover:bg-blue-600 w-[100px] p-3 my-3 text-white cursor-pointer rounded-lg">Fetch</button>
                    }
                </div>

            </div>
            <textarea className="p-4 w-full bg-gray-200 rounded-md resize-none border-solid border-2 border-gray-400" cols={100} rows={7} value={piValue} disabled></textarea>
        </>
    )
}

export default PiCalculator
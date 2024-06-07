import React, { useState } from 'react'
import { getCircumference } from '../services/api'
import { LoadingSpinnerBig } from '../assets/svg'

const CircumferenceCalculator = (): JSX.Element => {
    const [radius, setRadius] = useState<number>(0)
    const [serverPiLength, setServerPiLength] = useState<number>(0)
    const [circumference, setCircumference] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)



    const handleRadiusInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(parseInt(e.target.value))
    }

    const handleGetCircumference = async () => {
        setLoading(true)
        setServerPiLength(0)
        setCircumference("")
        if (radius === 0) {
            setLoading(false)
        } else {
            try {
                const response = await getCircumference(radius)
                setLoading(false)
                setCircumference(response.circumference)
                setServerPiLength(response.piLength)
            } catch (e: any) {
                setLoading(false)
                console.log(e)
            }
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <label className="pb-2 text-lg font-bold">Calculate Circumference</label>
                <pre className="flex justify-center items-center mb-1 p-1 text-sm bg-slate-200 rounded-lg"><code>{`Server PI length: ${serverPiLength}`}</code></pre>
                <input onChange={handleRadiusInput} className="border p-3 rounded-lg my-1" type="number" name="radius" placeholder="Input Radius..." required />
            </div>
            {
                loading ?
                    <button disabled className="flex justify-center items-center border-blue-400 bg-blue-400 w-full p-4 my-1 text-white cursor-not-allowed rounded-lg">
                        <LoadingSpinnerBig />
                        Calculating...
                    </button>
                    :
                    <button onClick={handleGetCircumference} className="border-blue-400 bg-blue-400 hover:bg-blue-600 w-full p-4 my-1 text-white cursor-pointer rounded-lg">Calculate!</button>
            }

            <textarea className="p-4 w-full bg-gray-200 rounded-md resize-none border-solid border-2 border-gray-400 overflow-x-hidden mt-1" rows={2} value={circumference} disabled></textarea>
        </>
    )
}

export default CircumferenceCalculator
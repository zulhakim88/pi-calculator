import { Link, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import PiCalculator from '../components/PiCalculator'
import CircumferenceCalculator from '../components/CircumferenceCalculator'
import { useUserAuth } from '../context/AuthContext'

const Home = (): JSX.Element => {
  const { user } = useUserAuth()

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <Header />
      <div className="grid grid-cols-4 p-3">
        <div className="sm:col-span-4 col-span-full bg-white mb-3 p-4 rounded-md">
          <h1 className="text-2xl font-bold pb-2">Welcome {user.displayName}!</h1>
          <p className="flex flex-col justify-between overflow-scroll p-4 bg-gray-200 rounded-md max-h-[200px]">
            <div>
              <h2 className="font-bold mb-2">Objective</h2>
              <ol className="list-disc pl-5">
                <li>
                  Calculate PI to the Nth decimal point precision.
                </li>
                <li>
                  Calculate the circumferece for any given Radius with whatever PI value being generated in the Backend.
                </li>
              </ol>
            </div>
            <div>
              <h2 className="font-bold mb-2 my-2">Why do we need this?</h2>
              <ol className="list-disc pl-5">
                <li>
                  We don't need this! Refer here: <Link className="underline text-blue-500" to="" target="_blank">How Many Decimals of Pi Do We Really Need?</Link> (We don't actually need more than 15 decimals)
                </li>
                <li>
                  Why did I build this then? I was wondering until I can't sleep! So I started building the Calculator 🤣.
                </li>
              </ol>
            </div>
            <div>
              <h2 className="font-bold my-2">Referance to the implementation</h2>
              <ol className="list-disc pl-5">
                <li>
                  Taken from <Link className="underline text-blue-500" to="https://bellard.org/quickjs/pi.html" target='_blank'>Fabrice Bellard's JS take</Link> on <Link className="underline text-blue-500" to="https://en.wikipedia.org/wiki/Chudnovsky_algorithm" target='_blank'>Chudnovsky's algorithm</Link>.
                </li>
              </ol>
            </div>
          </p>
        </div>
        <div className="sm:col-span-3 col-span-full bg-white sm:mr-3 mr-0 sm:mb-0 mb-3 p-4 rounded-md">
          <PiCalculator />
        </div>
        <div className="sm:col-span-1 col-span-full bg-white p-4 rounded-md">
          <CircumferenceCalculator />
        </div>
      </div>
    </div>
  )
}

export default Home
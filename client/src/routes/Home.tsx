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
          <div className="flex flex-col justify-between overflow-scroll p-3 bg-gray-200 rounded-md">
            <div>
              <h2 className="font-bold mb-2">Objective of this app</h2>
              <ol className="list-disc pl-5 text-sm">
                <li>
                  Calculate PI to the Nth decimal point precision.
                </li>
                <li>
                  Calculate the circumferece for any given Radius with whatever PI value being generated in the Backend.
                </li>
              </ol>
            </div>
            <div>
              <h2 className="font-bold mb-2 my-2">Do we need this?</h2>
              <ol className="list-disc pl-5 text-sm">
                <li>
                  No we don't. Refer here: <Link className="underline text-blue-500" to="" target="_blank">How Many Decimals of Pi Do We Really Need?</Link> (We don't actually need more than 15 decimals)
                </li>
                <li>
                  Why did I build this then? I was wondering until I couldn't sleep! So I started building the Calculator 🤣.
                </li>
                <li>
                  Longest PI memorized is <Link className="underline text-blue-500" to="https://www.timesnownews.com/viral/pi-day-2023-meet-rajveer-meena-who-recited-70000-pi-digits-blindfolded-article-98605930#:~:text=In%20the%20endless%20pursuit%20of,Read%20More&text=Rajveer%20Meena%20memorised%20and%20recited,70%2C000%20decimal%20places%20while%20blindfolded." target="_blank">here</Link> (Guess I'm not the only one wondering 🤪).
                </li>
              </ol>
            </div>
            <div>
              <h2 className="font-bold my-2">Referance to the implementation</h2>
              <ol className="list-disc pl-5 text-sm">
                <li>
                  Taken from <Link className="underline text-blue-500" to="https://bellard.org/quickjs/pi.html" target='_blank'>Fabrice Bellard's JS take</Link> on <Link className="underline text-blue-500" to="https://en.wikipedia.org/wiki/Chudnovsky_algorithm" target='_blank'>Chudnovsky's algorithm</Link>.
                </li>
              </ol>
            </div>
          </div>
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
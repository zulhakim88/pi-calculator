import Header from "../components/Header"
import PiCalculator from "../components/PiCalculator"
import CircumferenceCalculator from "../components/CircumferenceCalculator"
import Introduction from "../components/Introduction"

const Home = (): JSX.Element => {
	return (
		<div className="min-h-screen bg-sky-100">
			<Header />
			<div className="grid grid-cols-4 p-3">
				<div className="col-span-full mb-3 rounded-md bg-white p-3 sm:col-span-4">
					<Introduction />
				</div>
				<div className="col-span-full mb-3 mr-0 rounded-md bg-white p-3 sm:col-span-3 sm:mb-0 sm:mr-3">
					<PiCalculator />
				</div>
				<div className="col-span-full rounded-md bg-white p-3 sm:col-span-1">
					<CircumferenceCalculator />
				</div>
			</div>
		</div>
	)
}

export default Home

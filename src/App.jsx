import SurveyPerokok from "./SurveyForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TabelData from "./TabelData";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SurveyPerokok />,
	},
	{
		path: "/tabel-data",
		element: <TabelData />,
	},
]);
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

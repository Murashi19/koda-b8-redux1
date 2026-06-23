import SurveyPerokok from "./SurveyForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
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
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;

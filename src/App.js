import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
	return (
		<main className="App">
			<Header />
			<Game width={10} height={10} mines={10} />
		</main>
	);
}

export default App;

import TrailWalkPage from "./components/TrailWalkPage";
import MapView from "./MapView";

function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-stone-600">
      {/* <h1>Hi</h1> */}
      {/* <MapView /> */}
      <div className="min-w-96">
        <TrailWalkPage />
      </div>
    </div>
  );
}

export default App;

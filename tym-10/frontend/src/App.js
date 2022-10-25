
import { useState } from "react";
import Filter from "./components/Filter";
import Input from "./components/Input";
import Map from "./components/Map";

function App() {
  const [test, setTest] = useState(0);
  const [data, setData] = useState(null);
  return (
      <div>
        <Filter test={test} setTest={setTest} setData={setData} />
        <Input />
        <Map number={test} data={data} setData={setData} />
      </div>
  );
}

export default App;
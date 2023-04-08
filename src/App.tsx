import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { NOTFOUND } from "dns";
import Card from "./components/Card";

function App() {
  const [StoreData, setStoreData] = useState([]);

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const fetchStoreData = async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setStoreData(json));
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-slate-600 text-2xl">Store Data</h1>

      <div className="flex flex-wrap">
        {StoreData.map((item) => {
          return (
            <Card description={item.description} category={item.category} />
          );
        })}
      </div>
    </div>
  );
}

export default App;

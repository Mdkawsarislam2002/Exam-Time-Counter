import { useEffect, useState } from "react";
import Card from "./components/Card";
import { RootObject } from "./Types/AppTypes";

import { invoke } from "@tauri-apps/api/tauri";
import { NOTFOUND } from "dns";

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const targetDate = new Date("August 3, 2023");
      const diffTime = targetDate.getTime() - currentDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor(
        (diffTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      setTimeLeft({ days: diffDays, hours: diffHours, minutes: diffMinutes });
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container bg-slate-50   w-screen h-screen ">
      <h1 className="font-extrabold text-3xl text-center">Exam Time Left </h1>

      <div className="font-semibold flex flex-col items-center justify-start text-xl mt-16 gap-3">
        <div className="flex flex-col justify-start">
          <p>Day Left : {timeLeft.days} </p>
          <p>hour Left : {timeLeft.hours} </p>
          <p>Minutes left: {timeLeft.minutes}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

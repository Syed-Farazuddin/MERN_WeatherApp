import React, { useEffect, useState } from "react";
import axios from "axios";
function WeatherApp() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  console.log();
  const fetchData = async (name) => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${"6be99bfe41c7aabe4c1915a26620bb59"}`
      )
      .then((result) => {
        console.log("Fetched Result from client server");
        const { data } = result;
        setData(data);
      });
  };

  return (
    <div className="h-[100vh] bg-green-100 flex items-center justify-center  flex-col ">
      <h1 className="text-4xl mb-4 font-bold font-serif">
        Weather application
      </h1>

      <div className=" bg-green-300 text-black flex flex-col items-center justify-center p-10 rounded-lg ">
        <div className="flex h-[60px] justify-center items-center">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className=" px-5 text-xl placeholder:text-lg h-full w-[100%] text-black bg-white text-center placeholder:text-center rounded-lg rounded-r-none  font-serif"
            type="text"
            placeholder="Enter City name"
          />
          <button
            className="p-2 my-4 bg-black w-[245px] font-bold text-white h-[60px] rounded-l-none rounded-lg"
            onClick={() => {
              fetchData(name);
            }}
          >
            Search
          </button>
        </div>

        {data && data.wind && (
          <div className="flex items-center justify-center flex-col gap-5">
            <h1 className="text-black text-3xl text-center mt-6 font-serif font-bold ">
              {data.name} ,<span>{data.sys.country}</span>
            </h1>
            <h1 className="text-black text-4xl text-center font-bold font-serif">
              {(data.main.temp - 273).toFixed(1)}°
            </h1>
            <h1 className="text-black text-2xl text-center font-serif">
              {date.toLocaleDateString("en-us", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h1>
            <div className="flex items-center justify-center gap-5">
              <p>
                Windspeed :{" "}
                <span className="font-bold"> {data.wind.speed}</span>{" "}
              </p>
              <p>
                Humidity :{" "}
                <span className="font-bold">{data.main.humidity}</span>{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;

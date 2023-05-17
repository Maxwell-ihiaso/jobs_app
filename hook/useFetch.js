import { useState, useEffect } from "react";
import axios from "axios";

// env import has been relaced by dotenv and set in 
// app.config.js

// import { RapidAPI_Key, RapidAPI_Host } from "@env";

// const RAPID_API_KEY = RapidAPI_Key;
// const RAPID_API_HOST = RapidAPI_Host;

const useFetch = (endpoint, query, delay = 0) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://${process.env.RapidAPI_Host}/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": process.env.RapidAPI_Key,
      "X-RapidAPI-Host": process.env.RapidAPI_Host,
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      if (!error.response) {
        setError("Network Error");
        console.log("Network Error");
      } else {
        setError(error);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), delay);
    
    return () => {
      clearTimeout(timer)
    }
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

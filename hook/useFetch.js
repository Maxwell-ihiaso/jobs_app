import { useState, useEffect } from "react";
import axios from "axios";
import { RapidAPI_Key, RapidAPI_Host } from "@env";

const RAPID_API_KEY = RapidAPI_Key;
const RAPID_API_HOST = RapidAPI_Host;

const useFetch = (endpoint, query, delay = 0) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://${RAPID_API_HOST}/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
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

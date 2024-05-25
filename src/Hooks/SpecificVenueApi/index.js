import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FetchMyVenue() {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData() {
      const url = "https://v2.api.noroff.dev/holidaze/venues/" + id;
      try {
        setIsLoading(true);
        setIsError(false);
        const accessToken = localStorage.getItem("accessToken");
        const APIkey = localStorage.getItem("key");
        const data = {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": APIkey,
          },
        };
        const response = await fetch(url, data, id);
        const json = await response.json();
        setVenue(json.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData(`https://v2.api.noroff.dev/holidaze/venues/" + ${id}
`);
  }, [id]);

  return { venue, id, isLoading, isError };
}
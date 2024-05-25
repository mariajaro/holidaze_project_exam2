import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchVenues from "../../Hooks/VenueApi";
import { Form, FormControl, InputGroup, ListGroup } from "react-bootstrap";

const sortBy = "created";
const limit = 20;
let offset = 0;

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { venues } = FetchVenues(
    `https://v2.api.noroff.dev/holidaze/venues/?sort=${sortBy}&limit=${limit}&offset=${offset}`
  );

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = venues.filter((venue) => {
      return venue.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchResults(results);
  }, [venues, searchInput]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-div mb-4">
      <Form>
        <InputGroup>
          <FormControl
            name="Search"
            className="search-bar text"
            type="text"
            placeholder="Search venues"
            value={searchInput}
            onChange={handleSearch}
          />
        </InputGroup>
      </Form>
      <ListGroup className="search-items mt-2">
        {searchResults.length === 0 && searchInput.trim() !== ""
          ? <ListGroup.Item>No results found</ListGroup.Item>
          : searchResults.map((venue) => (
              <Link to={`/venue/${venue.id}`} key={venue.id}>
                <ListGroup.Item className="search-results text">{venue.name}</ListGroup.Item>
              </Link>
            ))}
      </ListGroup>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, decodeHtml } from "../../data";
import moment from "moment";
import "../../Components/Feed/Feed.css";
import "../Home/Home.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Search = ({ sidebar }) => {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&type=video&key=${API_KEY}`;
      await fetch(search_url)
        .then((response) => response.json())
        .then((data) => setResults(data.items));
    };
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <div className="feed">
          {results.map((item) => {
            return (
              <Link
                to={`/video/${item.snippet.categoryId || 0}/${item.id.videoId}`}
                className="card"
                key={item.id.videoId}
              >
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <h2>{decodeHtml(item.snippet.title)}</h2>
                <h3>{decodeHtml(item.snippet.channelTitle)}</h3>
                <p>{moment(item.snippet.publishedAt).fromNow()}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;

import { useEffect, useState } from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";
import { API_KEY } from "../../data";

// Fallback images used instantly while fetching, or if a request fails
const subscriptions = [
  { name: "Jacob Knowles", handle: "jacobknowles5421", fallback: jack },
  { name: "Asmongold TV", handle: "AsmonTV", fallback: simon },
  { name: "MorePegasus", handle: "moresus", fallback: tom },
  {
    name: "Mad Hatter Reviews",
    handle: "madhatterreviews6705",
    fallback: megan,
  },
  { name: "BeardMeatsFood", handle: "Beardmeatsfood", fallback: cameron },
];

const Sidebar = ({ sidebar, category, setCategory }) => {
  const [channelAvatars, setChannelAvatars] = useState({});

  const fetchAvatars = async () => {
    const results = {};
    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${sub.handle}&key=${API_KEY}`;
          const response = await fetch(url);
          const data = await response.json();
          const avatarUrl = data.items?.[0]?.snippet?.thumbnails?.default?.url;
          results[sub.handle] = avatarUrl || sub.fallback;
        } catch {
          results[sub.handle] = sub.fallback;
        }
      }),
    );
    setChannelAvatars(results);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAvatars();
  }, []);

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div
          className={`side-link ${category === 0 ? "active" : ""}`}
          onClick={() => setCategory(0)}
        >
          <img src={home} alt="" />
          <p>Home</p>
        </div>
        <div
          className={`side-link ${category === 20 ? "active" : ""}`}
          onClick={() => setCategory(20)}
        >
          <img src={game_icon} alt="" />
          <p>Gaming</p>
        </div>
        <div
          className={`side-link ${category === 2 ? "active" : ""}`}
          onClick={() => setCategory(2)}
        >
          <img src={automobiles} alt="" />
          <p>Automobiles</p>
        </div>
        <div
          className={`side-link ${category === 17 ? "active" : ""}`}
          onClick={() => setCategory(17)}
        >
          <img src={sports} alt="" />
          <p>Sports</p>
        </div>
        <div
          className={`side-link ${category === 24 ? "active" : ""}`}
          onClick={() => setCategory(24)}
        >
          <img src={entertainment} alt="" />
          <p>Entertainment</p>
        </div>
        <div
          className={`side-link ${category === 28 ? "active" : ""}`}
          onClick={() => setCategory(28)}
        >
          <img src={tech} alt="" />
          <p>Technology</p>
        </div>
        <div
          className={`side-link ${category === 10 ? "active" : ""}`}
          onClick={() => setCategory(10)}
        >
          <img src={music} alt="" />
          <p>Music</p>
        </div>
        <div
          className={`side-link ${category === 22 ? "active" : ""}`}
          onClick={() => setCategory(22)}
        >
          <img src={blogs} alt="" />
          <p>Blogs</p>
        </div>
        <div
          className={`side-link ${category === 25 ? "active" : ""}`}
          onClick={() => setCategory(25)}
        >
          <img src={news} alt="" />
          <p>News</p>
        </div>
        <hr />
      </div>
      <div className="subscribed-list">
        <h3>Subscribed</h3>
        {subscriptions.map((sub) => (
          <div className="side-link" key={sub.handle}>
            <img
              src={channelAvatars[sub.handle] || sub.fallback}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = sub.fallback;
              }}
              alt=""
            />
            <p>{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

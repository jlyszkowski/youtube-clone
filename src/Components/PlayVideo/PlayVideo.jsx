import { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter, decodeHtml } from "../../data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      //   Fetching Videos Data
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      await fetch(videoDetails_url)
        .then((response) => response.json())
        .then((data) => setApiData(data.items[0]));
    };
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const fetchOtherData = async () => {
      //   Fetching Channel Data
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(channelData_url)
        .then((response) => response.json())
        .then((data) => setChannelData(data.items[0]));

      //  Fetching Comment Data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      await fetch(comment_url)
        .then((response) => response.json())
        .then((data) => setCommentData(data.items));
    };

    if (apiData) {
      fetchOtherData();
    }
  }, [apiData, videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{decodeHtml(apiData?.snippet.title)}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"}{" "}
          Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />{" "}
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? decodeHtml(apiData.snippet.channelTitle) : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? decodeHtml(apiData.snippet.description.slice(0, 250))
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "0"}{" "}
          Comments
        </h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={
                  item.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                  user_profile
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = user_profile;
                }}
                alt=""
              />
              <div>
                <h3>
                  {decodeHtml(
                    item.snippet.topLevelComment.snippet.authorDisplayName,
                  )}{" "}
                  <span>1 day ago</span>
                </h3>
                <p>
                  {decodeHtml(item.snippet.topLevelComment.snippet.textDisplay)}
                </p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount,
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;

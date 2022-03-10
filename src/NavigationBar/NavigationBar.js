import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { GET_PLAYLISTS } from "../GraphQL/playListQuery";
import "./NavigationBar.css";

const NavigationBar = ({ handleSelectPlayList, selectedPlaylist }) => {
  const { data, loading } = useQuery(GET_PLAYLISTS);

  const [playLists, setPlayLists] = useState([]);

  useEffect(() => {
    if (data) {
      setPlayLists(data.getPlaylists);
      if (!selectedPlaylist) {
        handleSelectPlayList(data?.getPlaylists[0]);
      }
    }
  }, [data, handleSelectPlayList, selectedPlaylist]);

  return (
    <div className="navigation-container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify_logo"
        className="logo-container"
      />

      <div className="navigation-list-container">
        <ul>
          {loading ? (
            <CircularProgress
              color="primary"
              sx={{
                width: "100%",
                marginTop: "30px",
              }}
            />
          ) : (
            playLists?.map((li) => {
              return (
                <li
                  key={li?.id}
                  onClick={() => handleSelectPlayList(li)}
                  className="navigation-item-container"
                  style={{
                    color:
                      selectedPlaylist && selectedPlaylist?.id === li?.id
                        ? "white"
                        : "rgba(255, 255, 255, 0.50)",
                  }}
                >
                  {li?.title}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;

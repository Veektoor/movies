import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "./CircularRate";
import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path));

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0]);
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link to={mediaType !== "people" ? routesGen.mediaDetail(mediaType, media.mediaId || media.id) : routesGen.person(media.id)}>
      <Box sx={{
        ...uiConfigs.style.backgroundImage(posterPath),
        paddingTop: "158%",
        overflow: "hidden",
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 18px 38px rgba(0,0,0,0.14)",
        transform: "translateY(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 28px 48px rgba(0,0,0,0.22)"
        },
        "&:hover .media-info": { opacity: 1, bottom: 0 },
        "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        color: "primary.contrastText"
      }}>
        {/* movie or tv item */}
        {mediaType !== "people" && (
          <>
            {favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
              <FavoriteIcon
                color="primary"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: "1.8rem",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.24))"
              }}
            />
          )}
          <Box className="media-back-drop" sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: "linear-gradient(to top, rgba(7,12,20,0.98), rgba(7,12,20,0.3) 55%, rgba(7,12,20,0))"
          }} />
          <Button
            className="media-play-btn"
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" }
              }}
            />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "16px", md: "1.6rem" }
              }}
            >
              <Stack spacing={{ xs: 1, md: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  {rate && <CircularRate value={rate} />}
                  {releaseDate && (
                    <Chip
                      label={releaseDate}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.12)",
                        color: "primary.contrastText",
                        border: "1px solid rgba(255,255,255,0.16)"
                      }}
                    />
                  )}
                </Stack>

                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left")
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
        {/* movie or tv item */}

        {/* people */}
        {mediaType === "people" && (
          <Box sx={{
            position: "absolute",
            width: "100%",
            height: "max-content",
            bottom: 0,
            padding: "16px",
            backgroundColor: "rgba(7,12,20,0.72)"
          }}>
            <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
              {media.name}
            </Typography>
          </Box>
        )}
        {/* people */}
      </Box>
    </Link>
  );
};

export default MediaItem;

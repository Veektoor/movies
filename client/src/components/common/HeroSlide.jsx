import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button, Chip, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";

import uiConfigs from "../../configs/ui.configs";

import CircularRate from "./CircularRate";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) {
        setMovies(Array.isArray(response.results) ? response.results : []);
      }
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        dispatch(setGlobalLoading(false));
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      px: { xs: 0, md: 2 },
      "&::before": {
        content: '""',
        width: "100%",
        height: "24%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              borderRadius: { xs: 0, md: "32px" },
              overflow: "hidden",
              mx: { xs: 0, md: 2 },
              paddingTop: {
                xs: "145%",
                sm: "85%",
                md: "62%",
                lg: "48%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: { xs: 0, md: "32px" },
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }} />
            <Box
              sx={{
                position: "absolute",
                inset: { xs: 0, md: 16 },
                borderRadius: { xs: 0, md: "32px" },
                border: "1px solid rgba(255,255,255,0.12)",
                pointerEvents: "none"
              }}
            />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: { xs: "18px", sm: "24px", md: "4rem", lg: "7rem" }
            }}>
              <Box sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                width: { sm: "unset", md: "52%", lg: "48%" }
              }}>
                <Stack spacing={3} direction="column">
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
                      Featured release
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 520 }}>
                      A cleaner presentation layer for premium browsing and fast decision making.
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h2"
                    fontSize={{ xs: "2.4rem", md: "3rem", lg: "4.6rem" }}
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left")
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>

                  <Stack direction="row" spacing={1.2} alignItems="center" flexWrap="wrap" useFlexGap>
                    <CircularRate value={movie.vote_average} />
                    <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", sm: "block" } }} />
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="outlined"
                        color="secondary"
                        key={index}
                        label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                      />
                    ))}
                  </Stack>

                  <Paper
                    sx={{
                      width: "fit-content",
                      maxWidth: 620,
                      px: { xs: 2, md: 2.5 },
                      py: { xs: 1.6, md: 2 },
                      backgroundColor: "rgba(12, 20, 34, 0.48)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)"
                    }}
                  >
                    <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(3) }}>
                      {movie.overview}
                    </Typography>
                  </Paper>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      Open profile
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      color="inherit"
                      endIcon={<ArrowOutwardIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{
                        width: "max-content",
                        borderColor: "rgba(255,255,255,0.28)",
                        color: "text.primary"
                      }}
                    >
                      View full brief
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;

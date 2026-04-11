import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, px: { xs: 2, md: 0 } }}>
        A refined row of high-signal picks curated from current popular and top-rated catalogs.
      </Typography>
      <AutoSwiper>
        {medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </AutoSwiper>
    </Box>
  );
};

export default MediaSlide;

import { Grid, Typography } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  const list = Array.isArray(medias) ? medias : [];

  if (list.length === 0) {
    return (
      <Typography color="text.secondary">
        No media is available right now. Check that the API is reachable and returning results.
      </Typography>
    );
  }

  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {list.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;

import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop={{ xs: "-3rem", md: "-5rem" }} sx={{ ...uiConfigs.style.mainContent }}>
        <Paper
          sx={{
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3.5 },
            border: "1px solid",
            borderColor: "divider",
            background: "linear-gradient(135deg, rgba(20,58,102,0.08), rgba(179,139,60,0.08))"
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Executive Dashboard
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.6 }}>
                Curated programming, surfaced with a premium layout
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Film intelligence" color="primary" variant="outlined" />
              <Chip label="Series insights" color="primary" variant="outlined" />
              <Chip label="Refined discovery" color="primary" variant="outlined" />
            </Stack>
          </Stack>
        </Paper>

        <Container header="popular movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="popular series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="top rated movies">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header="top rated series">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;

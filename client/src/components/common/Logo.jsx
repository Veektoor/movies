import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link to="/">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: theme.palette.primary.contrastText,
            display: "grid",
            placeItems: "center",
            boxShadow: "0 12px 26px rgba(0, 0, 0, 0.18)"
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "inherit", letterSpacing: "0.08em" }}>
            DM
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: "text.secondary", lineHeight: 1 }}>
            Screen Intelligence
          </Typography>
          <Typography variant="h6" sx={{ color: "text.primary", lineHeight: 1.1 }}>
            DonMovies
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
};

export default Logo;

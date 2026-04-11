import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Container = ({ header, children }) => {
  return (
    <Box sx={{
      marginTop: { xs: "4rem", md: "5rem" },
      marginX: "auto",
      color: "text.primary"
    }}>
      <Stack spacing={4}>
        {header && (
          <Box sx={{
            position: "relative",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 2,
            paddingX: { xs: "20px", md: 0 },
            maxWidth: "1280px",
            marginX: "auto",
            width: "100%",
            "&::before": {
              content: '""',
              position: "absolute",
              left: { xs: "20px", md: "0" },
              top: "100%",
              height: "2px",
              width: "112px",
              background: "linear-gradient(90deg, currentColor, transparent)",
              color: "primary.main"
            }
          }}>
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;

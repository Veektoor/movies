import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper
        square={false}
        sx={{
          mx: { xs: 2, md: 0 },
          mb: 4,
          p: { xs: 3, md: 4 },
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="space-between">
          <Stack spacing={1.5} maxWidth={360}>
            <Logo />
            <Typography color="text.secondary">
              Premium access to movie and television discovery with a cleaner, executive-grade interface.
            </Typography>
          </Stack>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              Platform
            </Typography>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "text.secondary", mr: 0.5 }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; 2026 DonMovies. Built for polished media discovery.
          </Typography>
          <Typography variant="body2" color="text.secondary">
    
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;

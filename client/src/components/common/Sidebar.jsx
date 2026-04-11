import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "background.paper" }}>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <Divider />
      <List sx={{ paddingX: "24px", paddingY: "28px" }}>
        <Typography variant="subtitle2" color="text.secondary" marginBottom="14px">Navigation</Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "16px",
              marginY: 1,
              paddingY: 1.4,
              backgroundColor: appState.includes(item.state) ? "primary.main" : "transparent",
              color: appState.includes(item.state) ? "primary.contrastText" : "text.primary"
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 42 }}>{item.icon}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography>
              {item.display}
            </Typography>} />
          </ListItemButton>
        ))}

        {user && (<>
          <Typography variant="subtitle2" color="text.secondary" marginTop="18px" marginBottom="14px">Personal</Typography>
          {menuConfigs.user.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: "16px",
                marginY: 1,
                paddingY: 1.4,
                backgroundColor: appState.includes(item.state) ? "primary.main" : "transparent",
                color: appState.includes(item.state) ? "primary.contrastText" : "text.primary"
              }}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 42 }}>{item.icon}</ListItemIcon>
              <ListItemText disableTypography primary={<Typography>
                {item.display}
              </Typography>} />
            </ListItemButton>
          ))}
        </>)}

        <Typography variant="subtitle2" color="text.secondary" marginTop="18px" marginBottom="14px">Appearance</Typography>
        <ListItemButton sx={{ borderRadius: "16px", paddingY: 1.4 }} onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText disableTypography primary={
            <Typography>
              {themeMode === themeModes.dark ? "dark mode" : "light mode"}
            </Typography>
          } />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px"
        }
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;

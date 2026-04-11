const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(to top, rgba(9,17,29,1), rgba(9,17,29,0.18) 50%, rgba(9,17,29,0))"
      },
      light: {
        backgroundImage: "linear-gradient(to top, rgba(238,243,248,1), rgba(238,243,248,0.28) 52%, rgba(238,243,248,0))"
      }
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage: "linear-gradient(90deg, rgba(9,17,29,0.94) 0%, rgba(9,17,29,0.75) 34%, rgba(9,17,29,0.2) 68%, rgba(9,17,29,0) 100%)"
      },
      light: {
        backgroundImage: "linear-gradient(90deg, rgba(238,243,248,0.96) 0%, rgba(238,243,248,0.82) 34%, rgba(238,243,248,0.3) 68%, rgba(238,243,248,0) 100%)"
      }
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines
    }),
    mainContent: {
      maxWidth: "1280px",
      margin: "auto",
      padding: { xs: 2, md: 3 }
    },
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#40526a",
      backgroundImage: `url(${imgPath})`
    }),
    glassSurface: {
      backdropFilter: "blur(18px)",
      border: "1px solid",
      borderColor: "divider"
    }
  },
  size: {
    sidebarWith: "320px",
    contentMaxWidth: "1280px"
  }
};

export default uiConfigs;

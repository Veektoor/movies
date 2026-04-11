import { Box, Modal, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const actionState = {
  signin: "signin",
  signup: "signup"
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "760px",
        padding: { xs: 2, md: 4 },
        outline: "none"
      }}>
        <Paper sx={{ overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
          <Stack direction={{ xs: "column", md: "row" }}>
            <Box
              sx={{
                width: { xs: "100%", md: "42%" },
                p: { xs: 3, md: 4 },
                color: "primary.contrastText",
                background: "linear-gradient(160deg, rgba(20,58,102,0.96), rgba(12,22,38,1))"
              }}
            >
              <Logo />
              <Typography variant="h4" sx={{ mt: 4, mb: 1.5 }}>
                {action === actionState.signin ? "Access your workspace" : "Create a polished account"}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                Sign in to manage favorites, reviews, and your personal media briefing in one place.
              </Typography>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "58%" }, p: { xs: 3, md: 4 } }}>
              {action === actionState.signin && <SigninForm switchAuthState={() => switchAuthState(actionState.signup)} />}
              {action === actionState.signup && <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />}
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AuthModal;

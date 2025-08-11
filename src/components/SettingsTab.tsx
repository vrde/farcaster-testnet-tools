import { useDisconnect } from "wagmi";
import { Stack, Button, Box, Link } from "@mui/material";
import { sdk } from "@farcaster/frame-sdk";
import { EndpointCard } from "./EndpointCard";
import { FaucetCard } from "./FaucetCard";

export function SettingsTab() {
  const { disconnect } = useDisconnect();

  const openProfile = async () => {
    try {
      await sdk.actions.openUrl("https://farcaster.xyz/albi.eth");
    } catch (error) {
      console.error("Failed to open profile:", error);
      // Fallback to regular link
      window.open("https://farcaster.xyz/albi.eth", "_blank");
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Stack spacing={2} sx={{ flex: 1 }}>
        <EndpointCard />
        <FaucetCard />
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => disconnect()}
          sx={{
            mb: 2,
            backgroundColor: "#ff6b00",
            color: "white",
            "&:hover": {
              backgroundColor: "#e55a00",
            },
            width: "fit-content",
            alignSelf: "center",
            mx: "auto",
            display: "block",
          }}
        >
          Disconnect Wallet
        </Button>

        <Box textAlign="center" sx={{ mb: 2 }}>
          <Link
            component="button"
            onClick={openProfile}
            sx={{
              textDecoration: "none",
              color: "#ff6b00",
              fontSize: "14px",
              fontWeight: "medium",
              border: "none",
              background: "none",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Follow me pls I'm fun @albi.eth
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

import { useDisconnect } from "wagmi";
import { Stack, Button, Box, Link } from "@mui/material";
import { EndpointCard } from "./EndpointCard";
import { FaucetCard } from "./FaucetCard";

export function SettingsTab() {
  const { disconnect } = useDisconnect();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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

        <Box textAlign="center">
          <Link
            href="https://farcaster.xyz/albi.eth"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              color: "#ff6b00",
              fontSize: "14px",
              fontWeight: "medium",
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

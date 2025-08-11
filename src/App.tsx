import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import { useAccount } from "wagmi";
import { ConnectMenu } from "./components/ConnectMenu";

function App() {
  const { isConnected } = useAccount();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: isConnected ? 2 : 0,
        px: 1,
        height: isConnected ? "auto" : "100vh",
        minHeight: isConnected ? "auto" : "100vh",
        display: isConnected ? "block" : "flex",
        flexDirection: isConnected ? "initial" : "column",
        justifyContent: isConnected ? "initial" : "center",
        alignItems: isConnected ? "initial" : "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={isConnected ? 2 : 6}
      >
        <img
          src="/under-construction.gif"
          alt="Under construction"
          style={{ width: 40, height: 40 }}
        />
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          sx={{
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
            fontWeight: "bold",
            color: "#ff6b00",
          }}
        >
          Testnet Tools
        </Typography>
        <img
          src="/under-construction.gif"
          alt="Under construction"
          style={{ width: 40, height: 40 }}
        />
      </Box>

      <Stack spacing={3}>
        <ConnectMenu />
      </Stack>
    </Container>
  );
}

export default App;

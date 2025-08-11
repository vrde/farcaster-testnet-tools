import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { ConnectMenu } from "./components/ConnectMenu";
import { EndpointCard } from "./components/EndpointCard";
import { FaucetCard } from "./components/FaucetCard";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4, px: 1 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={4}
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
        <EndpointCard />
        <FaucetCard />
      </Stack>

      <Box textAlign="center" mt={4}>
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
    </Container>
  );
}

export default App;
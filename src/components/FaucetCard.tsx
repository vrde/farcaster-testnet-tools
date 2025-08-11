import {
  Typography,
  Button,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

export function FaucetCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Need Test ETH?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Get free testnet ETH from the FarFaucet Mini App
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          href="https://farcaster.xyz/miniapps/nyF7y2CY0YRO/farfaucet"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<OpenInNew />}
        >
          Open FarFaucet
        </Button>
      </CardContent>
    </Card>
  );
}
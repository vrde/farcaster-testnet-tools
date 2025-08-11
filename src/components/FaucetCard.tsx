import {
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { ExternalLink } from "./ExternalLink";

export function FaucetCard() {
  return (
    <Card>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography variant="h6" gutterBottom>
          Need Test ETH?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Get free testnet ETH from the FarFaucet Mini App
        </Typography>
        <ExternalLink href="https://farcaster.xyz/miniapps/nyF7y2CY0YRO/farfaucet">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<OpenInNew />}
            sx={{
              textTransform: "none",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            Open FarFaucet
          </Button>
        </ExternalLink>
      </CardContent>
    </Card>
  );
}
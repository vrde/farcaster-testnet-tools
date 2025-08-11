import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

export function EndpointCard() {
  const [endpoint, setEndpoint] = useState("https://sepolia.base.org");

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sepolia Base Endpoint
        </Typography>
        <TextField
          fullWidth
          label="RPC URL"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://sepolia.base.org"
          variant="outlined"
          InputProps={{
            style: { fontFamily: "monospace", fontSize: "14px" },
          }}
        />
      </CardContent>
    </Card>
  );
}
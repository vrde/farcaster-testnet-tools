import { useBalance } from "wagmi";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  TextField,
  Link,
} from "@mui/material";
import { ContentCopy, OpenInNew } from "@mui/icons-material";

type UserProfile = {
  fid: number;
  displayName?: string;
  username?: string;
  pfpUrl?: string;
};

interface UserProfileCardProps {
  profile: UserProfile | null;
  address: string | undefined;
}

export function UserProfileCard({ profile, address }: UserProfileCardProps) {
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  const basescanUrl = `https://sepolia.basescan.org/address/${address}`;

  return (
    <Card>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {!profile ? (
            <>
              <Avatar sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">Loading...</Typography>
                <Typography variant="body2" color="text.secondary">
                  FID: -
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Avatar src={profile.pfpUrl} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">
                  {profile.displayName || profile.username || "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  FID: {profile.fid}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Wallet Address"
            value={address}
            InputProps={{
              readOnly: true,
              style: { fontFamily: "monospace", fontSize: "14px" },
            }}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            variant="outlined"
            size="small"
          />
          <Box display="flex" gap={1} justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ContentCopy />}
              onClick={() => navigator.clipboard.writeText(address)}
            >
              Copy
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<OpenInNew />}
              component={Link}
              href={basescanUrl}
              target="_blank"
            >
              View
            </Button>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Balance:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {balance
              ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}`
              : "Loading..."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
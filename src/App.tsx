import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useConnect, useSendTransaction } from "wagmi";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
  Stack,
  Chip,
} from "@mui/material";
import { ContentCopy, OpenInNew } from "@mui/icons-material";

type UserProfile = {
  fid: number;
  displayName?: string;
  username?: string;
  pfpUrl?: string;
};

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mb: 4 }}>
        Testnet Tools
      </Typography>
      <Stack spacing={3}>
        <ConnectMenu />
        <EndpointCard />
      </Stack>
    </Container>
  );
}

function ConnectMenu() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return <ConnectedView />;
  }

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      onClick={() => connect({ connector: connectors[0] })}
      sx={{ py: 2 }}
    >
      Connect Wallet
    </Button>
  );
}

function ConnectedView() {
  const { address } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const context = await sdk.context;
        if (context?.user) {
          setUserProfile(context.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Stack spacing={3}>
      <UserProfileCard profile={userProfile} address={address} />
      <SendCard />
    </Stack>
  );
}

function UserProfileCard({
  profile,
  address,
}: {
  profile: UserProfile | null;
  address: string | undefined;
}) {
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  const basescanUrl = `https://sepolia.basescan.org/address/${address}`;

  return (
    <Card>
      <CardContent>
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
            value={address}
            InputProps={{
              readOnly: true,
              style: { fontFamily: "monospace" },
            }}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            variant="outlined"
            size="small"
          />
          <Box display="flex" gap={1} justifyContent="center" mt={1}>
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
          <Chip
            label={
              balance
                ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}`
                : "Loading..."
            }
            color="success"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function SendCard() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);

  const { sendTransaction, isPending } = useSendTransaction();

  useEffect(() => {
    const saved = localStorage.getItem("sentAddresses");
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
    }
  }, []);

  const saveAddress = (addr: string) => {
    if (!addr || savedAddresses.includes(addr)) return;
    const updated = [addr, ...savedAddresses].slice(0, 10);
    setSavedAddresses(updated);
    localStorage.setItem("sentAddresses", JSON.stringify(updated));
  };

  if (!address) return null;

  const handleSend = async () => {
    try {
      setError("");

      if (!recipient || !amount) {
        setError("Please fill in all fields");
        return;
      }

      const amountWei = parseEther(amount);
      if (balance && amountWei > balance.value) {
        setError("Insufficient balance");
        return;
      }

      sendTransaction({
        to: recipient as `0x${string}`,
        value: amountWei,
      });

      saveAddress(recipient);
      setRecipient("");
      setAmount("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Send Testnet ETH
        </Typography>

        <Stack spacing={2}>
          <Box>
            <TextField
              fullWidth
              label="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              variant="outlined"
              InputProps={{
                style: { fontFamily: "monospace" },
              }}
            />
            {savedAddresses.length > 0 && (
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <InputLabel>Recent Addresses</InputLabel>
                <Select
                  value=""
                  label="Recent Addresses"
                  onChange={(e) => setRecipient(e.target.value)}
                  sx={{ fontFamily: "monospace" }}
                >
                  {savedAddresses.map((addr, index) => (
                    <MenuItem
                      key={index}
                      value={addr}
                      sx={{ fontFamily: "monospace" }}
                    >
                      {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Amount (ETH)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.001"
              variant="outlined"
              inputProps={{
                step: "0.001",
                min: "0",
                max: balance ? balance.formatted : undefined,
              }}
            />
            {balance && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                Available: {Number(balance.formatted).toFixed(4)} ETH
              </Typography>
            )}
          </Box>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                p: 1,
                bgcolor: "error.light",
                borderRadius: 1,
                color: "error.contrastText",
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSend}
            disabled={isPending || !balance || balance.value === 0n}
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function EndpointCard() {
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
            style: { fontFamily: "monospace" },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default App;

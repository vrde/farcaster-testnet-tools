import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { Contacts } from "@mui/icons-material";

export function SendCard() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

        <Stack spacing={3}>
          <Box>
            <TextField
              fullWidth
              label="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              variant="outlined"
              InputProps={{
                style: { fontFamily: "monospace", fontSize: "14px" },
              }}
            />
            {savedAddresses.length > 0 && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<Contacts />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ mt: 2 }}
                >
                  Recent Addresses
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {savedAddresses.map((addr, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setRecipient(addr);
                        setAnchorEl(null);
                      }}
                      sx={{ fontFamily: "monospace", fontSize: "14px" }}
                    >
                      {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
                    </MenuItem>
                  ))}
                </Menu>
              </>
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
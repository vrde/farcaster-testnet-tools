import { useAccount, useConnect } from "wagmi";
import { Button } from "@mui/material";
import { ConnectedView } from "./ConnectedView";

export function ConnectMenu() {
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
    >
      Connect Wallet
    </Button>
  );
}
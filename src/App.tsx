import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useBalance, useConnect, useSendTransaction } from "wagmi";
import "./App.css";

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
    <div className="app">
      <h1 className="title">Testnet Tools</h1>
      <ConnectMenu />
      <EndpointCard />
    </div>
  );
}

function ConnectMenu() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return <ConnectedView />;
  }

  return (
    <button type="button" className="connect-button" onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
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
    <>
      <UserProfileCard profile={userProfile} address={address} />
      <SendCard />
    </>
  );
}

function UserProfileCard({ profile, address }: { profile: UserProfile | null; address: string | undefined }) {
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  const basescanUrl = `https://sepolia.basescan.org/address/${address}`;

  return (
    <div className="card">
      <div className="user-profile">
        {!profile ? (
          <>
            <div className="user-avatar" />
            <div className="user-info">
              <p className="user-name">Loading...</p>
              <p className="user-fid">FID: -</p>
            </div>
          </>
        ) : (
          <>
            <img
              src={profile.pfpUrl || "/default-avatar.png"}
              alt="User avatar"
              className="user-avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMjQiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjMiIGZpbGw9IiM5OTkiLz4KICA8cGF0aCBkPSJtNiAyMWMwLTMuMzEgMi42OS02IDYtNnM2IDIuNjkgNiA2IiBmaWxsPSIjOTk5Ii8+Cjwvc3ZnPgo8L3N2Zz4=";
              }}
            />
            <div className="user-info">
              <p className="user-name">{profile.displayName || profile.username || "Unknown"}</p>
              <p className="user-fid">FID: {profile.fid}</p>
            </div>
          </>
        )}
      </div>
      
      <div className="wallet-address">
        <input type="text" value={address} readOnly onClick={(e) => (e.target as HTMLInputElement).select()} />
        <a href={basescanUrl} target="_blank" rel="noopener noreferrer" className="basescan-link">
          View
        </a>
      </div>

      <div className="balance-section">
        <label>Balance:</label>
        <span className="balance">
          {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "Loading..."}
        </span>
      </div>
    </div>
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

  const { sendTransaction, isPending } = useSendTransaction();

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

      setRecipient("");
      setAmount("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  return (
    <div className="card">
      <h3>Send Testnet ETH</h3>
      
      <div>
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
        />
      </div>

      <div>
        <label htmlFor="amount">Amount (ETH):</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.001"
          step="0.001"
          min="0"
          max={balance ? balance.formatted : undefined}
        />
        {balance && (
          <span className="balance-info">
            Available: {Number(balance.formatted).toFixed(4)} ETH
          </span>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <button 
        type="button" 
        className="send-button-full" 
        onClick={handleSend} 
        disabled={isPending || !balance || balance.value === 0n}
      >
        {isPending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}


function EndpointCard() {
  const [endpoint, setEndpoint] = useState("https://sepolia.base.org");

  return (
    <div className="card">
      <h3>Sepolia Base Endpoint</h3>
      <div>
        <label htmlFor="endpoint">RPC URL:</label>
        <input
          id="endpoint"
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="https://sepolia.base.org"
        />
      </div>
    </div>
  );
}

export default App;

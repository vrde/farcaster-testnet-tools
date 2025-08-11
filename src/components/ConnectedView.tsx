import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { useAccount } from "wagmi";
import { Stack } from "@mui/material";
import { UserProfileCard } from "./UserProfileCard";
import { SendCard } from "./SendCard";

type UserProfile = {
  fid: number;
  displayName?: string;
  username?: string;
  pfpUrl?: string;
};

export function ConnectedView() {
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
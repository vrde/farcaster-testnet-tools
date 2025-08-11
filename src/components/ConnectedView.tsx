import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { useAccount } from "wagmi";
import { Stack, Box } from "@mui/material";
import { UserProfileCard } from "./UserProfileCard";
import { SendCard } from "./SendCard";
import { SettingsTab } from "./SettingsTab";
import { AppBottomNavigation } from "./AppBottomNavigation";

type UserProfile = {
  fid: number;
  displayName?: string;
  username?: string;
  pfpUrl?: string;
};

export function ConnectedView() {
  const { address } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      paddingBottom: 'max(env(safe-area-inset-bottom), 16px)'
    }}>
      {tabValue === 0 && (
        <Box sx={{ 
          paddingBottom: '80px' // Space for bottom navigation
        }}>
          <Stack spacing={2}>
            <UserProfileCard profile={userProfile} address={address} />
            <SendCard />
          </Stack>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box sx={{ 
          height: 'calc(100vh - 140px)', // Account for bottom nav + safe area
          minHeight: 'calc(100vh - 140px)',
          overflow: 'hidden'
        }}>
          <SettingsTab />
        </Box>
      )}
      
      <AppBottomNavigation 
        value={tabValue} 
        onChange={handleTabChange} 
      />
    </Box>
  );
}
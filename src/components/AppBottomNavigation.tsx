import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Settings } from "@mui/icons-material";

interface AppBottomNavigationProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export function AppBottomNavigation({
  value,
  onChange,
}: AppBottomNavigationProps) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            "&.Mui-selected": {
              color: "#ff6b00",
            },
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}

import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { sdk } from "@farcaster/frame-sdk";

interface ExternalLinkProps extends Omit<ButtonProps, 'href'> {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children, onClick, ...props }: ExternalLinkProps) {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(event);
    }
    
    try {
      await sdk.actions.openUrl(href);
    } catch (error) {
      console.error("Failed to open external URL with SDK:", error);
      // Fallback to regular link opening
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      sx={{
        minWidth: 0,
        padding: 0,
        textTransform: "none",
        textAlign: "inherit",
        justifyContent: "inherit",
        ...props.sx,
      }}
      variant="text"
    >
      {children}
    </Button>
  );
}
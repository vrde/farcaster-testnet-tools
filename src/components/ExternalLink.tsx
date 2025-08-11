import React from "react";
import { Link, LinkProps } from "@mui/material";
import { sdk } from "@farcaster/frame-sdk";

interface ExternalLinkProps extends Omit<LinkProps, 'href' | 'target' | 'rel'> {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children, onClick, ...props }: ExternalLinkProps) {
  const handleClick = async (event: React.MouseEvent) => {
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
    <Link
      {...props}
      component="button"
      onClick={handleClick}
      sx={{
        border: "none",
        background: "none",
        cursor: "pointer",
        textAlign: "inherit",
        font: "inherit",
        padding: 0,
        ...props.sx,
      }}
    >
      {children}
    </Link>
  );
}
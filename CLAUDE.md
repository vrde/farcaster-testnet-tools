# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Farcaster Mini App built with Vite, React, TypeScript, and Wagmi. It's a web application that can be embedded as a frame in Farcaster feeds and provides blockchain wallet connectivity.

For Farcaster-specific development guidance and best practices, refer to the [Farcaster Agents Checklist](https://miniapps.farcaster.xyz/docs/guides/agents-checklist) and the broader [Farcaster Mini Apps documentation](https://miniapps.farcaster.xyz/docs/getting-started).

## Development Commands

```bash
# Start development server (runs on localhost:5173)
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Lint code using Biome
npm run lint

# Preview production build
npm run preview

# Create SSH tunnel for external access (specific to this setup)
npm run tunnel
```

## Architecture

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Blockchain**: Wagmi + Viem for Ethereum/Base chain interactions
- **Farcaster Integration**: `@farcaster/frame-sdk` and `@farcaster/frame-wagmi-connector`
- **State Management**: TanStack React Query
- **Code Quality**: Biome for linting and formatting

### Key Components
- `src/App.tsx`: Main application with wallet connection and message signing
- `src/wagmi.ts`: Wagmi configuration for Base and Mainnet chains
- `src/main.tsx`: React app entry point with providers setup
- `public/.well-known/farcaster.json`: Farcaster Mini App configuration

### Project Structure
- Uses standard Vite React TypeScript template structure
- Farcaster frame metadata can be added to `index.html` for social sharing
- Static assets served from `public/` directory
- Biome configured with 120 character line width and space indentation

### Farcaster Integration
- Uses `@farcaster/frame-sdk` for frame lifecycle management
- Configured as a Mini App that can be launched from Farcaster frames
- Frame metadata configuration should be added to HTML head for proper embedding
- The `.well-known/farcaster.json` file is served statically and currently empty

### Blockchain Configuration
- Supports Base and Mainnet chains
- Uses Farcaster Frame connector for wallet integration
- No test networks configured (despite project name mentioning "testnet")
- we use bun :)
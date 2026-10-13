# DOGZY Marketplace

DOGZY is an NFT marketplace and web3 dashboard for Avalanche C-Chain.

## Tech stack
- Frontend: Next.js
- API: Express + TypeScript
- Smart contracts: Solidity + Hardhat
- Chain: Avalanche C-Chain (Fuji)
- Storage: IPFS

## Repositories
- `apps/web`: investor-ready frontend demo
- `apps/api`: backend API
- `contracts`: Solidity contracts and deployment scripts

## Local development

Prerequisites:
- Node.js >= 20
- pnpm
- Docker (optional)

Install:

```bash
pnpm install
pnpm --filter web install
pnpm --filter api install
pnpm --filter contracts install
```

Run frontend:

```bash
pnpm dev:web
```

Run API:

```bash
pnpm dev:api
```

Run contract tests:

```bash
cd contracts
pnpm hardhat test
```

## Deployment
The repo includes a GitHub Actions workflow for Fuji deployment at `.github/workflows/deploy-fuji.yml`.

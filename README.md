## Rose - HackFS 2024 Project

Smart storage solution built on top of IPFS & Filecoin, benchmarking deduplication process, and optionally enabling proof of ownership using ERC721. BUIDL for humans.

Our project, Rose, is a revolutionary platform designed to offer a seamless experience for storing, creating, and managing digital assets. Leveraging the power of IPFS and Filecoin, Rose ensures secure and decentralized storage for users' files while providing efficient authentication mechanisms.

### Key Features

- **Decentralized Storage**: Utilizing IPFS and Filecoin, Rose provides a decentralized storage solution, ensuring data integrity and availability.
  
- **Deduplication Benchmarking**: Rose employs advanced deduplication techniques to optimize storage space and enhance performance.
  
- **Proof of Ownership with ERC721**: For users seeking additional security and authenticity, Rose optionally enables the creation of non-fungible tokens (NFTs) using the ERC721 standard, providing immutable proof of ownership.

---

### Getting Started

**Development Environment Setup**

To configure your development environment for Rose, follow these steps:

**Backend**: Rose's backend is built on Node.js.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend**: The frontend is built using Vite.js (React).

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Both the backend and frontend can be initialized using the command npm run dev. While we recommend using Bun.js for development, npm and yarn are also supported.

### Contribution
Contributions are welcomed after June 2, 2024. This is project is built for HackFS 2024, ETHGlobal. Please check out the [issues](https://github.com/13x54n/hackfs-rose/issues)

### License
[MIT](https://github.com/13x54n/hackfs-rose/blob/main/LICENSE) &copy; Rose
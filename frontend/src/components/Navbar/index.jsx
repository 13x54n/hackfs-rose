import React from "react";
import { ConnectButton, lightTheme } from "thirdweb/react";
import Logo from '/logo.png'

import { createWallet, walletConnect } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
];
const customTheme = lightTheme({
  colors: {
    primaryButtonBg: "white",
    primaryButtonText: "black",
  },
});

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
})

export default function Navbar() {
  return (
    <div className="navbar flex items-center justify-between bg-white px-[4vw] border-b">
      <div className="flex items-center justify-between gap-1">
        <img src="/logo.png" alt="" className="w-10" />
        <a className="text-xl font-medium">Rose</a>
      </div>
      <a className="text-3xl" href="https://github.com/13x54n/hackfs-rose/discussions" target="_blank">🧠</a>
      <div className="flex-none">
        <ConnectButton client={client} wallets={wallets} theme={customTheme} connectModal={{ size: "compact" }} appMetadata={{
          logoUrl: {Logo},
        }}/>
      </div>
    </div>
  );
}

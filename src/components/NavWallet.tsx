'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import WalletBtn from './WalletBtn';

const NavWallet = () => {
  const wallet = useWallet();
  //   const { publicKey, signTransaction } = wallet;
  console.log('wallet', wallet);

  return (
    <>
      <WalletBtn />
    </>
  );
};

export default NavWallet;

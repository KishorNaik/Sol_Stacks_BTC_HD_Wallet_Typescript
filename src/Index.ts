import { Mnomonic } from "./lib/mnomonic";
import { Seed } from "./lib/seed";
import { BtcStxWallet } from "./lib/wallet";

const main = async () => {
  // Generate Mnemonic
  const mnemonic = await new Mnomonic().generateMnemonicAsync();
  console.log("Mnemonic: " + mnemonic);

  // Generate Seed
  const seed = await new Seed().generateSeedAsync(mnemonic);
  console.log("Seed: " + seed.toString("hex"));

  // Generate Wallet
  const wallet = await new BtcStxWallet().generateWalletAsync({
    seed,
    path: 0,
  });
  console.log("Address: " + wallet.address);
  console.log("Private Key: " + wallet.privateKey);
  console.log("Public Key: " + wallet.publicKey);
};

main()
  .then()
  .catch((ex) => console.log(ex.message));

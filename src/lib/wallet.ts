import * as bitcoin from "bitcoinjs-lib";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import {
  StacksPrivateKey,
  TransactionVersion,
  getAddressFromPrivateKey,
  makeRandomPrivKey,
  privateKeyToString,
} from "@stacks/transactions";

export interface GenerateWalletOptions {
  seed: Buffer;
  path: number;
}

export interface GenerateWalletResult {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface IBtcStxWallet {
  generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult>;
}

export class BtcStxWallet implements IBtcStxWallet {
  public generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult> {
    return new Promise((resolve, reject) => {
      try {
        // Get Seed and Path
        const { seed, path } = params;

        const bip32 = BIP32Factory(ecc);
        const hdWallet = bip32.fromSeed(seed);

        const wallet_hdpath = "m/44'/0'/0'/0/";
        const wallet_hdpath_extended = wallet_hdpath + path;

        // Derive the keychain for the STX address
        const childKeyChain = hdWallet.derivePath(wallet_hdpath_extended);

        // Get the private key
        const privateKey = childKeyChain.privateKey!.toString("hex")!;

        // Get the public key
        const publicKey = childKeyChain.publicKey!.toString("hex")!;

        const stacksPrivateKey: StacksPrivateKey = {
          compressed: true,
          data: Buffer.from(childKeyChain.privateKey!.toString("hex")!, "hex"),
        };

        // Get the STX address
        const stxAddress = getAddressFromPrivateKey(
          privateKeyToString(stacksPrivateKey),
          TransactionVersion.Testnet
        );

        const result: GenerateWalletResult = {
          address: stxAddress,
          privateKey,
          publicKey,
        };
        resolve(result);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

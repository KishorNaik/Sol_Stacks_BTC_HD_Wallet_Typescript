import * as bip39 from "bip39";

export interface ISeed {
  generateSeedAsync(mnemonic: string): Promise<Buffer>;
}

export class Seed implements ISeed {
  public generateSeedAsync(mnemonic: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        //resolve(seed.toString("hex"));
        resolve(seed);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

import * as bip39 from "bip39";

export interface IMnomonic {
  generateMnemonicAsync(): Promise<string>;
}

export class Mnomonic implements IMnomonic {
  public generateMnemonicAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const mnemonic = bip39.generateMnemonic();
        resolve(mnemonic);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

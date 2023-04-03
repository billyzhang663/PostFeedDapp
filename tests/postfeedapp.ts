import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Postfeedapp } from "../target/types/postfeedapp";
import { assert } from "chai";

describe("postfeedapp", () => {
  const provider = anchor.AnchorProvider.local();
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Postfeedapp as Program<Postfeedapp>;
  const feedPostAppAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const num = new anchor.BN(2);
    // Add your test here.
    const tx = await program.methods.createPost('hello','www.imagrurl.com',num,false)
    .accounts({
        feedPostApp: feedPostAppAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([feedPostAppAccount])
    .rpc();
    console.log("Your transaction signature", tx);

    const accountData = await program.account.feedPostApp.fetch(feedPostAppAccount.publicKey);
    assert.ok(accountData.media === 'www.imagrurl.com');
    assert.ok(accountData.admin===false);
    assert.ok(accountData.text==='hello');
  });
});

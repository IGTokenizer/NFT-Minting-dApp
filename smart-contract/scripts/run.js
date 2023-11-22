async function main() {

  const lock = await hre.ethers.deployContract("MySmartNFT");
  await lock.waitForDeployment();
  console.log(
    `Deployed to ${lock.target}`
  );
  // Call the function.
  let txn = await lock.makeAnEpicNFT()
  // Wait for it to be mined.
  await txn.wait()

  // Mint another NFT for fun.
  txn = await lock.makeAnEpicNFT()
  // Wait for it to be mined.
  await txn.wait()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

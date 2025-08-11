change the main app to do the following:

- Title: Testnet Tools, dont' make it too big
- keep the CSS simple, just a single file, browser native fonts, note that the app is a miniapp so it runs in a "mobile like" frame embedded in another website, so it should be quite "vertical"
- it must connect to sepolia base, that's the main goal
- at the top it shows
  - the avatar of the current user and their name, farcaster id
  - wallet address (in an input box so it's easy to copy) with a link to basescan like https://sepolia.basescan.org/address/0x62817523F3B94182B9DF911a8071764F998f11a4
  - the balance of the user for that network and a button to send that opens a popup asking for the amount to transfer, and the receiving address
- it connects automatically to a sepolia base endpoint
- it has an input to change the sepolia base endpoint in case the user wants to change it

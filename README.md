# Bitcoin Crossword

![Did you check the favicon?](https://bitcoin-crossword.com/crossword.png)

A bounty remains hidden behind this 5-word crossword, available at **[bitcoin-crossword.com](https://bitcoin-crossword.com)**.

Created by [Handsome Latino](https://handsomelatino.com) using [React](https://github.com/facebook/create-react-app).

## The total bounty is:

- ~0.01 BTC (one million sat)~ 
- 0.01006614 BTC (1,006,614 sats)

Donations to the bounty address are welcome while the puzzle remains unsolved.

[`bc1qe926cfhzyh438fyvn9snyrcrsfujp6ur3zcrrn`](https://mempool.space/address/bc1qe926cfhzyh438fyvn9snyrcrsfujp6ur3zcrrn)

## Running the project

To run the project locally, clone the repository and run

```
yarn start
```

To generate your own custom message and key, you must create to files on the root of the project:

```
_message.md      <- markdown-flavored message to encrypt
_message_key.txt <- cleartext key in a single line

yarn encrypt-message
```

A `public/cypher.txt` will be created. Note that the key must be a permutation of words that solves the puzzle.

## Production Build

The following command will create a `build` production directory:
```
yarn build
```

## License

[MIT License](/LICENSE)

## DeFi Analytics App

This app uses [The Graph service](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2?selected=playground) to fetch data form [Uniswap V2](https://uniswap.org/blog/uniswap-v2) DEX and displays some market performance metrics from a set of listed pairs.

<img width="1378" alt="Screen Shot 2022-02-14 at 14 25 12" src="https://user-images.githubusercontent.com/62451142/153915055-e8934885-0d08-4347-b2b2-4dac4fb81eee.png">

## Install dependencies

```bash
npm install
# or
yarn install // yarn
```

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env` (in this case is not ignored by Git, on purpose):

```bash
cp .env.local.example .env
```

Set each variable on `.env`:

## Run in dev mode

```bash
npm run dev
# or
yarn dev
```

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)

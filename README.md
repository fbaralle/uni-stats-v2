## DeFi Analytics App

This app uses [The Graph service](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2?selected=playground) to fetch data form [Uniswap V2](https://uniswap.org/blog/uniswap-v2) DEX and displays some market performance metrics from a set of listed pairs.

<img width="1206" alt="Screen Shot 2022-02-15 at 02 45 29" src="https://user-images.githubusercontent.com/62451142/154000247-f03c4f5d-92b3-48e6-8cf1-2b918ff643e8.png">

---

## Live Demo

App up and running, deployed to Vercel cloud, at [uni-stats-v2.vercel.app](https://uni-stats-v2.vercel.app)

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

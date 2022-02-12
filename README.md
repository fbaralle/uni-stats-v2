## DeFi Analytics App

This app uses [The Graph service](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2?selected=playground) to fetch data form [Uniswap V2](https://uniswap.org/blog/uniswap-v2) DEX and displays some market performance metrics from a set of listed pairs.

![Screen Shot 2022-02-11 at 23 20 54](https://user-images.githubusercontent.com/62451142/153692795-a46248aa-4eb4-443f-9826-21fbbe4c7337.png)


## Install dependencies

```bash
npm install
# or
yarn install // yarn
```

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env` (in this case is not ignored by Git, on purpose):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

## Run in dev mode

```bash
npm run dev
# or
yarn dev
```

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)

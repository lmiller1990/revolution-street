# Revolution Street

## Development and Deployment

Dependencies:

### sqitch

MacOS: 

```sh
brew tap sqitchers/sqitch
brew install sqitch --with-postgres-support
```

Ubuntu:

```sh
apt-get install sqitch libdbd-pg-perl postgresql-client
```

### Postgres

MacOS:

Postgres.app or brew

Ubuntu:

```sh
sudo apt install postgresql postgresql-contrib
```

### Node.js

MacOS: Download from website

Ubuntu:

```sh
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Setup

```sh
npm install
cd sqitch
sqitch deploy
npm run build
pm2 start src/index.js
#!/usr/bin/env bash

git clone https://github.com/squardinc/aurora-core.git
cd aurora-core
git fetch
git pull origin develop
yarn && npx hardhat compile


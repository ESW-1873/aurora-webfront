const fs = require('fs')
const dotenv = require('dotenv')

const branchName = process.env.VERCEL_GIT_COMMIT_REF
const isProd = branchName === 'main'

const envFilePath = `.env/${branchName}`
const envVars = {
  NEXT_PUBLIC_IS_PROD: isProd,
}
if (fs.existsSync(envFilePath))
  Object.assign(envVars, dotenv.config({ path: envFilePath }).parsed)

console.log(envVars)

const withMDX = require('@next/mdx')()
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([[withBundleAnalyzer], [withMDX]], {
  reactStrictMode: true,
  env: envVars,
  images: {
    domains: ['arweave.net'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                // see: https://github.com/svg/svgo#what-it-can-do
                removeViewBox: false, // to enable overwriteing width/height by CSS
                moveElemsAttrsToGroup: false, // to prevent attribute destruction for overwriting color}
              },
            },
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader'],
    })
    return config
  },
})

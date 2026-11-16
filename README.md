# Shopify Price Monitor

Track competitor **Shopify stores** every day: price changes, new sales, new products and stock changes. No scraping code to maintain.

It uses the [Shopify Store Products & Price Tracker](https://apify.com/mistlike_potato/shopify-store-products-price-tracker) on Apify, which reads the public product feed of any Shopify store (custom domains work), and remembers what it saw last time.

## Quick start

1. Create a free Apify account and copy your API token from **Settings → Integrations**.
2. Run:

```bash
export APIFY_TOKEN=your_token
node monitor.mjs allbirds.com gymshark.com
```

The first run saves the full catalog. Every later run prints only what changed:

```
[changed] allbirds.com  Men's Tree Runners  110 -> 98 USD  (now on sale)
[new]     gymshark.com  Vital Seamless Leggings  55 USD
```

3. Run it daily with cron, GitHub Actions or an Apify schedule.

Node 18+ is required. There are no dependencies.

## Ideas

- **Competitor price alerts:** send the changes to Slack or email
- **Sale detection:** filter with `onlyOnSale`
- **Restock alerts:** watch `available` flip to true
- **Product research:** pull full catalogs with images, variants and SKUs

## Cost

The Actor charges $1.00 per 1,000 rows saved. Unchanged products are skipped and cost nothing. Apify's free plan includes monthly credit, enough to try it.

## License

MIT

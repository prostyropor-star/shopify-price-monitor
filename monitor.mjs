// Daily Shopify competitor monitor: prints new products and price/stock changes.
// Usage: APIFY_TOKEN=... node monitor.mjs store1.com store2.com
const token = process.env.APIFY_TOKEN;
const stores = process.argv.slice(2);
if (!token || !stores.length) {
    console.error('Usage: APIFY_TOKEN=... node monitor.mjs store1.com [store2.com ...]');
    process.exit(1);
}

const url = `https://api.apify.com/v2/acts/mistlike_potato~shopify-store-products-price-tracker/run-sync-get-dataset-items?token=${token}`;
const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ stores, trackChanges: true, includeDescription: false }),
});
if (!res.ok) {
    console.error(`Apify API error ${res.status}: ${await res.text()}`);
    process.exit(1);
}
const rows = await res.json();
if (rows[0]?.change === 'first_run') {
    console.log(`First run: saved ${rows.length} products as the baseline. Run again tomorrow to see changes.`);
    process.exit(0);
}
if (!rows.length) console.log('No changes since the last run.');
for (const r of rows) {
    const price = r.priceMin === r.priceMax ? `${r.priceMin}` : `${r.priceMin}-${r.priceMax}`;
    let note = '';
    if (r.change === 'changed' && Array.isArray(r.previous)) {
        const old = r.previous.map((v) => v[1]).filter((x) => x != null);
        if (old.length) note = `${Math.min(...old)} -> `;
    }
    console.log(`[${r.change}] ${r.store}  ${r.title}  ${note}${price} ${r.currency ?? ''}${r.onSale ? '  (on sale)' : ''}${r.available ? '' : '  (sold out)'}`);
}

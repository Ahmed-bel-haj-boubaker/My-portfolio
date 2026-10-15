/**
 * Tells Bing (and through IndexNow, Yandex, Naver, Seznam) that pages changed.
 * Bing powers ChatGPT search and Copilot, so this is the quickest way to get
 * new content into AI answers. Run after each deploy:  npm run indexnow
 *
 * Proves ownership with the key file in /public/<key>.txt.
 */
const host = "ahmed-belhaj-boubaker.com"
const key = "add09290f2aa064f338c39711140590c"

const sitemap = await fetch(`https://${host}/sitemap.xml`).then((r) => r.text())
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
urlList.push(`https://${host}/llms.txt`, `https://${host}/llms-full.txt`)

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
})
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`)
if (!res.ok) process.exitCode = 1

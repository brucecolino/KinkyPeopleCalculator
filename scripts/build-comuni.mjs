#!/usr/bin/env node
/**
 * build-comuni.mjs
 *
 * Genera src/data/comuni-it.json combinando due dataset open source:
 *  - italy_cities.json (nome comune + sigla provincia + codice ISTAT)
 *  - italy_geo.json    (codice ISTAT + lat/lng centroide comune)
 *
 * Sorgente: https://github.com/MatteoHenryChinaski/Comuni-Italiani-2018-Sql-Json-excel
 *
 * Eseguire UNA TANTUM quando si vuole rigenerare il dataset:
 *   node scripts/build-comuni.mjs
 *
 * Output schema (array di oggetti minimali per ridurre dimensione bundle):
 *   { n: "Ascea", p: "SA", lat: 40.1378, lon: 15.1864 }
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'comuni-it.json');

const SRC_CITIES = 'https://raw.githubusercontent.com/MatteoHenryChinaski/Comuni-Italiani-2018-Sql-Json-excel/master/italy_cities.json';
const SRC_GEO    = 'https://raw.githubusercontent.com/MatteoHenryChinaski/Comuni-Italiani-2018-Sql-Json-excel/master/italy_geo.json';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

const round = (v, d = 4) => Math.round(Number(v) * 10 ** d) / 10 ** d;

(async () => {
  console.log('Scarico dataset ISTAT…');
  const [cities, geo] = await Promise.all([fetchJson(SRC_CITIES), fetchJson(SRC_GEO)]);
  console.log(`  cities: ${cities.length} record`);
  console.log(`  geo:    ${geo.length} record`);

  const geoByIstat = new Map(geo.map(g => [String(g.istat), g]));

  const out = [];
  let missing = 0;
  for (const c of cities) {
    const g = geoByIstat.get(String(c.istat));
    if (!g || g.lat == null || g.lng == null) { missing++; continue; }
    out.push({
      n: c.comune,
      p: c.provincia,
      lat: round(g.lat),
      lon: round(g.lng),
    });
  }

  // Ordina alfabeticamente per provincia poi per nome (utile per debugging diff)
  out.sort((a, b) => a.p.localeCompare(b.p) || a.n.localeCompare(b.n, 'it'));

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(out));

  const stat = await fs.stat(OUT);
  console.log(`\nScritto ${OUT}`);
  console.log(`  comuni totali: ${out.length}`);
  console.log(`  scartati (no geo): ${missing}`);
  console.log(`  dimensione file: ${(stat.size / 1024).toFixed(1)} KB`);

  // Verifica spot-check Ascea (caso d'uso del bug originale)
  const ascea = out.find(c => c.n === 'Ascea' && c.p === 'SA');
  console.log(`\nVerifica Ascea (SA): ${ascea ? JSON.stringify(ascea) : 'MANCANTE!'}`);
})().catch(e => {
  console.error('Errore:', e);
  process.exit(1);
});

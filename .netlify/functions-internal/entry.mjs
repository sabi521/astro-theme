import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_X4KtYUbK.mjs';

const _page0  = () => import('./chunks/generic_Y30xIVRv.mjs');
const _page1  = () => import('./chunks/index_PAlKpaEA.mjs');
const _page2  = () => import('./chunks/casino-school__2Knhvbd.mjs');
const _page3  = () => import('./chunks/guides_Hjfu5GUj.mjs');
const _page4  = () => import('./chunks/online-video-poker_YgZjEMR5.mjs');
const _page5  = () => import('./chunks/blackjack-online_jWiAYHmX.mjs');
const _page6  = () => import('./chunks/roulette-online_TAk8r1si.mjs');
const _page7  = () => import('./chunks/slots-online_jvZkSL93.mjs');
const _page8  = () => import('./chunks/live-dealer_jN2OPgvX.mjs');
const _page9  = () => import('./chunks/games_MS9ZYtbr.mjs');
const _page10  = () => import('./chunks/news_DrRmvSkI.mjs');
const _page11  = () => import('./chunks/404_bdwFcIs-.mjs');
const _page12  = () => import('./chunks/_.._IhFmCT7u.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/casino-school.astro", _page2],["src/pages/guides.astro", _page3],["src/pages/offers/online-video-poker.astro", _page4],["src/pages/offers/blackjack-online.astro", _page5],["src/pages/offers/roulette-online.astro", _page6],["src/pages/offers/slots-online.astro", _page7],["src/pages/offers/live-dealer.astro", _page8],["src/pages/games.astro", _page9],["src/pages/news.astro", _page10],["src/pages/404.astro", _page11],["src/pages/[...uri].astro", _page12]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };

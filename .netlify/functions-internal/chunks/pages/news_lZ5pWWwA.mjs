/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_8gSSmbI_.mjs';
import 'kleur/colors';
import 'clsx';
import { a as $$Layout } from './404_3VIjfSNZ.mjs';

const $$Astro = createAstro();
const $$News = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$News;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "News" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="news_page_container max-w-[1440px] mx-auto w-[80%] font-giloryRegular font-semibold text-base text-[#666] mt-56"> <div class="post-bread font-semibold my-10"> <div> <p> <span><span><a href="/the-beach/">Home</a></span> &gt;
<span><a href="/news/">News</a></span> </span> </p> </div> </div> <div> <div> <h1 class="text-3xl sm:text-4xl text-[#ff688b] pb-3 font-medium font-giloryExtrabold">
Casino News
</h1> <p> <span>Our Casino News section is your source for the latest happenings in
            the world of gambling and casinos. Stay informed on new casino
            openings, industry developments, and changes in laws and
            regulations. Discover the latest trends and innovations in the
            casino industry and get insights into winning strategies and
            tactics. From major tournament events to tips for success, Casino
            News has everything you need to stay ahead in the world of online
            gambling.</span> </p> <p> <span>Whether you are a seasoned gambler or just starting out, this
            section is your go-to resource for all things related to the casino
            world. Stay informed, and stay ahead of the game, with Casino News.</span> </p> </div> </div> <section class="news_page max-w-[1440px] mx-auto px-4 my-16 min-h-screen" id="page_content"></section> <div class="button_container max-w-[1440px] mx-auto flex justify-between items-center mb-10"> <button id="nextPage">Next</button> <button id="previousPage">Previous</button> </div> </div>  ` })}`;
}, "C:/Astro Latest/astro-theme/src/pages/news.astro", void 0);

const $$file = "C:/Astro Latest/astro-theme/src/pages/news.astro";
const $$url = "/news";

export { $$News as default, $$file as file, $$url as url };

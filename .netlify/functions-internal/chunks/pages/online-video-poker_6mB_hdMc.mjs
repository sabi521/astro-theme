/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_8gSSmbI_.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$LayoutLandingPage, a as $$HeaderLandingPage, b as $$DesktopDesign, c as $$TabLandingPage, d as $$MobileLandingPage } from './blackjack-online_grGJGZcq.mjs';

const $$Astro = createAstro();
const $$OnlineVideoPoker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OnlineVideoPoker;
  return renderTemplate`${renderComponent($$result, "LayoutLandingPage", $$LayoutLandingPage, { "title": "online-video-poker" })} ${maybeRenderHead()}<div class="main flex flex-col lg:flex-row"> <div class="main-header"> ${renderComponent($$result, "HeaderLandingPage", $$HeaderLandingPage, {})} </div> <div class="main-content w-full"> <div class="desktop-design hidden lg:block"> ${renderComponent($$result, "DesktopDesign", $$DesktopDesign, { "h1": "250%", "h2": "UP TO $2,500", "logo_image": "https://slotsparadise.com/the-beach/images/2023/01/live-slot-logo.png", "bg_image": "https://slotsstg.wpengine.com/wp-content/uploads/2023/01/SlotsParadise-LPs-videopoker.png", "footer_image": "https://slotsstg.wpengine.com/wp-content/uploads/2023/01/crypto_contact.png", "bg_btn": "bg-[#4b1e5e]" })} </div> <div class="tab-design hidden md:block lg:hidden"> ${renderComponent($$result, "TabLandingPage", $$TabLandingPage, { "h1": "250%", "h2": "$2,500", "logo_image": "https://slotsparadise.com/the-beach/images/2023/01/live-slot-logo.png", "bg_image": "https://slotsstg.wpengine.com/wp-content/uploads/2023/01/SlotsParadise-LPs-videopoker-md.png", "footer_image_1": "https://slotsstg.wpengine.com/the-beach/images/2023/01/support.png", "footer_image_2": "https://slotsstg.wpengine.com/the-beach/images/2023/01/crypto-currency.png", "bg_btn": "bg-[#4b1e5e]" })} </div> <div class="mobile-design block md:hidden"> ${renderComponent($$result, "MobileLandingPage", $$MobileLandingPage, { "h1": "250%", "h2": "UP TO $2,500", "logo_image": "https://slotsparadise.com/the-beach/images/2023/01/live-slot-logo.png", "bg_image": "https://slotsstg.wpengine.com/wp-content/uploads/2023/01/SlotsParadise-LPs-videopoker-mob.png", "footer_image_1": "https://slotsstg.wpengine.com/the-beach/images/2023/01/support.png", "footer_image_2": "https://slotsstg.wpengine.com/the-beach/images/2023/01/crypto-currency.png", "bg_btn": "bg-[#4b1e5e]" })} </div> </div> </div>`;
}, "C:/Astro Latest/astro-theme/src/pages/offers/online-video-poker.astro", void 0);

const $$file = "C:/Astro Latest/astro-theme/src/pages/offers/online-video-poker.astro";
const $$url = "/offers/online-video-poker";

export { $$OnlineVideoPoker as default, $$file as file, $$url as url };

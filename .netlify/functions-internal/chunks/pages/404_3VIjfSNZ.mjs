import '@astrojs/internal-helpers/path';
/* empty css                          */
import { e as createAstro, f as createComponent, A as AstroError, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, u as unescapeHTML, i as renderComponent, F as Fragment, j as renderSlot, k as renderHead } from '../astro_8gSSmbI_.mjs';
import 'kleur/colors';
import 'clsx';
import { optimize } from 'svgo';
/* empty css                          */
import { i as isESMImportedImage, g as getImage$1 } from '../astro/assets-service_VRWSuU19.mjs';

const $$Astro$b = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro/components/Image.astro", void 0);

const $$Astro$a = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///C:/Astro%20Latest/astro-theme/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({


});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({


});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$9 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$8 = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet> ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)} </svg>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$7 = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$6 = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}> ${title ? renderTemplate`<title>${title}</title>` : ""} <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use> </svg>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$5 = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Navigation;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center" data-astro-cid-pux6a34n> <div id="menu-toggle" class="mr-4 sm:mr-8" data-astro-cid-pux6a34n> <div class="burger-icon cursor-pointer" data-astro-cid-pux6a34n> <div class="" data-astro-cid-pux6a34n> <a id="hamburger-icon" href="#" class="open-close-btn" aria-label="slotsparadise menu" data-astro-cid-pux6a34n><span data-astro-cid-pux6a34n></span> <span data-astro-cid-pux6a34n></span> <span data-astro-cid-pux6a34n></span> <span data-astro-cid-pux6a34n></span></a> </div> <div id="myNav" class="overlay" data-astro-cid-pux6a34n> <div class="overlay-outer-content" data-astro-cid-pux6a34n> <div class="overlay-content" data-astro-cid-pux6a34n> <ul id="menu-main-menu" class="et-menu nav" data-astro-cid-pux6a34n> <li id="menu-item-1990" class="game-sub-menu dropdown-list" data-astro-cid-pux6a34n> <div class="drop w-full" data-astro-cid-pux6a34n> <div class="flex w-full justify-between items-center" data-astro-cid-pux6a34n> <div class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/all-games-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <span class="block games" data-astro-cid-pux6a34n>Games</span> </div> <div class="dropdown right" data-astro-cid-pux6a34n> <span class="down-caret" data-astro-cid-pux6a34n>${renderComponent($$result, "Icon", $$Icon, { "name": "ep:arrow-right-bold", "data-astro-cid-pux6a34n": true })}</span> </div> </div> </div> <ul class="sub-menu dropdown-menu" data-astro-cid-pux6a34n> <li id="menu-item-478" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/all-games-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/all-games" data-astro-cid-pux6a34n>ALL GAMES</a> </li> <li id="menu-item-480" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/new-game-ico.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/new-games" data-astro-cid-pux6a34n>NEW GAMES</a> </li> <li id="menu-item-1462" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/popular-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/popular-games" data-astro-cid-pux6a34n>POPULAR GAMES</a> </li> <li id="menu-item-481" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/slots-ico.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/slots" data-astro-cid-pux6a34n>SLOTS</a> </li> <li id="menu-item-486" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/jackpots-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/jackpot-games" data-astro-cid-pux6a34n>JACKPOT GAMES</a> </li> <li id="menu-item-483" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/table-games-ico.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/table-games" data-astro-cid-pux6a34n>TABLE GAMES</a> </li> <li id="menu-item-1463" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/live-dealer-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/live-dealer" data-astro-cid-pux6a34n>LIVE DEALER</a> </li> <li id="menu-item-1464" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/poker-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/video-games/" data-astro-cid-pux6a34n>VIDEO POKER</a> </li> <li id="menu-item-487" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/other-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/other-games" data-astro-cid-pux6a34n>OTHER GAMES</a> </li> </ul> </li> <li id="menu-item-1465" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/about-us-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/about-us" data-astro-cid-pux6a34n>ABOUT US</a> </li> <li id="menu-item-1466" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/wallet-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/banking" data-astro-cid-pux6a34n>BANKING</a> </li> <li id="menu-item-1467" class="flex items-center" data-astro-cid-pux6a34n> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/contact-us-ico-purple.svg" alt="games-icon" class="w-12 pr-4" data-astro-cid-pux6a34n> <a href="https://slotsparadise.com/contact-us" data-astro-cid-pux6a34n>CONTACT US</a> </li> </ul> </div> </div> </div> </div> </div> <div class="logo-img relative z-50" data-astro-cid-pux6a34n> <a href="/" data-astro-cid-pux6a34n> <span class="et_pb_image_wrap" data-astro-cid-pux6a34n> <img width="240" height="82" alt="slot paradise logo" title="slot paradise logo" class="" src="https://slotsparadise.com/wp-content/uploads/2022/02/Group-2796.png" data-astro-cid-pux6a34n> </span> </a> </div> </div> <div class="login-join-container flex justify-end items-center w-1/2" data-astro-cid-pux6a34n> <div class="px-2 sm:px-4" data-astro-cid-pux6a34n> <a class="login-btn border-2 hover:border-[#FD106A] px-4 sm:px-10 py-2 sm:py-4 inline-block rounded-full hover:text-[#FD106A] text-[#1C8FDF] border-[#1C8FDF] text-sm sm:text-[22px]" href="https://slotsparadise.com/#login" data-astro-cid-pux6a34n>Login</a> </div> <div class="relative" data-astro-cid-pux6a34n> <a class="join-btn border-2 hover:border-[#FD106A] px-4 sm:px-10 py-2 sm:py-4 inline-block rounded-full hover:bg-[#FD106A] text-[#ffffff] border-[#1C8FDF] bg-[#1C8FDF] text-sm sm:text-[22px]" href="https://slotsparadise.com/#register" data-astro-cid-pux6a34n>Join</a> <!-- Trigger/Open The Modal --> <!-- The Modal --> <div id="myModal" class="modal block absolute" data-astro-cid-pux6a34n> <!-- Modal content --> <div class="modal-content" data-astro-cid-pux6a34n> <div class="modal-header" data-astro-cid-pux6a34n> <span class="close" data-astro-cid-pux6a34n></span> </div> <div class="Menu--users" data-astro-cid-pux6a34n> <ul data-astro-cid-pux6a34n> <li class="pl-name_lastname" id="userLastm" data-astro-cid-pux6a34n></li> <li class="pl-username" id="userFirstm" data-astro-cid-pux6a34n></li> <li class="pl-id" id="userIdm" data-astro-cid-pux6a34n></li> <li data-astro-cid-pux6a34n> <div class="wagerd_balance" data-astro-cid-pux6a34n>
Wagered
<span class="Played--Balane" id="userWageredm" data-astro-cid-pux6a34n></span> </div> <div class="not_wagered_balance" data-astro-cid-pux6a34n>
Not Wagered
<span class="Not--Played--Balance" id="notWageredm" data-astro-cid-pux6a34n></span> </div> <div class="play_balance" data-astro-cid-pux6a34n>
Play Balance
<span class="Play--Balance" id="playBalancem" data-astro-cid-pux6a34n></span> </div> <div class="withdrawable_balance" data-astro-cid-pux6a34n>
Withdrawable
<span class="Withdrawable" id="withBalancem" data-astro-cid-pux6a34n></span> </div> </li> <li class="pl-profile" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=profile" data-astro-cid-pux6a34n><i class="las la-user" data-astro-cid-pux6a34n></i>Profile</a> </li> <li class="pl-wallet" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=wallet" data-astro-cid-pux6a34n><i class="las la-wallet" data-astro-cid-pux6a34n></i>Wallet</a> </li> <li class="pl-deposit" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=deposit" data-astro-cid-pux6a34n><i class="las la-angle-down" data-astro-cid-pux6a34n></i>Deposit</a> </li> <li class="pl-withdraw" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=withdrawal" data-astro-cid-pux6a34n><i class="las la-angle-up" data-astro-cid-pux6a34n></i>Withdraw</a> </li> <li class="pl-messages" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=messages" data-astro-cid-pux6a34n><i class="las la-envelope" data-astro-cid-pux6a34n></i>Messages</a> </li> <li class="pl-history" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=history" data-astro-cid-pux6a34n><i class="las la-history" data-astro-cid-pux6a34n></i>History</a> </li> <li class="pl-promotions" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=profile&r=promotions" data-astro-cid-pux6a34n><i class="las la-rocket" data-astro-cid-pux6a34n></i>Promotions</a> </li> <li class="change_pass" data-astro-cid-pux6a34n> <a href="https://slotsstg.wpengine.com/?h=change-password" data-astro-cid-pux6a34n><i class="las la-key" data-astro-cid-pux6a34n></i>Change Password</a> </li> <li class="sign_out" data-astro-cid-pux6a34n> <a href="/account/logout" data-astro-cid-pux6a34n><i class="las la-sign-out-alt" data-astro-cid-pux6a34n></i>Sign Out</a> </li> </ul> </div> </div> </div> </div> </div>  `;
}, "C:/Astro Latest/astro-theme/src/components/Navigation.astro", void 0);

const $$Astro$4 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="new-nav-header fixed min-w-full bg-white z-50 top-0"> <div class="header-section"> <ul class="promos flex justify-center items-center space-x-6 py-4 border-b-[1px]"> <li class="flex space-x-1"> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/star-ico.svg" alt="star icon"> <a href="https://slotsparadise.com/promotions" class="font-medium text-[#FD106A] text-xl">PROMOTIONS</a> </li> <li class="flex space-x-1"> <img src="https://slotsparadise.com/wp-content/themes/slotsparadise/images/star-ico.svg" alt="star icon"> <a class="font-medium text-[#FD106A] text-xl" href="/the-beach">THE BEACH</a> </li> </ul> <div class="header-row flex justify-between items-center py-8 px-2"> ${renderComponent($$result, "Navigation", $$Navigation, {})} </div> </div> </header>`;
}, "C:/Astro Latest/astro-theme/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`<!-- Scroll to top button -->${maybeRenderHead()}<button class="scroll-top bg-gray-400 rounded-lg cursor-pointer fixed bottom-[125px] text-white transition-all duration-200 ease-in-out h-[50px] w-[50px] z-50" aria-label="move to top" data-astro-cid-sz7xmlte> <div class="arrow up" data-astro-cid-sz7xmlte></div> </button> <footer class="new-footer" data-astro-cid-sz7xmlte> <div class="footer-palm bg-[#a64485]" data-astro-cid-sz7xmlte> <div class="footer-lg" data-astro-cid-sz7xmlte> <ul class="social_media_follow max-w-[300px] mx-auto grid grid-cols-4 grid-gap-2 py-8" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="https://www.facebook.com/Slots-Paradise-Online-Casino-102884869007853" class="icon" title="Follow on Facebook" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": 35, "height": 35, "src": "https://slotspressdev.wpengine.com/wp-content/themes/slotsparadise/images/facebook-f.ico", "alt": "Follow on Facebook", "title": "Follow on Facebook", "data-astro-cid-sz7xmlte": true })} </a> </li><li data-astro-cid-sz7xmlte> <a href="https://twitter.com/SlotsParadiseOC" class="icon" title="Follow on X" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": 35, "height": 35, "src": "https://slotspressdev.wpengine.com/wp-content/themes/slotsparadise/images/twitterx.png", "alt": "Follow on X", "title": "Follow on X", "data-astro-cid-sz7xmlte": true })} </a> </li><li data-astro-cid-sz7xmlte> <a href="https://www.instagram.com/slots_paradise/" class="icon" title="Follow on Instagram" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": 35, "height": 35, "src": "https://slotspressdev.wpengine.com/wp-content/themes/slotsparadise/images/instagram.png", "alt": "Follow on Instagram", "title": "Follow on Instagram", "data-astro-cid-sz7xmlte": true })}</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://www.youtube.com/channel/UC5dR09Mik0u19oz77cDZmsw/about" class="icon" title="Follow on Youtube" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": 35, "height": 35, "src": "https://slotspressdev.wpengine.com/wp-content/themes/slotsparadise/images/youtube.png", "alt": "Follow on Youtube", "title": "Follow on Youtube", "data-astro-cid-sz7xmlte": true })}</a> </li> </ul> <!-- Slider main container --> <div class="carousel-container px-10 py-5 bg-[#7c2c70] swiper swiper3" data-astro-cid-sz7xmlte> <!-- Additional required wrapper --> <div class="swiper-wrapper flex items-center" data-astro-cid-sz7xmlte> <!-- Slides --> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "195", "height": "32", "alt": "zeusplay-icon", "title": "zeusplay-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/zeusplay-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "201", "height": "32", "alt": "allwayspin-icon", "title": "allwayspin-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/allwayspin-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "180", "height": "48", "alt": "apollo-icon", "title": "apollo-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/apollo-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide bet2tech-icon" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "43", "height": "48", "alt": "bet2tech-icon", "title": "bet2tech-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/bet2tech-ico-1.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "107", "height": "32", "alt": "betsoft-icon", "title": "betsoft-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/betsoft-ico-1.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "130", "height": "24", "alt": "bgaming-icon", "title": "bgaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/bgaming-ico-1.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "215", "height": "32", "alt": "blue-whale-icon", "title": "blue-whale-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/blue-whale-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "163", "height": "32", "alt": "bolegaming-icon", "title": "bolegaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/bolegaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "81", "height": "56", "alt": "cool-games-icon", "title": "cool-games-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/cool-games-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "186", "height": "32", "alt": "cyberslot-icon", "title": "cyberslot-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/cyberslot-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "166", "height": "32", "alt": "dragon-gaming-icon", "title": "dragon-gaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/dragon-gaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "123", "height": "32", "alt": "felix-gaming-icon", "title": "felix-gaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/felix-gaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "185", "height": "40", "alt": "fresh-deck-ico", "title": "fresh-deck-ico", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/fresh-deck-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "122", "height": "40", "alt": "funky-games-icon", "title": "funky-games-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/funky-games-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "170", "height": "32", "alt": "funta-gaming-icon", "title": "funta-gaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/funta-gaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "145", "height": "32", "alt": "gamzix-icon", "title": "gamzix-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/gamzix-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "96", "height": "48", "alt": "inbet-icon", "title": "inbet-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/inbet-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "207", "height": "48", "alt": "ka-gaming-icon", "title": "ka-gaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/ka-gaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "168", "height": "32", "alt": "justplay-icon", "title": "justplay-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/justplay-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "97", "height": "32", "alt": "liw-icon", "title": "liw-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/zeusplay-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "86", "height": "48", "alt": "mg-games-icon", "title": "mg-games-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/mg-games-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "144", "height": "32", "alt": "mr-slotty-icon", "title": "mr-slotty-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/mr-slotty-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "180", "height": "48", "alt": "nucleus-icon", "title": "nucleus-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/nucleus-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "128", "height": "32", "alt": "orbital-icon", "title": "orbital-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/orbital-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "128", "height": "32", "alt": "playbro-icon", "title": "playbro-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/playbro-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "109", "height": "48", "alt": "rival-icon", "title": "rival-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/rival-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "134", "height": "48", "alt": "sa-gaming-icon", "title": "sa-gaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/sa-gaming-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "135", "height": "40", "alt": "simpleplay-icon", "title": "simpleplay-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/simpleplay-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "86", "height": "56", "alt": "slot-factory-icon", "title": "slot-factory-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/slot-factory-ico-1.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "179", "height": "32", "alt": "spadegaming-icon", "title": "spadegaming-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/spadegaming-ico-1.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "166", "height": "32", "alt": "superlotto-icon", "title": "superlotto-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/superlotto-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "92", "height": "32", "alt": "spinthon-icon", "title": "spinthon-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/spinthon-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "139", "height": "32", "alt": "super-spade-icon", "title": "super-spade-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/super-spade-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "228", "height": "40", "alt": "thunderspin-icon", "title": "thunderspin-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/thunderspin-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "122", "height": "40", "alt": "triple-profit-games-icon", "title": "triple-profit-games-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/triple-profit-games-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "164", "height": "48", "alt": "turbo-games-icon", "title": "turbo-games-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/turbo-games-ico.png", "data-astro-cid-sz7xmlte": true })} </div> <div class="swiper-slide" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": "128", "height": "40", "alt": "tvbet-icon", "title": "tvbet-icon", "src": "https://slotsstg.wpengine.com//wp-content/uploads/2022/07/tvbet-ico.png", "data-astro-cid-sz7xmlte": true })} </div> </div> <!-- If we need navigation buttons --> <div class="swiper-button-prev" data-astro-cid-sz7xmlte></div> <div class="swiper-button-next" data-astro-cid-sz7xmlte></div> </div> <!--Menu Blocks --> <div class="footer-div bg-[#51135a] py-20" data-astro-cid-sz7xmlte> <div class="max-w-[1140px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 px-4" data-astro-cid-sz7xmlte> <div class="footer_col_1" data-astro-cid-sz7xmlte> <div class="footer_menu_title" data-astro-cid-sz7xmlte> <h4 class="text-[#a64485] md:text-2xl lg:text-3xl font-giloryExtrabold mb-4" data-astro-cid-sz7xmlte>
Casino Games
</h4> </div> <div class="footer-col-menu" data-astro-cid-sz7xmlte> <ul id="menu-casino-games" class="list-none text-white" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/slots" data-astro-cid-sz7xmlte>Slots</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/progressive-slots" data-astro-cid-sz7xmlte>Progressive Slots</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/table-games" data-astro-cid-sz7xmlte>Table Games</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/live-dealer" data-astro-cid-sz7xmlte>Live Dealer</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/video-games" data-astro-cid-sz7xmlte>Video Poker</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/blackjack" data-astro-cid-sz7xmlte>Blackjack</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/jackpot-games" data-astro-cid-sz7xmlte>Jackpot Games</a> </li> </ul> </div> </div> <div class="footer_col_2" data-astro-cid-sz7xmlte> <div class="footer_menu_title" data-astro-cid-sz7xmlte> <h4 class="text-[#a64485] md:text-2xl lg:text-3xl font-giloryExtrabold mb-4" data-astro-cid-sz7xmlte>
Information
</h4> </div> <div class="footer-col-menu" data-astro-cid-sz7xmlte> <ul id="menu-footer-information" class="list-none text-white" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/banking" data-astro-cid-sz7xmlte>Banking</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/faq" data-astro-cid-sz7xmlte>FAQ’s</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/terms-conditions" data-astro-cid-sz7xmlte>Terms and Conditions</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/responsible-gaming" data-astro-cid-sz7xmlte>Responsible Gaming</a> </li> </ul> </div> </div> <div class="footer_col_3" data-astro-cid-sz7xmlte> <div class="footer_menu_title" data-astro-cid-sz7xmlte> <h4 class="text-[#a64485] md:text-2xl lg:text-3xl font-giloryExtrabold mb-4" data-astro-cid-sz7xmlte>
In Paradise
</h4> </div> <div class="footer-col-menu" data-astro-cid-sz7xmlte> <ul id="menu-footer-the-paradise" class="list-none text-white" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/promotions" data-astro-cid-sz7xmlte>Promotions</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/promotions" data-astro-cid-sz7xmlte>Welcome Bonus</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/about-us" data-astro-cid-sz7xmlte>About Us</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="https://slotsparadise.com/contact-us" data-astro-cid-sz7xmlte>Contact Us</a> </li> </ul> </div> </div> <div class="footer_col_4" data-astro-cid-sz7xmlte> <div class="footer_menu_title" data-astro-cid-sz7xmlte> <h4 class="text-[#a64485] md:text-2xl lg:text-3xl font-giloryExtrabold mb-4" data-astro-cid-sz7xmlte>
The Beach
</h4> </div> <div class="footer-col-menu" data-astro-cid-sz7xmlte> <ul id="menu-footer-the-beach" class="list-none text-white" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="/guides/" data-astro-cid-sz7xmlte>Casino Guides</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="/news/" data-astro-cid-sz7xmlte>Casino News</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="/casino-school/" data-astro-cid-sz7xmlte>Casino School</a> </li> <li data-astro-cid-sz7xmlte> <a class="transition-all hover:opacity-[0.7] font-giloryRegular font-semibold pb-2 inline-block" href="/games/" data-astro-cid-sz7xmlte>Game Reviews</a> </li> </ul> </div> </div> </div> </div> <!--Slots Paradise Online Casino Block --> <div class="bg-[#2f0536] text-[#a64485] py-16 font-giloryRegular font-semibold leading-6 text-sm border-b-[10px] border-b-[#51135a] px-4" data-astro-cid-sz7xmlte> <div class="max-w-[1440px] mx-auto text-center" data-astro-cid-sz7xmlte> <div data-astro-cid-sz7xmlte> <h3 class="md:text-xl lg:text-2xl font-giloryExtrabold mb-6" data-astro-cid-sz7xmlte>
Slots Paradise Online Casino
</h3> <p class="mb-5" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Online casino games:</strong>
Slots Paradise casino is committed to offering you a vast selection
              of games including slots, table games, roulette, craps, dice games,
              scratch cards and unparalleled live dealer games, so you can follow
              every move and action of the dealers. Here, you’ll also find dozens
              of fun and fast-paced TV games like no others. We’ve added over 30
              game providers to ensure you a groundbreaking game variety, so you’ll
              never run out of options. Stick around, because every month we keep
              adding new exciting titles you won’t want to miss.
</p> <p class="mb-5" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Join, Play, Win:</strong>
Casino is about relaxing. To make things easy, no download is required
              to access our games. It only takes a few simple steps to create an
              account and start playing lots of high-paying games wherever you are,
              whenever you want. Be a part of the thousands of players.
</p> <p class="mb-5" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Casino bonuses:</strong>
Slots Paradise gives you a head start with its juicy welcome bonuses.
              Plus, you can also benefit from top-up bonuses for every single deposit.
              Give your bankroll a boost and enjoy the games longer while taking
              a chance at taking home large winnings.
</p> <p class="mb-5" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Player rewards:</strong>
We value the time you dedicate to our games and believe that it must
              be rewarded accordingly. At Slots Paradise, players receive freebies
              and other surprises that put them one step ahead.<br data-astro-cid-sz7xmlte><strong data-astro-cid-sz7xmlte>24/7 customer care:</strong>
We aim to give a hassle-free experience to all our players. But if
              something occurs, our support team is ready to help, day and night.
</p> <p class="mb-5" data-astro-cid-sz7xmlte> <strong data-astro-cid-sz7xmlte>Tips:</strong>
Looking to learn some online casino game strategies? Check out “The
              Beach” where you’ll find casino news, tips, strategies and details
              of the casino games you can play for real money.
</p> </div> </div> </div> <!--Cards Block --> <div class="sp-footer-logos bg-[#2f0536] text-center text-white py-16" data-astro-cid-sz7xmlte> <div class="footer-logo mx-auto px-4" data-astro-cid-sz7xmlte> <div class="text-center mb-6" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "width": 650, "height": 56, "class": "inline", "alt": "cards image", "title": "cars image", "src": "https://slotsstg.wpengine.com/wp-content/uploads/2022/02/cards.png", "data-astro-cid-sz7xmlte": true })} <p class="text-sm" data-astro-cid-sz7xmlte>
With our trusted platform, you can rest easy that your account is
              safe and secure.
</p> </div> </div> <!--Copyright block --> <div class="bg-black text-[#a64485] font-giloryRegular text-center pt-8 pb-40 px-4" data-astro-cid-sz7xmlte> <div class="footer-last-block" data-astro-cid-sz7xmlte> <div class="et_pb_text_inner" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>
We invite you to review the Rules &amp; Terms – Privacy Policy –
                Copyright 2023 – All Rights Reserved.
</p> </div> </div> </div> <div id="promo-ft-link" class="fixed bottom-[-100px] flex justify-center text-center z-10 w-full" data-astro-cid-sz7xmlte> <a href="/promotions" aria-label="Promotions link" class="block" data-astro-cid-sz7xmlte> <span class="et_pb_image_wrap" data-astro-cid-sz7xmlte> <img decoding="async" alt="promotions" title="Promotions" src="https://slotsstg.wpengine.com//wp-content/themes/slotsparadise/images/promotions-banner.svg" width="200" height="200" data-astro-cid-sz7xmlte> </span> </a> </div> </div> </div> </div>  </footer> `;
}, "C:/Astro Latest/astro-theme/src/components/Footer.astro", void 0);

async function seoNodeByURI(uri){
    const response = await fetch("https://slotsstg.wpengine.com/graphql", {
        method: 'post', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            query: `query seoUri($uri: String!) {
              nodeByUri(uri: $uri) {
                __typename
                ... on Page {
                  id
                  title
                  uri
                  slug
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    readingTime
                    schema {
                      raw
                    }
                  }
                }
                ... on Post {
                  id
                  uri
                  slug
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    readingTime
                    schema {
                      raw
                    }
                  }
                }
                ... on Category {
                  id
                  name
                  uri
                  slug
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    schema {
                      raw
                    }
                  }
                }
                ... on Tag {
                  id
                  name
                  uri
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    schema {
                      raw
                    }
                  }
                }

                ... on Basepress {
                  id
                  title
                  uri
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    readingTime
                    schema {
                      raw
                    }
                  }
                }
                ... on SectionBasepress {
                  id
                  name
                  uri
                  seo {
                    opengraphSiteName
                    breadcrumbs {
                      text
                      url
                    }
                    opengraphUrl
                    canonical
                    metaDesc
                    title
                    opengraphDescription
                    opengraphPublishedTime
                    opengraphModifiedTime
                    opengraphImage {
                      sourceUrl
                      mimeType
                      author {
                        node {
                          name
                        }
                      }
                    }
                    opengraphType
                    schema {
                      raw
                    }
                  }
                }
              }
            }
          
            `,
            variables: {
                uri: uri
            }
        })
    });
    const{ data } = await response.json();
    return data;
  }

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$SeoTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SeoTags;
  const uri = Astro2.params.uri ? `/${Astro2.params.uri}/` : "/";
  console.log(uri);
  const data = await seoNodeByURI(uri);
  const node = data.nodeByUri && data.nodeByUri.seo ? data.nodeByUri : null;
  const seo = node ? node.seo : null;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<meta name="description"', '><link rel="canonical"', '><meta property="og:locale" content="en_US"><meta property="og:type"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:site_name"', '><meta property="article:published_time"', '><meta property="article:modified_time"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="667"><meta property="og:image:type"', '><meta name="author"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:label1" content="Written by"><meta name="twitter:data1"', '><meta name="twitter:label2" content="Est. reading time"><meta name="twitter:data2"', '><script type="application/ld+json" class="yoast-schema-graph">', "<\/script>"])), addAttribute(seo?.metaDesc, "content"), addAttribute(seo?.canonical, "href"), addAttribute(seo?.opengraphType, "content"), addAttribute(seo?.title, "content"), addAttribute(seo?.opengraphDescription, "content"), addAttribute(seo?.opengraphUrl, "content"), addAttribute(seo?.opengraphSiteName, "content"), addAttribute(seo?.opengraphPublishedTime, "content"), addAttribute(seo?.opengraphModifiedTime, "content"), addAttribute(seo?.opengraphImage?.sourceUrl, "content"), addAttribute(seo?.opengraphImage?.mimeType, "content"), addAttribute(seo?.opengraphImage?.author?.node?.name, "content"), addAttribute(seo?.opengraphImage?.author?.node?.name, "content"), addAttribute(`${seo?.readingTime} minutes`, "content"), unescapeHTML(seo?.schema.raw));
}, "C:/Astro Latest/astro-theme/src/components/SeoTags.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '<link rel="preload" fetchpriority="high" as="image" href="https://slotsparadise.com/wp-content/uploads/2022/08/casino-guides-header-v23.jpg" type="image/jpg"><!-- <link\n      rel="stylesheet"\n      href="https://slotsparadise.com/wp-content/plugins/wp-customer-reviews/css/wp-customer-reviews.css?ver=3.6.8"\n    /> --><link rel="stylesheet" href="https://slotsparadise.com/wp-content/plugins/wp-customer-reviews/css/wp-customer-reviews.css?ver=3.6.8" media="print" onload="this.media=\'all\'"><!-- <link\n      rel="stylesheet"\n      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"\n    /> --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" media="print" onload="this.media=\'all\'"><!-- <link\n      rel="stylesheet"\n      href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"\n    /> --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" media="print" onload="this.media=\'all\'"><!-- <link rel="stylesheet" href="https://slotsstg.wpengine.com/wp-content/themes/slotsparadise/style.css?ver=1701287831"> --><!-- Google Tag Manager --><!-- End Google Tag Manager --><script type="text/javascript">\n      function setAffiliateCookie() {\n        // Drop affiliate tracking cookie\n        const urlParams = new URLSearchParams(window.location.search);\n\n        if (\n          urlParams.has("si") &&\n          urlParams.has("bt") &&\n          urlParams.has("dtag")\n        ) {\n          const cookieValue = encodeURIComponent(\n            `{"bt":"${urlParams.get("bt")}","dtag":"${urlParams.get(\n              "dtag"\n            )}","si":"${urlParams.get("si")}"}`\n          );\n\n          const affCookieValue = `r_i=${cookieValue};max-age=2592000;path=/`;\n          document.cookie = affCookieValue;\n        }\n      }\n\n      document.addEventListener("DOMContentLoaded", function () {\n        setAffiliateCookie();\n      });\n    <\/script>', "</head> <body data-astro-cid-sckkx6r4> ", " ", " ", ' <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js" async><\/script> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSTVXS8" height="0" width="0" style="display:none;visibility:hidden" data-astro-cid-sckkx6r4></iframe></noscript> <!-- End Google Tag Manager (noscript) --> </body></html>'], ['<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '<link rel="preload" fetchpriority="high" as="image" href="https://slotsparadise.com/wp-content/uploads/2022/08/casino-guides-header-v23.jpg" type="image/jpg"><!-- <link\n      rel="stylesheet"\n      href="https://slotsparadise.com/wp-content/plugins/wp-customer-reviews/css/wp-customer-reviews.css?ver=3.6.8"\n    /> --><link rel="stylesheet" href="https://slotsparadise.com/wp-content/plugins/wp-customer-reviews/css/wp-customer-reviews.css?ver=3.6.8" media="print" onload="this.media=\'all\'"><!-- <link\n      rel="stylesheet"\n      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"\n    /> --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" media="print" onload="this.media=\'all\'"><!-- <link\n      rel="stylesheet"\n      href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"\n    /> --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" media="print" onload="this.media=\'all\'"><!-- <link rel="stylesheet" href="https://slotsstg.wpengine.com/wp-content/themes/slotsparadise/style.css?ver=1701287831"> --><!-- Google Tag Manager --><!-- End Google Tag Manager --><script type="text/javascript">\n      function setAffiliateCookie() {\n        // Drop affiliate tracking cookie\n        const urlParams = new URLSearchParams(window.location.search);\n\n        if (\n          urlParams.has("si") &&\n          urlParams.has("bt") &&\n          urlParams.has("dtag")\n        ) {\n          const cookieValue = encodeURIComponent(\n            \\`{"bt":"\\${urlParams.get("bt")}","dtag":"\\${urlParams.get(\n              "dtag"\n            )}","si":"\\${urlParams.get("si")}"}\\`\n          );\n\n          const affCookieValue = \\`r_i=\\${cookieValue};max-age=2592000;path=/\\`;\n          document.cookie = affCookieValue;\n        }\n      }\n\n      document.addEventListener("DOMContentLoaded", function () {\n        setAffiliateCookie();\n      });\n    <\/script>', "</head> <body data-astro-cid-sckkx6r4> ", " ", " ", ' <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js" async><\/script> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSTVXS8" height="0" width="0" style="display:none;visibility:hidden" data-astro-cid-sckkx6r4></iframe></noscript> <!-- End Google Tag Manager (noscript) --> </body></html>'])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "SeoTags", $$SeoTags, { "data-astro-cid-sckkx6r4": true }), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }));
}, "C:/Astro Latest/astro-theme/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 error" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>404 page</h1> ` })}`;
}, "C:/Astro Latest/astro-theme/src/pages/404.astro", void 0);

const $$file = "C:/Astro Latest/astro-theme/src/pages/404.astro";
const $$url = "/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, _404 as _, $$Layout as a, imageConfig as i };

/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, u as unescapeHTML, j as renderSlot, l as defineScriptVars, F as Fragment } from '../astro_8gSSmbI_.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Image, a as $$Layout } from './404_3VIjfSNZ.mjs';
/* empty css                          */

async function wpquery({ query, variables = {} }) {
  const res = await fetch("https://slotsstg.wpengine.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  if (!res.ok) {
    console.log(res);
    return {};
  }
  const { data } = await res.json();
  return data;
}

const $$Astro$o = createAstro();
const $$SidebarArticles = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$SidebarArticles;
  const data = await wpquery({
    query: `
  query CasinoNewsHome {
  posts(where: {categoryId: 9}, first: 4) {
    edges {
      node {
        link
        title
        excerpt
        date
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
  `
  });
  return renderTemplate`${data.posts.edges.slice(1, 4).map((post) => renderTemplate`${maybeRenderHead()}<div class="right_block"><article class=" flex items-center justify-between border-b pb-4"><a class="block w-[40%] h-40 rounded-lg overflow-hidden"${addAttribute(post.node.uri, "href")}>${renderComponent($$result, "Image", $$Image, { "class": "w-full h-40 object-cover shadow-casinoNews", "width": "214", "height": "160", "alt": post.node.title, "title": post.node.title, "src": post.node.featuredImage?.node?.sourceUrl })}</a><div class="w-[55%]"><h3 class="text-[#6A6C6E] font-giloryBold text-xl leading-[1.1]"><a${addAttribute(post.node.uri, "href")}>${post.node.title}</a></h3><div class="line-clamp-3 mt-2"><a class="text-[#2F0536] font-giloryRegular text-base font-semibold"${addAttribute(post.node.uri, "href")}>${unescapeHTML(post.node.excerpt)}</a></div></div></article></div>`)}`;
}, "C:/Astro Latest/astro-theme/src/components/SidebarArticles.astro", void 0);

const $$Astro$n = createAstro();
const $$CasinoSchoolSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$CasinoSchoolSidebar;
  return renderTemplate`${maybeRenderHead()}<div class="menu_container bg-[#eee] h-max rounded-lg p-6 w-full md:w-4/12"> <h3 class="text-[#2f0536] text-[22px]">Choose a Lesson</h3> <div id="shortcode-container"></div> </div> `;
}, "C:/Astro Latest/astro-theme/src/components/CasinoSchoolSidebar.astro", void 0);

/* export async function navQuery(){
  const siteNavQueryRes = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `{
              menus(where: {location: PRIMARY}) {
                nodes {
                  name
                  menuItems {
                      nodes {
                          uri
                          url
                          order
                          label
                      }
                  }
                }
              }
              generalSettings {
                  title
                  url
                  description
              }
          }
          `
      })
  });
  const{ data } = await siteNavQueryRes.json();
  return data;
} */

/* export async function homePagePostsQuery(){
  const response = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `{
            posts(first: 100) {
                nodes {
                  date
                  uri
                  title
                  commentCount
                  excerpt
                  categories {
                    nodes {
                      name
                      uri
                    }
                  }
                  featuredImage {
                    node {
                      srcSet
                      sourceUrl
                      altText
                      mediaDetails {
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
          `
      })
  });
  const{ data } = await response.json();
  return data;
} */



async function GuideSidebar(){
  const response = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `query GuideSidebar {
            sectionsBasepress(first: 100) {
              edges {
                node {
                  name
                  basepress(first: 100) {
                    edges {
                      node {
                        title
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
          `
      })
  });
  const{ data } = await response.json();
  return data;
}




async function CasinoGuidesArticles(){
  const response = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `query CasinoGuidePage {
            sectionsBasepress(first: 100) {
              edges {
                node {
                  name
                  uri
                  basepress(first: 6) {
                    edges {
                      node {
                        title
                        uri
                      }
                      cursor
                    }
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                  }
                  count
                }
              }
            }
          }
          `
      })
  });
  const{ data } = await response.json();
  return data;
}




async function getNodeByURI(uri){
  const response = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `query GetNodeByURI($uri: String!) {
            nodeByUri(uri: $uri) {
              __typename
              isContentNode
              isTermNode
              ... on Post {
                id
                title
                date
                uri
                slug
                excerpt
                content
                categories {
                  nodes {
                    name
                    uri
                  }
                }
                featuredImage {
                  node {
                    srcSet
                    sourceUrl
                    altText
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
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
              ... on Page {
                id
                title
                uri
                slug
                date
                content
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
                slug
                children {
                  edges {
                    node {
                      name
                      posts {
                        edges {
                          node {
                            title
                            uri
                            excerpt
                            featuredImage {
                              node {
                                sourceUrl
                                altText
                              }
                            }
                          }
                        }
                      }
                      seo {
                        breadcrumbs {
                          text
                          url
                        }
                      }
                    }
                  }
                }
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
                slug
                date
                databaseId
                content
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
                slug
                basepress {
                  edges {
                    node {
                      title
                      uri
                    }
                  }
                }
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

async function getAllUris() {
  let uris = [];

  // Initial cursor for pagination
  let postCursor = null;

  do {
    const response = await fetch("https://slotsstg.wpengine.com/graphql", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query GetAllUris($postCursor: String) {
          terms {
            nodes {
              uri
            }
          }
          posts(first: 1000, after: $postCursor) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              uri
            }
          }
          pages(first: 1000) {
            nodes {
              uri
            }
          }
          categories(first: 1000) {
            nodes {
              uri
              slug
            }
          }
          allBasepress(first: 1000) {
            nodes {
              uri
              slug
              sectionsBasepress {
                edges {
                  node {
                    name
                    slug
                    uri
                  }
                }
              }
            }
          }
        }
        `,
        variables: {
          postCursor: postCursor,
        },
      }),
    });

    const { data } = await response.json();

    // Extract post URIs and add them to the uris array
    const postNodes = data.posts.nodes || [];
    uris = uris.concat(
      postNodes
        .map((node) => trimURI(node.uri)) // Extract URIs
        .filter((uri) => uri && uri !== '/') // Filter out empty or invalid URIs
        .map((uri) => ({ params: { uri } }))
    );

    // Extract category URIs and add them to the uris array
    const categoryNodes = data.categories.nodes || [];
    uris = uris.concat(
      categoryNodes
        .map((node) => trimURI(node.uri)) // Extract URIs
        .filter((uri) => uri && uri !== '/') // Filter out empty or invalid URIs
        .map((uri) => ({ params: { uri } }))
    );

    // Extract pages URIs and add them to the uris array
    /* const pageNodes = data.pages.nodes || [];
    uris = uris.concat(pageNodes.map((node) => ({ params: { uri: trimURI(node.uri) } })));  */

    // Extract pages URIs and add them to the uris array
const pageNodes = data.pages.nodes || [];
uris = uris.concat(
  pageNodes
    .map((node) => trimURI(node.uri)) // Extract URIs
    .filter((uri) => uri && uri !== '/') // Filter out empty or invalid URIs
    .map((uri) => ({ params: { uri } }))
);

    // Extract Basepress URIs and add them to the uris array
    const basepressNodes = data.allBasepress.nodes|| [];
    uris = uris.concat(basepressNodes.map((node) => ({ params: { uri: trimURI(node.uri) } })));

    // Extract Basepress Sections URIs and add them to the uris array
    const basepressSectionNodes = basepressNodes.reduce((acc, node) => {
      const sections = node.sectionsBasepress?.edges || [];
      return acc.concat(
        sections.map((section) => ({
          params: { uri: trimURI(section.node.uri), basepressSlug: trimURI(node.slug) },
        }))
      );
    }, []);
    
    // Filter out empty or invalid URIs before adding them to the uris array
    basepressSectionNodes.forEach((node) => {
      if (node.params.uri && node.params.uri !== "/") {
        uris.push(node);
      }
    });

    // Update the cursor for the next page
    postCursor = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
  } while (postCursor);

  return uris;
}


// Function to trim URI
function trimURI(uri) {
  return uri.substring(1, uri.length - 1);
}

const $$Astro$m = createAstro();
const $$CasinoGuideSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$CasinoGuideSidebar;
  const data = await GuideSidebar();
  const items = data.sectionsBasepress.edges;
  return renderTemplate`${maybeRenderHead()}<aside class="bpress-sidebar bpress-float-right menu_container bg-[#eee] h-max rounded-lg p-6 w-full md:w-1/4"> ${items.map((item) => renderTemplate`<div class=""> <details class="group"> <summary class="flex justify-between items-center font-medium cursor-pointer list-none hover:bg-white p-2 rounded"> <span class="bpress-nav-item flex space-x-2"> <i class="fa italic block text-sm">&#xf02d;</i> <span class="bpress-nav-item-title block font-giloryRegular font-semibold"> ${item.node.name} </span> </span> <span class="transition group-open:rotate-180"> <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"> <path d="M6 9l6 6 6-6"></path> </svg> </span> </summary> ${item.node.basepress.edges.length > 0 && renderTemplate`<p class="text-neutral-600 my-2 group-open:animate-fadeIn bg-white p-2 ml-2 "> ${item.node.basepress.edges.map((subitem) => renderTemplate`<a${addAttribute(subitem.node.uri, "href")} class="flex space-x-1 mb-1 hover:bg-[#eee] p-2"> <i class="fa text-gray-400 pr-1 pt-1 block">&#xf059;</i> <span class="bpress-nav-item-title"> ${subitem.node.title} </span> </a>`)} </p>`} </details> </div>`)} </aside>`;
}, "C:/Astro Latest/astro-theme/src/components/CasinoGuideSidebar.astro", void 0);

const $$Astro$l = createAstro();
const $$SearchWidget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$SearchWidget;
  return renderTemplate`${maybeRenderHead()}<div id="search-container" class="text-black"></div> `;
}, "C:/Astro Latest/astro-theme/src/components/SearchWidget.astro", void 0);

const $$Astro$k = createAstro();
const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Archive;
  const { node } = Astro2.props;
  return renderTemplate`<!-- Page to be designed for Archive -->${maybeRenderHead()}<h1>${node.name} - Archive</h1> <!-- { node.children.edges.map(childEdge =>
  childEdge.node.posts.edges.map(post =>{
    return (
        <SingleNewsArticleCard post= {post}></SingleNewsArticleCard >
    )
  }
    
  )
)} -->`;
}, "C:/Astro Latest/astro-theme/src/components/templates/Archive.astro", void 0);

const $$Astro$j = createAstro();
const $$Single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Single;
  const { node } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h1 data-astro-cid-6ejvupo2>${node.title}</h1> <!-- Display categories links if node has terms --> ${node.categories ? node.categories.nodes.map((category) => renderTemplate`<a class="term-link"${addAttribute(category.uri, "href")} data-astro-cid-6ejvupo2>${category.name}</a>`) : null} <!-- Only show date if node is a Post --> ${node.__typename === "Post" ? renderTemplate`<p class="post-details" data-astro-cid-6ejvupo2>
Posted on <time${addAttribute(node.date, "datetime")} data-astro-cid-6ejvupo2>${new Date(node.date).toLocaleDateString()}</time> </p>` : null} <img class="featured-image"${addAttribute(node.featuredImage?.node?.mediaItemUrl, "src")} alt="" data-astro-cid-6ejvupo2> <article data-astro-cid-6ejvupo2>${unescapeHTML(node.content)}</article>  `;
}, "C:/Astro Latest/astro-theme/src/components/templates/Single.astro", void 0);

const $$Astro$i = createAstro();
const $$SingleNewsArticle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$SingleNewsArticle;
  const { node } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="header-background bg-[url('https://slotsparadise.com/wp-content/uploads/2022/08/casino-guides-header-v23.jpg')] bg-cover bg-center h-52 flex items-center text-white font-giloryRegular"> <div class="header-content-row w-[80%] mx-auto"> <div class="page-title"> <h1 class="entry-title text-2xl md:text-3xl font-giloryExtrabold mb-2"> ${node.title} </h1> <div class="post-bread font-semibold"> <div class=""> <p> <span><span><a${addAttribute(node.seo.breadcrumbs[0].url, "href")}>${node.seo.breadcrumbs[0].text}</a></span> &gt; <span><a${addAttribute(node.seo.breadcrumbs[1].url, "href")}>${node.seo.breadcrumbs[1].text}</a></span> &gt; <span class="" aria-current="page"><a${addAttribute(node.seo.breadcrumbs[2].url, "href")}>${node.seo.breadcrumbs[2].text}</a></span></span> &gt; <span class="" aria-current="page"><a href="">${node.seo.breadcrumbs[3].text}</a></span> </p> </div> </div> </div> </div> </div> <!-- Main Page --> <div class="post-content-row max-w-[1440px] mx-auto mt-16"> <div class="casino_news_blocks grid grid-cols-6 gap-12"> <div class="post-content-module col-span-6 md:col-span-4"> <div class="pb-10"> <img class="featured-image rounded-lg overflow-hidden" width="1200" height="667"${addAttribute(node.featuredImage?.node?.sourceUrl, "src")}${addAttribute(node.title, "alt")}${addAttribute(node.title, "title")}> </div> <article class="font-giloryRegular font-semibold">${unescapeHTML(node.content)}</article> </div> <div class="sidebar col-span-6 md:col-span-2 flex flex-col gap-4"> <h2 class="text-[#ff688b] pb-3 font-medium font-giloryExtrabold text-3xl">
Articles
</h2> ${renderComponent($$result, "SidebarArticles", $$SidebarArticles, {})} </div> </div> </div> `;
}, "C:/Astro Latest/astro-theme/src/components/templates/SingleNewsArticle.astro", void 0);

const $$Astro$h = createAstro();
const $$Email = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Email;
  const { url = Astro2.request.url, title, description } = Astro2.props;
  let URL = `mailto:?subject=${title}&body=${description}%0A${url}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-6mwf65d6> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-6mwf65d6><title>Email</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" data-astro-cid-6mwf65d6></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/Email.astro", void 0);

const $$Astro$g = createAstro();
const $$Facebook = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Facebook;
  const { url = Astro2.request.url } = Astro2.props;
  let URL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-nksckkzh> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-nksckkzh><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" data-astro-cid-nksckkzh></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/Facebook.astro", void 0);

const $$Astro$f = createAstro();
const $$HackerNews = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$HackerNews;
  const { url = Astro2.request.url, title } = Astro2.props;
  let URL = `http://news.ycombinator.com/submitlink?u=${url}&t=${title}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-upxiorz7> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-upxiorz7><title>Y Combinator</title><path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" data-astro-cid-upxiorz7></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/HackerNews.astro", void 0);

const $$Astro$e = createAstro();
const $$LinkedIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$LinkedIn;
  const { url = Astro2.request.url } = Astro2.props;
  let URL = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-lja7htzy> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-lja7htzy><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-lja7htzy></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/LinkedIn.astro", void 0);

const $$Astro$d = createAstro();
const $$Reddit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Reddit;
  const { url = Astro2.request.url, title } = Astro2.props;
  const encoded_url = encodeURIComponent(url);
  let URL = `https://www.reddit.com/submit?url=${encoded_url}&title=${title}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-qrrmiaqu> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-qrrmiaqu><title>Reddit</title><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" data-astro-cid-qrrmiaqu></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/Reddit.astro", void 0);

const $$Astro$c = createAstro();
const $$Twitter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Twitter;
  const { url = Astro2.request.url, description, via } = Astro2.props;
  let URL = `https://twitter.com/intent/tweet?url=${url}`;
  if (description)
    URL += `&text=${description}`;
  if (via)
    URL += `&via=${via}`;
  return renderTemplate`${maybeRenderHead()}<a class="social-share-btn" target="_blank"${addAttribute(URL, "href")} rel="noopener noreferrer" data-astro-cid-a232q27d> ${renderSlot($$result, $$slots["default"], renderTemplate`  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-a232q27d><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" data-astro-cid-a232q27d></path></svg> `)} </a>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/Twitter.astro", void 0);

const $$Astro$b = createAstro();
const $$SocialShare$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$SocialShare$1;
  const DEFAULT_COMPONENTS = [$$Twitter, $$Facebook, $$HackerNews, $$LinkedIn, $$Reddit, $$Email];
  const { buttons = DEFAULT_COMPONENTS, url = Astro2.request.url, title, description, via } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="astro-social-share" data-astro-cid-hk2wkwjh> ${buttons.map((Button) => renderTemplate`${renderComponent($$result, "Button", Button, { "url": url, "description": description, "via": via, "title": title, "data-astro-cid-hk2wkwjh": true })}`)} </div>`;
}, "C:/Astro Latest/astro-theme/node_modules/astro-social-share/src/SocialShare.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$Astro$a = createAstro();
const $$SocialShare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$SocialShare;
  const url = Astro2.request.url;
  console.log(url);
  return renderTemplate(_a$3 || (_a$3 = __template$3(["<!--https://github.com/silent1mezzo/astro-social-share -->", " ", ' <div style="margin-top: 5px;"> <span class="tooltip relative inline-block"> <a href="javascript:void(0)" class="copyLink block" aria-label="Copy Link"> <svg class="w-[20px]" width="20" height="20" xmlns="http://www.w3.org/2000/svg"', ' role="img"> <image href="https://slotsstg.wpengine.com/wp-content/themes/slotsparadise/images/link.svg" height="20" width="20" class="cursor-pointer"></image> </svg> </a> <span class="tooltip-text invisible w-[120px] bg-[#000] text-white text-center rounded p-[5px] absolute z-10 bottom-[125%] left-1/2 translate-x-[-50%] opacity-0 transition-opacity duration-[0.6s]">Link copied</span> </span> </div> <script type="text/javascript">\n  document.addEventListener("DOMContentLoaded", function () {\n    let allButtons = document.querySelectorAll(".copyLink");\n    if (allButtons.length > 0) {\n      allButtons.forEach(function (button) {\n        button.addEventListener("click", copyPostLink);\n      });\n    }\n\n    document.querySelectorAll(".social-share-btn").forEach(function (btn) {\n      btn.setAttribute("aria-label", "Share button");\n    });\n  });\n  function copyPostLink(event) {\n    event.preventDefault();\n\n    const url = event.currentTarget.getAttribute("data-url")\n      ? event.currentTarget.getAttribute("data-url")\n      : window.location.href;\n\n    navigator.clipboard\n      .writeText(url)\n      .then(() => {\n        event.target.parentNode.parentNode.parentNode.classList.add("active");\n        setTimeout(() => {\n          event.target.parentNode.parentNode.parentNode.classList.remove(\n            "active"\n          );\n        }, 1500);\n      })\n      .catch((error) => {\n        console.error("Failed to copy URL to clipboard:", error);\n      });\n  }\n<\/script>'])), renderComponent($$result, "FacebookShareButton", $$Facebook, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<svg class="w-[30px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50"> <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path> </svg> ` }), renderComponent($$result, "TwitterShareButton", $$Twitter, {}, { "default": ($$result2) => renderTemplate` <svg class="w-[25px]" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50"> <path d="M5.92 6L20.58 27.38L6.23 44L9.41 44L21.99 29.42L31.99 44L44 44L28.68 21.67L42.2 6L39.03 6L27.28 19.62L17.93 6L5.92 6zM9.72 8L16.88 8L40.2 42L33.04 42L9.72 8z"></path> </svg> ` }), addAttribute(url, "data-url"));
}, "C:/Astro Latest/astro-theme/src/components/SocialShare.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$9 = createAstro();
const $$SingleGameReviewSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$SingleGameReviewSidebar;
  const fullUrl = Astro2.request.url;
  const segments = fullUrl.split("/");
  const slug = segments[segments.length - 2];
  const query = `query GetPostsBySlug($slug: String!) {
  posts(where: { name: $slug }) {
    edges {
      node {
        slug
        blocks {
          ... on CoreShortcodeBlock {
            attributesJSON
            originalContent
          }
        }
      }
    }
  }
}`;
  const variables = {
    slug
  };
  const response = await fetch(`https://slotsstg.wpengine.com/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ query, variables })
  }).then((response2) => response2.json());
  let originalContentValue;
  if (response.data && response.data.posts && response.data.posts.edges && response.data.posts.edges.length > 0 && response.data.posts.edges[0].node.blocks) {
    const firstBlock = response.data.posts.edges[0].node.blocks.find(
      (block) => block.originalContent
    );
    if (firstBlock) {
      originalContentValue = firstBlock.originalContent;
    } else {
      console.error("No block with originalContent found");
    }
  }
  function extractDemoAndPlay(originalContentValue2) {
    try {
      const demoMatch = originalContentValue2.match(/demo="([^"]+)"/);
      const playMatch = originalContentValue2.match(/play="([^"]+)"/);
      if (demoMatch && playMatch) {
        const demoUrl = demoMatch[1];
        const playUrl = playMatch[1];
        return { demo: demoUrl, play: playUrl };
      } else {
        console.error(
          "Could not find demo and play values in originalContentValue"
        );
        return null;
      }
    } catch (error) {
      console.error("Error extracting demo and play values:", error);
      return null;
    }
  }
  const { demo, play } = extractDemoAndPlay(originalContentValue);
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div id="review-container"></div> <div class="rating-col flex gap-2"> <div class="r-col-first bg-[#EFEFEF] w-[33%] block p-2 text-center relative rounded-l-[22px] h-16"> <p>Rating</p> <div class="text-center" id="review_stars"> <img src="https://slotsstg.wpengine.com/wp-content/themes/slotsparadise/images/stars-sprite-0.webp" alt="star rating" class="stars_rating mx-auto"> </div> </div> <div class="r-col-sec bg-[#EFEFEF] w-[33%] block p-2 text-center h-15"> <p>Reviews</p> <span class="rvs_total"><strong id="rev_count">0</strong></span> </div> <div class="r-col-third bg-[#EFEFEF] w-[33%] block p-2 text-center rounded-r-[22px] h-16"> <p>Share</p> <div class="flex items-center justify-center h-5">', '</div> </div> </div> <p> <a class="wid-btn btn-margin"', '>DEMO</a> <a class="wid-btn"', ">PLAY NOW</a> </p> <!--script to get the Quick overview section: Graphics, Features, Gameplay, Value --> <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", function () {\n    const ajaxurl = "https://slotsstg.wpengine.com/wp-admin/admin-ajax.php";\n\n    // Custom parser function to extract attributes\n    function parseOriginalContentValue(originalContent) {\n      const matches = originalContent.match(/(\\w+)="([^"]+)"/g);\n      const attributes = {};\n\n      if (matches) {\n        matches.forEach((match) => {\n          const [key, value] = match.split("=");\n          attributes[key] = value.replace(/"/g, "");\n        });\n      }\n\n      return attributes;\n    }\n\n    try {\n      // Extract attribute values using the custom parser\n      const { graphics, features, gameplay, value } =\n        parseOriginalContentValue(originalContentValue);\n\n      // Make the AJAX request with individual attribute values\n      fetch(ajaxurl, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",\n        },\n        body: `action=display_reviews_sidebar&graphics=${graphics}&features=${features}&gameplay=${gameplay}&value=${value}`,\n      })\n        .then((response) => response.text())\n        .then((data) => {\n          // Set the response as the content of the #review-container\n          document.getElementById("review-container").innerHTML = data;\n        });\n    } catch (error) {\n      // Log the error to the console\n      console.error("Error parsing originalContentValue:", error);\n    }\n  });\n})();<\/script> '], ["", '<div id="review-container"></div> <div class="rating-col flex gap-2"> <div class="r-col-first bg-[#EFEFEF] w-[33%] block p-2 text-center relative rounded-l-[22px] h-16"> <p>Rating</p> <div class="text-center" id="review_stars"> <img src="https://slotsstg.wpengine.com/wp-content/themes/slotsparadise/images/stars-sprite-0.webp" alt="star rating" class="stars_rating mx-auto"> </div> </div> <div class="r-col-sec bg-[#EFEFEF] w-[33%] block p-2 text-center h-15"> <p>Reviews</p> <span class="rvs_total"><strong id="rev_count">0</strong></span> </div> <div class="r-col-third bg-[#EFEFEF] w-[33%] block p-2 text-center rounded-r-[22px] h-16"> <p>Share</p> <div class="flex items-center justify-center h-5">', '</div> </div> </div> <p> <a class="wid-btn btn-margin"', '>DEMO</a> <a class="wid-btn"', ">PLAY NOW</a> </p> <!--script to get the Quick overview section: Graphics, Features, Gameplay, Value --> <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", function () {\n    const ajaxurl = "https://slotsstg.wpengine.com/wp-admin/admin-ajax.php";\n\n    // Custom parser function to extract attributes\n    function parseOriginalContentValue(originalContent) {\n      const matches = originalContent.match(/(\\\\w+)="([^"]+)"/g);\n      const attributes = {};\n\n      if (matches) {\n        matches.forEach((match) => {\n          const [key, value] = match.split("=");\n          attributes[key] = value.replace(/"/g, "");\n        });\n      }\n\n      return attributes;\n    }\n\n    try {\n      // Extract attribute values using the custom parser\n      const { graphics, features, gameplay, value } =\n        parseOriginalContentValue(originalContentValue);\n\n      // Make the AJAX request with individual attribute values\n      fetch(ajaxurl, {\n        method: "POST",\n        headers: {\n          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",\n        },\n        body: \\`action=display_reviews_sidebar&graphics=\\${graphics}&features=\\${features}&gameplay=\\${gameplay}&value=\\${value}\\`,\n      })\n        .then((response) => response.text())\n        .then((data) => {\n          // Set the response as the content of the #review-container\n          document.getElementById("review-container").innerHTML = data;\n        });\n    } catch (error) {\n      // Log the error to the console\n      console.error("Error parsing originalContentValue:", error);\n    }\n  });\n})();<\/script> '])), maybeRenderHead(), renderComponent($$result, "SocialShare", $$SocialShare, {}), addAttribute(demo, "href"), addAttribute(play, "href"), defineScriptVars({ originalContentValue }));
}, "C:/Astro Latest/astro-theme/src/components/SingleGameReviewSidebar.astro", void 0);

const $$Astro$8 = createAstro();
const $$GameInfoShortcode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$GameInfoShortcode;
  const slugs = Astro2.params.uri;
  const parts = slugs.split("/");
  const lastPart = parts[parts.length - 1];
  const query = `query GetPostsBySlug($slug: String) {
  posts(where: {name: $slug}) {
    edges {
      node {
        slug
        blocks {
          ... on CoreShortcodeBlock {
            attributesJSON
            dynamicContent
          }
        }
      }
    }
  }
}`;
  const variables = { slug: lastPart };
  const response = await fetch(
    `https://slotsstg.wpengine.com/graphql`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    }
  ).then((response2) => response2.json());
  const posts = response.data.posts.edges;
  return renderTemplate`${maybeRenderHead()}<div> ${posts.map((post) => renderTemplate`<article> ${post.node.blocks.map((block, index) => {
    if (index === post.node.blocks.length - 1 && block.attributesJSON === "[]") {
      const processedContent = block.dynamicContent.replace(/\[gameinfo\]/g, "").replace(/\[\/gameinfo\]/g, "").replace(/<br \/>/g, "").replace(/<\/?p>/g, "");
      const lines = processedContent.split("\n").filter((line) => line.trim() !== "");
      return renderTemplate`<div class="char-table"> <table class="game-table"> <caption>Characteristics</caption> <tbody> ${lines.map((line) => renderTemplate`<tr> <td>${line}</td> </tr>`)} </tbody> </table> </div>`;
    }
    return null;
  })} </article>`)} </div>`;
}, "C:/Astro Latest/astro-theme/src/components/GameInfoShortcode.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$7 = createAstro();
const $$OtherRelatedGames = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OtherRelatedGames;
  const fullUrl = Astro2.request.url;
  const segments = fullUrl.split("/");
  const slug = segments[segments.length - 3];
  const currentPost = segments[segments.length - 2];
  const data = await wpquery({
    query: `
    query otherRelatedGames($categoryName: String!) {
      posts(
        where: { categoryName: $categoryName, orderby: { order: DESC, field: DATE } }
        first: 6
      ) {
        edges {
          node {
            featuredImage {
              node {
                altText
                title
                sourceUrl
              }
            }
            title
            slug
            uri
          }
        }
      }
    }
  `,
    variables: {
      categoryName: slug
    }
  });
  const postsByCat = data.posts.edges.slice(0, 6);
  const relatedPosts = postsByCat.filter(
    (relPost) => relPost.node.slug !== currentPost
  );
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<!-- <div id="other_related_container"></div>\n\n<script>\n  document.addEventListener("DOMContentLoaded", function () {\n    const ajaxurl = "https://slotsstg.wpengine.com/wp-admin/admin-ajax.php";\n\n    // Make the AJAX request with individual attribute values\n    fetch(ajaxurl, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",\n      },\n      body: "action=other_realted_games",\n    })\n      .then((response) => response.text())\n      .then((data) => {\n        // Set the response as the content of the #review-container\n        document.getElementById("other_related_container").innerHTML = data;\n      });\n  });\n<\/script>\n -->', '<h4 class="text-[#FF93AA] font-giloryExtrabold text-xl">Other Related Games</h4> <div class="other_related_container flex gap-3 flex-col sm:flex-row"> ', " </div>"])), maybeRenderHead(), relatedPosts.map((post) => renderTemplate`<div class=""> <div class=""> <a class="block rounded-lg overflow-hidden"${addAttribute(post.node.uri, "href")}> ${renderComponent($$result, "Image", $$Image, { "class": "w-full object-cover shadow-casinoNews", "width": "155", "height": "86", "alt": post.node.title, "title": post.node.title, "src": post.node.featuredImage?.node?.sourceUrl })} </a> <div class=""> <p class="text-[#2F0536] font-giloryRegular font-semibold"> <a${addAttribute(post.node.uri, "href")}>${post.node.title}</a> </p> </div> </div> </div>`));
}, "C:/Astro Latest/astro-theme/src/components/OtherRelatedGames.astro", void 0);

const $$Astro$6 = createAstro();
const $$SingleGamePage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SingleGamePage;
  const { node } = Astro2.props;
  return renderTemplate`<!-- <div
  class="header-background w-full bg-[url('/images/casino-guide-header.webp')] bg-cover bg-center h-52 flex items-center text-white font-giloryRegular"
>
  <div class="header-content-row w-[80%] mx-auto">
    <div class="page-title">
      <h1 class="entry-title text-2xl md:text-3xl font-giloryExtrabold mb-2">
        {node.title}
      </h1>
    </div>
  </div>
</div> -->${maybeRenderHead()}<figure class="relative flex items-center"> <img src="https://slotsparadise.com/wp-content/uploads/2022/08/casino-guides-header-v23.jpg" alt="header banner" class="w-full"> <figcaption class="entry-title text-2xl md:text-3xl font-giloryExtrabold absolute text-white left-[15%]"> ${node.title} </figcaption> </figure> <!-- Main Page --> <div class="post-content-row max-w-[1440px] mx-auto mt-16"> <div class="casino_news_blocks flex flex-col lg:flex-row gap-14 px-2"> <div class="post-content-module lg:w-[65%] px-2 lg:px-0"> <div class="pb-10"> <img class="featured-image rounded-lg overflow-hidden w-full" width="1200" height="667"${addAttribute(node.featuredImage?.node?.sourceUrl, "src")}${addAttribute(node.title, "alt")}${addAttribute(node.title, "title")}> </div> <div class="post-bread font-semibold"> <div class=""> <p> <span><span><a${addAttribute(node.seo.breadcrumbs[0].url, "href")}>${node.seo.breadcrumbs[0].text}</a></span> &gt; <span><a${addAttribute(node.seo.breadcrumbs[1].url, "href")}>${node.seo.breadcrumbs[1].text}</a></span> &gt; <span class="breadcrumb_last" aria-current="page"><strong>${node.seo.breadcrumbs[2].text}</strong></span></span> </p> </div> </div> <article class="font-giloryRegular font-semibold pl-4 md:pl-0">${unescapeHTML(node.content)}</article> ${renderComponent($$result, "OtherRelatedgames", $$OtherRelatedGames, {})} </div> <div class="sidebar w-full px-2 lg:px-0 lg:w-[35%] flex flex-col mt-5 lg:mt-0"> ${renderComponent($$result, "SingleGameReviewSidebar", $$SingleGameReviewSidebar, {})} <div class="mt-14">${renderComponent($$result, "GameInfoShortcode", $$GameInfoShortcode, {})}</div> <h2 class="text-[#ff688b] pb-3 font-medium font-giloryExtrabold text-3xl mt-10">
Articles
</h2> ${renderComponent($$result, "SidebarArticles", $$SidebarArticles, {})} </div> </div> </div> `;
}, "C:/Astro Latest/astro-theme/src/components/templates/SingleGamePage.astro", void 0);

const $$Astro$5 = createAstro();
const $$NewsPostCategory = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$NewsPostCategory;
  const { href, title, src, alt, excerpt, slug, uri } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="news_post_article flex flex-col md:flex-row gap-8 mb-16"> <a${addAttribute(uri, "href")} class="block w-full md:w-1/4 rounded-lg overflow-hidden shadow-casinoBlock"> ${renderComponent($$result, "Image", $$Image, { "src": src, "alt": alt, "width": 300, "height": 200, "format": "webp", "style": "width: 100%; object-fit: cover;" })}</a> <div class="post-content w-full md:w-3/4"> <div class="post-content-inner"> <h2 class="text-[#ff688b] pb-3 font-medium font-giloryExtrabold text-xl sm:text-2xl"> <a${addAttribute(uri, "href")}> ${title}</a> </h2> <p class="text-[15px]">${unescapeHTML(excerpt)}</p> <a${addAttribute(uri, "href")} class="bg-[#a64485] inline-block text-white text-lg px-8 py-2 rounded-[25px] font-giloryExtrabold font-semibold uppercase hover:bg-[#ff93aa] cursor-pointer transition-all mt-5">Read More</a> </div> </div> </article>`;
}, "C:/Astro Latest/astro-theme/src/components/NewsPostCategory.astro", void 0);

const $$Astro$4 = createAstro();
const $$NewsArchiveCategory = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NewsArchiveCategory;
  const uri = `/${Astro2.params.uri}/`;
  const data = await getNodeByURI(uri);
  const node = data.nodeByUri;
  const slug = node.slug;
  const postsData = await wpquery({
    query: `
      query GetNewsPosts {
        posts(where: { categoryName: "${slug}" }, first: 1000) {
          edges {
            node {
              id
              title
              date
              uri
              slug
              excerpt(format: RENDERED)
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    `
  });
  const allPosts = postsData?.posts?.edges;
  return renderTemplate`${maybeRenderHead()}<div class="news_page_container max-w-[1440px] mx-auto w-[80%] font-giloryRegular font-semibold text-base text-[#666]"> <div> <div> <h1 class="text-3xl sm:text-4xl text-[#ff688b] pb-3 font-medium font-giloryExtrabold">
Casino News
</h1> <p> <span>Our Casino News section is your source for the latest happenings in
          the world of gambling and casinos. Stay informed on new casino
          openings, industry developments, and changes in laws and regulations.
          Discover the latest trends and innovations in the casino industry and
          get insights into winning strategies and tactics. From major
          tournament events to tips for success, Casino News has everything you
          need to stay ahead in the world of online gambling.
</span> </p> <p> <span>Whether you are a seasoned gambler or just starting out, this section
          is your go-to resource for all things related to the casino world.
          Stay informed, and stay ahead of the game, with Casino News.</span> </p> </div> </div> <section class="news_page max-w-[1440px] mx-auto px-4 my-16"> ${allPosts.map((post) => renderTemplate`${renderComponent($$result, "NewsPostCategory", $$NewsPostCategory, { "href": post.node.uri, "title": post.node.title, "body": post.node.excerpt, "src": post.node.featuredImage?.node?.sourceUrl, "alt": post.node.featuredImage?.node?.altText, "excerpt": post.node.excerpt, "slug": post.node.slug, "uri": post.node.uri })}`)} </section> </div>`;
}, "C:/Astro Latest/astro-theme/src/components/templates/NewsArchiveCategory.astro", void 0);

const $$Astro$3 = createAstro();
const $$SingleCasinoSchool = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SingleCasinoSchool;
  const { node } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="main_container"> <div class="header-background bg-[url('https://slotsparadise.com/wp-content/uploads/2022/08/casino-guides-header-v23.jpg')] bg-cover bg-center h-52 flex items-center text-white font-giloryRegular"> <div class="header-content-row w-[80%] mx-auto"> <div class="page-title"> <h1 class="entry-title text-2xl md:text-3xl font-giloryExtrabold mb-2"> ${node.title} </h1> </div> </div> </div> <div class="casino_school_main max-w-[1440px] w-4/5 mx-auto px-2 mt-10 font-giloryRegular"> <!-- <div class="post-bread font-semibold">
            <div class=""><p><span><span><a href="https://slotsparadise.com/the-beach/">Home</a></span> &gt; 
                <span><a href="https://slotsparadise.com/the-beach/news/">Casino School</a></span> &gt;  
                <span class="breadcrumb_last font-giloryExtrabold" aria-current="page"><strong>{node.title}</strong></span></span></p>
            </div>
        </div> --> <div class="post-bread font-semibold"> <div class=""> <p> <span><span><a${addAttribute(node.seo.breadcrumbs[0].url, "href")}>${node.seo.breadcrumbs[0].text}</a></span> &gt; <span><a${addAttribute(node.seo.breadcrumbs[1].url, "href")}>${node.seo.breadcrumbs[1].text}</a></span> &gt; <span class="" aria-current="page"><a${addAttribute(node.seo.breadcrumbs[2].url, "href")}>${node.seo.breadcrumbs[2].text}</a></span></span> &gt; <span class="" aria-current="page"><a href="">${node.seo.breadcrumbs[3].text}</a></span> </p> </div> </div> <div class="casino_single_container mt-10 font-giloryRegular font-semibold"> <div class="inner_container flex flex-col md:flex-row justify-between"> ${renderComponent($$result, "CasinoSchoolSidebar", $$CasinoSchoolSidebar, {})} <div class="content-container w-full md:w-3/5 mt-5 md:mt-0"> <h1 class="text-[#ff688b] font-giloryExtrabold">${node.title}</h1> <article>${unescapeHTML(node.content)}</article> </div> </div> </div> </div> </div>`;
}, "C:/Astro Latest/astro-theme/src/components/templates/SingleCasinoSchool.astro", void 0);

function formatDate(inputDateString) {
    // Create a Date object from the input string
    const dateObject = new Date(inputDateString);
  
    // Define the options for formatting
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    // Format the date using the options
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
  
    // Return the formatted date
    return formattedDate;
  }
  
  // Example usage:
  /* const inputDateString = "2023-08-11T18:12:37";
  const formattedDate = formatDate(inputDateString);
  console.log(formattedDate); // Output: August 11, 2023 */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$SingleKnowledgeBase = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SingleKnowledgeBase;
  const { node } = Astro2.props;
  var postId = node.databaseId;
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", function () {\n    const ajaxurl = "https://slotsstg.wpengine.com/wp-admin/admin-ajax.php";\n    // Make the AJAX request\n    fetch(ajaxurl, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",\n      },\n      body: `action=display_basepress_views&databaseId=${postId}`,\n    })\n      .then((response) => response.json())\n      .then((data) => {\n        //console.log(data); // Log the data received from the server\n        document.getElementById("view-container").innerHTML = data;\n      });\n  });\n})();<\/script>'], ["", " <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", function () {\n    const ajaxurl = "https://slotsstg.wpengine.com/wp-admin/admin-ajax.php";\n    // Make the AJAX request\n    fetch(ajaxurl, {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",\n      },\n      body: \\`action=display_basepress_views&databaseId=\\${postId}\\`,\n    })\n      .then((response) => response.json())\n      .then((data) => {\n        //console.log(data); // Log the data received from the server\n        document.getElementById("view-container").innerHTML = data;\n      });\n  });\n})();<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "casino guide" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="main_container"> <div class="header-background bg-[url('https://slotsparadise.com/wp-content/uploads/2022/07/thebeach-guides.jpg')] bg-cover bg-center py-16 flex items-center text-white font-giloryRegular"> <div class="header-content-row w-[80%] mx-auto"> <div class="page-title text-center"> <h1 class="entry-title text-2xl md:text-3xl font-giloryExtrabold mb-2 text-center">
Online Casino Guides
</h1> ${renderComponent($$result2, "SearchWidget", $$SearchWidget, {})} </div> </div> </div> <div class="casino_school_main max-w-[1200px] w-4/5 mx-auto px-2 mt-10 font-giloryRegular"> <div> <div class="post-bread font-semibold text-[#555]"> <div class=""> <p> <span><span><a${addAttribute(node.seo.breadcrumbs[0].url, "href")}>${node.seo.breadcrumbs[0].text}</a></span> &gt; <span><a${addAttribute(node.seo.breadcrumbs[1].url, "href")}>${node.seo.breadcrumbs[1].text}</a></span> &gt; <span class="" aria-current="page"><a${addAttribute(node.seo.breadcrumbs[2].url, "href")}>${node.seo.breadcrumbs[2].text}</a></span></span> &gt; <span class="" aria-current="page"><a href="">${node.seo.breadcrumbs[3].text}</a></span> </p> </div> </div> <div class="casino_single_container mt-10 font-giloryRegular font-semibold"> <div class="inner_container flex flex-col md:flex-row justify-between"> ${renderComponent($$result2, "CasinoGuideSidebar", $$CasinoGuideSidebar, {})} <div class="content-container w-full md:w-[70%] mt-5 md:mt-0"> <h1 class="text-[#ff688b] font-giloryExtrabold">${node.title}</h1> <div class="bpress-post-meta text-[#777] text-sm mb-4 opacity-70"> <span class="bpress-post-views inline-block mr-4"><span class="bp-eye inline-block mr-1"><i class="fa-solid fa-eye"></i></span><span id="view-container"></span></span> <span class="bpress-post-date inline-block mr-4"><span class="bp-clock inline-block mr-1"><i class="fa-solid fa-clock"></i></span>${formatDate(node.date)}</span> </div> <article>${unescapeHTML(node.content)}</article> </div> </div> </div> </div> </div> </div> ` }), defineScriptVars({ postId }));
}, "C:/Astro Latest/astro-theme/src/components/templates/SingleKnowledgeBase.astro", void 0);

const $$Astro$1 = createAstro();
const $$GuidesSectionArchive = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$GuidesSectionArchive;
  const { node } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="header-background bg-[url('https://slotsparadise.com/wp-content/uploads/2022/07/thebeach-guides.jpg')] bg-cover bg-center py-16 flex items-center text-white font-giloryRegular"> <div class="header-content-row w-[80%] mx-auto"> <div class="page-title text-center"> <h1 class="entry-title text-2xl md:text-3xl font-giloryExtrabold mb-2 text-center">
Online Casino Guides
</h1> ${renderComponent($$result, "SearchWidget", $$SearchWidget, {})} </div> </div> </div> <div class="online_casino_guide font-giloryRegular font-semibold max-w-[1200px] mx-auto md:py-10 px-2"> <div class="post-bread font-semibold text-[#555] mb-10"> <p> <span><span><a${addAttribute(node.seo.breadcrumbs[0].url, "href")}>${node.seo.breadcrumbs[0].text}</a></span> &gt; <span><a${addAttribute(node.seo.breadcrumbs[1].url, "href")}>${node.seo.breadcrumbs[1].text}</a></span> &gt; <span class="" aria-current="page"><a${addAttribute(node.seo.breadcrumbs[2].url, "href")}>${node.seo.breadcrumbs[2].text}</a></span> </span> </p> </div> <div class="inner_container flex flex-col md:flex-row justify-between"> ${renderComponent($$result, "CasinoGuideSidebar", $$CasinoGuideSidebar, {})} <div class="section-container w-full md:w-3/4 pl-0 md:pl-10 pt-4 md:pt-0"> <div class="section_block"> <h1> <i class="fa italic text-xl">&#xf02d;</i> <a class="font-giloryExtrabold text-[#2f0536] text-2xl"${addAttribute(node.uri, "href")}>${node.name}</a> </h1> <div> ${node.basepress.edges.map((item) => renderTemplate`<a${addAttribute(item.node.uri, "href")} class="py-3 font-giloryRegular font-semibold border-b border-dashed leading-3 flex items-start hover:bg-[#ddd]"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <i class="fa text-gray-400 pr-1 block">&#xf059;</i> <h3 class="text-sm m-0">${item.node.title}</h3> ` })} </a>`)} </div> </div> </div> </div> </div>`;
}, "C:/Astro Latest/astro-theme/src/components/templates/GuidesSectionArchive.astro", void 0);

const $$Astro = createAstro();
async function getStaticPaths() {
  return await getAllUris();
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const uri = `/${Astro2.params.uri}/`;
  const data = await getNodeByURI(uri);
  const node = data.nodeByUri;
  function resolveContentTemplate(node2) {
    let template;
    switch (node2.__typename) {
      case "Post":
        if (uri.includes("news")) {
          template = $$SingleNewsArticle;
        } else {
          template = $$SingleGamePage;
        }
        break;
      case "Category":
        if (uri.includes("news")) {
          template = $$NewsArchiveCategory;
        } else {
          template = $$Archive;
        }
        break;
      case "Page":
        if (uri.includes("casino-school")) {
          template = $$SingleCasinoSchool;
        } else {
          template = $$Single;
        }
        break;
      case "Basepress":
        template = $$SingleKnowledgeBase;
        break;
      case "SectionBasepress":
        template = $$GuidesSectionArchive;
        break;
      case "Tag":
        template = $$Archive;
        break;
      default:
        template = $$Single;
    }
    return template;
  }
  const Template = resolveContentTemplate(node);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": node.title || node.name }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Template", Template, { "node": node })} </main> ` })}`;
}, "C:/Astro Latest/astro-theme/src/pages/[...uri].astro", void 0);

const $$file = "C:/Astro Latest/astro-theme/src/pages/[...uri].astro";
const $$url = "/[...uri]";

const ____uri_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$SidebarArticles as $, CasinoGuidesArticles as C, ____uri_ as _, $$CasinoSchoolSidebar as a, $$SearchWidget as b, $$CasinoGuideSidebar as c, wpquery as w };

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


export async function getNodeByURI(uri){
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
              }
              ... on Page {
                id
                title
                uri
                slug
                date
                content
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
                    }
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

export async function getAllUris() {
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
            posts(first: 100, after: $postCursor) {
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
          }
        `,
        variables: {
          postCursor: postCursor,
        },
      }),
    });

    const { data } = await response.json();

    //console.log(data.pages);

    // Extract post URIs and add them to the uris array
    const postNodes = data.posts.nodes || [];
    uris = uris.concat(postNodes.map((node) => ({ params: { uri: trimURI(node.uri) } })));

    // Extract category URIs and add them to the uris array
    const categoryNodes = data.categories.nodes || [];
    uris = uris.concat(categoryNodes.map((node) => ({ params: { uri: trimURI(node.uri) } })));

    // Extract pages URIs and add them to the uris array
     const pageNodes = data.pages.nodes || [];
    uris = uris.concat(pageNodes.map((node) => ({ params: { uri: trimURI(node.uri) } }))); 

    // Update the cursor for the next page
    postCursor = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
  } while (postCursor);

  return uris;
}

// Function to trim URI
function trimURI(uri) {
  return uri.substring(1, uri.length - 1);
}


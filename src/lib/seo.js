export async function seoNodeByURI(uri){
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
                  ... on SectionBasepress {
                    id
                    name
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
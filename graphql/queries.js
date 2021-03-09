export const listLandings = /* GraphQL */ `
   query ListLandings(
      $limit: Int
   ) {
      listLandings(limit: $limit) {
         items {
            id
            title
            uri
         }
      }
   }
`;

export const getLanding = /* GraphQL */`
   query GetLanding($id: ID!) {
      getLanding(id: $id) {
         title
         uri
         id
         bannerKeepAspectRatio
         bannerFullScreenTheme
         bannerFullWidth
         bannerFullScreen
         images {
            items {
               image {
                  path
                  title
                  id
               }
            }
         }
         banners {
            items {
               id
               title
               subTitle
               image {
                  id
                  path
                  title
               }
            }
         }
      }
   }
`;

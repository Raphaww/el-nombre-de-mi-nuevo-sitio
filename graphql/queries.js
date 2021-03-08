export const listLandings = /* GraphQL */ `
   query ListLandings(
      $limit: Int
   ) {
      listLandings(limit: $limit) {
         items {
            id
            name
            uri
         }
      }
   }
`;

export const getLanding = /* GraphQL */`
   query GetLanding($id: ID!) {
      getLanding(id: $id) {
         name
         uri
         id
         bannerKeepAspectRatio
         bannerFullScreenTheme
         bannerFullWidth
         bannerFullScreen
         Banners {
            items {
               id
               title
               subTitle
               BannerImages {
                  items {
                     image {
                        path
                        title
                        id
                     }
                  }
               }
            }
         }
      }
   }
`;

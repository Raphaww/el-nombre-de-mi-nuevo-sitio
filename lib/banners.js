
export async function getAllBannerIds() {
   const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   const banners = await res.json();
   return banners.map(banner => ({
      params: {
         id: banner.id + ''
      }
   }));
}

export async function getAllBanners() {
   const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   const banners = await res.json();
   return banners || [];
}

export async function getBannerData(id) {
   const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   const banners = await res.json();
   const filteredBanners = banners.filter(banner => (banner.id + '') === id);
   if(filteredBanners.length > 0){
      return filteredBanners[0];
   }
   return {};
}
import landings from './mock-landings';
export async function getAllLandingsIds() {
   // const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   // const landings = await res.json();
   return landings.map(banner => ({
      params: {
         id: banner.uri
      }
   }));
}

export async function getAllLandings() {
   // const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   // const landings = await res.json();
   return landings || [];
}

export async function getLandingData(uri) {
   // const res = await fetch('https://api-core.revenatium.com/hotelflamingos/58728b69-0cd2-42a6-8d00-6d00841b9763/banners/web?locale=es-mx');
   // const landings = await res.json();
   const filtered = landings.filter(banner => banner.uri === uri);
   if(filtered.length > 0){
      return filtered[0];
   }
   return {};
}
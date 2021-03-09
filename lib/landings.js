
import API, { graphqlOperation } from '@aws-amplify/api';
import { listLandings, getLanding } from '../graphql/queries.js';


export async function getAllLandingsIds() {
   const { data } = await API.graphql(graphqlOperation(listLandings));
   return data.listLandings.items.map(i => i.id);
}

export async function getAllLandings() {
   const { data } = await API.graphql(graphqlOperation(listLandings));
   return data.listLandings.items;
}

export async function getLandingData(uri) {
   const { data } = await API.graphql(graphqlOperation(getLanding, { id: uri }));
   return data.getLanding;
}
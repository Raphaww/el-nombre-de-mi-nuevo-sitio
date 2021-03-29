
import API, { graphqlOperation } from '@aws-amplify/api';
import { listLandings, getLanding } from '../graphql/queries.js';
import enums from '../constants/enums';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

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
   const { window } = new JSDOM('<!DOCTYPE html>');
   const domPurify = DOMPurify(window);
   const result = Object.assign({}, data.getLanding, {
      widgetType: enums.widgetType.HORIZONTAL,
      components: {
         items: [
            { 
               id: 8,
               type: enums.componentType.ROW,
               children: {
                  items: [
                     {
                        id: 3,
                        size: 7,
                        type: enums.componentType.ROW,
                        children: {
                           items: [
                              {
                                 id: 5,
                                 size: 12,
                                 type: enums.componentType.TEXT,
                                 content: `
                                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing.</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus mattis venenatis. Praesent mattis sit amet nisi in facilisis. Nullam venenatis facilisis quam, non convallis risus eleifend et. Integer non pellentesque dolor, et elementum tortor. Sed orci eros, pulvinar ut posuere et, gravida vel neque</p>
                                    <p>Quisque eget quam quis mi sollicitudin suscipit. Mauris finibus, lorem vel blandit ornare, neque eros auctor eros, et tempor sapien nulla ac nisl. Etiam non metus in diam posuere suscipit. Morbi elementum mauris sit amet scelerisque hendrerit.</p>
                                 `
                              },
                              {
                                 id: 9,
                                 size: 12,
                                 type: enums.componentType.ROW,
                                 title: 'Interdum et malesuada',
                                 children: {
                                    items:[
                                       {
                                          id: 6,
                                          size: 6,
                                          type: enums.componentType.TEXT,
                                          content: `<ul>
                                             <li>Curabitur eget ultrices</li>
                                             <li>Nulla purus neque</li>
                                             <li>Nam tristique</li>
                                             <li>Sed egestas accumsan</li>
                                             <li>Vestibulum</li>
                                             <li>Primis in faucibus orci luctus et ultrices</li>
                                             <li>Curabitur lacus ante</li>
                                          </ul>`
                                       },
                                       {
                                          id: 7,
                                          size: 6,
                                          type: enums.componentType.TEXT,
                                          content: `<ul>
                                             <li>Primis in faucibus orci luctus et ultrices</li>
                                             <li>Vestibulum</li>
                                             <li>Sed egestas accumsan</li>
                                             <li>Curabitur eget ultrices</li>
                                             <li>Nulla purus neque</li>
                                             <li>Nam tristique</li>
                                          </ul>`
                                       }
                                    ]
                                 }
                              }
                           ]
                        }
                     },
                     {
                        id: 4,
                        size: 5,
                        type: enums.componentType.MEDIA,
                        title: 'Eleifend rhoncus',
                        content: `
                           <p>Quisque eget quam quis mi sollicitudin suscipit. Mauris finibus, lorem vel blandit ornare, neque eros auctor eros, et tempor sapien nulla ac nisl.</p>
                           <p>Etiam non metus in diam posuere suscipit. Morbi elementum mauris sit amet scelerisque hendrerit.</p>
                        `,
                        images: {
                           items: [
                              { path: 'hotelflamingos/1/6a0e402a-7-Lindsey-Stirling-Event-2017-3e5764fe49.jpg'}
                           ]
                        },
                        styleOptions: {
                           fixed: true
                        }
                     }
                  ]
               }
            },
            {
               id: 9,
               type: enums.componentType.MEDIA,
               title: 'Lorem ipsum dolor sit amet',
               content: `
                  <p>Vivamus sed viverra turpis. Sed nibh lectus, suscipit vel velit ut, pulvinar faucibus ex. Aenean vel mi nec eros facilisis auctor quis id ligula.</p>
                  <p>Quisque eget quam quis mi sollicitudin suscipit. Mauris finibus, lorem vel blandit ornare, neque eros auctor eros, et tempor sapien nulla ac nisl. Etiam non metus in diam posuere suscipit. Morbi elementum mauris sit amet scelerisque hendrerit.</p>
               `,
               notContained: true,
               images: {
                  items: [
                     { path: 'hotelflamingos/1/6d522c24-f-127323700_881320565939279_8274032387836023119_n-1.jpg' }
                  ]
               },
               styleOptions: {
                  fixed: false,
                  size: 4,
                  order: 0 // 0: image_text, 1: text_image
               }
            },
            {
               id: 10,
               type: enums.componentType.MEDIA,
               title: 'Lorem ipsum dolor sit amet',
               content: `
                  <p>Vivamus sed viverra turpis. Sed nibh lectus, suscipit vel velit ut, pulvinar faucibus ex. Aenean vel mi nec eros facilisis auctor quis id ligula.</p>
               `,
               notContained: true,
               images: {
                  items: [
                     { path: 'hotelflamingos/1/5e46d079-6-En6pOAEXEAETpLi.jpeg' }
                  ]
               },
               styleOptions: {
                  fixed: false,
                  size: 6,
                  order: 1 // 0: image_text, 1: text_image
               }
            },
            {
               id: 11,
               type: enums.componentType.ROW,
               children: {
                  items: [
                     {
                        id: 12,
                        size: 6,
                        type: enums.componentType.VIDEO,
                        videoId: 'VGMrcfpg0h8'
                     }, {
                        id: 13,
                        size: 6,
                        type: enums.componentType.TEXT,
                        title: 'Etiam mollis, lorem nec sodales.',
                        content: `
                           <p>Morbi pharetra et urna sodales vestibulum. Nulla sit amet urna at erat tempus elementum ac convallis erat. Donec non orci in odio rutrum ullamcorper a et quam.
                           Nullam elementum, sapien vitae ultrices rhoncus, nisl sapien consequat libero, vitae aliquam nibh lacus posuere tellus.</p>
                           <p>Ut dictum libero nec metus sollicitudin vulputate. Integer commodo volutpat orci, quis dictum quam bibendum at. Fusce venenatis purus sapien, hendrerit ullamcorper ipsum elementum at.
                           Quisque non maximus nisl, in tristique nisi. Integer viverra et ligula nec iaculis.</p>
                        `
                     }
                  ]
               }
            },
            {
               id: 1,
               type: enums.componentType.GALLERY,
               title: 'Quisque lobortis quam',
               images: {
                  items: [
                     { path: 'hotelflamingos/1/habitacion-ixtul.jpg'},
                     { path: 'hotelflamingos/1/lago-isla-velas.jpg'},
                     { path: 'hotelflamingos/1/124f4735-b-habitacion-estandar-2.jpg'},
                     { path: 'hotelflamingos/1/habitaciones-eventos.jpg'},
                     { path: 'hotelflamingos/1/habitaciones-ixtul.jpg'},
                     { path: 'hotelflamingos/1/lago-isla-velas.jpg'},
                  ]
               }
            }
         ]
      }
   });
   const sanitize = (component) => {
      if(component.content){
         component.content = domPurify.sanitize(component.content);
      }
      if(component.children && component.children.items){
         component.children.items.forEach(sanitize);
      }
      return component;
   }
   if(result.components && result.components.items){
      result.components.items.forEach(sanitize);
   }
   return result;
}
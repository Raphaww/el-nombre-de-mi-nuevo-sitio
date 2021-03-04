// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Theme = {
  "LIGHT": "LIGHT",
  "DARK": "DARK"
};

const { Image, BannerImage, Banner, Landing } = initSchema(schema);

export {
  Image,
  BannerImage,
  Banner,
  Landing,
  Theme
};
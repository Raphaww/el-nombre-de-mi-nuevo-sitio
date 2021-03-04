import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK"
}



export declare class Image {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly banners?: (BannerImage | null)[];
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}

export declare class BannerImage {
  readonly id: string;
  readonly banner: Banner;
  readonly image: Image;
  constructor(init: ModelInit<BannerImage>);
  static copyOf(source: BannerImage, mutator: (draft: MutableModel<BannerImage>) => MutableModel<BannerImage> | void): BannerImage;
}

export declare class Banner {
  readonly id: string;
  readonly title: string;
  readonly subTitle?: string;
  readonly BannerImages?: (BannerImage | null)[];
  readonly landingID?: string;
  constructor(init: ModelInit<Banner>);
  static copyOf(source: Banner, mutator: (draft: MutableModel<Banner>) => MutableModel<Banner> | void): Banner;
}

export declare class Landing {
  readonly id: string;
  readonly name: string;
  readonly Banners?: (Banner | null)[];
  readonly uri: string;
  readonly bannerKeepAspectRatio?: boolean;
  readonly bannerFullScreen?: boolean;
  readonly bannerFullWidth?: boolean;
  readonly bannerFullScreenTheme?: Theme | keyof typeof Theme;
  constructor(init: ModelInit<Landing>);
  static copyOf(source: Landing, mutator: (draft: MutableModel<Landing>) => MutableModel<Landing> | void): Landing;
}
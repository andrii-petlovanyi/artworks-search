export interface IListResponse {
  pagination: IPagination;
  data: Array<IItem>;
}

export interface IItem {
  _score: number;
  thumbnail: IItemThumbnail;
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  description: string;
  timestamp: Date;
  image_id: string;
}

export interface IItemThumbnail {
  alt_text: string;
  width: number;
  lqip: string;
  height: number;
}

export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_pages: number;
}

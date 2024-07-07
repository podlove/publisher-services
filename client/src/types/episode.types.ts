export interface Episode {
  title: string | null;
  uuid: string;
  pub_date: string | null;
  enclosure: {
      url: string | null;
      type: string | null;
  }
}

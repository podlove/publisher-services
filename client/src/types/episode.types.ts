export interface Episode {
  title: string | null;
  guid: string;
  pub_date: string | null;
  enclosure: {
    url: string | null;
    type: string | null;
  };
  chapters?: { start: string; title: string }[];
  content?: string;
  contributors?: { name: string; uri?: string }[];
  subtitle?: string;
  summary?: string;
  duration?: string;
  cover?: string;
  transcript?: {
    language: string;
    rel: string;
    type: string;
    url: string;
  };
  media_file?: {
    content_length: number;
    type: string;
    url: string;
  };
}

export interface EpisodeDetailsPayload {
  episode: {
    chapters: { start: string; title: string }[];
    content: string;
    contributors: { name: string; uri?: string }[];
    guid: string;
    media_file: {
      content_length: number;
      type: string;
      url: string;
    };
    subtitle: string;
    summary: string;
    title: string;
    number: number;
    slug: string;
    type: string;
    explicit: boolean;
    duration: string;
    cover: string;
    pub_date: string;
    transcript: {
      language: string;
      rel: string;
      type: string;
      url: string;
    };
  };
}

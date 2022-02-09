export interface PlexUser {
  id: string;
  thumb: string;
  title: string;
}
export interface PlexPlayerState {
  address: string;
  device: string;
  machineIdentifier: string;
  platform: string;
  platformVersion: string;
  product: string;
  profile: string;
  remotePublicAddress: string;
  state: "paused" | "playing";
  title: string;
  version: string;
  local: boolean;
  relayed: boolean;
  secure: boolean;
  userID: number;
}

export interface PlexState {
  addedAt: number;
  duration: number;
  grandparentGuid: string;
  grandparentKey: string;
  grandparentRatingKey: string;
  grandparentTitle: string;
  guid: string;
  index: number;
  key: string;
  lastRatedAt: string;
  lastViewedAt: number;
  librarySectionID: string;
  librarySectionKey: string;
  librarySectionTitle: string;
  originalTitle: string;
  parentGuid: string;
  parentIndex: number;
  parentKey: string;
  parentRatingKey: string;
  parentThumb: string;
  parentTitle: string;
  parentYear: number;
  ratingKey: string;
  sessionKey: string;
  thumb: string;
  titleSort: string;
  title: string;
  type: string;
  updatedAt: number;
  userRating: string;
  viewCount: number;
  viewOffset: number;
  Media: PlexMedia[];
  User: PlexUser;
  Player: PlexPlayerState;
}
export interface PlexMedia {
  audioChannels: number;
  audioCodec: string;
  bitrate: number;
  container: string;
  duration: number;
  id: string;
  Part: PlexMediaPart[];
}
export interface PlexMediaPart {
  container: string;
  duration: number;
  file: string;
  hasThumbnail: "0" | "1";
  id: string;
  key: string;
  size: number;
  Stream: PlexMediaStream[];
}
export interface PlexMediaStream {
  albumGain: string;
  albumPeak: string;
  albumRange: string;
  audioChannelLayout: string;
  bitrate: number;
  channels: number;
  codec: string;
  displayTitle: string;
  extendedDisplayTitle: string;
  gain: string;
  id: string;
  index: number;
  loudness: string;
  lra: string;
  peak: string;
  samplingRate: number;
  selected: boolean;
  streamType: number;
}

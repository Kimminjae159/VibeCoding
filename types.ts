
export enum Sport {
  SOCCER = '축구',
  BASKETBALL = '농구',
  BADMINTON = '배드민턴',
  TENNIS = '테니스',
  FUTSAL = '풋살'
}

export enum Tier {
  STARTER = '입문',
  BEGINNER = '초보',
  AMATEUR = '아마추어',
  PRO = '선출/프로'
}

export interface Match {
  id: string;
  sport: Sport;
  title: string;
  location: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  tier: Tier;
  price: number;
  isHot?: boolean;
}

export interface Post {
  id: string;
  author: string;
  sport: Sport;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  stadiumInfo?: string;      // 구장 정보 (주차, 샤워실 등)
  playStyles?: string[];     // 플레이 성향 태그
}

export type ViewState = 'HOME' | 'MATCHES' | 'COMMUNITY' | 'MYPAGE';

// Fix: Added PlayerStats interface to resolve import error in ReportView.tsx
export interface PlayerStats {
  name: string;
  tier: Tier;
  feedback: string;
  efficiency: number;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  steals: number;
  turnovers: number;
}

// Fix: Added Highlight interface for use within GameReport
export interface Highlight {
  timestamp: string;
  description: string;
}

// Fix: Added GameReport interface to resolve import error in ReportView.tsx
export interface GameReport {
  id: string;
  videoId: string;
  title: string;
  teamAScore: number;
  teamBScore: number;
  gameSummary: string;
  highlights: Highlight[];
  mvp: string;
  players: PlayerStats[];
}

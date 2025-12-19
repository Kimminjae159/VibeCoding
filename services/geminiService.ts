
import { GoogleGenAI, Type } from "@google/genai";
import { Match, Post, Sport, Tier } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiMatchRecommendations = async (userPreference: string): Promise<Match[]> => {
  const prompt = `
    사용자의 선호도("${userPreference}")를 바탕으로 5개의 가상 스포츠 매치 데이터를 생성해줘.
    JSON 형식으로 응답해:
    - id: 유니크한 문자열
    - sport: 축구, 농구, 배드민턴, 테니스, 풋살 중 하나
    - title: 매력적인 경기 제목
    - location: 서울/경기 지역 구체적인 장소
    - date: 2024-XX-XX 형식
    - time: HH:MM 형식
    - currentPlayers: 현재 참여 인원
    - maxPlayers: 최대 정원
    - tier: 입문, 초보, 아마추어, 선출/프로 중 하나
    - price: 만원 단위 숫자
    - isHot: 불리언
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            sport: { type: Type.STRING },
            title: { type: Type.STRING },
            location: { type: Type.STRING },
            date: { type: Type.STRING },
            time: { type: Type.STRING },
            currentPlayers: { type: Type.NUMBER },
            maxPlayers: { type: Type.NUMBER },
            tier: { type: Type.STRING },
            price: { type: Type.NUMBER },
            isHot: { type: Type.BOOLEAN },
          },
          required: ["id", "sport", "title", "location", "date", "time", "currentPlayers", "maxPlayers", "tier", "price"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

export const getCommunityFeed = async (): Promise<Post[]> => {
  const prompt = `
    스포츠 커뮤니티의 활발한 게시물 5개를 JSON 형식으로 생성해줘. 
    게시물에는 반드시 다음 정보가 포함되어야 해:
    1. stadiumInfo: "주차 가능, 샤워실 완비, 풋살화 대여" 같은 구장 상세 정보
    2. playStyles: "매너 중시", "빡겜", "친목위주", "체력왕", "초보환영" 같은 성향 태그 리스트 (3-4개)
    전체 필드: id, author, sport, content, timestamp, likes, comments, stadiumInfo, playStyles
  `;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            author: { type: Type.STRING },
            sport: { type: Type.STRING },
            content: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            likes: { type: Type.NUMBER },
            comments: { type: Type.NUMBER },
            stadiumInfo: { type: Type.STRING },
            playStyles: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

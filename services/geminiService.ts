
import { GoogleGenAI, Type } from "@google/genai";
import { Match, Post, Sport, Tier, GameReport } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * AI 응답 텍스트에서 순수 JSON 문자열만 추출하는 헬퍼 함수
 */
const extractJson = (text: string) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    return jsonMatch ? jsonMatch[0] : text;
  } catch (e) {
    return text;
  }
};

export const analyzeYoutubeVideo = async (url: string): Promise<GameReport> => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1] || "";
  
  const prompt = `
    다음 유튜브 경기 영상을 분석하여 스카우팅 리포트를 작성해줘: ${url}
    
    분석 내용:
    1. 경기 제목 및 결과
    2. 전체적인 경기 요약 (한글)
    3. 주요 하이라이트 타임라인 (3-4개)
    4. 출전 선수들의 상세 지표 (득점, 리바운드, 어시스트, 블락, 스틸, 실책, 효율성)
    5. 선수별 티어 측정 (입문, 초보, 아마추어, 선출/프로) 및 개별 피드백
    6. 경기 MVP 선정
    
    반드시 순수한 JSON 형식으로만 응답해줘.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          teamAScore: { type: Type.NUMBER },
          teamBScore: { type: Type.NUMBER },
          gameSummary: { type: Type.STRING },
          mvp: { type: Type.STRING },
          highlights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          players: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                tier: { type: Type.STRING },
                points: { type: Type.NUMBER },
                rebounds: { type: Type.NUMBER },
                assists: { type: Type.NUMBER },
                blocks: { type: Type.NUMBER },
                steals: { type: Type.NUMBER },
                turnovers: { type: Type.NUMBER },
                efficiency: { type: Type.NUMBER },
                feedback: { type: Type.STRING }
              }
            }
          }
        },
        required: ["title", "teamAScore", "teamBScore", "gameSummary", "players", "mvp"]
      }
    }
  });

  const data = JSON.parse(extractJson(response.text || "{}"));
  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    videoId
  };
};

export const getAiMatchRecommendations = async (userPreference: string): Promise<Match[]> => {
  const prompt = `
    사용자의 선호도("${userPreference}")를 바탕으로 5개의 가상 스포츠 매치 데이터를 생성해줘.
    한국 지역(강남, 판교, 강북 등) 기반으로 생성해.
    JSON 형식으로 응답해.
  `;

  try {
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

    return JSON.parse(extractJson(response.text || "[]"));
  } catch (e) {
    console.error("Match API Error", e);
    return [];
  }
};

export const getCommunityFeed = async (): Promise<Post[]> => {
  const prompt = `스포츠 커뮤니티의 활발한 게시물 5개를 JSON 형식으로 생성해줘. 한국 아마추어 동호인들이 좋아할만한 주제(구장 정보, 플레이 스타일 등)로 작성해.`;
  
  try {
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

    return JSON.parse(extractJson(response.text || "[]"));
  } catch (e) {
    console.error("Community API Error", e);
    return [];
  }
};

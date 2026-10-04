import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  const responseMap: Record<string, string> = {
    billing: "To update your billing details, navigate to Account Settings > Payment Methods.",
    stream: "For buffering issues, verify network connection speed and restart the OmniServe streaming application.",
    password: "Password reset links are delivered via SMS or primary email within 2 minutes of requesting."
  };

  const matchKey = Object.keys(responseMap).find(k => query.toLowerCase().includes(k));
  const resolution = matchKey 
    ? responseMap[matchKey] 
    : `AI Copilot Analysis: We found 3 relevant KB articles regarding "${query}". If these do not resolve your issue, an agent is ready.`;

  return NextResponse.json({
    deflected: !!matchKey,
    confidenceScore: matchKey ? 0.94 : 0.65,
    resolution
  });
}
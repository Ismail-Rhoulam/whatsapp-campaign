
import { GoogleGenAI } from "@google/genai";
import { CampaignData, KPIResult } from "../types";

export const getCampaignInsights = async (data: CampaignData, kpis: KPIResult) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze this marketing campaign performance:
    
    Funnel:
    - Contacts: ${data.contacts}
    - Sent: ${data.sent}
    - Delivered: ${data.delivered}
    - Read: ${data.read}
    - Clicked: ${data.clicked}
    
    Financials & Engagement:
    - Total Cost: $${kpis.campaignCost}
    - Cost Per Click: $${kpis.costPerClick}
    - Opt-outs: ${kpis.optOut}
    - Interest Shown: ${kpis.showedInterest}
    - Form Submissions: ${kpis.formSubmission}
    
    Please provide:
    1. A summary of overall efficiency.
    2. One key bottleneck in the funnel.
    3. Three specific recommendations for improvement.
    
    Format as clean Markdown with clear headings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate insights at this moment. Please check your campaign data manually.";
  }
};

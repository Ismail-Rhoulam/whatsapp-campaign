
export interface CampaignData {
  contacts: number;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
}

export interface KPIResult {
  campaignCost: number;
  costPerMessage: number;
  costPerClick: number;
  optOut: number;
  showedInterest: number;
  formSubmission: number;
}

export interface FunnelItem {
  name: string;
  value: number;
  fill: string;
  percentage: string;
}

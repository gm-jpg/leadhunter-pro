export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  detectedIssue?: string;
  detectedPraise?: string;
}

export interface ProfileGap {
  badge: string;
  title: string;
  description: string;
  impactOnSales: string;
  intuitiveAutomationSolution: string; // Ex: "Site One-Page conectado ao WhatsApp com cardápio/catálogo que envia pedidos prontos"
}

export interface TailoredSolution {
  pillar: 'Website & Conversão' | 'Automação de WhatsApp' | 'IA & Atendente Virtual' | 'Identidade Visual & SEO';
  deficiencyFound: string;
  solutionTitle: string;
  deliverable: string;
  revenueImpact: string;
}

export interface OpportunityAudit {
  businessDiagnosis: string;
  // Detecção de Gaps no Perfil (mesmo quando não há reclamações nos comentários)
  profileGaps: ProfileGap[];
  customerSentiment: {
    praisedPoints: string[];
    recurringComplaints: string[];
    sentimentSummary: string;
    hasExplicitComplaints: boolean;
  };
  revenueLeaks: {
    description: string;
    estimatedLoss: string;
  };
  tailoredSolutions: TailoredSolution[];
  suggestedFee: string;
  potentialClientRevenue: string;
  objectionHandling: {
    objection: string;
    suggestedAnswer: string;
  }[];
}

export interface VisualConcept {
  headline: string;
  subheadline: string;
  primaryColor: string;
  secondaryColor: string;
  badge: string;
  keyBenefits: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  chatbotSample: {
    customerQuestion: string;
    botReply: string;
  };
  revenueProjection: string;
}

export interface DeveloperPitch {
  leadName: string;
  developerName: string;
  whatsappMessage: string;
  summaryReason: string;
  audit: OpportunityAudit;
  suggestedServices: {
    title: string;
    description: string;
    deliverable: string;
  }[];
  visualConcept: VisualConcept;
}

export type LeadStatus =
  | 'novo'
  | 'oportunidade'
  | 'proposta_pronta'
  | 'contatado'
  | 'negociando'
  | 'fechado'
  | 'arquivado';

export interface ContactHistoryItem {
  id: string;
  phone: string;
  whatsapp: string;
  placeId: string;
  businessName: string;
  city: string;
  state: string;
  category: string;
  contactedAt: string; // ISO String
  formattedDate: string; // Ex: "10/09/2026 10:45"
  status: LeadStatus;
  channel: 'whatsapp' | 'ligacao' | 'outro';
  notes?: string;
  messageSnippet?: string;
}

export interface Lead {
  id: string;
  placeId: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  neighborhood?: string;
  phoneRaw: string;
  whatsapp: string;
  isMobile: boolean;
  googleMapsUrl: string;
  website: string | null;
  hasInstagramOnly?: boolean;
  rating: number;
  userRatingsTotal: number;
  photosCount: number;
  photos: string[];
  reviews: GoogleReview[];
  opportunityScore: number;
  opportunityFactors: string[];
  developerPitch?: DeveloperPitch | null;
  status: LeadStatus;
  sentAt?: string | null;
  createdAt: string;
  notes?: string;
  isContacted?: boolean;
  contactedAt?: string | null;
  contactedRecord?: ContactHistoryItem | null;
}

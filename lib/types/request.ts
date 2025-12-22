export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'escalated' | 'under_review';

export interface Document {
  id: string;
  type: 'kyc' | 'passport' | 'visa';
  url: string;
  uploadedAt: string;
  verified: boolean;
}

export interface AccountInfo {
  accountNumber: string;
  accountHolder: string;
  bankName: string;
  sixMonthAverage: number;
  currentBalance: number;
  monthlyBalances: {
    month: string;
    balance: number;
  }[];
}

export interface Recommendation {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  role: string;
  status: RequestStatus;
  comment?: string;
  timestamp: string;
}

export interface AMLFlag {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  detectedAt: string;
}

export interface TravelCardRequest {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  travelReason: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  status: RequestStatus;
  documents: Document[];
  accountInfo: AccountInfo;
  recommendations: Recommendation[];
  history: HistoryEntry[];
  amlFlags?: AMLFlag[];
  escalatedTo?: string;
  escalatedAt?: string;
  escalationReason?: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}











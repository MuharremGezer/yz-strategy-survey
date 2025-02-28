
export interface SurveyQuestion {
  id: number;
  text: string;
  answer: number | null;
  comment: string;
  checkboxOptions?: string[];
  selectedOptions?: string[];
  type?: 'rating' | 'checkbox';
}

export interface SurveyResponse {
  id?: string;
  company_name: string;
  respondent_name: string;
  respondent_position: string;
  respondent_email: string;
  sector: string;
  industry: string;
  answers: SurveyQuestion[];
  created_at?: string;
}

export interface ScoreResult {
  total: number;
  average: string;
  percentage: string;
}

export interface RatingLabel {
  value: number;
  label: string;
}

// Wizard steps
export enum Step {
  INTRO,
  COMPANY_INFO,
  QUESTIONS,
  RESULTS
}

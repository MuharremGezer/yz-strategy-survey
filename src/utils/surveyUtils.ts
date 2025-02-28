
import { SurveyQuestion, ScoreResult } from "@/types/survey";

export const calculateScore = (questions: SurveyQuestion[], submitted: boolean): ScoreResult => {
  if (submitted) {
    const totalScore = questions.reduce((sum, q) => sum + (q.answer || 0), 0);
    return {
      total: totalScore,
      average: (totalScore / questions.length).toFixed(1),
      percentage: ((totalScore / (questions.length * 6)) * 100).toFixed(0)
    };
  }
  return { total: 0, average: "0.0", percentage: "0" };
};

export const validateEmail = (email: string): { isValid: boolean; errorMessage: string } => {
  // Check if email is provided
  if (!email.trim()) {
    return { 
      isValid: false, 
      errorMessage: "E-posta adresi zorunludur." 
    };
  }

  // Basic email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { 
      isValid: false, 
      errorMessage: "Geçerli bir e-posta adresi giriniz." 
    };
  }

  // Check for common personal email domains
  const personalDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'aol.com', 'yandex.com', 'mail.com', 'protonmail.com', 'zoho.com'];
  const domain = email.split('@')[1].toLowerCase();
  
  if (personalDomains.includes(domain)) {
    return { 
      isValid: false, 
      errorMessage: "Lütfen kurumsal e-posta adresi giriniz (gmail, hotmail, vb. kabul edilmemektedir)." 
    };
  }

  return { isValid: true, errorMessage: "" };
};

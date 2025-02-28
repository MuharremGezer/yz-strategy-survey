import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English and Turkish translations
export const translations = {
  en: {
    // Landing Page
    "landing.title": "AI Readiness & Strategy Survey",
    "landing.welcome": "Welcome to the AI Readiness Assessment",
    "landing.description": "This survey will help you evaluate your organization's AI readiness level and provide insights for your AI strategy.",
    "landing.start_survey": "Start Survey",
    
    // Intro Step
    "survey.title": "AI Readiness & Strategy Survey",
    "survey.subtitle": "AI Readiness Assessment for Companies",
    "survey.description": "This survey will help you assess your company's AI strategy and readiness.",
    "survey.how_to_fill": "How should you fill out this survey?",
    "survey.instruction": "Read the statements below and rate how much they apply to your company, from 1 to 6.",
    "survey.optional_comment": "You can optionally add comments to each question.",
    "survey.start": "Start",
    
    // Rating labels
    "rating.1": "Not applicable at all",
    "rating.2": "Barely applicable",
    "rating.3": "Somewhat applicable",
    "rating.4": "Quite applicable",
    "rating.5": "Very applicable",
    "rating.6": "Completely applicable",
    
    // Company Info Step
    "companyInfo.title": "Company Information",
    "companyInfo.companyName": "Company Name",
    "companyInfo.companyNamePlaceholder": "Enter your company name",
    "companyInfo.sector": "Sector",
    "companyInfo.sectorPlaceholder": "Select a sector",
    "companyInfo.industry": "Industry",
    "companyInfo.industryPlaceholder": "Select an industry",
    "companyInfo.respondentName": "Your Name",
    "companyInfo.respondentNamePlaceholder": "Enter your name",
    "companyInfo.position": "Your Position",
    "companyInfo.positionPlaceholder": "Enter your position in the company",
    "companyInfo.email": "Your Email Address",
    "companyInfo.emailPlaceholder": "Enter your email address",
    "companyInfo.country": "Country",
    "companyInfo.countryPlaceholder": "Select a country",
    "companyInfo.privacyConsent": "I understand that my data will not be shared with any third parties and will only be used for the purpose of this survey.",
    "companyInfo.privacyRequired": "You must agree to the privacy statement to continue.",
    
    // Sector options
    "sector.private": "Private Sector",
    "sector.public": "Public Sector",
    "sector.nonprofit": "Non-profit Organization",
    "sector.academic": "Academic",
    "sector.other": "Other",
    
    // Industry options
    "industry.technology": "Technology",
    "industry.finance": "Finance",
    "industry.healthcare": "Healthcare",
    "industry.education": "Education",
    "industry.manufacturing": "Manufacturing",
    "industry.retail": "Retail",
    "industry.energy": "Energy",
    "industry.transportation": "Transportation",
    "industry.telecom": "Telecommunications",
    "industry.construction": "Construction",
    "industry.agriculture": "Agriculture",
    "industry.other": "Other",
    
    // Country options
    "country.turkey": "Turkey",
    "country.usa": "United States",
    "country.uk": "United Kingdom",
    "country.germany": "Germany",
    "country.france": "France",
    "country.italy": "Italy",
    "country.spain": "Spain",
    "country.netherlands": "Netherlands",
    "country.belgium": "Belgium",
    "country.switzerland": "Switzerland",
    "country.sweden": "Sweden",
    "country.norway": "Norway",
    "country.finland": "Finland",
    "country.denmark": "Denmark",
    "country.greece": "Greece",
    "country.portugal": "Portugal",
    "country.austria": "Austria",
    "country.poland": "Poland",
    "country.other": "Other",
    
    // Navigation
    "nav.back": "Back",
    "nav.next": "Next",
    "nav.submit": "Submit",
    "nav.submitting": "Submitting...",
    
    // Questions Step
    "questions.progress": "Progress",
    "questions.question": "Question",
    "questions.addComment": "Add comment (optional)",
    
    // Results Step
    "results.title": "Survey Results",
    "results.thank_you": "Thank you for completing the survey!",
    "results.your_score": "Your Score",
    "results.out_of": "out of",
    "results.category.beginner": "Beginner",
    "results.category.developing": "Developing",
    "results.category.established": "Established",
    "results.category.advanced": "Advanced",
    "results.category.leading": "Leading",
    "results.start_new": "Start a New Survey",
    "results.section_scores": "Section Scores",
    "results.print": "Print Results",
    
    // Error messages
    "error.required_fields": "Please fill out all required fields",
    "error.invalid_email": "Please enter a valid email address",
    "error.unanswered_questions": "Please answer all questions. {count} questions unanswered.",
    "error.saving_survey": "An error occurred while saving the survey. Please try again.",
    
    // Success messages
    "success.survey_submitted": "Survey Successfully Submitted",
    "success.thank_you": "Thank you for your participation!",
    
    // Language Selection
    "language.select": "Select Language",
    "language.en": "English",
    "language.tr": "Turkish"
  },
  tr: {
    // Landing Page
    "landing.title": "Yapay Zeka Hazırlık & Strateji Anketi",
    "landing.welcome": "Yapay Zeka Hazırlık Değerlendirmesine Hoş Geldiniz",
    "landing.description": "Bu anket, kuruluşunuzun yapay zeka hazırlık seviyesini değerlendirmenize ve yapay zeka stratejiniz için içgörüler sağlamanıza yardımcı olacaktır.",
    "landing.start_survey": "Ankete Başla",
    
    // Intro Step
    "survey.title": "Yapay Zeka Hazırlık & Strateji Anketi",
    "survey.subtitle": "Şirketler İçin Yapay Zeka Hazırlık Değerlendirmesi",
    "survey.description": "Bu anket, şirketinizin yapay zeka stratejisini ve hazırlık durumunu değerlendirmenize yardımcı olacaktır.",
    "survey.how_to_fill": "Anketi nasıl doldurmalısınız?",
    "survey.instruction": "Aşağıdaki ifadeleri okuyun ve şirketiniz için ne ölçüde geçerli olduğunu 1'den 6'ya kadar puanlayın.",
    "survey.optional_comment": "Her soruya isteğe bağlı olarak yorum ekleyebilirsiniz.",
    "survey.start": "Başla",
    
    // Rating labels
    "rating.1": "Hiç geçerli değil",
    "rating.2": "Çok az geçerli",
    "rating.3": "Kısmen geçerli",
    "rating.4": "Oldukça geçerli",
    "rating.5": "Çok geçerli",
    "rating.6": "Tamamen geçerli",
    
    // Company Info Step
    "companyInfo.title": "Şirket Bilgileri",
    "companyInfo.companyName": "Şirket Adı",
    "companyInfo.companyNamePlaceholder": "Şirketinizin adını girin",
    "companyInfo.sector": "Sektör",
    "companyInfo.sectorPlaceholder": "Sektör seçin",
    "companyInfo.industry": "Endüstri",
    "companyInfo.industryPlaceholder": "Endüstri seçin",
    "companyInfo.respondentName": "Adınız",
    "companyInfo.respondentNamePlaceholder": "Adınızı girin",
    "companyInfo.position": "Pozisyonunuz",
    "companyInfo.positionPlaceholder": "Şirketteki pozisyonunuzu girin",
    "companyInfo.email": "E-posta Adresiniz",
    "companyInfo.emailPlaceholder": "E-posta adresinizi girin",
    "companyInfo.country": "Ülke",
    "companyInfo.countryPlaceholder": "Ülke seçin",
    "companyInfo.privacyConsent": "Verilerimin üçüncü taraflarla paylaşılmayacağını ve yalnızca bu anket amacıyla kullanılacağını anlıyorum.",
    "companyInfo.privacyRequired": "Devam etmek için gizlilik beyanını kabul etmelisiniz.",
    
    // Sector options
    "sector.private": "Özel Sektör",
    "sector.public": "Kamu",
    "sector.nonprofit": "Sivil Toplum Kuruluşu",
    "sector.academic": "Akademik",
    "sector.other": "Diğer",
    
    // Industry options
    "industry.technology": "Teknoloji",
    "industry.finance": "Finans",
    "industry.healthcare": "Sağlık",
    "industry.education": "Eğitim",
    "industry.manufacturing": "Üretim",
    "industry.retail": "Perakende",
    "industry.energy": "Enerji",
    "industry.transportation": "Ulaşım",
    "industry.telecom": "Telekomünikasyon",
    "industry.construction": "İnşaat",
    "industry.agriculture": "Tarım",
    "industry.other": "Diğer",
    
    // Country options
    "country.turkey": "Türkiye",
    "country.usa": "Amerika Birleşik Devletleri",
    "country.uk": "Birleşik Krallık",
    "country.germany": "Almanya",
    "country.france": "Fransa",
    "country.italy": "İtalya",
    "country.spain": "İspanya",
    "country.netherlands": "Hollanda",
    "country.belgium": "Belçika",
    "country.switzerland": "İsviçre",
    "country.sweden": "İsveç",
    "country.norway": "Norveç",
    "country.finland": "Finlandiya",
    "country.denmark": "Danimarka",
    "country.greece": "Yunanistan",
    "country.portugal": "Portekiz",
    "country.austria": "Avusturya",
    "country.poland": "Polonya",
    "country.other": "Diğer",
    
    // Navigation
    "nav.back": "Geri",
    "nav.next": "İleri",
    "nav.submit": "Gönder",
    "nav.submitting": "Gönderiliyor...",
    
    // Questions Step
    "questions.progress": "İlerleme",
    "questions.question": "Soru",
    "questions.addComment": "Yorum ekle (isteğe bağlı)",
    
    // Results Step
    "results.title": "Anket Sonuçları",
    "results.thank_you": "Anketi tamamladığınız için teşekkür ederiz!",
    "results.your_score": "Puanınız",
    "results.out_of": "üzerinden",
    "results.category.beginner": "Başlangıç",
    "results.category.developing": "Gelişmekte",
    "results.category.established": "Yerleşik",
    "results.category.advanced": "İleri",
    "results.category.leading": "Lider",
    "results.start_new": "Yeni Anket Başlat",
    "results.section_scores": "Bölüm Puanları",
    "results.print": "Sonuçları Yazdır",
    
    // Error messages
    "error.required_fields": "Lütfen tüm zorunlu alanları doldurun",
    "error.invalid_email": "Lütfen geçerli bir e-posta adresi girin",
    "error.unanswered_questions": "Lütfen tüm soruları yanıtlayın. {count} soru yanıtlanmamış.",
    "error.saving_survey": "Anket kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
    
    // Success messages
    "success.survey_submitted": "Anket Başarıyla Gönderildi",
    "success.thank_you": "Katılımınız için teşekkür ederiz!",
    
    // Language Selection
    "language.select": "Dil Seçin",
    "language.en": "İngilizce",
    "language.tr": "Türkçe"
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

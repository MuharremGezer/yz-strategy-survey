
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building, User, Briefcase, Mail, BarChart2, Factory } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { validateEmail } from "@/utils/surveyUtils";
import EDTLogo from "./EDTLogo";

interface CompanyInfoStepProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  respondentName: string;
  setRespondentName: (name: string) => void;
  respondentPosition: string;
  setRespondentPosition: (position: string) => void;
  respondentEmail: string;
  setRespondentEmail: (email: string) => void;
  emailError: string;
  setEmailError: (error: string) => void;
  sector: string;
  setSector: (sector: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Define sector and industry options
const sectors = [
  "Özel Sektör",
  "Kamu",
  "STK/Vakıf",
  "Diğer"
];

const industries = [
  "Bilişim Teknolojileri",
  "Üretim",
  "Finans",
  "Sağlık",
  "Eğitim",
  "Perakende",
  "Enerji",
  "İnşaat",
  "Lojistik",
  "Turizm",
  "Tarım",
  "Telekom",
  "Medya",
  "Diğer"
];

const CompanyInfoStep: React.FC<CompanyInfoStepProps> = ({
  companyName,
  setCompanyName,
  respondentName,
  setRespondentName,
  respondentPosition,
  setRespondentPosition,
  respondentEmail,
  setRespondentEmail,
  emailError,
  setEmailError,
  sector,
  setSector,
  industry,
  setIndustry,
  onNext,
  onPrevious
}) => {
  
  const handleNext = () => {
    // Validate company name
    if (!companyName.trim()) {
      toast({
        title: "Uyarı",
        description: "Lütfen şirket adını giriniz.",
        variant: "destructive",
      });
      return;
    }

    // Validate sector
    if (!sector) {
      toast({
        title: "Uyarı",
        description: "Lütfen sektör seçiniz.",
        variant: "destructive",
      });
      return;
    }

    // Validate industry
    if (!industry) {
      toast({
        title: "Uyarı",
        description: "Lütfen endüstri seçiniz.",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const emailValidation = validateEmail(respondentEmail);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.errorMessage);
      toast({
        title: "Uyarı",
        description: emailValidation.errorMessage,
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  return (
    <div className="page-background flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
          <CardTitle className="text-2xl font-light tracking-tight">Şirket Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="p-8 card-gradient">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-full">
                <Building className="w-10 h-10" />
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket Adı <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Şirketinizin adını girin"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                    Sektör <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BarChart2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="sector"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                      required
                    >
                      <option value="">Sektör seçiniz</option>
                      {sectors.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Endüstri <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Factory className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                      required
                    >
                      <option value="">Endüstri seçiniz</option>
                      {industries.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="respondentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="respondentEmail"
                    type="email"
                    value={respondentEmail}
                    onChange={(e) => {
                      setRespondentEmail(e.target.value);
                      if (emailError) {
                        const validation = validateEmail(e.target.value);
                        setEmailError(validation.errorMessage);
                      }
                    }}
                    className={`w-full pl-10 px-4 py-3 border ${
                      emailError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md focus:outline-none focus:ring-2 transition-colors`}
                    placeholder="Kurumsal e-posta adresinizi girin"
                    required
                  />
                </div>
                {emailError && (
                  <p className="mt-1.5 text-sm text-red-600">{emailError}</p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">
                  Lütfen gmail, hotmail vb. kişisel e-posta adresleri kullanmayın.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="respondentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Yanıtlayan Kişi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="respondentName"
                      type="text"
                      value={respondentName}
                      onChange={(e) => setRespondentName(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="respondentPosition" className="block text-sm font-medium text-gray-700 mb-1">
                    Pozisyon
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="respondentPosition"
                      type="text"
                      value={respondentPosition}
                      onChange={(e) => setRespondentPosition(e.target.value)}
                      className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Şirketteki pozisyonunuz"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-8 py-6 bg-gray-50 flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            size="lg"
            className="border-gray-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-blue-700 hover:bg-blue-800 text-white"
            size="lg"
          >
            İleri
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyInfoStep;

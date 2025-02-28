
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateEmail } from "@/utils/surveyUtils";
import EDTLogo from "./EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";

interface CompanyInfoStepProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  respondentName: string;
  setRespondentName: (value: string) => void;
  respondentPosition: string;
  setRespondentPosition: (value: string) => void;
  respondentEmail: string;
  setRespondentEmail: (value: string) => void;
  emailError: string;
  setEmailError: (value: string) => void;
  sector: string;
  setSector: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CompanyInfoStep = ({
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
  onPrevious,
}: CompanyInfoStepProps) => {
  const [formValid, setFormValid] = useState(false);
  const { t } = useLanguage();

  // Define sector options with translations
  const sectorOptions = [
    { value: "private", label: t("sector.private") },
    { value: "public", label: t("sector.public") },
    { value: "nonprofit", label: t("sector.nonprofit") },
    { value: "academic", label: t("sector.academic") },
    { value: "other", label: t("sector.other") },
  ];

  // Define industry options with translations
  const industryOptions = [
    { value: "technology", label: t("industry.technology") },
    { value: "finance", label: t("industry.finance") },
    { value: "healthcare", label: t("industry.healthcare") },
    { value: "education", label: t("industry.education") },
    { value: "manufacturing", label: t("industry.manufacturing") },
    { value: "retail", label: t("industry.retail") },
    { value: "energy", label: t("industry.energy") },
    { value: "transportation", label: t("industry.transportation") },
    { value: "telecom", label: t("industry.telecom") },
    { value: "construction", label: t("industry.construction") },
    { value: "agriculture", label: t("industry.agriculture") },
    { value: "other", label: t("industry.other") },
  ];

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
      companyName.trim() !== "" && 
      respondentName.trim() !== "" && 
      respondentPosition.trim() !== "" && 
      respondentEmail.trim() !== "" && 
      emailError === "" &&
      sector !== "" &&
      industry !== "";
    
    setFormValid(isValid);
  }, [companyName, respondentName, respondentPosition, respondentEmail, emailError, sector, industry]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRespondentEmail(value);
    
    if (value) {
      const validationResult = validateEmail(value);
      if (!validationResult.isValid) {
        setEmailError(validationResult.errorMessage);
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handleNext = () => {
    if (formValid) {
      onNext();
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="flex justify-center mb-6">
        <EDTLogo />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            {t("companyInfo.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">{t("companyInfo.companyName")} *</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t("companyInfo.companyNamePlaceholder")}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">{t("companyInfo.sector")} *</Label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder={t("companyInfo.sectorPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {sectorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">{t("companyInfo.industry")} *</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder={t("companyInfo.industryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {industryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentName">{t("companyInfo.respondentName")} *</Label>
            <Input
              id="respondentName"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)}
              placeholder={t("companyInfo.respondentNamePlaceholder")}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentPosition">{t("companyInfo.position")} *</Label>
            <Input
              id="respondentPosition"
              value={respondentPosition}
              onChange={(e) => setRespondentPosition(e.target.value)}
              placeholder={t("companyInfo.positionPlaceholder")}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentEmail">{t("companyInfo.email")} *</Label>
            <Input
              id="respondentEmail"
              type="email"
              value={respondentEmail}
              onChange={handleEmailChange}
              placeholder={t("companyInfo.emailPlaceholder")}
              required
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onPrevious}
          >
            {t("nav.back")}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!formValid}
          >
            {t("nav.next")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyInfoStep;

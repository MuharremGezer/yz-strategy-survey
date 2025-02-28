import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  country: string;
  setCountry: (value: string) => void;
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
  country,
  setCountry,
  onNext,
  onPrevious,
}: CompanyInfoStepProps) => {
  const [formValid, setFormValid] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const { t } = useLanguage();

  const sectorOptions = [
    { value: "private", label: t("sector.private") },
    { value: "public", label: t("sector.public") },
    { value: "nonprofit", label: t("sector.nonprofit") },
    { value: "academic", label: t("sector.academic") },
    { value: "other", label: t("sector.other") },
  ];

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

  const countryOptions = [
    { value: "turkey", label: t("country.turkey") },
    { value: "usa", label: t("country.usa") },
    { value: "uk", label: t("country.uk") },
    { value: "germany", label: t("country.germany") },
    { value: "france", label: t("country.france") },
    { value: "italy", label: t("country.italy") },
    { value: "spain", label: t("country.spain") },
    { value: "netherlands", label: t("country.netherlands") },
    { value: "belgium", label: t("country.belgium") },
    { value: "switzerland", label: t("country.switzerland") },
    { value: "sweden", label: t("country.sweden") },
    { value: "norway", label: t("country.norway") },
    { value: "finland", label: t("country.finland") },
    { value: "denmark", label: t("country.denmark") },
    { value: "greece", label: t("country.greece") },
    { value: "portugal", label: t("country.portugal") },
    { value: "austria", label: t("country.austria") },
    { value: "poland", label: t("country.poland") },
    { value: "other", label: t("country.other") },
  ];

  useEffect(() => {
    const isValid = 
      companyName.trim() !== "" && 
      respondentName.trim() !== "" && 
      respondentPosition.trim() !== "" && 
      respondentEmail.trim() !== "" && 
      emailError === "" &&
      sector !== "" &&
      industry !== "" &&
      country !== "" &&
      privacyConsent;
    
    setFormValid(isValid);
  }, [companyName, respondentName, respondentPosition, respondentEmail, emailError, sector, industry, country, privacyConsent]);

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
    if (!privacyConsent) {
      setPrivacyError(t("companyInfo.privacyRequired"));
      return;
    }
    
    if (formValid) {
      onNext();
    }
  };

  const handlePrivacyChange = (checked: boolean) => {
    setPrivacyConsent(checked);
    if (checked) {
      setPrivacyError("");
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
            <Label htmlFor="country">{t("companyInfo.country")} *</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder={t("companyInfo.countryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <div className="flex items-start space-x-2 mt-4 pt-2 border-t border-gray-200">
            <Checkbox 
              id="privacyConsent" 
              checked={privacyConsent}
              onCheckedChange={handlePrivacyChange}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="privacyConsent" 
                className="font-normal text-sm text-gray-700"
              >
                {t("companyInfo.privacyConsent")} *
              </Label>
              {privacyError && <p className="text-red-500 text-sm">{privacyError}</p>}
            </div>
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

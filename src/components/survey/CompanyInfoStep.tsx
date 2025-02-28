
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isValidEmail } from "@/utils/surveyUtils";
import EDTLogo from "./EDTLogo";

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

// Define sector options
const sectorOptions = [
  { value: "private", label: "Özel Sektör" },
  { value: "public", label: "Kamu" },
  { value: "nonprofit", label: "Sivil Toplum Kuruluşu" },
  { value: "academic", label: "Akademik" },
  { value: "other", label: "Diğer" },
];

// Define industry options
const industryOptions = [
  { value: "technology", label: "Teknoloji" },
  { value: "finance", label: "Finans" },
  { value: "healthcare", label: "Sağlık" },
  { value: "education", label: "Eğitim" },
  { value: "manufacturing", label: "Üretim" },
  { value: "retail", label: "Perakende" },
  { value: "energy", label: "Enerji" },
  { value: "transportation", label: "Ulaşım" },
  { value: "telecom", label: "Telekomünikasyon" },
  { value: "construction", label: "İnşaat" },
  { value: "agriculture", label: "Tarım" },
  { value: "other", label: "Diğer" },
];

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
    
    if (value && !isValidEmail(value)) {
      setEmailError("Lütfen geçerli bir e-posta adresi girin.");
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
      <EDTLogo className="mb-6 mx-auto" />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl">
            Şirket Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Şirket Adı *</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Şirketinizin adını girin"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Sektör *</Label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Sektör seçin" />
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
              <Label htmlFor="industry">Endüstri *</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Endüstri seçin" />
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
            <Label htmlFor="respondentName">Adınız *</Label>
            <Input
              id="respondentName"
              value={respondentName}
              onChange={(e) => setRespondentName(e.target.value)}
              placeholder="Adınızı girin"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentPosition">Pozisyonunuz *</Label>
            <Input
              id="respondentPosition"
              value={respondentPosition}
              onChange={(e) => setRespondentPosition(e.target.value)}
              placeholder="Şirketteki pozisyonunuzu girin"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="respondentEmail">E-posta Adresiniz *</Label>
            <Input
              id="respondentEmail"
              type="email"
              value={respondentEmail}
              onChange={handleEmailChange}
              placeholder="E-posta adresinizi girin"
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
            Geri
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!formValid}
          >
            İleri
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyInfoStep;

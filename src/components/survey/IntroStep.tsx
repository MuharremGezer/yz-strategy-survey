
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ratingLabels } from "@/data/ratingLabels";
import EDTLogo from "./EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";

interface IntroStepProps {
  onNext: () => void;
}

const IntroStep: React.FC<IntroStepProps> = ({ onNext }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="page-background flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
          <CardTitle className="text-2xl font-light tracking-tight">{t("survey.title")}</CardTitle>
          
          <div className="mt-4 flex justify-center space-x-4">
            <Button 
              variant={language === 'tr' ? "default" : "outline"} 
              size="sm"
              onClick={() => setLanguage('tr')}
              className="font-medium text-sm min-w-[80px] bg-opacity-90 hover:bg-opacity-100"
            >
              {t("language.tr")}
            </Button>
            <Button 
              variant={language === 'en' ? "default" : "outline"} 
              size="sm"
              onClick={() => setLanguage('en')}
              className="font-medium text-sm min-w-[80px] bg-opacity-90 hover:bg-opacity-100"
            >
              {t("language.en")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8 card-gradient">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">{t("survey.subtitle")}</h3>
              <p className="text-gray-600">
                {t("survey.description")}
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-3">{t("survey.how_to_fill")}</h4>
              <p className="text-gray-700 mb-4">
                {t("survey.instruction")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {ratingLabels.map((item) => (
                  <div key={item.value} className="flex items-center bg-white p-2 rounded-md text-sm shadow-sm">
                    <span className="font-semibold text-blue-700 mr-2">{item.value}</span>
                    <span className="text-gray-700">{t(`rating.${item.value}`)}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mt-4">
                {t("survey.optional_comment")}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-8 py-6 bg-gray-50 flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-blue-700 hover:bg-blue-800 text-white"
            size="lg"
          >
            <span className="flex items-center">
              {t("survey.start")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntroStep;

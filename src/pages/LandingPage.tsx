
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EDTLogo from "@/components/survey/EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="page-background min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">
              {t("landing.title")}
            </h2>
            <p className="text-sm mt-1 opacity-80">
              {language === 'tr' ? "AI Readiness & Strategy Survey" : "Yapay Zeka Hazırlık & Strateji Anketi"}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 card-gradient">
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-center text-gray-700">
              {t("landing.description")}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="px-8 py-6 bg-gray-50 flex justify-center">
          <Link to="/survey">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              size="lg"
            >
              <span className="flex items-center">
                {t("landing.start_survey")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;

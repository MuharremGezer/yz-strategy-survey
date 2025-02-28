
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EDTLogo from "@/components/survey/EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="page-background min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
        </CardHeader>
        
        <CardContent className="p-8 card-gradient">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center mb-4 w-full">
              <h3 className="font-medium text-lg text-blue-800 mb-6">
                {t("language.select")}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button 
                  variant={language === 'tr' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('tr')}
                  className="font-medium h-20 text-lg w-full bg-opacity-90 hover:bg-opacity-100"
                >
                  {t("language.tr")}
                </Button>
                <Button 
                  variant={language === 'en' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('en')}
                  className="font-medium h-20 text-lg w-full bg-opacity-90 hover:bg-opacity-100"
                >
                  {t("language.en")}
                </Button>
              </div>
            </div>
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

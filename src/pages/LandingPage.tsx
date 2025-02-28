
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import EDTLogo from "@/components/survey/EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="page-background min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
          <CardTitle className="text-2xl font-light tracking-tight mt-4">
            {t("landing.title")}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 card-gradient">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-4">
                {t("landing.welcome")}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                {t("landing.description")}
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center justify-center mb-4">
                <Globe className="text-blue-700 mr-2 h-5 w-5" />
                <h3 className="font-medium text-blue-800">
                  {t("language.select")}
                </h3>
              </div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <Button 
                  variant={language === 'tr' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('tr')}
                  className="font-medium min-w-[120px] bg-opacity-90 hover:bg-opacity-100"
                >
                  {t("language.tr")}
                </Button>
                <Button 
                  variant={language === 'en' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('en')}
                  className="font-medium min-w-[120px] bg-opacity-90 hover:bg-opacity-100"
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

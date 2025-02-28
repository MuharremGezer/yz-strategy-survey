
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="page-background min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <div className="flex justify-center my-4">
            <img 
              src="/lovable-uploads/fd0e2ddd-4264-4d0d-813b-8b5c24eda938.png" 
              alt="EDT Center Logo" 
              className="w-auto h-auto shadow-sm rounded"
              style={{ 
                backgroundColor: 'transparent',
                maxWidth: '400px',
                minHeight: '100px'
              }}
            />
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold">
              {t("landing.title")}
            </h2>
            <p className="text-lg mt-2 opacity-80">
              {language === 'tr' ? "AI Readiness & Strategy Survey" : "Yapay Zeka Hazırlık & Strateji Anketi"}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-10 card-gradient">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center mb-4 w-full">
              <h3 className="font-medium text-xl text-blue-800 mb-8">
                {t("language.select")} / Select Language
              </h3>
              
              <div className="grid grid-cols-2 gap-6 w-full">
                <Button 
                  variant={language === 'tr' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('tr')}
                  className="font-medium h-24 text-xl w-full bg-opacity-90 hover:bg-opacity-100 relative"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center mb-2">
                      <img 
                        src="https://flagcdn.com/w40/tr.png" 
                        alt="Turkish flag" 
                        className="h-5 w-8 mr-2 object-cover rounded-sm" 
                      />
                      <span>Türkçe</span>
                    </div>
                    <span className="text-sm opacity-70">Turkish</span>
                  </div>
                </Button>
                <Button 
                  variant={language === 'en' ? "default" : "outline"} 
                  size="lg"
                  onClick={() => setLanguage('en')}
                  className="font-medium h-24 text-xl w-full bg-opacity-90 hover:bg-opacity-100 relative"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center mb-2">
                      <img 
                        src="https://flagcdn.com/w40/gb.png" 
                        alt="British flag" 
                        className="h-5 w-8 mr-2 object-cover rounded-sm" 
                      />
                      <span>English</span>
                    </div>
                    <span className="text-sm opacity-70">İngilizce</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-8 py-8 bg-gray-50 flex justify-center">
          <Link to="/survey">
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white"
              size="lg"
            >
              <span className="flex items-center text-lg px-4 py-2">
                {t("landing.start_survey")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurveyQuestion, ScoreResult } from "@/types/survey";
import { ratingLabels } from "@/data/ratingLabels";
import { CheckCircle } from "lucide-react";
import EDTLogo from "./EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsStepProps {
  questions: SurveyQuestion[];
  score: ScoreResult;
  onStartNewSurvey: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ questions, score, onStartNewSurvey }) => {
  const { t } = useLanguage();
  
  const renderQuestionAnswer = (question: SurveyQuestion) => {
    if (question.type === 'checkbox' && question.selectedOptions && question.selectedOptions.length > 0) {
      return (
        <div className="pl-11">
          <div className="mb-2 font-semibold text-blue-700">
            {t("results.selected_options")}:
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {question.selectedOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          {question.comment && (
            <div className="mt-2 text-gray-600 italic bg-gray-50 p-3 rounded border border-gray-100">
              "{question.comment}"
            </div>
          )}
        </div>
      );
    } else if (question.type === 'rating') {
      return (
        <div className="pl-11">
          <div className="flex items-center">
            <span className="font-semibold text-blue-700 text-lg mr-2">
              {question.answer}
            </span>
            <span className="text-gray-600">
              ({ratingLabels.find(r => r.value === question.answer)?.label})
            </span>
          </div>
          {question.comment && (
            <div className="mt-2 text-gray-600 italic bg-gray-50 p-3 rounded border border-gray-100">
              "{question.comment}"
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="pl-11 text-gray-500 italic">
          {t("results.no_answer")}
        </div>
      );
    }
  };
  
  return (
    <div className="page-background flex flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-3xl animate-fade-in shadow-xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-8">
          <EDTLogo />
          <CardTitle className="text-2xl font-light tracking-tight">{t("results.title")}</CardTitle>
        </CardHeader>
        <CardContent className="p-8 card-gradient">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-full mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-medium text-gray-800 mb-4">{t("results.your_score")}</h3>
              <div className="text-7xl font-bold text-blue-700 mb-4">{score.percentage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-6 mb-6 overflow-hidden">
                <div 
                  className="bg-blue-700 h-6 rounded-full transition-all duration-1000" 
                  style={{ width: `${score.percentage}%` }}
                ></div>
              </div>
              <div className="inline-block bg-blue-50 px-5 py-3 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">{t("results.your_score")}:</span> {score.total} / {questions.length * 6}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">{t("results.category.beginner")}:</span> {score.average}
                </p>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-center mb-6">{t("results.section_scores")}</h3>
              
              <div className="grid gap-5">
                {questions.map((question) => (
                  <div key={question.id} className="p-5 rounded-lg bg-white shadow-sm border border-gray-100">
                    <div className="flex items-start mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-medium mr-3 flex-shrink-0">
                        {question.id}
                      </span>
                      <h4 className="text-gray-800 font-medium">
                        {question.text}
                      </h4>
                    </div>
                    {renderQuestionAnswer(question)}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button 
                onClick={() => window.print()}
                variant="outline" 
                className="mr-4 border-gray-300"
                size="lg"
              >
                {t("results.print")}
              </Button>
              <Button 
                onClick={onStartNewSurvey}
                className="bg-blue-700 hover:bg-blue-800 text-white"
                size="lg"
              >
                {t("results.start_new")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStep;

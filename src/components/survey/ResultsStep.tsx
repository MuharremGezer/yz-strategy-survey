
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurveyQuestion, ScoreResult } from "@/types/survey";
import { ratingLabels } from "@/data/ratingLabels";
import { CheckCircle, TrendingUp, Award, Target, BarChart3, Users, Building2, Globe } from "lucide-react";
import EDTLogo from "./EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsStepProps {
  questions: SurveyQuestion[];
  score: ScoreResult;
  onStartNewSurvey: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ questions, score, onStartNewSurvey }) => {
  const { t } = useLanguage();
  
  const getScoreLevel = (percentage: number) => {
    if (percentage >= 90) return { level: t("results.category.leading"), color: "text-green-600", bgColor: "bg-green-50", icon: Award };
    if (percentage >= 75) return { level: t("results.category.advanced"), color: "text-blue-600", bgColor: "bg-blue-50", icon: TrendingUp };
    if (percentage >= 60) return { level: t("results.category.established"), color: "text-purple-600", bgColor: "bg-purple-50", icon: Target };
    if (percentage >= 40) return { level: t("results.category.developing"), color: "text-orange-600", bgColor: "bg-orange-50", icon: BarChart3 };
    return { level: t("results.category.beginner"), color: "text-gray-600", bgColor: "bg-gray-50", icon: Users };
  };

  const scoreLevel = getScoreLevel(parseInt(score.percentage));
  const ScoreLevelIcon = scoreLevel.icon;
  
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
      <Card className="w-full max-w-5xl animate-fade-in shadow-2xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-12">
          <EDTLogo />
          <CardTitle className="text-3xl font-light tracking-tight mt-4">{t("results.title")}</CardTitle>
          <p className="text-blue-100 text-lg mt-2 opacity-90">{t("results.thank_you")}</p>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Hero Score Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center p-6 ${scoreLevel.bgColor} rounded-full mb-8 shadow-lg`}>
                <ScoreLevelIcon className={`w-16 h-16 ${scoreLevel.color}`} />
              </div>
              
              <div className="mb-8">
                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                  {score.percentage}%
                </div>
                <div className={`inline-block px-6 py-3 rounded-full text-xl font-semibold ${scoreLevel.bgColor} ${scoreLevel.color} shadow-md`}>
                  {scoreLevel.level}
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="w-full max-w-2xl mx-auto mb-8">
                <div className="bg-white rounded-full h-8 shadow-inner overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full transition-all duration-2000 ease-out shadow-md flex items-center justify-end pr-4" 
                    style={{ width: `${score.percentage}%` }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-3">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{score.total}</div>
                  <div className="text-gray-600">{t("results.your_score")} / {questions.length * 6}</div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-3">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{score.average}</div>
                  <div className="text-gray-600">Average Score</div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-center mb-3">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{questions.length}</div>
                  <div className="text-gray-600">Questions Completed</div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Detailed Results Section */}
          <div className="p-8 bg-white">
            <Separator className="my-8" />
            
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("results.section_scores")}</h3>
                <p className="text-gray-600">Detailed breakdown of your responses</p>
              </div>
              
              <div className="grid gap-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mr-4 flex-shrink-0">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 font-semibold text-lg mb-2">
                          {question.text}
                        </h4>
                        {renderQuestionAnswer(question)}
                      </div>
                      {question.type === 'rating' && question.answer && (
                        <div className="flex items-center ml-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {question.answer}/6
                            </div>
                            <div className="text-sm text-gray-500">
                              {Math.round((question.answer / 6) * 100)}%
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="bg-gray-50 p-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => window.print()}
                variant="outline" 
                className="border-gray-300 hover:bg-gray-100 px-8 py-3 text-lg"
                size="lg"
              >
                {t("results.print")}
              </Button>
              <Button 
                onClick={onStartNewSurvey}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg"
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

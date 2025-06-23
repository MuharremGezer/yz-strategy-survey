
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurveyQuestion, ScoreResult } from "@/types/survey";
import { ratingLabels } from "@/data/ratingLabels";
import { CheckCircle, TrendingUp, Award, Target, BarChart3, Users, Building2, Globe, Star } from "lucide-react";
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
    if (percentage >= 90) return { level: t("results.category.leading"), color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", gradientFrom: "from-emerald-500", gradientTo: "to-green-500", icon: Award };
    if (percentage >= 75) return { level: t("results.category.advanced"), color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", gradientFrom: "from-blue-500", gradientTo: "to-cyan-500", icon: TrendingUp };
    if (percentage >= 60) return { level: t("results.category.established"), color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200", gradientFrom: "from-purple-500", gradientTo: "to-violet-500", icon: Target };
    if (percentage >= 40) return { level: t("results.category.developing"), color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", gradientFrom: "from-orange-500", gradientTo: "to-amber-500", icon: BarChart3 };
    return { level: t("results.category.beginner"), color: "text-slate-600", bgColor: "bg-slate-50", borderColor: "border-slate-200", gradientFrom: "from-slate-500", gradientTo: "to-gray-500", icon: Users };
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
      <Card className="w-full max-w-6xl animate-fade-in shadow-2xl border-0 overflow-hidden">
        <CardHeader className="survey-header text-white text-center py-12">
          <EDTLogo />
          <CardTitle className="text-3xl font-light tracking-tight mt-4">{t("results.title")}</CardTitle>
          <p className="text-blue-100 text-lg mt-2 opacity-90">{t("results.thank_you")}</p>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Hero Score Section */}
          <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-16">
            <div className="text-center mb-12">
              {/* Elite Score Display */}
              <div className="relative mb-12">
                <div className={`inline-flex items-center justify-center p-8 ${scoreLevel.bgColor} ${scoreLevel.borderColor} border-2 rounded-full mb-8 shadow-xl backdrop-blur-sm`}>
                  <ScoreLevelIcon className={`w-20 h-20 ${scoreLevel.color}`} />
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-pulse delay-700"></div>
              </div>
              
              {/* Professional Score Display */}
              <div className="mb-12">
                <div className="relative inline-block">
                  <div className="text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-blue-600 to-purple-600 mb-4 tracking-tight">
                    {score.percentage}
                  </div>
                  <div className="absolute -top-2 -right-8 text-4xl font-light text-slate-400">%</div>
                </div>
                <div className={`inline-block px-8 py-4 rounded-full text-2xl font-medium ${scoreLevel.bgColor} ${scoreLevel.color} ${scoreLevel.borderColor} border-2 shadow-lg backdrop-blur-sm`}>
                  {scoreLevel.level}
                </div>
              </div>

              {/* Elegant Progress Visualization */}
              <div className="w-full max-w-4xl mx-auto mb-12">
                <div className="relative">
                  {/* Progress track */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-full h-12 shadow-inner border border-slate-200 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${scoreLevel.gradientFrom} ${scoreLevel.gradientTo} h-12 rounded-full transition-all duration-3000 ease-out shadow-lg relative overflow-hidden`}
                      style={{ width: `${score.percentage}%` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      
                      {/* End cap with icon */}
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Star className="w-5 h-5 text-white fill-current" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scale markers */}
                  <div className="flex justify-between text-sm text-slate-500 mt-3 px-2">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-300 rounded-full mb-1"></div>
                      <span className="font-medium">0%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-300 rounded-full mb-1"></div>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-300 rounded-full mb-1"></div>
                      <span className="font-medium">50%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-300 rounded-full mb-1"></div>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-3 bg-slate-300 rounded-full mb-1"></div>
                      <span className="font-medium">100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2">{score.total}</div>
                  <div className="text-slate-600 font-medium">{t("results.your_score")} / {questions.length * 6}</div>
                  <div className="text-sm text-slate-500 mt-1">Total Points</div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2">{score.average}</div>
                  <div className="text-slate-600 font-medium">Average Score</div>
                  <div className="text-sm text-slate-500 mt-1">Per Question</div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-slate-800 mb-2">{questions.length}</div>
                  <div className="text-slate-600 font-medium">Questions Completed</div>
                  <div className="text-sm text-slate-500 mt-1">Assessment Coverage</div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Detailed Results Section */}
          <div className="p-12 bg-gradient-to-b from-white to-slate-50">
            <Separator className="my-8 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-800 mb-3">{t("results.section_scores")}</h3>
                <p className="text-slate-600 text-lg">Detailed breakdown of your responses</p>
              </div>
              
              <div className="grid gap-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold mr-6 flex-shrink-0 shadow-lg">
                        {question.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-800 font-semibold text-xl mb-3 leading-relaxed">
                          {question.text}
                        </h4>
                        {renderQuestionAnswer(question)}
                      </div>
                      {question.type === 'rating' && question.answer && (
                        <div className="flex items-center ml-6">
                          <div className="text-right bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-100">
                            <div className="text-3xl font-bold text-blue-600 mb-1">
                              {question.answer}/6
                            </div>
                            <div className="text-sm text-slate-500 font-medium">
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
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-12 text-center border-t border-slate-100">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={() => window.print()}
                variant="outline" 
                className="border-2 border-slate-300 hover:bg-slate-100 hover:border-slate-400 px-10 py-4 text-lg font-medium rounded-xl shadow-md transition-all duration-300"
                size="lg"
              >
                {t("results.print")}
              </Button>
              <Button 
                onClick={onStartNewSurvey}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-10 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
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

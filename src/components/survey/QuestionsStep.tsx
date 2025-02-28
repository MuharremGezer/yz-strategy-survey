import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { SurveyQuestion } from "@/types/survey";
import { ratingLabels } from "@/data/ratingLabels";
import EDTLogo from "./EDTLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionsStepProps {
  questions: SurveyQuestion[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  handleRatingSelect: (questionId: number, rating: number) => void;
  handleCommentChange: (questionId: number, comment: string) => void;
  handleCheckboxChange: (questionId: number, option: string, checked: boolean) => void;
  progress: number;
  submitting: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

const QuestionsStep: React.FC<QuestionsStepProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleRatingSelect,
  handleCommentChange,
  handleCheckboxChange,
  progress,
  submitting,
  onPrevious,
  onSubmit,
  onNext,
}) => {
  const { t } = useLanguage();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, questions.length);
  }, [questions]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      questionRefs.current[currentQuestionIndex + 1]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    } else {
      onSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      questionRefs.current[currentQuestionIndex - 1]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    } else {
      onPrevious();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionAnswered = () => {
    if (!currentQuestion) return false;
    
    if (currentQuestion.type === 'checkbox') {
      return currentQuestion.selectedOptions && currentQuestion.selectedOptions.length > 0;
    }
    
    return currentQuestion.answer !== null;
  };

  return (
    <div className="page-background flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl animate-fade-in mb-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            className="flex items-center border-gray-300"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex === 0 ? t("companyInfo.title") : t("nav.back")}
          </Button>
          <EDTLogo />
          <div className="invisible">
            <Button variant="outline" size="lg">
              Placeholder
            </Button>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-light tracking-tight text-gray-800">
            {t("survey.title")}
          </h1>
          <p className="text-gray-600 mt-2">
            {t("questions.question")} {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t("questions.progress")}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <Card className="mb-8 shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-blue-50 py-6">
            <div className="flex items-start">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-medium mr-4 flex-shrink-0">
                {currentQuestion.id}
              </span>
              <CardTitle className="text-xl font-medium text-gray-800">
                {currentQuestion.text}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 card-gradient">
            <div className="space-y-6">
              {currentQuestion.type === 'checkbox' ? (
                <div className="space-y-4">
                  {currentQuestion.checkboxOptions?.map((option) => (
                    <div key={option} className="flex items-center space-x-3 border p-3 rounded-md bg-white hover:bg-gray-50 transition-colors">
                      <Checkbox 
                        id={`checkbox-${option}`} 
                        checked={currentQuestion.selectedOptions?.includes(option)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(currentQuestion.id, option, checked === true)
                        }
                      />
                      <Label 
                        htmlFor={`checkbox-${option}`}
                        className="text-gray-700 cursor-pointer flex-grow"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {ratingLabels.map((rating) => (
                    <button
                      key={rating.value}
                      type="button"
                      onClick={() => handleRatingSelect(currentQuestion.id, rating.value)}
                      className={`rating-option flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                        currentQuestion.answer === rating.value
                          ? "rating-option-selected bg-blue-50 border-blue-500"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className={`text-2xl font-semibold ${
                        currentQuestion.answer === rating.value ? "text-blue-700" : "text-gray-700"
                      }`}>
                        {rating.value}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 text-center">
                        {t(`rating.${rating.value}`)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <label
                  htmlFor={`comment-${currentQuestion.id}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("questions.addComment")}
                </label>
                <Textarea
                  id={`comment-${currentQuestion.id}`}
                  placeholder={t("questions.addComment")}
                  value={currentQuestion.comment}
                  onChange={(e) => handleCommentChange(currentQuestion.id, e.target.value)}
                  className="w-full min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-5 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
            <Button 
              onClick={handleNextQuestion}
              className="bg-blue-700 hover:bg-blue-800 text-white"
              disabled={!isQuestionAnswered()}
              size="lg"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <span className="flex items-center">
                  {t("nav.next")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center">
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("nav.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("nav.submit")}
                    </>
                  )}
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="hidden">
          {questions.map((question, index) => (
            <div key={question.id} ref={el => questionRefs.current[index] = el}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsStep;

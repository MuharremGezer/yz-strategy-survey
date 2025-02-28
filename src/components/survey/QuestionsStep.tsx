
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SurveyQuestion } from "@/types/survey";
import { ratingLabels } from "@/data/ratingLabels";
import EDTLogo from "./EDTLogo";

interface QuestionsStepProps {
  questions: SurveyQuestion[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  handleRatingSelect: (questionId: number, rating: number) => void;
  handleCommentChange: (questionId: number, comment: string) => void;
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
  progress,
  submitting,
  onPrevious,
  onSubmit,
  onNext,
}) => {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
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
      // Call the submit handler
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
            {currentQuestionIndex === 0 ? 'Şirket Bilgileri' : 'Önceki Soru'}
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
            Yapay Zeka Hazırlık & Strateji Anketi
          </h1>
          <p className="text-gray-600 mt-2">
            Soru {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <Card className="mb-8 shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-blue-50 py-6">
            <div className="flex items-start">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-medium mr-4 flex-shrink-0">
                {questions[currentQuestionIndex].id}
              </span>
              <CardTitle className="text-xl font-medium text-gray-800">
                {questions[currentQuestionIndex].text}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 card-gradient">
            <div className="space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {ratingLabels.map((rating) => (
                  <button
                    key={rating.value}
                    type="button"
                    onClick={() => handleRatingSelect(questions[currentQuestionIndex].id, rating.value)}
                    className={`rating-option flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                      questions[currentQuestionIndex].answer === rating.value
                        ? "rating-option-selected bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className={`text-2xl font-semibold ${
                      questions[currentQuestionIndex].answer === rating.value ? "text-blue-700" : "text-gray-700"
                    }`}>
                      {rating.value}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      {rating.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <label
                  htmlFor={`comment-${questions[currentQuestionIndex].id}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Yorum (isteğe bağlı)
                </label>
                <Textarea
                  id={`comment-${questions[currentQuestionIndex].id}`}
                  placeholder="Örnek veya ek açıklama ekleyin..."
                  value={questions[currentQuestionIndex].comment}
                  onChange={(e) => handleCommentChange(questions[currentQuestionIndex].id, e.target.value)}
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
              disabled={questions[currentQuestionIndex].answer === null}
              size="lg"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <span className="flex items-center">
                  Sonraki Soru
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
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Anketi Gönder
                    </>
                  )}
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Hidden references for scrolling */}
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

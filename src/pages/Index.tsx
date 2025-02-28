
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Step, SurveyQuestion } from "@/types/survey";
import { initialQuestionsEN, initialQuestionsTR } from "@/data/initialQuestions";
import { calculateScore } from "@/utils/surveyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

// Import components
import IntroStep from "@/components/survey/IntroStep";
import CompanyInfoStep from "@/components/survey/CompanyInfoStep";
import QuestionsStep from "@/components/survey/QuestionsStep";
import ResultsStep from "@/components/survey/ResultsStep";

const Index = () => {
  const { language, t } = useLanguage();
  const [questions, setQuestions] = useState<SurveyQuestion[]>(
    language === 'en' ? initialQuestionsEN : initialQuestionsTR
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [respondentPosition, setRespondentPosition] = useState("");
  const [respondentEmail, setRespondentEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update questions when language changes
  useEffect(() => {
    setQuestions(language === 'en' ? initialQuestionsEN : initialQuestionsTR);
  }, [language]);

  useEffect(() => {
    // Initialize refs array
    questionRefs.current = questionRefs.current.slice(0, questions.length);
    
    // Calculate progress percentage
    const answeredCount = questions.filter(q => q.answer !== null).length;
    setProgress((answeredCount / questions.length) * 100);
  }, [questions]);

  const handleRatingSelect = (questionId: number, rating: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, answer: rating } : q
      )
    );
  };

  const handleCommentChange = (questionId: number, comment: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, comment } : q
      )
    );
  };

  const handleNext = () => {
    if (currentStep === Step.INTRO) {
      setCurrentStep(Step.COMPANY_INFO);
    } else if (currentStep === Step.COMPANY_INFO) {
      setCurrentStep(Step.QUESTIONS);
    } else if (currentStep === Step.QUESTIONS) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        questionRefs.current[currentQuestionIndex + 1]?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep === Step.COMPANY_INFO) {
      setCurrentStep(Step.INTRO);
    } else if (currentStep === Step.QUESTIONS) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        questionRefs.current[currentQuestionIndex - 1]?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      } else {
        setCurrentStep(Step.COMPANY_INFO);
      }
    }
  };

  const saveSurveyToDatabase = async () => {
    try {
      setSubmitting(true);
      
      // Convert questions to a plain JSON object to make it compatible with Supabase's Json type
      const answersAsJson = JSON.parse(JSON.stringify(questions));
      
      const { data, error } = await supabase
        .from('survey_responses')
        .insert([
          { 
            company_name: companyName,
            respondent_name: respondentName,
            respondent_position: respondentPosition,
            respondent_email: respondentEmail,
            sector: sector,
            industry: industry,
            answers: answersAsJson,
            language: language
          }
        ])
        .select();
      
      if (error) {
        console.error("Error saving survey:", error);
        toast({
          title: t("error.saving_survey"),
          description: t("error.saving_survey"),
          variant: "destructive",
        });
        setSubmitting(false);
        return false;
      }
      
      if (data && data.length > 0) {
        setSurveyId(data[0].id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Exception saving survey:", error);
      toast({
        title: t("error.saving_survey"),
        description: t("error.saving_survey"),
        variant: "destructive",
      });
      setSubmitting(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    const unansweredQuestions = questions.filter(q => q.answer === null);
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: t("error.unanswered_questions").replace("{count}", unansweredQuestions.length.toString()),
        description: t("error.unanswered_questions").replace("{count}", unansweredQuestions.length.toString()),
        variant: "destructive",
      });
      
      // Scroll to first unanswered question
      const firstUnansweredIndex = questions.findIndex(q => q.answer === null);
      if (firstUnansweredIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredIndex);
        questionRefs.current[firstUnansweredIndex]?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
      return;
    }
    
    // Save to database
    const success = await saveSurveyToDatabase();
    
    if (success) {
      setCurrentStep(Step.RESULTS);
      setSubmitted(true);
      toast({
        title: t("success.survey_submitted"),
        description: t("success.thank_you"),
      });
    }
    
    setSubmitting(false);
  };

  const startNewSurvey = () => {
    // Reset the survey with questions in the current language
    setQuestions(language === 'en' ? initialQuestionsEN : initialQuestionsTR);
    setCurrentQuestionIndex(0);
    setCurrentStep(Step.INTRO);
    setSubmitted(false);
    setCompanyName("");
    setRespondentName("");
    setRespondentPosition("");
    setRespondentEmail("");
    setEmailError("");
    setSector("");
    setIndustry("");
    setSurveyId(null);
  };

  const score = calculateScore(questions, submitted);

  // Render the appropriate step based on currentStep
  if (currentStep === Step.INTRO) {
    return <IntroStep onNext={handleNext} />;
  }

  if (currentStep === Step.COMPANY_INFO) {
    return (
      <CompanyInfoStep
        companyName={companyName}
        setCompanyName={setCompanyName}
        respondentName={respondentName}
        setRespondentName={setRespondentName}
        respondentPosition={respondentPosition}
        setRespondentPosition={setRespondentPosition}
        respondentEmail={respondentEmail}
        setRespondentEmail={setRespondentEmail}
        emailError={emailError}
        setEmailError={setEmailError}
        sector={sector}
        setSector={setSector}
        industry={industry}
        setIndustry={setIndustry}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    );
  }

  if (currentStep === Step.RESULTS) {
    return (
      <ResultsStep
        questions={questions}
        score={score}
        onStartNewSurvey={startNewSurvey}
      />
    );
  }

  // Default to questions step
  return (
    <QuestionsStep
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      handleRatingSelect={handleRatingSelect}
      handleCommentChange={handleCommentChange}
      progress={progress}
      submitting={submitting}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      onNext={handleNext}
    />
  );
};

export default Index;

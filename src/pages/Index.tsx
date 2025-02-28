
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Send, CheckCircle, User, Building, Briefcase, HelpCircle } from "lucide-react";

interface SurveyQuestion {
  id: number;
  text: string;
  answer: number | null;
  comment: string;
}

interface SurveyResponse {
  id?: string;
  company_name: string;
  respondent_name: string;
  respondent_position: string;
  answers: SurveyQuestion[];
  created_at?: string;
}

const initialQuestions: SurveyQuestion[] = [
  {
    id: 1,
    text: "Yönetim ekibimiz, yapay zekanın (Yapay Zeka) sektörümüze ve iş süreçlerimize etkilerini iyi anlıyor.",
    answer: null,
    comment: "",
  },
  {
    id: 2,
    text: "Şirketimizde yapay zekayı nasıl kullanacağımıza dair (hedefler, zaman çizelgesi, bütçe vb.) net bir plan veya strateji var.",
    answer: null,
    comment: "",
  },
  {
    id: 3,
    text: "Yapay Zeka ile ilgili hedeflerimiz, gelir artırma, müşteri hizmetlerini iyileştirme veya verimliliği artırma gibi temel iş hedeflerimizle uyumlu.",
    answer: null,
    comment: "",
  },
  {
    id: 4,
    text: "Şirketimizde (veya dışarıdan kolayca temin edebileceğimiz) veri bilimi, yazılım, proje yönetimi gibi gerekli yetkinliklere sahip kişiler bulunuyor.",
    answer: null,
    comment: "",
  },
  {
    id: 5,
    text: "Rakiplerimizin ve sektör liderlerinin Yapay Zeka kullanımını takip ediyor, şu anki durumumuzu ve gelecekteki ihtiyaçlarımızı buna göre değerlendiriyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 6,
    text: "Yapay Zeka'nın şirketimize sağlayabileceği faydalar konusunda (örneğin maliyet tasarrufu, yeni ürün fikirleri) gerçekçi beklentilerimiz ve net hedeflerimiz var.",
    answer: null,
    comment: "",
  },
  {
    id: 7,
    text: "Yapay Zeka uygulamalarını hayata geçirmemizi zorlaştıran (sınırlı bütçe, belirsiz mevzuatlar, veri gizliliği endişeleri veya uzman eksikliği gibi) önemli engellerle karşılaşıyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 8,
    text: "Yapay Zeka'ye ne kadar hazır olduğumuzu (hangi veri ve teknolojiye sahibiz, nelere ihtiyacımız var vb.) iyi biliyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 9,
    text: "Yapay Zeka çözümlerini uygulamaya yönelik, zaman çizelgeleri, kaynaklar ve belirli kontrol noktalarını içeren bir yol haritamız var.",
    answer: null,
    comment: "",
  },
  {
    id: 10,
    text: "Yapay Zeka'yi işimizin en az bir alanında (örneğin müşteri destek, üretim, tahminleme) uygulamaya başladık veya çok yakında başlamayı planlıyoruz.",
    answer: null,
    comment: "",
  },
];

const ratingLabels = [
  { value: 1, label: "Hiç geçerli değil" },
  { value: 2, label: "Çok az geçerli" },
  { value: 3, label: "Kısmen geçerli" },
  { value: 4, label: "Oldukça geçerli" },
  { value: 5, label: "Çok geçerli" },
  { value: 6, label: "Tamamen geçerli" },
];

// Wizard steps
enum Step {
  INTRO,
  COMPANY_INFO,
  QUESTIONS,
  RESULTS
}

const Index = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [respondentPosition, setRespondentPosition] = useState("");
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      if (!companyName.trim()) {
        toast({
          title: "Uyarı",
          description: "Lütfen şirket adını giriniz.",
          variant: "destructive",
        });
        return;
      }
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
      
      // Cast the supabase client to 'any' to bypass TypeScript's type checking
      const { data, error } = await (supabase as any)
        .from('survey_responses')
        .insert([
          { 
            company_name: companyName,
            respondent_name: respondentName,
            respondent_position: respondentPosition,
            answers: questions
          }
        ])
        .select();
      
      if (error) {
        console.error("Error saving survey:", error);
        toast({
          title: "Hata",
          description: "Anket kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
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
        title: "Hata",
        description: "Anket kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.",
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
        title: "Eksik Yanıtlar",
        description: `Lütfen tüm soruları yanıtlayın. ${unansweredQuestions.length} soru yanıtlanmamış.`,
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
        title: "Anket Başarıyla Gönderildi",
        description: "Katılımınız için teşekkür ederiz!",
      });
    }
    
    setSubmitting(false);
  };

  const calculateScore = () => {
    if (submitted) {
      const totalScore = questions.reduce((sum, q) => sum + (q.answer || 0), 0);
      return {
        total: totalScore,
        average: (totalScore / questions.length).toFixed(1),
        percentage: ((totalScore / (questions.length * 6)) * 100).toFixed(0)
      };
    }
    return { total: 0, average: "0.0", percentage: "0" };
  };

  const score = calculateScore();

  // Intro screen
  if (currentStep === Step.INTRO) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
        <Card className="w-full max-w-2xl animate-fade-in shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary text-white text-center py-8">
            <CardTitle className="text-2xl font-light tracking-tight">Yapay Zeka Hazırlık & Strateji Anketi</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary rounded-full mb-4">
                  <HelpCircle className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Orta Ölçekli Şirketler İçin Yapay Zeka Hazırlık Değerlendirmesi</h3>
                <p className="text-gray-600">
                  Bu anket, şirketinizin yapay zeka stratejisini ve hazırlık durumunu değerlendirmenize yardımcı olacaktır.
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h4 className="font-medium text-primary mb-3">Anketi nasıl doldurmalısınız?</h4>
                <p className="text-gray-600 mb-4">
                  Aşağıdaki ifadeleri okuyun ve şirketiniz için ne ölçüde geçerli olduğunu 1'den 6'ya kadar puanlayın.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {ratingLabels.map((item) => (
                    <div key={item.value} className="flex items-center text-sm">
                      <span className="font-semibold mr-2">{item.value} =</span>
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">
                  Her soruya isteğe bağlı olarak yorum ekleyebilirsiniz.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 py-4 bg-gray-50 flex justify-end">
            <Button 
              onClick={handleNext}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <span className="flex items-center">
                Başla
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Company info screen
  if (currentStep === Step.COMPANY_INFO) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
        <Card className="w-full max-w-2xl animate-fade-in shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary text-white text-center py-8">
            <CardTitle className="text-2xl font-light tracking-tight">Şirket Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary rounded-full">
                  <Building className="w-10 h-10" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Şirket Adı <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Şirketinizin adını girin"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="respondentName" className="block text-sm font-medium text-gray-700 mb-1">
                      Yanıtlayan Kişi
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="respondentName"
                        type="text"
                        value={respondentName}
                        onChange={(e) => setRespondentName(e.target.value)}
                        className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="respondentPosition" className="block text-sm font-medium text-gray-700 mb-1">
                      Pozisyon
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="respondentPosition"
                        type="text"
                        value={respondentPosition}
                        onChange={(e) => setRespondentPosition(e.target.value)}
                        className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Şirketteki pozisyonunuz"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 py-4 bg-gray-50 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-primary text-white hover:bg-primary/90"
            >
              İleri
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Results screen
  if (currentStep === Step.RESULTS) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
        <Card className="w-full max-w-2xl animate-fade-in shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary text-white text-center py-8">
            <CardTitle className="text-2xl font-light tracking-tight">Anket Sonuçlarınız</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-50 text-green-500 rounded-full mb-4">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Yapay Zeka Hazırlık Skoru</h3>
                <div className="text-6xl font-bold text-primary mb-2">{score.percentage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-primary h-4 rounded-full transition-all duration-1000" 
                    style={{ width: `${score.percentage}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-gray-600">
                  Toplam Puan: {score.total} / {questions.length * 6} (Ortalama: {score.average})
                </p>
              </div>
              
              <Separator className="my-8" />
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-center mb-4">Yanıtlarınızın Detayları</h3>
                
                <div className="grid gap-4">
                  {questions.map((question) => (
                    <div key={question.id} className="p-5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-start mb-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium mr-3 flex-shrink-0">
                          {question.id}
                        </span>
                        <h4 className="text-gray-800 font-medium">
                          {question.text}
                        </h4>
                      </div>
                      <div className="pl-11">
                        <div className="flex items-center">
                          <span className="font-semibold text-primary text-lg mr-2">
                            {question.answer}
                          </span>
                          <span className="text-gray-600">
                            ({ratingLabels.find(r => r.value === question.answer)?.label})
                          </span>
                        </div>
                        {question.comment && (
                          <div className="mt-2 text-gray-600 italic bg-white p-3 rounded border border-gray-100">
                            "{question.comment}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => window.print()}
                  variant="outline" 
                  className="mr-2"
                >
                  Sonuçları Yazdır
                </Button>
                <Button 
                  onClick={() => {
                    setQuestions(initialQuestions);
                    setCurrentQuestionIndex(0);
                    setCurrentStep(Step.INTRO);
                    setSubmitted(false);
                    setCompanyName("");
                    setRespondentName("");
                    setRespondentPosition("");
                    setSurveyId(null);
                  }}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Yeni Anket Başlat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Questions screen
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-3xl animate-fade-in mb-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex === 0 ? 'Şirket Bilgileri' : 'Önceki Soru'}
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-light tracking-tight text-primary">
              Yapay Zeka Hazırlık & Strateji Anketi
            </h1>
            <p className="text-gray-500">
              Soru {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <div className="invisible">
            <Button variant="outline">
              Placeholder
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8 shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary/5 py-5">
            <div className="flex items-start">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium mr-4 flex-shrink-0">
                {questions[currentQuestionIndex].id}
              </span>
              <CardTitle className="text-xl font-medium text-gray-800">
                {questions[currentQuestionIndex].text}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ratingLabels.map((rating) => (
                  <button
                    key={rating.value}
                    type="button"
                    onClick={() => handleRatingSelect(questions[currentQuestionIndex].id, rating.value)}
                    className={`rating-option flex flex-col items-center justify-center p-3 border rounded-md transition-all ${
                      questions[currentQuestionIndex].answer === rating.value
                        ? "rating-option-selected bg-primary/5 border-primary"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className={`text-2xl font-semibold ${
                      questions[currentQuestionIndex].answer === rating.value ? "text-primary" : "text-gray-700"
                    }`}>
                      {rating.value}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 text-center">
                      {rating.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
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
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentQuestionIndex + 1} / {questions.length}
            </div>
            <Button 
              onClick={handleNext}
              className="bg-primary text-white hover:bg-primary/90"
              disabled={questions[currentQuestionIndex].answer === null}
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

export default Index;

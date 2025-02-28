
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

interface SurveyQuestion {
  id: number;
  text: string;
  answer: number | null;
  comment: string;
}

const initialQuestions: SurveyQuestion[] = [
  {
    id: 1,
    text: "Yönetim ekibimiz, yapay zekanın (YZ) sektörümüze ve iş süreçlerimize etkilerini iyi anlıyor.",
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
    text: "YZ ile ilgili hedeflerimiz, gelir artırma, müşteri hizmetlerini iyileştirme veya verimliliği artırma gibi temel iş hedeflerimizle uyumlu.",
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
    text: "Rakiplerimizin ve sektör liderlerinin YZ kullanımını takip ediyor, şu anki durumumuzu ve gelecekteki ihtiyaçlarımızı buna göre değerlendiriyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 6,
    text: "YZ'nin şirketimize sağlayabileceği faydalar konusunda (örneğin maliyet tasarrufu, yeni ürün fikirleri) gerçekçi beklentilerimiz ve net hedeflerimiz var.",
    answer: null,
    comment: "",
  },
  {
    id: 7,
    text: "YZ uygulamalarını hayata geçirmemizi zorlaştıran (sınırlı bütçe, belirsiz mevzuatlar, veri gizliliği endişeleri veya uzman eksikliği gibi) önemli engellerle karşılaşıyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 8,
    text: "YZ'ye ne kadar hazır olduğumuzu (hangi veri ve teknolojiye sahibiz, nelere ihtiyacımız var vb.) iyi biliyoruz.",
    answer: null,
    comment: "",
  },
  {
    id: 9,
    text: "YZ çözümlerini uygulamaya yönelik, zaman çizelgeleri, kaynaklar ve belirli kontrol noktalarını içeren bir yol haritamız var.",
    answer: null,
    comment: "",
  },
  {
    id: 10,
    text: "YZ'yi işimizin en az bir alanında (örneğin müşteri destek, üretim, tahminleme) uygulamaya başladık veya çok yakında başlamayı planlıyoruz.",
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

const Index = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [respondentName, setRespondentName] = useState("");
  const [respondentPosition, setRespondentPosition] = useState("");
  const [progress, setProgress] = useState(0);
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      questionRefs.current[currentQuestionIndex + 1]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      questionRefs.current[currentQuestionIndex - 1]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
    }
  };

  const handleSubmit = () => {
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
    
    // Process submission
    console.log("Survey submitted:", { companyName, respondentName, respondentPosition, answers: questions });
    
    setSubmitted(true);
    toast({
      title: "Anket Başarıyla Gönderildi",
      description: "Katılımınız için teşekkür ederiz!",
    });
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

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
        <Card className="w-full max-w-2xl animate-fade-in shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary text-white text-center py-8">
            <CardTitle className="text-2xl font-light tracking-tight">Anket Sonuçlarınız</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-600 mb-2">YZ Hazırlık Skoru</h3>
                <div className="text-6xl font-bold text-primary">{score.percentage}%</div>
                <p className="mt-2 text-gray-500">
                  Toplam Puan: {score.total} / {questions.length * 6} (Ortalama: {score.average})
                </p>
              </div>
              
              <Separator className="my-8" />
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-center">Yanıtlarınızın Detayları</h3>
                
                {questions.map((question) => (
                  <div key={question.id} className="p-4 rounded-md bg-gray-50">
                    <p className="font-medium">{question.id}. {question.text}</p>
                    <div className="mt-2 flex items-center">
                      <span className="font-semibold text-primary text-lg">
                        {question.answer}
                      </span>
                      <span className="ml-2 text-gray-500">
                        ({ratingLabels.find(r => r.value === question.answer)?.label})
                      </span>
                    </div>
                    {question.comment && (
                      <div className="mt-2 text-gray-600 italic">
                        "{question.comment}"
                      </div>
                    )}
                  </div>
                ))}
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
                    setSubmitted(false);
                    setCompanyName("");
                    setRespondentName("");
                    setRespondentPosition("");
                  }}
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

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-3xl animate-fade-in">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-tight text-primary mb-2">
            YZ Hazırlık & Strateji Anketi
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Orta Ölçekli Şirketler İçin
          </p>
        </header>

        <Card className="mb-8 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Şirket Adı
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Şirketinizin adını girin"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="respondentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Yanıtlayan Kişi
                  </label>
                  <input
                    id="respondentName"
                    type="text"
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="respondentPosition" className="block text-sm font-medium text-gray-700 mb-1">
                    Pozisyon
                  </label>
                  <input
                    id="respondentPosition"
                    type="text"
                    value={respondentPosition}
                    onChange={(e) => setRespondentPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Şirketteki pozisyonunuz"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Yanıtlama Talimatları</h2>
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
            (Gerekirse örnek veya yorum ekleyebilirsiniz.)
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              ref={el => questionRefs.current[index] = el}
              className={`question-card p-6 bg-white rounded-lg shadow-sm transition-all duration-300 ${
                currentQuestionIndex === index 
                  ? "ring-2 ring-primary/20 shadow-md pulse-animation" 
                  : ""
              }`}
            >
              <div className="mb-4 flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium mr-3 flex-shrink-0">
                  {question.id}
                </span>
                <h3 className="text-lg font-medium text-gray-800">
                  {question.text}
                </h3>
              </div>

              <div className="pl-11">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                  {ratingLabels.map((rating) => (
                    <button
                      key={rating.value}
                      type="button"
                      onClick={() => handleRatingSelect(question.id, rating.value)}
                      className={`rating-option flex flex-col items-center justify-center p-3 border rounded-md transition-all ${
                        question.answer === rating.value
                          ? "rating-option-selected bg-primary/5 border-primary"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className={`text-2xl font-semibold ${
                        question.answer === rating.value ? "text-primary" : "text-gray-700"
                      }`}>
                        {rating.value}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 text-center">
                        {rating.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`comment-${question.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Yorum (isteğe bağlı)
                  </label>
                  <Textarea
                    id={`comment-${question.id}`}
                    placeholder="Örnek veya ek açıklama ekleyin..."
                    value={question.comment}
                    onChange={(e) => handleCommentChange(question.id, e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Önceki
          </Button>
          
          <div>
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNext}>
                Sonraki
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Anketi Gönder
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

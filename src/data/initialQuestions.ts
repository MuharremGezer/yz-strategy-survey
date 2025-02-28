
import { SurveyQuestion } from "@/types/survey";

// English questions
export const initialQuestionsEN: SurveyQuestion[] = [
  {
    id: 1,
    text: "Our management team understands well the impacts of AI on our industry and business processes.",
    answer: null,
    comment: "",
  },
  {
    id: 2,
    text: "Our company has a clear plan or strategy for how to use AI (goals, timeline, budget, etc.).",
    answer: null,
    comment: "",
  },
  {
    id: 3,
    text: "Our AI-related goals are aligned with our core business objectives such as increasing revenue, improving customer service, or increasing efficiency.",
    answer: null,
    comment: "",
  },
  {
    id: 4,
    text: "Our company has (or can easily source) people with the necessary skills such as data science, software, and project management.",
    answer: null,
    comment: "",
  },
  {
    id: 5,
    text: "We monitor our competitors' and industry leaders' use of AI to assess our current situation and future needs accordingly.",
    answer: null,
    comment: "",
  },
  {
    id: 6,
    text: "We have realistic expectations and clear goals about the benefits that AI can bring to our company (e.g., cost savings, new product ideas).",
    answer: null,
    comment: "",
  },
  {
    id: 7,
    text: "We face significant barriers (limited budget, uncertain regulations, data privacy concerns, or lack of experts) that make it difficult for us to implement AI applications.",
    answer: null,
    comment: "",
  },
  {
    id: 8,
    text: "We know how ready we are for AI (what data and technology we have, what we need, etc.).",
    answer: null,
    comment: "",
  },
  {
    id: 9,
    text: "We have a roadmap for implementing AI solutions that includes timelines, resources, and specific checkpoints.",
    answer: null,
    comment: "",
  },
  {
    id: 10,
    text: "We have started implementing AI in at least one area of our business (e.g., customer support, production, forecasting) or plan to start very soon.",
    answer: null,
    comment: "",
  },
];

// Turkish questions
export const initialQuestionsTR: SurveyQuestion[] = [
  {
    id: 1,
    text: "Yönetim ekibimiz, yapay zekanın sektörümüze ve iş süreçlerimize etkilerini iyi anlıyor.",
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

// Export the Turkish version as default (for backward compatibility)
export const initialQuestions = initialQuestionsTR;

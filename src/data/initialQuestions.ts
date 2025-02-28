
import { SurveyQuestion } from "@/types/survey";

// English questions
export const initialQuestionsEN: SurveyQuestion[] = [
  {
    id: 1,
    text: "Our management team understands well the impacts of AI on our industry and business processes.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 2,
    text: "Our company has a clear plan or strategy for how to use AI (goals, timeline, budget, etc.).",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 3,
    text: "Our AI-related goals are aligned with our core business objectives such as increasing revenue, improving customer service, or increasing efficiency.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 4,
    text: "Our company has (or can easily source) people with the necessary skills such as data science, software, and project management.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 5,
    text: "We monitor our competitors' and industry leaders' use of AI to assess our current situation and future needs accordingly.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 6,
    text: "We have realistic expectations and clear goals about the benefits that AI can bring to our company (e.g., cost savings, new product ideas).",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 7,
    text: "We face significant barriers (limited budget, uncertain regulations, data privacy concerns, or lack of experts) that make it difficult for us to implement AI applications.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 8,
    text: "We know how ready we are for AI (what data and technology we have, what we need, etc.).",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 9,
    text: "We have a roadmap for implementing AI solutions that includes timelines, resources, and specific checkpoints.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 10,
    text: "We have started implementing AI in at least one area of our business (e.g., customer support, production, forecasting) or plan to start very soon.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 11,
    text: "Which AI applications does your organization currently use? (Select all that apply)",
    answer: null,
    comment: "",
    type: "checkbox",
    checkboxOptions: [
      "Chatbots/Virtual Assistants",
      "Data Analysis/Business Intelligence",
      "Document Processing/Information Extraction",
      "Image/Video Recognition",
      "Natural Language Processing",
      "Predictive Analytics/Forecasting",
      "Process Automation",
      "Recommendation Systems",
      "Voice Recognition/Speech-to-Text",
      "Other"
    ],
    selectedOptions: []
  },
  {
    id: 12,
    text: "Which AI solutions does your organization use? (Select all that apply)",
    answer: null,
    comment: "",
    type: "checkbox",
    checkboxOptions: [
      "OpenAI (ChatGPT, GPT-4)",
      "Google AI (Gemini, Bard)",
      "Microsoft Copilot",
      "GitHub Copilot",
      "Anthropic Claude",
      "Grok AI (xAI)",
      "Qwen (Alibaba)",
      "Deepseek",
      "Meta AI (Llama)",
      "IBM Watson",
      "Amazon SageMaker",
      "HuggingFace models",
      "Custom in-house AI solutions",
      "Other"
    ],
    selectedOptions: []
  }
];

// Turkish questions
export const initialQuestionsTR: SurveyQuestion[] = [
  {
    id: 1,
    text: "Yönetim ekibimiz, yapay zekanın sektörümüze ve iş süreçlerimize etkilerini iyi anlıyor.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 2,
    text: "Şirketimizde yapay zekayı nasıl kullanacağımıza dair (hedefler, zaman çizelgesi, bütçe vb.) net bir plan veya strateji var.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 3,
    text: "Yapay Zeka ile ilgili hedeflerimiz, gelir artırma, müşteri hizmetlerini iyileştirme veya verimliliği artırma gibi temel iş hedeflerimizle uyumlu.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 4,
    text: "Şirketimizde (veya dışarıdan kolayca temin edebileceğimiz) veri bilimi, yazılım, proje yönetimi gibi gerekli yetkinliklere sahip kişiler bulunuyor.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 5,
    text: "Rakiplerimizin ve sektör liderlerinin Yapay Zeka kullanımını takip ediyor, şu anki durumumuzu ve gelecekteki ihtiyaçlarımızı buna göre değerlendiriyoruz.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 6,
    text: "Yapay Zeka'nın şirketimize sağlayabileceği faydalar konusunda (örneğin maliyet tasarrufu, yeni ürün fikirleri) gerçekçi beklentilerimiz ve net hedeflerimiz var.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 7,
    text: "Yapay Zeka uygulamalarını hayata geçirmemizi zorlaştıran (sınırlı bütçe, belirsiz mevzuatlar, veri gizliliği endişeleri veya uzman eksikliği gibi) önemli engellerle karşılaşıyoruz.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 8,
    text: "Yapay Zeka'ye ne kadar hazır olduğumuzu (hangi veri ve teknolojiye sahibiz, nelere ihtiyacımız var vb.) iyi biliyoruz.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 9,
    text: "Yapay Zeka çözümlerini uygulamaya yönelik, zaman çizelgeleri, kaynaklar ve belirli kontrol noktalarını içeren bir yol haritamız var.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 10,
    text: "Yapay Zeka'yi işimizin en az bir alanında (örneğin müşteri destek, üretim, tahminleme) uygulamaya başladık veya çok yakında başlamayı planlıyoruz.",
    answer: null,
    comment: "",
    type: "rating"
  },
  {
    id: 11,
    text: "Kurumunuz hangi Yapay Zeka uygulamalarını kullanıyor? (Uygun olan tüm seçenekleri işaretleyin)",
    answer: null,
    comment: "",
    type: "checkbox",
    checkboxOptions: [
      "Sohbet Robotları/Sanal Asistanlar",
      "Veri Analizi/İş Zekası",
      "Belge İşleme/Bilgi Çıkarma",
      "Görüntü/Video Tanıma",
      "Doğal Dil İşleme",
      "Öngörü Analitiği/Tahminleme",
      "Süreç Otomasyonu",
      "Öneri Sistemleri",
      "Ses Tanıma/Konuşmadan Metne",
      "Diğer"
    ],
    selectedOptions: []
  },
  {
    id: 12,
    text: "Kurumunuz hangi Yapay Zeka çözümlerini kullanıyor? (Uygun olan tüm seçenekleri işaretleyin)",
    answer: null,
    comment: "",
    type: "checkbox",
    checkboxOptions: [
      "OpenAI (ChatGPT, GPT-4)",
      "Google AI (Gemini, Bard)",
      "Microsoft Copilot",
      "GitHub Copilot",
      "Anthropic Claude",
      "Grok AI (xAI)",
      "Qwen (Alibaba)",
      "Deepseek",
      "Meta AI (Llama)",
      "IBM Watson",
      "Amazon SageMaker",
      "HuggingFace modelleri",
      "Özel kurum içi Yapay Zeka çözümleri",
      "Diğer"
    ],
    selectedOptions: []
  }
];

// Export the Turkish version as default (for backward compatibility)
export const initialQuestions = initialQuestionsTR;

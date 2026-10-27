import {
  DocumentItem,
  TopicItem,
  ConceptItem,
  SourceReference,
  QuizQuestion,
  QuizSessionResult,
} from '../types/index.ts';

export const SAMPLE_DOCUMENT: DocumentItem = {
  id: 'doc-ai-intro',
  name: 'Nhập môn Trí tuệ nhân tạo.pdf',
  type: 'PDF',
  size: 1887436,
  formattedSize: '1.8 MB',
  pages: 42,
  uploadDate: '27/10/2026, 09:15',
  status: 'Đã phân tích (mô phỏng)',
  topicsCount: 4,
  questionsGenerated: 5,
  description:
    'Giáo trình tổng quan về lịch sử hình thành, nền tảng toán học, các phương pháp học máy (có giám sát, không giám sát), kiến trúc mạng nơ-ron và đạo đức AI.',
};

export const RECENT_DOCUMENTS: DocumentItem[] = [
  SAMPLE_DOCUMENT,
  {
    id: 'doc-algo',
    name: 'Cấu trúc dữ liệu & Giải thuật.docx',
    type: 'DOCX',
    size: 945200,
    formattedSize: '923 KB',
    pages: 28,
    uploadDate: '25/10/2026, 14:30',
    status: 'Đã phân tích (mô phỏng)',
    topicsCount: 5,
    questionsGenerated: 10,
    description: 'Tổng hợp cây nhị phân tìm kiếm, đồ thị, thuật toán Dijkstra và quy hoạch động.',
  },
  {
    id: 'doc-network',
    name: 'Mạng máy tính & Giao thức TCP/IP.pdf',
    type: 'PDF',
    size: 2450000,
    formattedSize: '2.3 MB',
    pages: 56,
    uploadDate: '26/10/2026, 16:45',
    status: 'Đang xử lý',
    topicsCount: 0,
    questionsGenerated: 0,
    description: 'Mô hình OSI 7 tầng, phân tầng TCP/IP, định tuyến IP và giao thức vận chuyển UDP/TCP.',
  },
  {
    id: 'doc-os',
    name: 'Hệ điều hành - Quản lý tiến trình.pdf',
    type: 'PDF',
    size: 1205000,
    formattedSize: '1.1 MB',
    pages: 34,
    uploadDate: '24/10/2026, 11:20',
    status: 'Mới tải lên',
    topicsCount: 0,
    questionsGenerated: 0,
    description: 'Khái niệm tiến trình, luồng (threads), lập lịch CPU (Round Robin, FCFS) và bế tắc (deadlock).',
  },
];

export const DOCUMENT_OVERVIEW = {
  shortDescription:
    'Tài liệu trình bày toàn diện các nguyên lý cốt lõi của Trí tuệ Nhân tạo hiện đại. Nội dung tập trung vào sự chuyển dịch từ hệ chuyên gia sang mô hình học máy theo dữ liệu, giải thích cơ chế huấn luyện mạng nơ-ron và cảnh báo các hạn chế thực tế.',
  readingTime: 'Khoảng 45 phút đọc',
  keyTarget: 'Phục vụ ôn tập giữa kỳ và cuối kỳ môn Trí tuệ Nhân tạo (IT301)',
  sectionsCount: '4 chương chính, 14 tiểu mục chuyên sâu',
};

export const CONTENT_SUMMARY_BULLETS: string[] = [
  'Định nghĩa Trí tuệ nhân tạo (AI) là lĩnh vực khoa học máy tính hướng tới việc xây dựng các hệ thống có khả năng mô phỏng hành vi thông minh của con người.',
  'Phân loại Học máy (Machine Learning) thành ba nhánh cốt lõi: Học có giám sát (Supervised), Học không giám sát (Unsupervised) và Học tăng cường (Reinforcement Learning).',
  'Mạng nơ-ron nhân tạo (ANN) mô phỏng các tế bào nơ-ron sinh học, sử dụng hàm kích hoạt phi tuyến tính và thuật toán lan truyền ngược (Backpropagation) để tối ưu trọng số.',
  'Hàm mất mát (Loss Function) đóng vai trò kim chỉ nam đo lường sai số dự đoán, kết hợp giải thuật Gradient Descent để điều chỉnh mô hình qua từng chu kỳ huấn luyện.',
  'Quá khớp (Overfitting) là thách thức phổ biến, giải quyết thông qua điều chuẩn (Regularization), Dropout và kỹ thuật kiểm định chéo (Cross-validation).',
  'Giới hạn đạo đức và an toàn: Các mô hình ngôn ngữ lớn (LLM) có thể tạo ra thông tin sai lệch có vẻ hợp lý (Ảo giác - Hallucination), đòi hỏi kiểm chứng con người (Human-in-the-loop).',
];

export const MAIN_TOPICS: TopicItem[] = [
  {
    id: 'topic-1',
    title: 'Tổng quan & Lịch sử AI',
    description:
      'Lược sử phát triển từ bài kiểm tra Turing (1950), thời kỳ AI biểu tượng (Symbolic AI) cho đến làn sóng Học sâu (Deep Learning) bùng nổ nhờ dữ liệu lớn.',
    iconName: 'Cpu',
    importance: 'Quan trọng',
    keyPoints: [
      'Bài kiểm tra Turing và định nghĩa trí thông minh máy tính',
      'Sự khác biệt giữa hệ chuyên gia quy tắc cứng và mô hình học theo dữ liệu',
      'Động lực phát triển: Sức mạnh GPU và khối lượng dữ liệu khổng lồ',
    ],
  },
  {
    id: 'topic-2',
    title: 'Các nhánh Học máy (Machine Learning)',
    description:
      'Nền tảng của học máy: Học có giám sát với dữ liệu gán nhãn, học không giám sát tìm quy luật ẩn và học tăng cường tối ưu phần thưởng.',
    iconName: 'GitBranch',
    importance: 'Rất quan trọng',
    keyPoints: [
      'Học có giám sát: Bài toán hồi quy (Regression) và phân loại (Classification)',
      'Học không giám sát: Phân cụm (Clustering k-means) và giảm chiều dữ liệu (PCA)',
      'Học tăng cường: Tương tác môi trường dựa trên hàm phần thưởng (Reward signal)',
    ],
  },
  {
    id: 'topic-3',
    title: 'Mạng Nơ-ron & Tối ưu hóa',
    description:
      'Cơ chế hoạt động của Perceptron, hàm kích hoạt phi tuyến (ReLU, Sigmoid), lan truyền ngược và tối ưu bằng Gradient Descent.',
    iconName: 'Network',
    importance: 'Rất quan trọng',
    keyPoints: [
      'Cấu trúc mạng nơ-ron nhiều lớp (Multilayer Perceptron - MLP)',
      'Hàm kích hoạt (Activation Function) tạo tính phi tuyến tính',
      'Hàm mất mát (MSE, Cross-Entropy) và thuật toán lan truyền ngược Backpropagation',
    ],
  },
  {
    id: 'topic-4',
    title: 'Đạo đức, Giới hạn & Ảo giác của AI',
    description:
      'Phân tích hiện tượng quá khớp (Overfitting), hiện tượng ảo giác (Hallucination) ở LLM và trách nhiệm giải trình thuật toán.',
    iconName: 'ShieldAlert',
    importance: 'Quan trọng',
    keyPoints: [
      'Nhận diện Overfitting và kỹ thuật Regularization / Dropout',
      'Hiện tượng sinh dữ liệu sai lệch (Hallucination) và độ tin cậy',
      'Tính minh bạch, định kiến dữ liệu (Bias) và bảo vệ quyền riêng tư',
    ],
  },
];

export const KEY_CONCEPTS: ConceptItem[] = [
  {
    id: 'c-1',
    term: 'Machine Learning (Học máy)',
    definition:
      'Nhánh của AI cho phép máy tính tự học hỏi quy luật từ dữ liệu thực tế và nâng cao độ chính xác dự đoán mà không cần lập trình thủ công từng dòng lệnh điều kiện.',
    citation: 'Trang 8 — Mục 1.2',
    topicId: 'topic-1',
  },
  {
    id: 'c-2',
    term: 'Supervised Learning (Học có giám sát)',
    definition:
      'Phương pháp huấn luyện mô hình dựa trên tập dữ liệu đã có sẵn nhãn chuẩn (Ground Truth). Mô hình học ánh xạ từ đầu vào X sang đầu ra mong muốn Y.',
    citation: 'Trang 14 — Mục 2.1',
    topicId: 'topic-2',
  },
  {
    id: 'c-3',
    term: 'Loss Function (Hàm mất mát)',
    definition:
      'Hàm toán học định lượng khoảng cách sai số giữa kết quả dự đoán của mô hình và giá trị thực tế. Mục tiêu huấn luyện là giảm thiểu giá trị hàm này về mức tối thiểu.',
    citation: 'Trang 22 — Mục 3.2',
    topicId: 'topic-3',
  },
  {
    id: 'c-4',
    term: 'Backpropagation (Lan truyền ngược)',
    definition:
      'Thuật toán tính toán gradient của hàm mất mát tương ứng với từng trọng số thông qua quy tắc dây chuyền vi phân (chain rule), truyền ngược từ tầng ra về tầng vào.',
    citation: 'Trang 25 — Mục 3.3',
    topicId: 'topic-3',
  },
  {
    id: 'c-5',
    term: 'Overfitting (Quá khớp)',
    definition:
      'Tình trạng mô hình học quá chi tiết cả các chi tiết nhiễu trong tập huấn luyện, khiến mô hình đạt độ chính xác gần như tuyệt đối trên tập train nhưng dự đoán rất kém trên dữ liệu mới.',
    citation: 'Trang 29 — Mục 3.5',
    topicId: 'topic-4',
  },
  {
    id: 'c-6',
    term: 'Hallucination (Ảo giác AI)',
    definition:
      'Hiện tượng các mô hình ngôn ngữ lớn tự tin đưa ra câu trả lời nghe rất thuyết phục nhưng thực chất hoàn toàn hư cấu hoặc sai lệch với dữ liệu thực tế.',
    citation: 'Trang 38 — Mục 4.2',
    topicId: 'topic-4',
  },
];

export const KEY_TAKEAWAYS: string[] = [
  'Học máy khác lập trình truyền thống: Lập trình truyền thống nhận Dữ liệu + Quy tắc để sinh Kết quả; Học máy nhận Dữ liệu + Kết quả để tự tìm ra Quy tắc.',
  'Tập dữ liệu luôn cần chia thành 3 phần độc lập: Tập huấn luyện (Train), Tập kiểm định (Validation) và Tập kiểm thử độc lập (Test).',
  'Hàm kích hoạt phi tuyến tính là yếu tố then chốt cho phép mạng nơ-ron xấp xỉ bất kỳ hàm toán học phức tạp nào (Universal Approximation Theorem).',
  'Để giải quyết Overfitting: Bổ sung thêm dữ liệu huấn luyện, áp dụng Dropout, chuẩn hóa L1/L2 hoặc đơn giản hóa kiến trúc mạng.',
  'Luôn giữ tư duy phản biện khi sử dụng đầu ra từ AI: AI là công cụ hỗ trợ tăng tốc, không thay thế việc kiểm chứng nguồn tài liệu gốc.',
];

export const SOURCE_REFERENCES: SourceReference[] = [
  {
    id: 'ref-1',
    page: 'Trang 8',
    section: 'Mục 1.2: Định nghĩa và Phân loại AI',
    title: 'Sơ đồ so sánh Lập trình truyền thống và Học máy',
    excerpt:
      '"Học máy mang lại bước ngoặt căn bản: thay vì kỹ sư phải viết hàng nghìn luật if-else, giải thuật tối ưu hóa sẽ điều chỉnh các tham số số học để mô hình tự khái quát hóa quy luật..."',
    conceptTerm: 'Machine Learning (Học máy)',
  },
  {
    id: 'ref-2',
    page: 'Trang 14',
    section: 'Mục 2.1: Học có giám sát (Supervised Learning)',
    title: 'Phân loại bài toán Hồi quy và Phân loại nhị phân',
    excerpt:
      '"Trong học có giám sát, mỗi mẫu dữ liệu đầu vào đều đi kèm một nhãn mục tiêu cụ thể. Sai lệch giữa dự đoán và nhãn sẽ được đưa vào hàm tổn thất để điều chỉnh mô hình..."',
    conceptTerm: 'Supervised Learning',
  },
  {
    id: 'ref-3',
    page: 'Trang 22',
    section: 'Mục 3.2: Hàm mục tiêu và Hàm tổn thất',
    title: 'Bảng công thức Mean Squared Error và Binary Cross-Entropy',
    excerpt:
      '"Hàm mất mát đóng vai trò bề mặt địa hình; giải thuật Gradient Descent giống như người leo núi tìm đường đi xuống thung lũng có độ cao thấp nhất..."',
    conceptTerm: 'Loss Function (Hàm mất mát)',
  },
  {
    id: 'ref-4',
    page: 'Trang 38',
    section: 'Mục 4.2: Độ tin cậy và Hiện tượng Ảo giác ở LLM',
    title: 'Phân tích cơ chế sinh xác suất từ tiếp theo',
    excerpt:
      '"Bản chất của mô hình sinh là tối ưu hóa xác suất từ kế tiếp, không phải là cơ sở dữ liệu chân lý. Do đó, hiện tượng ảo giác có thể xuất hiện khi mô hình nối ghép các thông tin có vẻ hợp lý nhưng không có thật..."',
    conceptTerm: 'Hallucination (Ảo giác AI)',
  },
];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Điểm khác biệt căn bản nhất giữa phương pháp Học máy (Machine Learning) và Lập trình truyền thống là gì?',
    options: [
      'Lập trình truyền thống cần dữ liệu lớn, còn Học máy chỉ cần một vài ví dụ đơn giản.',
      'Lập trình truyền thống đưa vào Dữ liệu + Quy tắc để sinh Kết quả; Học máy đưa vào Dữ liệu + Kết quả để mô hình tự học ra Quy tắc.',
      'Học máy chỉ chạy được trên phần cứng máy tính lượng tử, lập trình truyền thống chạy trên CPU thông thường.',
      'Lập trình truyền thống không thể tạo ra lỗi, còn Học máy luôn có sai số 50%.',
    ],
    correctAnswer: 1,
    explanation:
      'Theo Trang 8 (Mục 1.2), lập trình truyền thống yêu cầu con người xây dựng quy tắc tường minh. Ngược lại, học máy đưa vào dữ liệu đầu vào và kết quả mong muốn để thuật toán tự động học ra hàm quy tắc ánh xạ.',
    topic: 'Tổng quan & Lịch sử AI',
    difficulty: 'Dễ',
    citation: 'Trang 8 — Mục 1.2',
  },
  {
    id: 2,
    question:
      'Đặc trưng cốt lõi của phương pháp Học có giám sát (Supervised Learning) là gì?',
    options: [
      'Mô hình tự khám phá các cụm dữ liệu mà không cần bất kỳ sự can thiệp hay hướng dẫn nào.',
      'Dữ liệu huấn luyện bắt buộc phải có cặp đầu vào (Features) đi kèm nhãn mục tiêu (Labels / Ground Truth).',
      'Mô hình học thông qua các hành động tương tác với môi trường để tối đa hóa điểm thưởng tích lũy.',
      'Chỉ áp dụng được cho việc xử lý ảnh và video, không áp dụng được cho dữ liệu bảng hay văn bản.',
    ],
    correctAnswer: 1,
    explanation:
      'Theo Trang 14 (Mục 2.1), học có giám sát đòi hỏi tập dữ liệu phải được gán nhãn trước (labeled dataset) để tính toán sai lệch giữa giá trị dự đoán và nhãn thực tế.',
    topic: 'Các nhánh Học máy (Machine Learning)',
    difficulty: 'Dễ',
    citation: 'Trang 14 — Mục 2.1',
  },
  {
    id: 3,
    question:
      'Trong quá trình huấn luyện mạng nơ-ron, Hàm mất mát (Loss Function) đóng vai trò gì?',
    options: [
      'Tự động tăng tốc độ xử lý phần cứng của GPU.',
      'Định lượng mức độ sai khác giữa đầu ra dự đoán của mạng và nhãn thực tế, làm căn cứ để giải thuật tối ưu cập nhật trọng số.',
      'Nén kích thước file mô hình để tải lên web nhanh hơn.',
      'Xóa bỏ hoàn toàn các nơ-ron không hoạt động trong tầng ẩn.',
    ],
    correctAnswer: 1,
    explanation:
      'Theo Trang 22 (Mục 3.2), hàm mất mát đo lường sai số dự đoán. Thuật toán lan truyền ngược (Backpropagation) sẽ tính đạo hàm của hàm này để định hướng việc điều chỉnh trọng số thông qua Gradient Descent.',
    topic: 'Mạng Nơ-ron & Tối ưu hóa',
    difficulty: 'Trung bình',
    citation: 'Trang 22 — Mục 3.2',
  },
  {
    id: 4,
    question:
      'Hiện tượng Quá khớp (Overfitting) xảy ra khi nào và biện pháp nào dưới đây giúp giảm thiểu nó hiệu quả?',
    options: [
      'Xảy ra khi mô hình quá đơn giản; khắc phục bằng cách tăng thêm số lượng tầng nơ-ron lên gấp đôi.',
      'Xảy ra khi mô hình học thuộc lòng cả nhiễu của tập huấn luyện; khắc phục bằng kỹ thuật Dropout, Regularization hoặc bổ sung dữ liệu.',
      'Xảy ra khi tập dữ liệu có quá nhiều nhãn khác nhau; khắc phục bằng cách xóa bỏ tập kiểm thử Test.',
      'Xảy ra khi tốc độ mạng Internet chập chờn trong lúc truyền tải trọng số.',
    ],
    correctAnswer: 1,
    explanation:
      'Theo Trang 29 (Mục 3.5), Overfitting là hiện tượng mô hình khớp quá mức với tập train (bao gồm cả nhiễu ngẫu nhiên) khiến độ chính xác trên dữ liệu mới kém. Các giải pháp chuẩn là áp dụng Dropout, điều chuẩn L1/L2 và kiểm định chéo.',
    topic: 'Đạo đức, Giới hạn & Ảo giác của AI',
    difficulty: 'Trung bình',
    citation: 'Trang 29 — Mục 3.5',
  },
  {
    id: 5,
    question:
      'Trong ngữ cảnh các mô hình ngôn ngữ lớn (LLM), hiện tượng "Ảo giác" (Hallucination) thể hiện qua hành vi nào?',
    options: [
      'Màn hình hiển thị hình ảnh đồ họa 3D xoay vòng gây ảo thị cho người dùng.',
      'Mô hình sinh ra các câu trả lời sai sự thật hoặc thông tin hoàn toàn hư cấu nhưng được trình bày với giọng điệu rất tự tin và hợp lý.',
      'Mô hình từ chối trả lời mọi câu hỏi liên quan đến lịch sử khoa học.',
      'Mô hình tự động tắt máy tính khi gặp phải câu hỏi toán học khó.',
    ],
    correctAnswer: 1,
    explanation:
      'Theo Trang 38 (Mục 4.2), ảo giác AI xảy ra do mô hình tối ưu theo xác suất kết hợp chuỗi từ ngữ thay vì truy xuất cơ sở dữ liệu chân lý. Do đó người học cần luôn đối chiếu nội dung với tài liệu gốc.',
    topic: 'Đạo đức, Giới hạn & Ảo giác của AI',
    difficulty: 'Khó',
    citation: 'Trang 38 — Mục 4.2',
  },
];

export const INITIAL_STUDY_HISTORY: QuizSessionResult[] = [
  {
    id: 'session-01',
    docName: 'Nhập môn Trí tuệ nhân tạo.pdf',
    date: '26/10/2026, 20:30',
    score: 4,
    total: 5,
    percentage: 80,
    userAnswers: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1 },
    timeSpent: '3 phút 45 giây',
    weakTopics: ['Đạo đức, Giới hạn & Ảo giác của AI'],
  },
  {
    id: 'session-02',
    docName: 'Cấu trúc dữ liệu & Giải thuật.docx',
    date: '25/10/2026, 16:15',
    score: 9,
    total: 10,
    percentage: 90,
    userAnswers: {},
    timeSpent: '7 phút 10 giây',
    weakTopics: ['Đồ thị và Cây nhị phân'],
  },
  {
    id: 'session-03',
    docName: 'Nhập môn Trí tuệ nhân tạo.pdf',
    date: '24/10/2026, 10:05',
    score: 3,
    total: 5,
    percentage: 60,
    userAnswers: { 1: 1, 2: 0, 3: 1, 4: 0, 5: 1 },
    timeSpent: '4 phút 20 giây',
    weakTopics: ['Các nhánh Học máy (Machine Learning)', 'Đạo đức, Giới hạn & Ảo giác của AI'],
  },
];

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '25mb' }));

// Server-side Google GenAI initialization
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Multi-turn StudyAI Tutor Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ' });
    }

    if (ai) {
      // Build conversation contents
      const systemInstruction =
        'Bạn là Trợ lý Học tập StudyAI thông minh, thân thiện dành cho sinh viên đại học. Bạn hỗ trợ giải thích rõ ràng các khái niệm học thuật trong tài liệu "Nhập môn Trí tuệ nhân tạo.pdf" (Học máy, học có giám sát, hàm mất mát, lan truyền ngược, hiện tượng Overfitting, mô hình ngôn ngữ lớn LLM và ảo giác Hallucination), đưa ra ví dụ trực quan dễ hiểu, mẹo ghi nhớ cho bài thi và nhắc nhở sinh viên đối chiếu tài liệu gốc. Trả lời bằng tiếng Việt chuẩn mực, mạch lạc, định dạng danh sách rõ ràng.';

      // Format past history if provided
      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.role === 'user' || item.role === 'assistant') {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text }],
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Rất tiếc, mình chưa thể đưa ra câu trả lời lúc này.';
      return res.json({ reply, model: 'gemini-3.8-flash' });
    }

    // High quality intelligent fallback if no API key is present
    const qLower = message.toLowerCase();
    let fallbackReply = '';

    if (qLower.includes('overfitting') || qLower.includes('quá khớp')) {
      fallbackReply =
        '**Hiện tượng Overfitting (Quá khớp)** xảy ra khi mô hình học thuộc lòng cả các chi tiết nhiễu trong tập dữ liệu huấn luyện, khiến điểm số trên tập train rất cao nhưng dự đoán rất kém trên dữ liệu mới.\n\n💡 **Cách khắc phục chính (Trang 29 - Mục 3.5):**\n1. **Bổ sung dữ liệu huấn luyện:** Cung cấp thêm mẫu dữ liệu đa dạng.\n2. **Kỹ thuật Dropout:** Tạm thời ngắt ngẫu nhiên một tỷ lệ nơ-ron trong quá trình train.\n3. **Regularization (L1/L2):** Phạt các trọng số có độ lớn bất thường.\n4. **Đơn giản hóa mô hình:** Giảm bớt số lượng tầng ẩn hoặc tham số.';
    } else if (qLower.includes('giám sát') || qLower.includes('supervised')) {
      fallbackReply =
        '**Học có giám sát (Supervised Learning)** là phương pháp mà tập dữ liệu bắt buộc phải có cặp đầu vào (Features) đi kèm nhãn mục tiêu (Labels) được gán từ trước.\n\n📌 **Hai bài toán tiêu biểu (Trang 14 - Mục 2.1):**\n- **Hồi quy (Regression):** Dự đoán giá trị liên tục (ví dụ: dự đoán giá nhà, nhiệt độ).\n- **Phân loại (Classification):** Dự đoán nhãn rời rạc (ví dụ: phân loại email rác / hợp lệ, chẩn đoán bệnh).';
    } else if (qLower.includes('hàm mất mát') || qLower.includes('loss')) {
      fallbackReply =
        '**Hàm mất mát (Loss Function)** đo lường độ sai lệch giữa đầu ra dự đoán của mô hình và nhãn thực tế.\n\n🎯 **Ý nghĩa cốt lõi (Trang 22 - Mục 3.2):**\nNó đóng vai trò như chiếc la bàn chỉ đường; giải thuật Gradient Descent sẽ dựa vào đạo hàm (gradient) của hàm mất mát để điều chỉnh các trọng số mạng nơ-ron về trạng thái tối ưu nhất.';
    } else if (qLower.includes('ảo giác') || qLower.includes('hallucination')) {
      fallbackReply =
        '**Ảo giác AI (Hallucination)** là hiện tượng các mô hình sinh (như LLM) tạo ra thông tin hư cấu hoặc sai lệch nhưng lại trình bày với giọng điệu rất tự tin và hợp lý.\n\n⚠️ **Mẹo ôn tập (Trang 38 - Mục 4.2):**\nBản chất LLM là mô hình dự đoán xác suất từ kế tiếp, không phải cơ sở dữ liệu chân lý. Vì vậy người học luôn cần đối chiếu với tài liệu gốc!';
    } else {
      fallbackReply =
        `Chào bạn! Về câu hỏi "${message}", trong tài liệu "Nhập môn Trí tuệ nhân tạo.pdf", nội dung này liên quan mật thiết đến quá trình xây dựng và tối ưu mô hình học máy. Bạn có thể xem thêm tại Mục 2 & Mục 3 của tài liệu để nắm chắc công thức và ví dụ thực tế nhé!`;
    }

    return res.json({ reply: fallbackReply, model: 'demo-simulated' });
  } catch (error: any) {
    console.error('Lỗi API chat:', error);
    return res.status(500).json({
      error: 'Không thể xử lý yêu cầu trò chuyện',
      details: error.message,
    });
  }
});

// Image Analysis endpoint for photo of study notes / textbook page
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Thiếu dữ liệu hình ảnh' });
    }

    if (ai) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      const userPrompt =
        prompt ||
        'Hãy phân tích bức ảnh chụp tài liệu học tập này. Trích xuất: 1) Chủ đề chính, 2) Tóm tắt 3-4 ý cốt lõi, 3) 3 khái niệm quan trọng có trong ảnh, 4) 2 câu hỏi ôn tập gợi ý cho sinh viên. Trả lời bằng tiếng Việt chuẩn xác.';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: userPrompt,
            },
          ],
        },
      });

      return res.json({
        analysis: response.text || 'Đã phân tích ảnh thành công.',
        model: 'gemini-3.8-flash',
      });
    }

    // Realistic fallback analysis
    return res.json({
      analysis:
        '### 📑 Kết quả phân tích ảnh tài liệu (Mô phỏng AI Vision)\n\n' +
        '**1. Chủ đề nhận diện:** Sơ đồ kiến trúc Mạng Nơ-ron Nhân tạo (Artificial Neural Network) và Hàm mất mát.\n\n' +
        '**2. Các ý cốt lõi trích xuất:**\n' +
        '- Lớp đầu vào tiếp nhận các đặc trưng (features) $X_1, X_2, ..., X_n$.\n' +
        '- Lớp ẩn thực hiện phép biến đổi tuyến tính kết hợp hàm kích hoạt phi tuyến ReLU.\n' +
        '- Lớp đầu ra tính toán phân phối xác suất dự đoán thông qua Softmax.\n\n' +
        '**3. Khái niệm quan trọng:**\n' +
        '- **Tầng ẩn (Hidden Layer):** Nơi trích xuất đặc trưng bậc cao.\n' +
        '- **Trọng số (Weights & Biases):** Các tham số được cập nhật liên tục qua lan truyền ngược.\n\n' +
        '**4. Câu hỏi gợi ý ôn tập:**\n' +
        '- *Câu 1:* Tại sao nếu không dùng hàm kích hoạt phi tuyến, mạng nhiều tầng sẽ thoái hóa thành một mô hình tuyến tính đơn giản?\n' +
        '- *Câu 2:* Vai trò của hàm Softmax ở tầng cuối là gì?',
      model: 'demo-simulated',
    });
  } catch (error: any) {
    console.error('Lỗi phân tích ảnh:', error);
    return res.status(500).json({
      error: 'Không thể phân tích ảnh',
      details: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`StudyAI server running at http://localhost:${port}`);
  });
}

startServer();

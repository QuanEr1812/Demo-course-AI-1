import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScore,
  calculatePercentage,
  getEvaluationLevel,
  identifyWeakTopics,
  formatBytes,
} from './quiz.ts';
import { QuizQuestion } from '../types/index.ts';

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Học máy là gì?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    explanation: 'Giải thích',
    topic: 'Học máy cơ bản',
    difficulty: 'Dễ',
    citation: 'Trang 5',
  },
  {
    id: 2,
    question: 'Overfitting là hiện tượng gì?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    explanation: 'Giải thích',
    topic: 'Huấn luyện mô hình',
    difficulty: 'Trung bình',
    citation: 'Trang 18',
  },
  {
    id: 3,
    question: 'Hàm mất mát làm nhiệm vụ gì?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Giải thích',
    topic: 'Mạng nơ-ron',
    difficulty: 'Trung bình',
    citation: 'Trang 24',
  },
];

test('calculateScore accurately counts correct choices', () => {
  // All correct
  assert.deepEqual(calculateScore({ 1: 1, 2: 2, 3: 0 }, mockQuestions), {
    score: 3,
    total: 3,
  });

  // 2 out of 3 correct
  assert.deepEqual(calculateScore({ 1: 1, 2: 0, 3: 0 }, mockQuestions), {
    score: 2,
    total: 3,
  });

  // None correct
  assert.deepEqual(calculateScore({ 1: 3, 2: 3, 3: 3 }, mockQuestions), {
    score: 0,
    total: 3,
  });

  // Partial / missing answer
  assert.deepEqual(calculateScore({ 1: 1 }, mockQuestions), {
    score: 1,
    total: 3,
  });
});

test('calculatePercentage returns rounded percentage value', () => {
  assert.equal(calculatePercentage(3, 3), 100);
  assert.equal(calculatePercentage(4, 5), 80);
  assert.equal(calculatePercentage(1, 3), 33);
  assert.equal(calculatePercentage(0, 5), 0);
  assert.equal(calculatePercentage(0, 0), 0);
});

test('getEvaluationLevel categorizes performance properly', () => {
  assert.equal(getEvaluationLevel(100).label, 'Xuất sắc');
  assert.equal(getEvaluationLevel(80).label, 'Khá tốt');
  assert.equal(getEvaluationLevel(60).label, 'Đạt yêu cầu');
  assert.equal(getEvaluationLevel(40).label, 'Cần ôn lại thêm');
});

test('identifyWeakTopics flags topics with incorrect answers without duplicates', () => {
  // User got question 2 wrong
  const weak1 = identifyWeakTopics({ 1: 1, 2: 0, 3: 0 }, mockQuestions);
  assert.deepEqual(weak1, ['Huấn luyện mô hình']);

  // User got question 1 and 2 wrong
  const weak2 = identifyWeakTopics({ 1: 0, 2: 0, 3: 0 }, mockQuestions);
  assert.deepEqual(weak2, ['Học máy cơ bản', 'Huấn luyện mô hình']);
});

test('formatBytes formats file size units', () => {
  assert.equal(formatBytes(500), '500 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(1887436), '1.8 MB');
});

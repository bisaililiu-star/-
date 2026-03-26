const taxonomy = [
  {
    id: "math",
    name: "数学",
    description: "基础运算、函数与几何",
    subcategories: [
      { id: "algebra", name: "代数基础" },
      { id: "geometry", name: "平面几何" },
      { id: "function", name: "函数与图像" },
    ],
  },
  {
    id: "chinese",
    name: "语文",
    description: "现代文、文言文与写作",
    subcategories: [
      { id: "reading", name: "阅读理解" },
      { id: "classical", name: "文言文" },
      { id: "writing", name: "作文表达" },
    ],
  },
  {
    id: "english",
    name: "英语",
    description: "词汇语法与阅读",
    subcategories: [
      { id: "vocabulary", name: "词汇与短语" },
      { id: "grammar", name: "语法填空" },
      { id: "reading", name: "阅读理解" },
    ],
  },
];

const questions = [
  {
    id: "q_math_1",
    moduleId: "math",
    subcategoryId: "algebra",
    stem: "已知 2x + 5 = 15，求 x 的值。",
    options: ["A. 4", "B. 5", "C. 6", "D. 7"],
    answer: 1,
    analysis: "将常数项移到右边：2x=10，所以 x=5。",
  },
  {
    id: "q_math_2",
    moduleId: "math",
    subcategoryId: "geometry",
    stem: "一个三角形的三个内角和为多少度？",
    options: ["A. 90°", "B. 180°", "C. 270°", "D. 360°"],
    answer: 1,
    analysis: "任意三角形内角和恒为 180°。",
  },
  {
    id: "q_math_3",
    moduleId: "math",
    subcategoryId: "function",
    stem: "函数 y = 2x + 1 中，当 x=3 时，y 等于多少？",
    options: ["A. 5", "B. 6", "C. 7", "D. 8"],
    answer: 2,
    analysis: "代入 x=3 得 y=2×3+1=7。",
  },
  {
    id: "q_chinese_1",
    moduleId: "chinese",
    subcategoryId: "reading",
    stem: "阅读题中“中心思想”通常指什么？",
    options: [
      "A. 作者的写作速度",
      "B. 文章的核心观点和情感",
      "C. 文章字数",
      "D. 文章发布时间",
    ],
    answer: 1,
    analysis: "中心思想是文章想表达的核心观点与情感。",
  },
  {
    id: "q_chinese_2",
    moduleId: "chinese",
    subcategoryId: "classical",
    stem: "“学而时习之，不亦说乎”中的“说”意思是？",
    options: ["A. 说话", "B. 高兴", "C. 解释", "D. 记忆"],
    answer: 1,
    analysis: "古文中“说”通“悦”，表示高兴。",
  },
  {
    id: "q_english_1",
    moduleId: "english",
    subcategoryId: "vocabulary",
    stem: "选择与“important”意思最接近的单词。",
    options: ["A. tiny", "B. critical", "C. noisy", "D. simple"],
    answer: 1,
    analysis: "critical 在此语境下可表示“重要的”。",
  },
  {
    id: "q_english_2",
    moduleId: "english",
    subcategoryId: "grammar",
    stem: "She ____ to school every day.",
    options: ["A. go", "B. goes", "C. going", "D. gone"],
    answer: 1,
    analysis: "主语 She 为第三人称单数，动词用 goes。",
  },
];

module.exports = {
  taxonomy,
  questions,
};

const { taxonomy, questions } = require("../data/questions");

const STORAGE_KEY = "XJTK_STATE_V1";

/**
 * 构造默认状态。
 *
 * @returns {{
 *  favorites: string[],
 *  wrongQuestions: string[],
 *  uploadRecords: Array<{ id: string, imagePath: string, note: string, createdAt: string, uploadType: "single" | "paper" }>
 * }}
 */
function getDefaultState() {
  return {
    favorites: [],
    wrongQuestions: [],
    uploadRecords: [],
  };
}

/**
 * 读取持久化状态。
 *
 * @returns {ReturnType<typeof getDefaultState>}
 */
function getState() {
  return wx.getStorageSync(STORAGE_KEY) || getDefaultState();
}

/**
 * 保存持久化状态。
 *
 * @param {ReturnType<typeof getDefaultState>} nextState 状态对象
 * @returns {void}
 */
function setState(nextState) {
  wx.setStorageSync(STORAGE_KEY, nextState);
}

/**
 * 初始化缓存数据。
 *
 * @returns {void}
 */
function bootstrap() {
  const state = wx.getStorageSync(STORAGE_KEY);
  if (!state) {
    setState(getDefaultState());
  }
}

/**
 * 获取一级分类列表。
 *
 * @returns {Array}
 */
function getModules() {
  return taxonomy;
}

/**
 * 按一级分类获取二级分类。
 *
 * @param {string} moduleId 一级分类 ID
 * @returns {Array<{id: string, name: string}>}
 */
function getSubcategories(moduleId) {
  const moduleItem = taxonomy.find((item) => item.id === moduleId);
  return moduleItem ? moduleItem.subcategories : [];
}

/**
 * 根据条件获取题目。
 *
 * @param {{
 *  moduleId?: string,
 *  subcategoryId?: string,
 *  mode?: "normal" | "wrong" | "favorite"
 * }} params 查询参数
 * @returns {Array}
 */
function getQuestions(params = {}) {
  const { moduleId, subcategoryId, mode = "normal" } = params;
  const state = getState();
  let result = questions.slice();

  if (moduleId) {
    result = result.filter((item) => item.moduleId === moduleId);
  }
  if (subcategoryId) {
    result = result.filter((item) => item.subcategoryId === subcategoryId);
  }
  if (mode === "wrong") {
    result = result.filter((item) => state.wrongQuestions.includes(item.id));
  }
  if (mode === "favorite") {
    result = result.filter((item) => state.favorites.includes(item.id));
  }

  return result;
}

/**
 * 获取题目详情。
 *
 * @param {string} questionId 题目 ID
 * @returns {object | undefined}
 */
function getQuestionById(questionId) {
  return questions.find((item) => item.id === questionId);
}

/**
 * 切换收藏状态。
 *
 * @param {string} questionId 题目 ID
 * @returns {boolean} 是否收藏
 */
function toggleFavorite(questionId) {
  const state = getState();
  const hasFavorite = state.favorites.includes(questionId);
  const nextFavorites = hasFavorite
    ? state.favorites.filter((id) => id !== questionId)
    : state.favorites.concat(questionId);
  setState({ ...state, favorites: nextFavorites });
  return !hasFavorite;
}

/**
 * 添加错题记录（幂等）。
 *
 * @param {string} questionId 题目 ID
 * @returns {void}
 */
function markWrong(questionId) {
  const state = getState();
  if (state.wrongQuestions.includes(questionId)) {
    return;
  }
  setState({
    ...state,
    wrongQuestions: state.wrongQuestions.concat(questionId),
  });
}

/**
 * 从错题本中移除题目。
 *
 * @param {string} questionId 题目 ID
 * @returns {void}
 */
function unmarkWrong(questionId) {
  const state = getState();
  setState({
    ...state,
    wrongQuestions: state.wrongQuestions.filter((id) => id !== questionId),
  });
}

/**
 * 判断题目是否收藏。
 *
 * @param {string} questionId 题目 ID
 * @returns {boolean}
 */
function isFavorite(questionId) {
  return getState().favorites.includes(questionId);
}

/**
 * 保存拍照上传记录。
 *
 * @param {{ imagePath: string, note: string, uploadType?: "single" | "paper" }} payload 上传信息
 * @returns {void}
 */
function addUploadRecord(payload) {
  const state = getState();
  const record = {
    id: `upload_${Date.now()}`,
    imagePath: payload.imagePath,
    note: payload.note || "",
    uploadType: payload.uploadType || "single",
    createdAt: new Date().toISOString(),
  };
  setState({
    ...state,
    uploadRecords: [record].concat(state.uploadRecords).slice(0, 50),
  });
}

/**
 * 获取上传记录。
 *
 * @returns {Array<{ id: string, imagePath: string, note: string, createdAt: string, uploadType: "single" | "paper" }>}
 */
function getUploadRecords() {
  return getState().uploadRecords;
}

/**
 * 获取统计数据。
 *
 * @returns {{ favoriteCount: number, wrongCount: number, uploadCount: number, totalQuestionCount: number }}
 */
function getStats() {
  const state = getState();
  return {
    favoriteCount: state.favorites.length,
    wrongCount: state.wrongQuestions.length,
    uploadCount: state.uploadRecords.length,
    totalQuestionCount: questions.length,
  };
}

module.exports = {
  bootstrap,
  getModules,
  getSubcategories,
  getQuestions,
  getQuestionById,
  toggleFavorite,
  markWrong,
  unmarkWrong,
  isFavorite,
  addUploadRecord,
  getUploadRecords,
  getStats,
};

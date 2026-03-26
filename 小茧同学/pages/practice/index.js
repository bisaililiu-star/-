const questionStore = require("../../store/questionStore");

/**
 * 练习页逻辑。
 *
 * @returns {WechatMiniprogram.Page.Instance<any, any>}
 */
Page({
  data: {
    moduleId: "",
    moduleName: "",
    subcategoryId: "",
    subcategoryName: "",
    mode: "normal",
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedIndex: -1,
    showAnalysis: false,
    submitResultText: "",
    isFavorite: false,
  },

  /**
   * 页面初始化，读取刷题参数并加载题目。
   *
   * @param {{
   *  moduleId?: string,
   *  moduleName?: string,
   *  subcategoryId?: string,
   *  subcategoryName?: string,
   *  mode?: "normal" | "wrong" | "favorite"
   * }} options 路由参数
   * @returns {void}
   */
  onLoad(options) {
    const mode = options.mode || "normal";
    const moduleName = options.moduleName || "";
    const subcategoryName = options.subcategoryName || "";
    const navTitle = this.getNavTitle(mode, moduleName, subcategoryName);

    wx.setNavigationBarTitle({
      title: navTitle,
    });

    this.setData({
      moduleId: options.moduleId || "",
      moduleName,
      subcategoryId: options.subcategoryId || "",
      subcategoryName,
      mode,
    });

    this.loadQuestions();
  },

  /**
   * 生成页面标题。
   *
   * @param {"normal" | "wrong" | "favorite"} mode 练习模式
   * @param {string} moduleName 一级分类名称
   * @param {string} subcategoryName 二级分类名称
   * @returns {string}
   */
  getNavTitle(mode, moduleName, subcategoryName) {
    if (mode === "wrong") {
      return "错题练习";
    }
    if (mode === "favorite") {
      return "收藏练习";
    }
    if (subcategoryName) {
      return `${moduleName}-${subcategoryName}`;
    }
    if (moduleName) {
      return `${moduleName}-模块刷题`;
    }
    return "刷题";
  },

  /**
   * 拉取题目列表并设置当前题目。
   *
   * @returns {void}
   */
  loadQuestions() {
    const { moduleId, subcategoryId, mode } = this.data;
    const questions = questionStore.getQuestions({
      moduleId: moduleId || undefined,
      subcategoryId: subcategoryId || undefined,
      mode,
    });

    this.setData(
      {
        questions,
        currentIndex: 0,
        selectedIndex: -1,
        showAnalysis: false,
        submitResultText: "",
      },
      () => {
        this.syncCurrentQuestion();
      }
    );
  },

  /**
   * 同步当前题目信息。
   *
   * @returns {void}
   */
  syncCurrentQuestion() {
    const { questions, currentIndex } = this.data;
    const currentQuestion = questions[currentIndex] || null;
    const isFavorite = currentQuestion
      ? questionStore.isFavorite(currentQuestion.id)
      : false;
    this.setData({
      currentQuestion,
      isFavorite,
    });
  },

  /**
   * 选择题目选项。
   *
   * @param {WechatMiniprogram.CustomEvent<{index: number}>} event 组件事件
   * @returns {void}
   */
  onSelectOption(event) {
    const { index } = event.detail;
    this.setData({
      selectedIndex: index,
      submitResultText: "",
      showAnalysis: false,
    });
  },

  /**
   * 提交答案并记录错题。
   *
   * @returns {void}
   */
  submitAnswer() {
    const { selectedIndex, currentQuestion } = this.data;
    if (!currentQuestion) {
      return;
    }
    if (selectedIndex < 0) {
      wx.showToast({
        title: "请先选择答案",
        icon: "none",
      });
      return;
    }

    const isCorrect = selectedIndex === currentQuestion.answer;
    if (!isCorrect) {
      questionStore.markWrong(currentQuestion.id);
    } else {
      questionStore.unmarkWrong(currentQuestion.id);
    }

    this.setData({
      submitResultText: isCorrect ? "回答正确，继续加油！" : "回答错误，已加入错题本。",
      showAnalysis: true,
    });
  },

  /**
   * 切换当前题目收藏状态。
   *
   * @returns {void}
   */
  onToggleFavorite() {
    const { currentQuestion } = this.data;
    if (!currentQuestion) {
      return;
    }
    const nextStatus = questionStore.toggleFavorite(currentQuestion.id);
    this.setData({
      isFavorite: nextStatus,
    });
    wx.showToast({
      title: nextStatus ? "已收藏" : "已取消收藏",
      icon: "none",
    });
  },

  /**
   * 切换到下一题。
   *
   * @returns {void}
   */
  nextQuestion() {
    const { questions, currentIndex } = this.data;
    if (!questions.length) {
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      wx.showToast({
        title: "已经是最后一题",
        icon: "none",
      });
      return;
    }
    this.setData(
      {
        currentIndex: nextIndex,
        selectedIndex: -1,
        showAnalysis: false,
        submitResultText: "",
      },
      () => {
        this.syncCurrentQuestion();
      }
    );
  },

  /**
   * 切换到上一题。
   *
   * @returns {void}
   */
  prevQuestion() {
    const { currentIndex } = this.data;
    if (currentIndex <= 0) {
      wx.showToast({
        title: "已经是第一题",
        icon: "none",
      });
      return;
    }
    this.setData(
      {
        currentIndex: currentIndex - 1,
        selectedIndex: -1,
        showAnalysis: false,
        submitResultText: "",
      },
      () => {
        this.syncCurrentQuestion();
      }
    );
  },
});

const questionStore = require("../../store/questionStore");

/**
 * 首页逻辑。
 *
 * @returns {WechatMiniprogram.Page.Instance<any, any>}
 */
Page({
  data: {
    safeTop: 20,
    showUploadSheet: false,
    modules: [],
    stats: {
      favoriteCount: 0,
      wrongCount: 0,
      uploadCount: 0,
      totalQuestionCount: 0,
    },
    featureCards: [
      {
        key: "daily",
        title: "每日练习",
        icon: "⏰",
      },
      {
        key: "paper",
        title: "套卷练习",
        icon: "🪲",
      },
      {
        key: "smart",
        title: "智能组卷",
        icon: "🍃",
      },
      {
        key: "wrong",
        title: "错题收敛",
        icon: "⭐",
      },
    ],
  },

  /**
   * 页面加载时初始化安全区高度。
   *
   * @returns {void}
   */
  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      safeTop: systemInfo.statusBarHeight || 20,
    });
  },

  /**
   * 页面显示时刷新数据。
   *
   * @returns {void}
   */
  onShow() {
    this.refreshPageData();
  },

  /**
   * 拉取首页模块和统计信息。
   *
   * @returns {void}
   */
  refreshPageData() {
    this.setData({
      modules: questionStore.getModules(),
      stats: questionStore.getStats(),
    });
  },

  /**
   * 处理首页功能卡点击。
   *
   * @param {WechatMiniprogram.BaseEvent<{featureKey: string}>} event 事件对象
   * @returns {void}
   */
  onFeatureTap(event) {
    const { featureKey } = event.currentTarget.dataset;
    const { modules } = this.data;
    const firstModule = modules[0];

    if (featureKey === "daily") {
      this.goModulePractice(firstModule);
      return;
    }
    if (featureKey === "paper") {
      this.goSubcategoryByModule(firstModule);
      return;
    }
    if (featureKey === "smart") {
      wx.showToast({
        title: "智能组卷演示模式",
        icon: "none",
      });
      this.goModulePractice(firstModule);
      return;
    }
    if (featureKey === "wrong") {
      wx.navigateTo({
        url: "/pages/practice/index?mode=wrong",
      });
      return;
    }
    wx.showToast({
      title: "功能开发中",
      icon: "none",
    });
  },

  /**
   * 通过模块信息进入二级分类页。
   *
   * @param {{id: string, name: string} | undefined} moduleItem 模块信息
   * @returns {void}
   */
  goSubcategoryByModule(moduleItem) {
    if (!moduleItem) {
      wx.showToast({
        title: "暂无模块数据",
        icon: "none",
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/subcategory/index?moduleId=${moduleItem.id}&moduleName=${moduleItem.name}`,
    });
  },

  /**
   * 通过模块信息进入模块刷题。
   *
   * @param {{id: string, name: string} | undefined} moduleItem 模块信息
   * @returns {void}
   */
  goModulePractice(moduleItem) {
    if (!moduleItem) {
      wx.showToast({
        title: "暂无题目可练习",
        icon: "none",
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/practice/index?moduleId=${moduleItem.id}&moduleName=${moduleItem.name}&mode=normal`,
    });
  },

  /**
   * 打开上传方式选择弹层。
   *
   * @returns {void}
   */
  openUploadSheet() {
    this.setData({
      showUploadSheet: true,
    });
  },

  /**
   * 关闭上传方式选择弹层。
   *
   * @returns {void}
   */
  closeUploadSheet() {
    this.setData({
      showUploadSheet: false,
    });
  },

  /**
   * 阻止弹层内部点击冒泡。
   *
   * @returns {void}
   */
  noop() {},

  /**
   * 选择上传类型并跳转上传页。
   *
   * @param {WechatMiniprogram.BaseEvent<{uploadType: "single" | "paper"}>} event 事件对象
   * @returns {void}
   */
  onSelectUploadType(event) {
    const { uploadType } = event.currentTarget.dataset;
    this.setData({
      showUploadSheet: false,
    });
    wx.navigateTo({
      url: `/pages/upload/index?uploadType=${uploadType}`,
    });
  },

  /**
   * 跳转到我的练习页。
   *
   * @returns {void}
   */
  goMy() {
    wx.navigateTo({
      url: "/pages/my/index",
    });
  },

  /**
   * 顶部身份切换占位事件。
   *
   * @returns {void}
   */
  onRoleTap() {
    wx.showToast({
      title: "当前为学生模式",
      icon: "none",
    });
  },
});

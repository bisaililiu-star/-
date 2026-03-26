const questionStore = require("../../store/questionStore");

Page({
  data: {
    moduleId: "",
    moduleName: "",
    subcategories: [],
  },

  /**
   * 页面加载时拉取模块对应二级分类。
   *
   * @param {{ moduleId: string, moduleName: string }} options 路由参数
   * @returns {void}
   */
  onLoad(options) {
    const moduleId = options.moduleId || "";
    const moduleName = options.moduleName || "二级分类";
    wx.setNavigationBarTitle({
      title: `${moduleName} · 二级分类`,
    });

    this.setData({
      moduleId,
      moduleName,
      subcategories: questionStore.getSubcategories(moduleId),
    });
  },

  /**
   * 按二级分类进入刷题页。
   *
   * @param {WechatMiniprogram.BaseEvent<{subcategoryId: string, subcategoryName: string}>} event 事件对象
   * @returns {void}
   */
  goPractice(event) {
    const { subcategoryId, subcategoryName } = event.currentTarget.dataset;
    const { moduleId, moduleName } = this.data;
    wx.navigateTo({
      url: `/pages/practice/index?moduleId=${moduleId}&moduleName=${moduleName}&subcategoryId=${subcategoryId}&subcategoryName=${subcategoryName}&mode=normal`,
    });
  },

  /**
   * 进入模块全量刷题（不限制二级分类）。
   *
   * @returns {void}
   */
  goModulePractice() {
    const { moduleId, moduleName } = this.data;
    wx.navigateTo({
      url: `/pages/practice/index?moduleId=${moduleId}&moduleName=${moduleName}&mode=normal`,
    });
  },
});

const questionStore = require("../../store/questionStore");

Page({
  data: {
    modules: [],
    stats: {
      favoriteCount: 0,
      wrongCount: 0,
      uploadCount: 0,
      totalQuestionCount: 0,
    },
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
   * 跳转到二级分类页。
   *
   * @param {WechatMiniprogram.BaseEvent<{moduleId: string, moduleName: string}>} event 事件对象
   * @returns {void}
   */
  goSubcategory(event) {
    const { moduleId, moduleName } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/subcategory/index?moduleId=${moduleId}&moduleName=${moduleName}`,
    });
  },

  /**
   * 跳转到拍照上传页。
   *
   * @returns {void}
   */
  goUpload() {
    wx.navigateTo({
      url: "/pages/upload/index",
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
});

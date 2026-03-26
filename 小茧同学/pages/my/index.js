const questionStore = require("../../store/questionStore");

/**
 * 我的练习页面。
 *
 * @returns {WechatMiniprogram.Page.Instance<any, any>}
 */
Page({
  data: {
    stats: {
      favoriteCount: 0,
      wrongCount: 0,
      uploadCount: 0,
      totalQuestionCount: 0,
    },
    recentUploads: [],
  },

  /**
   * 页面展示时刷新统计信息。
   *
   * @returns {void}
   */
  onShow() {
    this.refreshData();
  },

  /**
   * 拉取统计和近期上传记录。
   *
   * @returns {void}
   */
  refreshData() {
    this.setData({
      stats: questionStore.getStats(),
      recentUploads: questionStore.getUploadRecords().slice(0, 3),
    });
  },

  /**
   * 进入错题练习模式。
   *
   * @returns {void}
   */
  goWrongPractice() {
    wx.navigateTo({
      url: "/pages/practice/index?mode=wrong",
    });
  },

  /**
   * 进入收藏练习模式。
   *
   * @returns {void}
   */
  goFavoritePractice() {
    wx.navigateTo({
      url: "/pages/practice/index?mode=favorite",
    });
  },

  /**
   * 跳转到拍照上传页查看完整记录。
   *
   * @returns {void}
   */
  goUpload() {
    wx.navigateTo({
      url: "/pages/upload/index",
    });
  },
});

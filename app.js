const questionStore = require("./store/questionStore");

/**
 * 小程序入口。
 *
 * @returns {void}
 */
App({
  /**
   * 小程序初始化生命周期。
   *
   * @returns {void}
   */
  onLaunch() {
    questionStore.bootstrap();
  },
  globalData: {
    appName: "小茧同学",
  },
});

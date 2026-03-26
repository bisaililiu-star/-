Component({
  properties: {
    question: {
      type: Object,
      value: null,
    },
    selectedIndex: {
      type: Number,
      value: -1,
    },
    showAnalysis: {
      type: Boolean,
      value: false,
    },
    isFavorite: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    /**
     * 触发选择选项事件。
     *
     * @param {WechatMiniprogram.BaseEvent<{index: number}>} event 事件对象
     * @returns {void}
     */
    onOptionTap(event) {
      const { index } = event.currentTarget.dataset;
      this.triggerEvent("selectoption", { index });
    },
    /**
     * 触发收藏切换事件。
     *
     * @returns {void}
     */
    onToggleFavorite() {
      this.triggerEvent("togglefavorite");
    },
  },
});

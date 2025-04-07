var ItemFactory = (function () {
  var lastIndex = 0;
  const type = {
    png: {
      width: 147,
      height: 203,
    },
    mp4: { width: 261, height: 203 },
    fbx: { width: 161, height: 217 },
    jpeg: { width: 161, height: 217 },
  };
  function generateRandomItems(count) {
    var items = [],
      i;
    for (i = 0; i < count; i++) {
      // 随机选择逻辑
      const keys = Object.keys(type);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      items[i] = {
        index: lastIndex++,
        style: {
          background: getRandomColor(),
        },
        type: randomKey,
        ...type[randomKey],
      };
    }
    return items;
  }

  function getRandomColor() {
    var colors = [
      "rgba(21,174,103,.5)",
      "rgba(245,163,59,.5)",
      "rgba(255,230,135,.5)",
      "rgba(194,217,78,.5)",
      "rgba(195,123,177,.5)",
      "rgba(125,205,244,.5)",
    ];
    return colors[~~(Math.random() * colors.length)];
  }

  return {
    get: generateRandomItems,
  };
})();

export { ItemFactory };

var horizontalLineProcessor = (() => {
  function calculate(vm, options, metas, rects) {
    let width = vm.$el.clientWidth;
    let total = metas.length;
    let top = 0;
    let offset = 0;
    while (offset < total) {
      let strategy = getRowStrategy(width, options, metas, offset);
      for (let i = 0, left = 0, meta, rect; i < strategy.count; i++) {
        meta = metas[offset + i];
        rect = rects[offset + i];
        rect.top = top;
        rect.left = strategy.left + left;
        rect.width = (meta.width * strategy.height) / meta.height;
        rect.height = strategy.height;
        left += rect.width;
      }
      offset += strategy.count;
      top += strategy.height;
    }
    vm.$el.style.height = top + "px";
  }

  function getRowStrategy(width, options, metas, offset) {
    let greedyCount = getGreedyCount(width, options.lineGap, metas, offset);
    let lazyCount = Math.max(greedyCount - 1, 1);
    let greedySize = getContentSize(width, options, metas, offset, greedyCount);
    let lazySize = getContentSize(width, options, metas, offset, lazyCount);
    let finalSize = chooseFinalSize(lazySize, greedySize, width);
    let height = finalSize.height;
    let fitContentWidth = finalSize.width;
    if (finalSize.count === 1) {
      fitContentWidth = Math.min(options.singleMaxWidth, width);
      height = (metas[offset].height * fitContentWidth) / metas[offset].width;
    }
    return {
      left: getLeft(width, fitContentWidth, options.align),
      count: finalSize.count,
      height: height,
    };
  }

  function getGreedyCount(rowWidth, rowHeight, metas, offset) {
    let count = 0;
    for (
      let i = offset, width = 0;
      i < metas.length && width <= rowWidth;
      i++
    ) {
      width += (metas[i].width * rowHeight) / metas[i].height;
      count++;
    }
    return count;
  }

  function getContentSize(rowWidth, options, metas, offset, count) {
    let originWidth = 0;
    for (let i = count - 1; i >= 0; i--) {
      let meta = metas[offset + i];
      originWidth += (meta.width * options.lineGap) / meta.height;
    }
    let fitHeight = (options.lineGap * rowWidth) / originWidth;
    let canFit =
      fitHeight <= options.maxLineGap && fitHeight >= options.minLineGap;
    if (canFit) {
      return {
        cost: Math.abs(options.lineGap - fitHeight),
        count: count,
        width: rowWidth,
        height: fitHeight,
      };
    } else {
      let height =
        originWidth > rowWidth ? options.minLineGap : options.maxLineGap;
      return {
        cost: Infinity,
        count: count,
        width: (originWidth * height) / options.lineGap,
        height: height,
      };
    }
  }

  function chooseFinalSize(lazySize, greedySize, rowWidth) {
    if (lazySize.cost === Infinity && greedySize.cost === Infinity) {
      return greedySize.width < rowWidth ? greedySize : lazySize;
    } else {
      return greedySize.cost >= lazySize.cost ? lazySize : greedySize;
    }
  }

  return {
    calculate,
  };
})();

var verticalLineProcessor = (() => {
  function calculate(vm, options, metas, rects) {
    let width = vm.$el.clientWidth;
    let grow = options.grow;
    let strategy = grow
      ? getRowStrategyWithGrow(width, grow)
      : getRowStrategy(width, options);
    let tops = getArrayFillWith(0, strategy.count);
    metas.forEach((meta, index) => {
      let offset = tops.reduce(
        (last, top, i) => (top < tops[last] ? i : last),
        0
      );
      let width = strategy.width[offset % strategy.count];
      let rect = rects[index];
      rect.top = tops[offset];
      rect.left =
        strategy.left + (offset ? sum(strategy.width.slice(0, offset)) : 0);
      rect.width = width;
      rect.height =
        meta.height * (options.fixedHeight ? 1 : width / meta.width);
      tops[offset] = tops[offset] + rect.height;
    });
    vm.$el.style.height = Math.max.apply(Math, tops) + "px";
  }

  function getRowStrategy(width, options) {
    // 首先计算理论上的列数：容器宽度 width 除以每列间隔 lineGap
    let count = width / options.lineGap;
    let slotWidth;
    // 单列特殊情况处理
    if (options.singleMaxWidth >= width) {
      count = 1;
      slotWidth = Math.max(width, options.minLineGap);
    } else {
      let maxContentWidth = options.maxLineGap * ~~count;
      let minGreedyContentWidth = options.minLineGap * ~~(count + 1);
      let canFit = maxContentWidth >= width;
      let canFitGreedy = minGreedyContentWidth <= width;
      if (canFit && canFitGreedy) {
        count = Math.round(count);
        slotWidth = width / count;
      } else if (canFit) {
        count = ~~count;
        slotWidth = width / count;
      } else if (canFitGreedy) {
        count = ~~(count + 1);
        slotWidth = width / count;
      } else {
        count = ~~count;
        slotWidth = options.maxLineGap;
      }
      if (count === 1) {
        slotWidth = Math.min(width, options.singleMaxWidth);
        slotWidth = Math.max(slotWidth, options.minLineGap);
      }
    }
    return {
      width: getArrayFillWith(slotWidth, count),
      count: count,
      left: getLeft(width, slotWidth * count, options.align),
    };
  }

  function getRowStrategyWithGrow(width, grow) {
    let total = sum(grow);
    return {
      width: grow.map((val) => (width * val) / total),
      count: grow.length,
      left: 0,
    };
  }

  return {
    calculate,
  };
})();

function getLeft(width, contentWidth, align) {
  switch (align) {
    case "right":
      return width - contentWidth;
    case "center":
      return (width - contentWidth) / 2;
    default:
      return 0;
  }
}

function getArrayFillWith(item, count) {
  let getter = typeof item === "function" ? () => item() : () => item;
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr[i] = getter();
  }
  return arr;
}

function sum(arr) {
  return arr.reduce((sum, val) => sum + val);
}

export { horizontalLineProcessor, verticalLineProcessor };

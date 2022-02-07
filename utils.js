const unitFeeRate = 0.003

const fees =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? usingUtVolume
        ? formattedNum(oneDayVolumeUntracked * unitFeeRate, true)
        : formattedNum(oneDayVolumeUSD * unitFeeRate, true)
      : '-'
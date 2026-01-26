export const calculateStatistics = (values: number[]) => {
  if (values.length === 0) {
    return { mean: 0, median: 0, mode: 0, stdDev: 0, min: 0, max: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const count = values.length;

  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  const mid = Math.floor(count / 2);
  const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const min = sorted[0];
  const max = sorted[count - 1];

  const frequency: Record<string, number> = {};
  let maxFreq = 0;
  let mode = sorted[0];

  for (const num of sorted) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  }

  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);

  return {
    mean,
    median,
    mode,
    stdDev,
    min,
    max,
  };
};
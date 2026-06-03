import type { OccupancyChartRow } from "./map-dashboard-charts";

const CHAR_WIDTH_PX = 7;
const Y_AXIS_WIDTH_MIN = 88;
const Y_AXIS_WIDTH_MAX = 220;
const BAR_ROW_HEIGHT_PX = 36;
const CHART_HEIGHT_MIN = 280;

export const getOccupancyYAxisWidth = (data: OccupancyChartRow[]): number => {
  const longestNameLength = data.reduce(
    (max, row) => Math.max(max, row.name.length),
    0
  );

  return Math.min(
    Y_AXIS_WIDTH_MAX,
    Math.max(Y_AXIS_WIDTH_MIN, longestNameLength * CHAR_WIDTH_PX)
  );
};

export const getOccupancyChartHeight = (itemCount: number): number =>
  Math.max(CHART_HEIGHT_MIN, itemCount * BAR_ROW_HEIGHT_PX);

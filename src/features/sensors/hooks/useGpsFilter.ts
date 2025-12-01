import { useState, useMemo } from 'react';

export interface GpsPoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

const toInputString = (dateString: string) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  return (new Date(date.getTime() - offset)).toISOString().slice(0, 19);
};

export function useGpsFilter(gpsData: GpsPoint[]) {
  const sortedData = useMemo(() => {
    return [...gpsData].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [gpsData]);

  const initialStart = sortedData.length > 0 ? sortedData[0].timestamp : '';
  const initialEnd = sortedData.length > 0 ? sortedData[sortedData.length - 1].timestamp : '';

  const [startDate, setStartDate] = useState(() => 
    initialStart ? toInputString(initialStart) : ''
  );
  const [endDate, setEndDate] = useState(() => 
    initialEnd ? toInputString(initialEnd) : ''
  );

  const filteredPositions = useMemo(() => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime() + 999;

    return sortedData
      .filter((point) => {
        const pointTime = new Date(point.timestamp).getTime();
        return pointTime >= start && pointTime <= end;
      })
      .map((point) => [point.latitude, point.longitude] as [number, number]);
  }, [sortedData, startDate, endDate]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredPositions,
    initialStart: initialStart ? toInputString(initialStart) : '',
    initialEnd: initialEnd ? toInputString(initialEnd) : '',
    totalPoints: gpsData.length,
    filteredCount: filteredPositions.length
  };
}
type Params = {
  minTemp?: number;
  maxTemp?: number;
  lastHours?: number;
};

export function generateTemperatureData({
  lastHours = 24,
  minTemp = 10,
  maxTemp = 20,
}: Params = {}) {
  const data: { temperature: number; timestamp: string }[] = [];
  const now = new Date().getTime();

  for (let i = 0; i < lastHours; i++) {
    const timestamp = new Date(now - i * 60 * 60 * 1000).toISOString();

    const temperature = Math.random() * minTemp + (maxTemp - minTemp);
    const roundedTemperature = Math.round(temperature * 100) / 100;

    data.push({ timestamp, temperature: roundedTemperature });
  }

  return data.reverse();
}

export const hash = (data: string | number) => `${data.toString()}#${Math.round(Math.random() * 1000)}`;

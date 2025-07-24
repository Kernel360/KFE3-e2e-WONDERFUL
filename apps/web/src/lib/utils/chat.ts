export const formatTo12HourTime = (time: string): string => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${hour12}:${paddedMinutes} ${period}`;
};

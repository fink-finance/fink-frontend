function getFormattedDate(date: Date): string {
  let formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  return formattedDate;
}

export { getFormattedDate };

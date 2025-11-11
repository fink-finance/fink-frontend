function getGreetingByHour(hour: number): string {
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  return greeting;
}

export { getGreetingByHour };

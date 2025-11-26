function toBRCurrency(
  value: number,
  spaceBetweenSymbolAndNumber: boolean = true
): string {
  if (spaceBetweenSymbolAndNumber) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return value
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace(/\s/g, '');
}

export { toBRCurrency };

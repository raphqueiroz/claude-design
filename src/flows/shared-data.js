// Shared data for dashboard screens
export const nonInvestorData = {
  cardBalance: 245,
  investmentBalance: 0,
  totalBalance: 245,
  cardName: 'Cartão Visa Internacional',
  cardLast4: '4829',
  destaques: [
    {
      icon: '💰',
      title: 'Comece a render hoje',
      subtitle: 'Seu dinheiro rendendo 5% a.a. em dólar',
      cta: 'Investir agora',
    },
    {
      icon: '🎯',
      title: 'Convide amigos',
      subtitle: 'Ganhe US$ 5 por cada amigo',
      cta: 'Compartilhar',
    },
  ],
  history: [
    { type: 'Depósito recebido', amount: 100, date: '08 fev', icon: '↓' },
    { type: 'Compra Apple Store', amount: -45, date: '07 fev', icon: '🛒' },
    { type: 'Compra Netflix', amount: -9.99, date: '05 fev', icon: '🎬' },
  ],
}

export const investorData = {
  cardBalance: 145,
  investmentBalance: 100,
  totalBalance: 245,
  cardName: 'Cartão Visa Internacional',
  cardLast4: '4829',
  destaques: [
    {
      icon: '📈',
      title: 'Você rendeu US$ 0,12',
      subtitle: 'Rendimento acumulado este mês',
      cta: 'Ver detalhes',
    },
    {
      icon: '🎯',
      title: 'Convide amigos',
      subtitle: 'Ganhe US$ 5 por cada amigo',
      cta: 'Compartilhar',
    },
  ],
  history: [
    { type: 'Rendimento diário', amount: 0.01, date: '09 fev', icon: '📈', color: 'text-green-600' },
    { type: 'Investimento inicial', amount: 100, date: '08 fev', icon: '💰', color: 'text-green-600', prefix: '+' },
    { type: 'Depósito recebido', amount: 100, date: '08 fev', icon: '↓' },
    { type: 'Compra Apple Store', amount: -45, date: '07 fev', icon: '🛒' },
    { type: 'Compra Netflix', amount: -9.99, date: '05 fev', icon: '🎬' },
  ],
}

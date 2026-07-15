export const SITE = {
  name: 'Calculadora do Trabalhador Brasileiro',
  shortName: 'Calculadora do Trabalhador',
  url: 'https://clt.ivalice.com.br',
  description:
    'Calculadoras CLT gratuitas 2026: salário líquido, FGTS, férias, 13º, rescisão, INSS, IRRF e seguro-desemprego. Tabelas atualizadas.',
  contactEmail: 'contato@ivalice.com.br',
  org: 'Ivalice Labs',
  version: '3.5.0',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=br.com.calctrabalhador',
};

export const LEGISLATION_YEAR = 2026;
export const ADS_ENABLED = false;
export const ADSENSE_CLIENT = 'ca-pub-3187286744795052';

/** Cards da home (layout Figma — catálogo completo). */
export const HOME_CALCULATORS = [
  {
    slug: 'salario-liquido',
    title: 'Salário Líquido',
    blurb: 'Quanto sobra após todos os descontos em folha.',
    icon: 'banknote',
  },
  {
    slug: 'fgts',
    title: 'FGTS',
    blurb: 'Cálculo do Fundo de Garantia por Tempo de Serviço.',
    icon: 'landmark',
  },
  {
    slug: 'ferias',
    title: 'Férias',
    blurb: 'Provisão de férias com 1/3 constitucional.',
    icon: 'sun',
  },
  {
    slug: 'decimo-terceiro',
    title: '13° Salário',
    blurb: 'Estimativa das parcelas do décimo terceiro.',
    icon: 'gift',
  },
  {
    slug: 'rescisao',
    title: 'Rescisão',
    blurb: 'Simulação completa do contrato de trabalho.',
    icon: 'file-x',
  },
  {
    slug: 'hora-extra',
    title: 'Hora Extra',
    blurb: 'Cálculo de 50%, 100% e adicionais.',
    icon: 'clock',
  },
  {
    slug: 'adicional-noturno',
    title: 'Adicional Noturno',
    blurb: 'Adicional por trabalho entre 22h e 5h.',
    icon: 'moon',
  },
  {
    slug: 'inss',
    title: 'INSS',
    blurb: 'Tabela atualizada de contribuição previdenciária.',
    icon: 'shield',
  },
  {
    slug: 'irrf',
    title: 'IRRF',
    blurb: 'Imposto de Renda Retido na Fonte com dependentes.',
    icon: 'file',
  },
  {
    slug: 'seguro-desemprego',
    title: 'Seguro Desemprego',
    blurb: 'Cálculo de parcelas e elegibilidade.',
    icon: 'umbrella',
  },
];

export const RIGHTS_ARTICLES = [
  {
    title: 'Férias',
    excerpt: 'Entenda o direito a 30 dias e o terço constitucional.',
    href: '/calculadoras/ferias/',
    icon: 'sun',
  },
  {
    title: '13º Salário',
    excerpt: 'Como funciona o pagamento em duas parcelas.',
    href: '/calculadoras/decimo-terceiro/',
    icon: 'gift',
  },
  {
    title: 'FGTS',
    excerpt: 'Depósito mensal de 8% e saques permitidos.',
    href: '/calculadoras/fgts/',
    icon: 'shield',
  },
  {
    title: 'Horas Extras',
    excerpt: 'Adicionais de 50% e 100% previstos na CLT.',
    href: '/calculadoras/hora-extra/',
    icon: 'clock',
  },
];

export const CALCULATORS = [
  {
    slug: 'salario-liquido',
    id: 'salario_liquido',
    title: 'Salário Líquido',
    shortTitle: 'Salário Líquido',
    description: 'Quanto sobra após todos os descontos em folha.',
    keywords: 'calculadora salário líquido, salário líquido CLT, desconto INSS IRRF',
    resultLabel: 'Salário Líquido',
  },
  {
    slug: 'fgts',
    id: 'fgts',
    title: 'FGTS',
    shortTitle: 'FGTS',
    description: 'Cálculo do Fundo de Garantia por Tempo de Serviço.',
    keywords: 'calculadora FGTS, depósito FGTS 8%, multa FGTS',
    resultLabel: 'Depósito mensal',
  },
  {
    slug: 'ferias',
    id: 'ferias',
    title: 'Férias',
    shortTitle: 'Férias',
    description: 'Provisão de férias com 1/3 constitucional.',
    keywords: 'calculadora férias, terço constitucional, vender férias',
    resultLabel: 'Líquido de férias',
  },
  {
    slug: 'decimo-terceiro',
    id: 'decimo_terceiro',
    title: '13° Salário',
    shortTitle: '13° Salário',
    description: 'Estimativa das parcelas do décimo terceiro.',
    keywords: 'calculadora 13º salário, décimo terceiro proporcional',
    resultLabel: 'Total líquido',
  },
  {
    slug: 'rescisao',
    id: 'rescisao',
    title: 'Rescisão',
    shortTitle: 'Rescisão',
    description: 'Simulação completa do contrato de trabalho.',
    keywords: 'calculadora rescisão, demissão sem justa causa, verbas rescisórias',
    resultLabel: 'Total a receber',
  },
  {
    slug: 'hora-extra',
    id: 'hora_extra',
    title: 'Hora Extra',
    shortTitle: 'Hora Extra',
    description: 'Cálculo de 50%, 100% e adicionais.',
    keywords: 'calculadora hora extra, hora extra 50%, domingo e feriado',
    resultLabel: 'Total bruto',
  },
  {
    slug: 'adicional-noturno',
    id: 'adicional_noturno',
    title: 'Adicional Noturno',
    shortTitle: 'Adicional Noturno',
    description: 'Adicional por trabalho entre 22h e 5h.',
    keywords: 'calculadora adicional noturno, adicional 20% CLT',
    resultLabel: 'Total da jornada noturna',
  },
  {
    slug: 'seguro-desemprego',
    id: 'seguro_desemprego',
    title: 'Seguro Desemprego',
    shortTitle: 'Seguro Desemprego',
    description: 'Cálculo de parcelas e elegibilidade.',
    keywords: 'calculadora seguro-desemprego, parcelas seguro desemprego',
    resultLabel: 'Valor da parcela',
  },
  {
    slug: 'inss',
    id: 'inss',
    title: 'INSS',
    shortTitle: 'INSS',
    description: 'Tabela atualizada de contribuição previdenciária.',
    keywords: 'calculadora INSS, contribuição previdenciária, tabela INSS',
    resultLabel: 'Contribuição INSS',
  },
  {
    slug: 'irrf',
    id: 'irrf',
    title: 'IRRF',
    shortTitle: 'IRRF',
    description: 'Imposto de Renda Retido na Fonte com dependentes.',
    keywords: 'calculadora IRRF, imposto de renda salário, tabela IRRF',
    resultLabel: 'Imposto devido',
  },
];

export function getCalculator(slug) {
  return CALCULATORS.find((c) => c.slug === slug);
}

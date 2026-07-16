export default {
  slug: 'decimo-terceiro',
  howto:
    'O 13º é proporcional aos meses do ano. Estimamos 1ª e 2ª parcela e aplicamos INSS/IRRF na segunda.',
  related: ['salario-liquido', 'ferias', 'irrf', 'inss'],
  faqs: () => [
    {
      q: 'Como funciona o proporcional?',
      a: 'O 13º é proporcional aos meses trabalhados no ano (fração igual ou superior a 15 dias conta como mês).',
    },
    {
      q: 'Os descontos caem em qual parcela?',
      a: 'Nesta estimativa, INSS e IRRF são aplicados sobre a 2ª parcela.',
    },
    {
      q: 'Quantas parcelas o 13º tem?',
      a: 'Em regra, duas: a primeira até novembro e a segunda até dezembro, conforme a legislação e o calendário do empregador.',
    },
    {
      q: 'Adiantamento conta como 1ª parcela?',
      a: 'Sim. A primeira parcela costuma ser metade do 13º sem os descontos de INSS/IRRF, que se concentram na segunda.',
    },
    {
      q: 'Meses incompletos entram?',
      a: 'A regra usual é considerar mês completo quando há 15 dias ou mais trabalhados no mês.',
    },
    {
      q: 'Há 13º na rescisão?',
      a: 'Sim, em geral há 13º proporcional no acerto rescisório. Use a calculadora de rescisão.',
    },
    {
      q: 'INSS e IRRF usam tabelas de qual ano?',
      a: 'As mesmas tabelas de folha do ano de referência da ferramenta — confira Tabelas no menu.',
    },
    {
      q: 'A estimativa substitui o holerite de 13º?',
      a: 'Não. Médias de extras e regras internas podem mudar o valor. Confira o comprovante oficial.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o 13º salário?',
      html: `<p>O <strong>13º salário</strong> (gratificação natalina) corresponde a 1/12 da remuneração por mês trabalhado no ano, pago em parcelas. Esta calculadora estima o total e a divisão entre 1ª e 2ª parcela, com INSS/IRRF na segunda.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe o salário e os meses do ano a considerar.</li>
          <li>Calculamos o 13º proporcional.</li>
          <li>Separamos estimativa de 1ª e 2ª parcela.</li>
          <li>Aplicamos INSS/IRRF ${year} sobre a segunda parcela.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>13º ≈ (remuneração × meses/12). Primeira parcela ≈ metade. Segunda ≈ restante − INSS − IRRF (conforme tabelas ${year}).</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Proporcional = base × (meses ÷ 12)</li>
          <li>1ª parcela ≈ proporcional ÷ 2</li>
          <li>2ª parcela líquida ≈ restante − INSS − IRRF</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Salário R$ 3.000,00 e 12 meses: 13º bruto de R$ 3.000,00. Metade na 1ª parcela; na 2ª, descontam-se INSS/IRRF conforme as tabelas ${year}.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Contar mês com poucos dias como mês cheio (abaixo de 15 dias).</li>
          <li>Esquecer que os descontos se concentram na 2ª parcela.</li>
          <li>Ignorar médias de extras no caso concreto.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Veja também <a class="text-brand underline" href="/calculadoras/irrf/">IRRF</a> e <a class="text-brand underline" href="/calculadoras/inss/">INSS</a>.</li>
          <li>Na rescisão, use a calculadora específica de acerto.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Lei do 13º salário (Lei nº 4.090/1962 e alterações).</li>
          <li>Tabelas INSS/IRRF em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa — não substitui holerite.</p>`,
    },
  ],
};

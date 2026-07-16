export default {
  slug: 'fgts',
  howto:
    'Use o salário bruto e os meses de depósito. O FGTS mensal é 8%. Opcionalmente simule a multa de 40% sobre o total depositado.',
  related: ['rescisao', 'salario-liquido', 'ferias', 'seguro-desemprego'],
  faqs: () => [
    {
      q: 'Qual o percentual do FGTS?',
      a: 'Em regra, o empregador deposita 8% do salário de contribuição na conta do FGTS do trabalhador.',
    },
    {
      q: 'A multa de 40% entra no cálculo?',
      a: 'Você pode incluir a multa rescisória de 40% sobre o saldo estimado. Em acordo, a multa típica é de 20%.',
    },
    {
      q: 'O FGTS é descontado do salário do empregado?',
      a: 'Não. O depósito é obrigação do empregador e não reduz o líquido do holerite como o INSS.',
    },
    {
      q: 'Sobre qual base incide o 8%?',
      a: 'Em regra, sobre a remuneração que compõe o salário de contribuição do mês. Use o bruto contratual informado na ferramenta como aproximação.',
    },
    {
      q: 'Posso simular vários meses de depósito?',
      a: 'Sim. Informe quantos meses deseja projetar; a calculadora multiplica o depósito mensal estimado por esse período.',
    },
    {
      q: 'Quando a multa de 40% é devida?',
      a: 'Tipicamente na dispensa sem justa causa. No acordo (art. 484-A), a multa costuma ser de 20% sobre o saldo. Confira o tipo de rescisão.',
    },
    {
      q: 'O saldo do extrato pode ser diferente da estimativa?',
      a: 'Sim. Depósitos históricos, saques e atualizações monetárias alteram o saldo. Prefira informar o saldo real na calculadora de rescisão.',
    },
    {
      q: 'Esta ferramenta substitui o extrato da Caixa?',
      a: 'Não. É uma estimativa educativa. O extrato oficial do FGTS prevalece.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o FGTS?',
      html: `<p>O <strong>Fundo de Garantia do Tempo de Serviço (FGTS)</strong> é uma poupança trabalhista formada por depósitos mensais do empregador, em regra de <strong>8%</strong> sobre a remuneração. O trabalhador não vê esse valor como desconto no holerite.</p>
        <p class="mt-3">Na rescisão, o saldo e eventual multa (40% ou 20% no acordo) entram no acerto — veja a <a class="text-brand underline" href="/calculadoras/rescisao/">calculadora de rescisão</a>.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe o salário bruto de referência.</li>
          <li>O depósito mensal estimado é bruto × 8%.</li>
          <li>Multiplique pelos meses desejados para projetar o acumulado.</li>
          <li>Opcionalmente some a multa de 40% sobre o total depositado na simulação.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p><strong>Depósito mensal ≈ remuneração × 0,08</strong></p>
        <p class="mt-3"><strong>Projeção ≈ depósito mensal × número de meses</strong></p>
        <p class="mt-3"><strong>Multa sem justa causa ≈ saldo × 0,40</strong> (quando devida)</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Depósito mensal = bruto × 8%</li>
          <li>Acumulado estimado = depósito mensal × meses</li>
          <li>Multa 40% = acumulado × 40% (opcional na simulação)</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Bruto de R$ 3.000,00 → depósito mensal estimado de R$ 240,00 (8%). Em 12 meses, projeção de R$ 2.880,00 antes de atualizações e saques. Multa de 40% sobre esse acumulado seria R$ 1.152,00 na simulação.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Tratar FGTS como desconto do líquido.</li>
          <li>Usar multa de 40% em pedido de demissão ou justa causa sem verificar o direito.</li>
          <li>Ignorar o extrato real na hora da rescisão.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Combine com a <a class="text-brand underline" href="/calculadoras/rescisao/">rescisão</a> e o <a class="text-brand underline" href="/calculadoras/seguro-desemprego/">seguro-desemprego</a>.</li>
          <li>Valores de tabelas INSS/IRRF do líquido estão em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Lei do FGTS (Lei nº 8.036/1990) e normas da Caixa/empregador.</li>
          <li>CLT — verbas rescisórias e hipóteses de saque.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa — não substitui extrato oficial.</p>`,
    },
  ],
};

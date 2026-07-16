export default {
  slug: 'inss',
  howto:
    'Aplicamos a tabela progressiva vigente faixa a faixa até o teto previdenciário do ano.',
  related: ['salario-liquido', 'irrf', 'fgts', 'decimo-terceiro'],
  faqs: (year) => [
    {
      q: 'O INSS é progressivo?',
      a: `Sim. Cada faixa da tabela ${year} incide só sobre a parcela do salário dentro daquela faixa, até o teto.`,
    },
    {
      q: 'Há teto de contribuição?',
      a: 'Sim. Salários acima do teto previdenciário não geram desconto adicional de INSS do empregado.',
    },
    {
      q: 'Quais alíquotas estão na tabela do site?',
      a: `7,5%, 9%, 12% e 14% nas faixas publicadas em Tabelas ${year}, até o teto de R$ 8.475,55.`,
    },
    {
      q: 'INSS reduz a base do IRRF?',
      a: 'Sim. O valor descontado de INSS entra no cálculo do imposto de renda retido. Veja a calculadora de IRRF ou salário líquido.',
    },
    {
      q: 'Autônomo usa a mesma tabela?',
      a: 'Não necessariamente. Esta ferramenta foca a contribuição do empregado CLT em folha.',
    },
    {
      q: 'O empregador também contribui?',
      a: 'Sim, há encargos patronais distintos. Aqui calculamos apenas a parte do empregado.',
    },
    {
      q: 'Preciso da tabela oficial?',
      a: `Sim, para conferência. Mantemos um resumo em /tabelas-${year}/ alinhado às calculadoras.`,
    },
    {
      q: 'A estimativa substitui o holerite?',
      a: 'Não. Arredondamentos e bases específicas podem variar.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o desconto de INSS?',
      html: `<p>É a contribuição previdenciária do <strong>empregado</strong> retida em folha. Desde a reforma, o cálculo é <strong>progressivo por faixas</strong> até o teto.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<p>Informe o salário de contribuição. Aplicamos a tabela ${year} faixa a faixa até o teto de R$ 8.475,55.</p>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Para cada faixa, multiplique a parcela do salário que cabe nela pela alíquota correspondente e some os resultados. Pare no teto. Confira os valores em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>INSS = Σ (trecho na faixa × alíquota da faixa)</li>
          <li>Limitado ao teto de contribuição do ano</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Salário dentro das faixas progressivas (ex.: R$ 3.000,00): cada pedaço até R$ 1.621,00 a 7,5%, o seguinte a 9%, e assim por diante até o valor informado, respeitando o teto.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Aplicar uma única alíquota sobre o salário inteiro.</li>
          <li>Ignorar o teto.</li>
          <li>Usar tabela de outro ano.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Depois calcule o <a class="text-brand underline" href="/calculadoras/salario-liquido/">líquido</a> e o <a class="text-brand underline" href="/calculadoras/irrf/">IRRF</a>.</li>
          <li>Resumo: <a class="text-brand underline" href="/guias/tabela-inss-irrf/">Tabela INSS e IRRF</a>.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Portarias MPS/MF que atualizam as faixas (resumo no site para ${year}).</li>
          <li>Regulamento da Previdência Social aplicável ao segurado empregado.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa.</p>`,
    },
  ],
};

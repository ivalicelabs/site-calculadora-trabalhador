export default {
  slug: 'ferias',
  howto:
    'Informe o salário, média de extras e dias de férias. Somamos o terço constitucional e, se marcado, o abono de 10 dias, com INSS/IRRF sobre o total.',
  related: ['salario-liquido', 'decimo-terceiro', 'rescisao', 'fgts'],
  faqs: () => [
    {
      q: 'O que é o 1/3 constitucional?',
      a: 'É o adicional de um terço sobre o valor das férias, previsto na Constituição.',
    },
    {
      q: 'Posso simular a venda de férias?',
      a: 'Sim. A opção de vender 1/3 adiciona o abono pecuniário correspondente a 10 dias.',
    },
    {
      q: 'As férias são proporcionais na rescisão?',
      a: 'Sim, em regra há férias proporcionais + 1/3 no acerto. Use também a calculadora de rescisão.',
    },
    {
      q: 'Horas extras entram no cálculo?',
      a: 'A ferramenta permite informar média de extras para aproximar a base das férias, como costuma ocorrer na prática.',
    },
    {
      q: 'INSS e IRRF incidem sobre férias?',
      a: 'Em geral sim, sobre o montante de férias + terço (e abono, quando houver), conforme as regras de folha.',
    },
    {
      q: 'Quantos dias posso simular?',
      a: 'O padrão legal de gozo é 30 dias, podendo haver fracionamento conforme a CLT. Informe os dias do cenário que deseja estimar.',
    },
    {
      q: 'O abono pecuniário é obrigatório?',
      a: 'Não. A conversão de até 1/3 das férias em abono depende de pedido do empregado e regras aplicáveis.',
    },
    {
      q: 'A estimativa substitui o recibo de férias?',
      a: 'Não. Convenções e políticas internas podem alterar valores. Confira o recibo oficial.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que são as férias remuneradas?',
      html: `<p>Todo empregado CLT tem direito a <strong>férias anuais remuneradas</strong> com, no mínimo, o adicional de <strong>1/3 constitucional</strong>. A calculadora estima o valor bruto de férias, o terço e, se marcado, o abono de 10 dias, com descontos de INSS/IRRF.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe salário e, se quiser, média de extras.</li>
          <li>Informe os dias de férias do cenário.</li>
          <li>Somamos o terço constitucional.</li>
          <li>Se marcado, incluímos o abono (10 dias).</li>
          <li>Aplicamos INSS/IRRF sobre o total para estimar o líquido.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Base diária ≈ (salário + média de extras) ÷ 30. Multiplique pelos dias de férias. Some 1/3. Se houver abono de 10 dias, some o valor correspondente. Depois estime INSS/IRRF com as <a class="text-brand underline" href="/tabelas-${year}/">tabelas ${year}</a>.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Férias ≈ base mensal × (dias ÷ 30)</li>
          <li>Terço = férias ÷ 3</li>
          <li>Abono (se houver) ≈ base mensal × (10 ÷ 30)</li>
          <li>Líquido ≈ total − INSS − IRRF</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Salário R$ 3.000,00, 30 dias, sem extras e sem abono: férias R$ 3.000,00 + terço R$ 1.000,00 = R$ 4.000,00 brutos antes dos descontos de folha. Use o formulário para ver INSS/IRRF ${year}.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Esquecer o terço constitucional.</li>
          <li>Não incluir média de extras habitual.</li>
          <li>Confundir férias vencidas com proporcionais na rescisão.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Planeje o mês com a <a class="text-brand underline" href="/calculadoras/salario-liquido/">calculadora de salário líquido</a>.</li>
          <li>Na saída do emprego, simule também a <a class="text-brand underline" href="/calculadoras/rescisao/">rescisão</a>.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Constituição Federal — adicional de 1/3 sobre férias.</li>
          <li>CLT — capítulos de férias e abono pecuniário.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa — não substitui recibo oficial.</p>`,
    },
  ],
};

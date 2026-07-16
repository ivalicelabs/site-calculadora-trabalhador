export default {
  slug: 'irrf',
  howto:
    'Partimos do rendimento, abatemos INSS/deduções ou o desconto simplificado (o mais vantajoso) e aplicamos tabela + redução para rendas até R$ 5.000.',
  related: ['salario-liquido', 'inss', 'decimo-terceiro', 'ferias'],
  faqs: (year) => [
    {
      q: 'O que é o desconto simplificado?',
      a: `Em ${year}, o limite mensal do desconto simplificado é R$ 607,20. Usamos o cenário mais vantajoso frente às deduções legais.`,
    },
    {
      q: 'Quem ganha até R$ 5.000 paga IRRF?',
      a: 'Com a redução legal vigente, o imposto mensal tende a zerar para rendimentos tributáveis até R$ 5.000.',
    },
    {
      q: 'Qual a dedução por dependente?',
      a: `Nas tabelas do site para ${year}, R$ 189,59 por dependente na base mensal.`,
    },
    {
      q: 'INSS entra no cálculo do IRRF?',
      a: 'Sim. O INSS descontado reduz a base ou entra na comparação com o desconto simplificado.',
    },
    {
      q: 'Quais alíquotas a tabela usa?',
      a: `Isento até R$ 2.428,80 de base; depois 7,5%, 15%, 22,5% e 27,5% com parcelas a deduzir — ver Tabelas ${year}.`,
    },
    {
      q: 'IRRF de férias ou 13º é igual?',
      a: 'Podem ter particularidades de base e período. Use também as calculadoras de férias e 13º.',
    },
    {
      q: 'Posso zerar o imposto só com dependentes?',
      a: 'Depende da renda e do caminho (deduções vs simplificado). Simule informando dependentes e INSS.',
    },
    {
      q: 'A estimativa substitui a declaração anual?',
      a: 'Não. Trata-se de retenção mensal em folha. A ajuste anual é outro processo na Receita Federal.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o IRRF?',
      html: `<p>O <strong>Imposto de Renda Retido na Fonte</strong> é descontado na folha sobre os rendimentos tributáveis do mês, conforme tabela progressiva e regras de dedução/simplificado.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe rendimento, INSS, dependentes e outras deduções.</li>
          <li>Comparamos deduções legais com o desconto simplificado (até R$ 607,20).</li>
          <li>Aplicamos a tabela ${year} e a redução para bases até R$ 5.000.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Monte a base (rendimento − INSS − dependentes × R$ 189,59 − outras deduções) ou use o simplificado. Aplique a faixa da tabela em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>. Verifique a redução até R$ 5.000.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Base (deduções) = rendimento − INSS − dependentes × 189,59 − outras</li>
          <li>Base (simplificado) = rendimento − min(simplificado, 607,20)</li>
          <li>IRRF = (base × alíquota) − parcela a deduzir (− redução, se couber)</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Rendimento tributável até R$ 5.000 com a redução legal vigente tende a IRRF mensal zero. Acima disso, use a tabela progressiva com as deduções ou o simplificado — o formulário mostra o detalhamento.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Esquecer de abater o INSS.</li>
          <li>Não comparar simplificado × deduções.</li>
          <li>Usar tabela de outro ano.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li><a class="text-brand underline" href="/calculadoras/salario-liquido/">Salário líquido</a> · <a class="text-brand underline" href="/calculadoras/inss/">INSS</a> · <a class="text-brand underline" href="/guias/tabela-inss-irrf/">Guia das tabelas</a></li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Regulamento do Imposto de Renda e atos da Receita Federal.</li>
          <li>Tabela mensal e desconto simplificado — valores em Tabelas ${year}.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa.</p>`,
    },
  ],
};

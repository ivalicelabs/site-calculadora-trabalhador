/** Conteúdo SEO — Salário Líquido (números alinhados às tabelas do site). */

export default {
  slug: 'salario-liquido',
  howto:
    'Informe o salário bruto, horas extras, dependentes e outros descontos. Calculamos INSS progressivo e IRRF (com desconto simplificado e redução legal) para estimar o líquido.',
  related: ['inss', 'irrf', 'fgts', 'hora-extra', 'ferias', 'rescisao'],
  faqs: (year) => [
    {
      q: 'Como é calculado o salário líquido?',
      a: 'Partimos do bruto, descontamos INSS progressivo e IRRF (com desconto simplificado e redução legal quando aplicável) e outros descontos informados.',
    },
    {
      q: 'As tabelas são de qual ano?',
      a: `Usamos as tabelas vigentes em ${year}. O resultado é estimativa e não substitui o holerite oficial.`,
    },
    {
      q: 'O que entra no salário bruto desta calculadora?',
      a: 'O valor contratual do mês mais horas extras e outros proventos que você informar. Benefícios indenizatórios específicos podem ter tratamento diferente no holerite real.',
    },
    {
      q: 'Como o INSS é descontado no líquido?',
      a: `A contribuição do empregado é progressiva por faixas até o teto previdenciário de ${year}. Cada faixa incide só sobre a parcela do salário que está nela. Detalhes na calculadora de INSS e em Tabelas ${year}.`,
    },
    {
      q: 'O que é o desconto simplificado do IRRF?',
      a: `Em ${year}, o limite mensal do desconto simplificado é R$ 607,20. A ferramenta compara esse caminho com deduções legais (INSS, dependentes etc.) e usa o cenário mais vantajoso.`,
    },
    {
      q: 'Quem ganha até R$ 5.000 paga IRRF na folha?',
      a: 'Com a redução legal vigente para rendimentos tributáveis até R$ 5.000, o imposto mensal tende a zerar. Acima disso, aplica-se a tabela progressiva com as deduções cabíveis.',
    },
    {
      q: 'Dependentes reduzem o IRRF?',
      a: `Sim, quando o caminho de deduções legais for usado. Em ${year} a dedução por dependente na base mensal é R$ 189,59 (valor usado nas nossas tabelas).`,
    },
    {
      q: 'FGTS entra no desconto do salário líquido?',
      a: 'Não. O FGTS (em regra 8%) é obrigação do empregador e não é descontado do holerite do empregado como o INSS. Use a calculadora de FGTS para o depósito.',
    },
    {
      q: 'Vale-transporte e outros descontos entram?',
      a: 'Sim, pelo campo de outros descontos. O vale-transporte, quando descontado, costuma ser de até 6% do salário — informe o valor efetivo do seu holerite.',
    },
    {
      q: 'Esta estimativa substitui o holerite?',
      a: 'Não. Acordos, convenções, benefícios e regras específicas da empresa podem alterar o resultado. Confira sempre o comprovante oficial e, se preciso, um profissional.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o salário líquido?',
      html: `
        <p>O <strong>salário líquido</strong> é o valor que efetivamente sobra após os descontos obrigatórios e facultativos da folha no regime CLT. Em geral, os maiores descontos são a contribuição previdenciária (<a class="text-brand underline" href="/calculadoras/inss/">INSS</a>) e o imposto de renda retido na fonte (<a class="text-brand underline" href="/calculadoras/irrf/">IRRF</a>), além de itens como vale-transporte, pensão ou empréstimos consignados quando houver.</p>
        <p class="mt-3">Ele é diferente do <strong>salário bruto</strong> (base contratual + proventos do mês) e também não se confunde com o depósito de <a class="text-brand underline" href="/calculadoras/fgts/">FGTS</a>, pago pelo empregador.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona o cálculo nesta ferramenta',
      html: `
        <ol class="mt-1 list-decimal space-y-2 pl-5">
          <li>Soma-se o bruto informado (incluindo extras, se houver).</li>
          <li>Calcula-se o <strong>INSS progressivo</strong> com a tabela ${year} até o teto.</li>
          <li>Monta-se a base de IRRF (rendimento menos INSS e demais deduções ou o desconto simplificado).</li>
          <li>Aplica-se a tabela mensal de IRRF ${year} e a redução legal quando cabível.</li>
          <li>Subtraem-se outros descontos que você informar para chegar ao líquido estimado.</li>
        </ol>
        <p class="mt-3">O processamento ocorre no seu navegador — os valores do formulário não são enviados aos nossos servidores.</p>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `
        <h3 class="mt-2 font-semibold text-ink">1. Defina o bruto do mês</h3>
        <p class="mt-2">Some salário contratual, horas extras e demais proventos tributáveis do período.</p>
        <h3 class="mt-4 font-semibold text-ink">2. Calcule o INSS</h3>
        <p class="mt-2">Use as faixas progressivas publicadas em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a> (7,5% a 14% até o teto de contribuição de R$ 8.475,55).</p>
        <h3 class="mt-4 font-semibold text-ink">3. Calcule o IRRF</h3>
        <p class="mt-2">Abata INSS e, conforme o caso, dependentes (R$ 189,59 cada) ou o desconto simplificado (até R$ 607,20). Aplique a tabela IRRF ${year} e a redução para rendas até R$ 5.000.</p>
        <h3 class="mt-4 font-semibold text-ink">4. Chegue ao líquido</h3>
        <p class="mt-2">Bruto − INSS − IRRF − outros descontos = líquido estimado.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `
        <ul class="list-disc space-y-2 pl-5">
          <li><strong>INSS:</strong> soma das parcelas por faixa (alíquota × trecho do salário na faixa), limitada ao teto.</li>
          <li><strong>Base IRRF (deduções):</strong> rendimento − INSS − (dependentes × R$ 189,59) − outras deduções informadas.</li>
          <li><strong>Base IRRF (simplificado):</strong> rendimento − min(desconto simplificado, limite de R$ 607,20), quando esse caminho for melhor.</li>
          <li><strong>IRRF:</strong> (base × alíquota da faixa) − parcela a deduzir da tabela, com redução legal quando aplicável.</li>
          <li><strong>Líquido:</strong> bruto − INSS − IRRF − outros descontos.</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `
        <p>Suponha bruto de <strong>R$ 3.000,00</strong>, sem extras, sem dependentes e sem outros descontos.</p>
        <ol class="mt-3 list-decimal space-y-2 pl-5">
          <li>O INSS é calculado faixa a faixa sobre os R$ 3.000 até o teto (veja a calculadora de <a class="text-brand underline" href="/calculadoras/inss/">INSS</a>).</li>
          <li>Do rendimento, abate-se o INSS; compara-se deduções legais com o desconto simplificado (até R$ 607,20).</li>
          <li>Aplica-se a tabela IRRF ${year}. Com a redução para bases até R$ 5.000, o imposto mensal pode zerar nesse exemplo.</li>
          <li>O líquido estimado fica próximo de bruto − INSS (quando o IRRF for zero).</li>
        </ol>
        <p class="mt-3">Use o formulário acima com os mesmos valores para conferir o detalhamento automático.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `
        <ul class="list-disc space-y-2 pl-5">
          <li>Usar salário líquido antigo como se fosse bruto.</li>
          <li>Esquecer horas extras ou adicionais que entram na base do mês.</li>
          <li>Confundir FGTS (empregador) com desconto do empregado.</li>
          <li>Ignorar dependentes ou o desconto simplificado no IRRF.</li>
          <li>Comparar com holerite de outro mês ou de tabelas de outro ano.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `
        <ul class="list-disc space-y-2 pl-5">
          <li>Confira sempre o ano das tabelas — aqui usamos a referência <strong>${year}</strong>.</li>
          <li>Simule também <a class="text-brand underline" href="/calculadoras/hora-extra/">hora extra</a> e <a class="text-brand underline" href="/calculadoras/ferias/">férias</a> quando forem relevantes no mês.</li>
          <li>Use <strong>Compartilhar</strong> no resultado para enviar a estimativa a alguém ou guardar o link.</li>
          <li>Leia o guia <a class="text-brand underline" href="/guias/como-calcular-salario-liquido/">Como calcular o salário líquido</a> para o passo a passo textual.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `
        <ul class="list-disc space-y-2 pl-5">
          <li>CLT — regras gerais de remuneração e descontos em folha.</li>
          <li>Tabelas de contribuição previdenciária do empregado (MPS/MF) — resumo em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</li>
          <li>Tabela progressiva mensal do IRRF e regras de desconto simplificado / redução (Receita Federal) — mesmos valores usados nesta calculadora.</li>
          <li>Constituição Federal — terço de férias e direitos correlatos (úteis ao planejar o mês junto com férias/13º).</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Conteúdo educativo. Em caso de divergência, prevalecem o holerite e a norma oficial atualizada.</p>`,
    },
  ],
};

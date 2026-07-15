/** Conteúdo SEO compartilhado pelo generate.mjs */

export const INDEXNOW_KEY = 'a8f3c2e19b4d6075e1a29c84f6d0b357';

export const HOWTO_BY_SLUG = {
  'salario-liquido':
    'Informe o salário bruto, horas extras, dependentes e outros descontos. Calculamos INSS progressivo e IRRF (com desconto simplificado e redução legal) para estimar o líquido.',
  fgts:
    'Use o salário bruto e os meses de depósito. O FGTS mensal é 8%. Opcionalmente simule a multa de 40% sobre o total depositado.',
  ferias:
    'Informe o salário, média de extras e dias de férias. Somamos o terço constitucional e, se marcado, o abono de 10 dias, com INSS/IRRF sobre o total.',
  'decimo-terceiro':
    'O 13º é proporcional aos meses do ano. Estimamos 1ª e 2ª parcela e aplicamos INSS/IRRF na segunda.',
  rescisao:
    'Com datas, tipo de demissão e saldo de férias, estimamos saldo, férias, 13º, aviso (30+3 dias/ano, máx. 90) e FGTS. Informe o saldo real de FGTS quando tiver.',
  'hora-extra':
    'A hora normal usa salário ÷ 220. Aplicamos 50% (úteis) ou 100% (domingo/feriado) e somamos adicional noturno se houver.',
  'adicional-noturno':
    'Calculamos 20% sobre a hora diurna para horas entre 22h e 5h (regra urbana padrão da CLT).',
  inss:
    'Aplicamos a tabela progressiva vigente faixa a faixa até o teto previdenciário do ano.',
  'seguro-desemprego':
    'Com a média salarial e meses nos últimos 36, usamos as faixas do MTE e as regras de 1ª/2ª/3ª+ solicitação para valor e número de parcelas.',
  irrf:
    'Partimos do rendimento, abatemos INSS/deduções ou o desconto simplificado (o mais vantajoso) e aplicamos tabela + redução para rendas até R$ 5.000.',
};

export const RELATED_BY_SLUG = {
  'salario-liquido': ['inss', 'irrf', 'fgts', 'hora-extra'],
  fgts: ['rescisao', 'salario-liquido', 'ferias'],
  ferias: ['salario-liquido', 'decimo-terceiro', 'rescisao'],
  'decimo-terceiro': ['salario-liquido', 'ferias', 'irrf'],
  rescisao: ['fgts', 'seguro-desemprego', 'ferias', 'decimo-terceiro'],
  'hora-extra': ['salario-liquido', 'adicional-noturno', 'inss'],
  'adicional-noturno': ['hora-extra', 'salario-liquido'],
  inss: ['salario-liquido', 'irrf', 'fgts'],
  'seguro-desemprego': ['rescisao', 'salario-liquido', 'fgts'],
  irrf: ['salario-liquido', 'inss', 'decimo-terceiro'],
};

export function guides(year) {
  return [
    {
      slug: 'como-calcular-salario-liquido',
      title: `Como calcular o salário líquido CLT em ${year}`,
      description: `Passo a passo do salário líquido com INSS e IRRF ${year}: o que desconta, dependentes e exemplos.`,
      keywords: `como calcular salário líquido ${year}, líquido CLT, desconto INSS IRRF`,
      related: ['salario-liquido', 'inss', 'irrf'],
      body: `
        <p>O <strong>salário líquido</strong> é o valor que sobra depois dos descontos obrigatórios e facultativos na folha. No regime CLT, os principais descontos são <a class="text-brand underline" href="/calculadoras/inss/">INSS</a> e <a class="text-brand underline" href="/calculadoras/irrf/">IRRF</a>.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">1. Comece pelo bruto</h2>
        <p class="mt-3">Some o salário contratual com horas extras, adicionais e outros proventos do mês. Essa base alimenta INSS, IRRF e também o depósito de <a class="text-brand underline" href="/calculadoras/fgts/">FGTS</a> (pago pelo empregador).</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">2. Desconte o INSS</h2>
        <p class="mt-3">Em ${year} a contribuição é <strong>progressiva</strong>: cada faixa da tabela tem uma alíquota. Quem ganha acima do teto contribui só até o limite. Veja a <a class="text-brand underline" href="/tabelas-${year}/">tabela INSS ${year}</a>.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">3. Calcule o IRRF</h2>
        <p class="mt-3">Do rendimento, abata INSS, dependentes ou o <strong>desconto simplificado</strong> (o que for melhor). Depois aplique a tabela mensal e a redução legal para rendas até R$ 5.000. Use a <a class="text-brand underline" href="/calculadoras/salario-liquido/">calculadora de salário líquido</a> para simular.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">4. Outros descontos</h2>
        <p class="mt-3">Vale-transporte, pensão, empréstimos consignados e faltas também reduzem o líquido. Nossa ferramenta permite incluir “outros descontos” para aproximar o holerite.</p>
        <p class="mt-6 text-sm text-ink-muted">Estimativa educativa — não substitui o holerite oficial.</p>
      `,
    },
    {
      slug: 'como-calcular-rescisao',
      title: `Como calcular rescisão trabalhista em ${year}`,
      description: `O que entra na rescisão CLT: saldo, férias, 13º, aviso prévio proporcional e FGTS. Guia ${year}.`,
      keywords: `como calcular rescisão ${year}, verbas rescisórias, aviso prévio proporcional`,
      related: ['rescisao', 'fgts', 'seguro-desemprego'],
      body: `
        <p>Na <strong>rescisão</strong>, o trabalhador pode receber várias verbas conforme o tipo de demissão (sem justa causa, acordo, pedido ou justa causa).</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">Verbas mais comuns</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5">
          <li><strong>Saldo de salário</strong> — dias trabalhados no mês da saída</li>
          <li><strong>Férias</strong> vencidas/proporcionais + 1/3</li>
          <li><strong>13º proporcional</strong></li>
          <li><strong>Aviso prévio</strong> — em regra 30 dias + 3 dias por ano completo (máx. 90), quando devido</li>
          <li><strong>FGTS</strong> e multa (40% ou 20% no acordo), quando cabível</li>
        </ul>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">Simule online</h2>
        <p class="mt-3">Use a <a class="text-brand underline" href="/calculadoras/rescisao/">calculadora de rescisão</a> e, se for o caso, a de <a class="text-brand underline" href="/calculadoras/seguro-desemprego/">seguro-desemprego</a>. Informe o <strong>saldo real de FGTS</strong> quando tiver o extrato.</p>
        <p class="mt-6 text-sm text-ink-muted">Não substitui TRCT nem análise de advogado trabalhista.</p>
      `,
    },
    {
      slug: 'tabela-inss-irrf',
      title: `Tabela INSS e IRRF ${year} — resumo prático`,
      description: `Resumo das tabelas INSS e IRRF ${year} para folha de pagamento, com links para calculadoras gratuitas.`,
      keywords: `tabela INSS ${year}, tabela IRRF ${year}, contribuição previdenciária`,
      related: ['inss', 'irrf', 'salario-liquido'],
      body: `
        <p>As tabelas de <strong>INSS</strong> e <strong>IRRF</strong> mudam com frequência. Mantemos um hub atualizado em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">INSS</h2>
        <p class="mt-3">Alíquotas progressivas de 7,5% a 14% até o teto do ano. Calcule na <a class="text-brand underline" href="/calculadoras/inss/">calculadora de INSS</a>.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">IRRF</h2>
        <p class="mt-3">Tabela progressiva + desconto simplificado + redução para isenção efetiva até R$ 5.000. Use a <a class="text-brand underline" href="/calculadoras/irrf/">calculadora de IRRF</a>.</p>
      `,
    },
    {
      slug: 'seguro-desemprego-quem-tem-direito',
      title: `Seguro-desemprego ${year}: quem tem direito e como calcular`,
      description: `Regras de elegibilidade, número de parcelas e valor do seguro-desemprego ${year}.`,
      keywords: `seguro-desemprego ${year}, quem tem direito, valor da parcela`,
      related: ['seguro-desemprego', 'rescisao', 'salario-liquido'],
      body: `
        <p>O <strong>seguro-desemprego</strong> depende do tempo trabalhado nos últimos 36 meses e de quantas vezes o benefício já foi solicitado.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">Valor da parcela</h2>
        <p class="mt-3">É calculado com a média dos últimos salários e faixas do MTE (80%, faixa intermediária ou teto), sem ficar abaixo do salário mínimo. Detalhes em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>.</p>
        <h2 class="mt-8 font-display text-xl font-bold text-ink">Simule</h2>
        <p class="mt-3"><a class="text-brand underline" href="/calculadoras/seguro-desemprego/">Calculadora de seguro-desemprego</a> — informe média salarial, meses e solicitações anteriores.</p>
      `,
    },
  ];
}

export function tabelasBody(year) {
  return `
    <p>Referência rápida das principais tabelas usadas nas nossas calculadoras em <strong>${year}</strong>. Sempre confira portarias oficiais (MPS/MF, Receita Federal e MTE).</p>

    <h2 class="mt-10 font-display text-2xl font-bold text-ink">INSS ${year}</h2>
    <p class="mt-3">Contribuição progressiva do empregado (Portaria MPS/MF nº 13/2026). Teto de contribuição: <strong>R$ 8.475,55</strong>.</p>
    <div class="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
      <table class="w-full min-w-[320px] text-left text-sm">
        <thead class="bg-page text-ink"><tr><th class="px-4 py-3">Salário de contribuição</th><th class="px-4 py-3">Alíquota</th></tr></thead>
        <tbody class="divide-y divide-line text-ink-soft">
          <tr><td class="px-4 py-3">até R$ 1.621,00</td><td class="px-4 py-3">7,5%</td></tr>
          <tr><td class="px-4 py-3">de R$ 1.621,01 até R$ 2.902,84</td><td class="px-4 py-3">9%</td></tr>
          <tr><td class="px-4 py-3">de R$ 2.902,85 até R$ 4.354,27</td><td class="px-4 py-3">12%</td></tr>
          <tr><td class="px-4 py-3">de R$ 4.354,28 até R$ 8.475,55</td><td class="px-4 py-3">14%</td></tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3"><a class="text-brand font-semibold underline" href="/calculadoras/inss/">Calcular INSS →</a></p>

    <h2 class="mt-10 font-display text-2xl font-bold text-ink">IRRF mensal ${year}</h2>
    <p class="mt-3">Tabela da Receita Federal. Dedução por dependente: <strong>R$ 189,59</strong>. Desconto simplificado: até <strong>R$ 607,20</strong>. Redução legal para zerar imposto com rendimentos até <strong>R$ 5.000</strong>.</p>
    <div class="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
      <table class="w-full min-w-[320px] text-left text-sm">
        <thead class="bg-page text-ink"><tr><th class="px-4 py-3">Base de cálculo</th><th class="px-4 py-3">Alíquota</th><th class="px-4 py-3">Dedução</th></tr></thead>
        <tbody class="divide-y divide-line text-ink-soft">
          <tr><td class="px-4 py-3">até R$ 2.428,80</td><td class="px-4 py-3">—</td><td class="px-4 py-3">—</td></tr>
          <tr><td class="px-4 py-3">R$ 2.428,81 a R$ 2.826,65</td><td class="px-4 py-3">7,5%</td><td class="px-4 py-3">R$ 182,16</td></tr>
          <tr><td class="px-4 py-3">R$ 2.826,66 a R$ 3.751,05</td><td class="px-4 py-3">15%</td><td class="px-4 py-3">R$ 394,16</td></tr>
          <tr><td class="px-4 py-3">R$ 3.751,06 a R$ 4.664,68</td><td class="px-4 py-3">22,5%</td><td class="px-4 py-3">R$ 675,49</td></tr>
          <tr><td class="px-4 py-3">acima de R$ 4.664,68</td><td class="px-4 py-3">27,5%</td><td class="px-4 py-3">R$ 908,73</td></tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3"><a class="text-brand font-semibold underline" href="/calculadoras/irrf/">Calcular IRRF →</a> · <a class="text-brand font-semibold underline" href="/calculadoras/salario-liquido/">Salário líquido →</a></p>

    <h2 class="mt-10 font-display text-2xl font-bold text-ink">Seguro-desemprego ${year}</h2>
    <p class="mt-3">Faixas MTE (média dos 3 últimos salários). Piso: salário mínimo <strong>R$ 1.621,00</strong>. Teto da parcela: <strong>R$ 2.518,65</strong>.</p>
    <div class="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
      <table class="w-full min-w-[320px] text-left text-sm">
        <thead class="bg-page text-ink"><tr><th class="px-4 py-3">Média salarial</th><th class="px-4 py-3">Cálculo da parcela</th></tr></thead>
        <tbody class="divide-y divide-line text-ink-soft">
          <tr><td class="px-4 py-3">até R$ 2.222,17</td><td class="px-4 py-3">média × 0,8</td></tr>
          <tr><td class="px-4 py-3">R$ 2.222,18 a R$ 3.703,99</td><td class="px-4 py-3">R$ 1.777,74 + 50% do que exceder R$ 2.222,17</td></tr>
          <tr><td class="px-4 py-3">acima de R$ 3.703,99</td><td class="px-4 py-3">parcela fixa R$ 2.518,65</td></tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3"><a class="text-brand font-semibold underline" href="/calculadoras/seguro-desemprego/">Calcular seguro-desemprego →</a></p>

    <p class="mt-10 text-sm text-ink-muted">Atualizado para uso nas ferramentas do site em ${year}. Em caso de divergência, prevalece a legislação oficial.</p>
  `;
}

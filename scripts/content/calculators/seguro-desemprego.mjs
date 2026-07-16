export default {
  slug: 'seguro-desemprego',
  howto:
    'Com a média salarial e meses nos últimos 36, usamos as faixas do MTE e as regras de 1ª/2ª/3ª+ solicitação para valor e número de parcelas.',
  related: ['rescisao', 'salario-liquido', 'fgts', 'ferias'],
  faqs: (year) => [
    {
      q: 'Como é calculado o valor da parcela?',
      a: `Com a média salarial e as faixas do MTE ${year} (80%, faixa intermediária ou teto), sem ficar abaixo do salário mínimo.`,
    },
    {
      q: 'Quantas parcelas tenho direito?',
      a: 'Depende do tempo trabalhado nos últimos 36 meses e se é 1ª, 2ª ou 3ª+ solicitação.',
    },
    {
      q: 'Qual o piso e o teto da parcela no site?',
      a: `Piso alinhado ao salário mínimo de R$ 1.621,00 e teto de parcela de R$ 2.518,65 (Tabelas ${year}).`,
    },
    {
      q: 'Pedido de demissão dá direito?',
      a: 'Em regra não. O benefício costuma exigir dispensa sem justa causa (e demais requisitos legais).',
    },
    {
      q: 'Preciso ter tempo mínimo de trabalho?',
      a: 'Sim. As faixas de parcelas dependem dos meses nos últimos 36 e do histórico de solicitações.',
    },
    {
      q: 'A média usa quantos salários?',
      a: 'Na prática oficial entram os últimos salários conforme a regra do benefício; informe a média que constar na sua documentação.',
    },
    {
      q: 'Posso simular depois da rescisão?',
      a: 'Sim. Calcule a rescisão e, em seguida, o seguro com a média e o tempo de vínculo.',
    },
    {
      q: 'A estimativa garante o benefício?',
      a: 'Não. A habilitação é feita nos canais oficiais (governo). Esta ferramenta só estima valor e quantidade de parcelas.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o seguro-desemprego?',
      html: `<p>Benefício temporário ao trabalhador dispensado sem justa causa que cumpre os requisitos legais. O valor depende da média salarial e de faixas do MTE; o número de parcelas depende do tempo e das solicitações anteriores.</p>
        <p class="mt-3"><a class="text-brand underline" href="/guias/seguro-desemprego-quem-tem-direito/">Guia: quem tem direito</a>.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe média salarial, meses nos últimos 36 e solicitações anteriores.</li>
          <li>Aplicamos as faixas MTE ${year} (80%, intermediária ou teto).</li>
          <li>Estimamos quantidade de parcelas conforme as regras de 1ª/2ª/3ª+ solicitação.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Compare a média com as faixas em <a class="text-brand underline" href="/tabelas-${year}/">Tabelas ${year}</a>: até R$ 2.222,17 (×0,8); faixa intermediária; ou parcela fixa de R$ 2.518,65. Respeite o piso do salário mínimo.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Faixa 1: média × 0,8</li>
          <li>Faixa 2: R$ 1.777,74 + 50% do que exceder R$ 2.222,17</li>
          <li>Faixa 3: parcela fixa R$ 2.518,65</li>
          <li>Resultado não inferior ao salário mínimo (R$ 1.621,00)</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Média de R$ 2.000,00 → parcela estimada de R$ 1.600,00 (80%), elevada ao piso se necessário. A quantidade de parcelas depende dos meses trabalhados e do histórico de solicitações.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Usar salário líquido em vez da média correta.</li>
          <li>Ignorar solicitações anteriores.</li>
          <li>Assumir direito após pedido de demissão.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Simule antes a <a class="text-brand underline" href="/calculadoras/rescisao/">rescisão</a>.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Lei do seguro-desemprego e atos do MTE/Ministério do Trabalho.</li>
          <li>Faixas resumidas em Tabelas ${year} no site.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa — habilitação só nos canais oficiais.</p>`,
    },
  ],
};

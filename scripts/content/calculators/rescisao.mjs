export default {
  slug: 'rescisao',
  howto:
    'Com datas, tipo de demissão e saldo de férias, estimamos saldo, férias, 13º, aviso (30+3 dias/ano, máx. 90) e FGTS. Informe o saldo real de FGTS quando tiver.',
  related: ['fgts', 'seguro-desemprego', 'ferias', 'decimo-terceiro', 'salario-liquido'],
  faqs: () => [
    {
      q: 'O aviso prévio é proporcional?',
      a: 'Sim. Consideramos 30 dias + 3 dias por ano completo de contrato, até o limite de 90 dias.',
    },
    {
      q: 'O saldo de FGTS precisa ser informado?',
      a: 'É opcional. Se informado, usamos esse valor; senão, estimamos depósitos de 8% pelos meses de contrato.',
    },
    {
      q: 'Quais verbas entram na rescisão?',
      a: 'Em geral: saldo de salário, férias vencidas/proporcionais + 1/3, 13º proporcional, aviso prévio quando devido, FGTS e multa conforme o tipo de demissão.',
    },
    {
      q: 'Pedido de demissão tem multa de 40%?',
      a: 'Em regra não. A multa de 40% é típica da dispensa sem justa causa. No acordo, a multa costuma ser de 20%.',
    },
    {
      q: 'Justa causa altera o cálculo?',
      a: 'Sim. Algumas verbas deixam de ser devidas. Selecione o tipo correto na ferramenta e confira a legislação/caso concreto.',
    },
    {
      q: 'Posso simular seguro-desemprego junto?',
      a: 'Sim. Após a rescisão sem justa causa, use a calculadora de seguro-desemprego com a média salarial e o tempo de trabalho.',
    },
    {
      q: 'O aviso pode ser indenizado?',
      a: 'Sim. Quando indenizado, o valor correspondente entra no acerto em vez do cumprimento trabalhado.',
    },
    {
      q: 'A estimativa substitui o TRCT?',
      a: 'Não. O Termo de Rescisão e a análise de um profissional prevalecem.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é a rescisão trabalhista?',
      html: `<p>A <strong>rescisão</strong> é o acerto das verbas devidas ao fim do contrato CLT. O conjunto muda conforme o tipo de demissão (sem justa causa, acordo, pedido ou justa causa).</p>
        <p class="mt-3">Guia textual: <a class="text-brand underline" href="/guias/como-calcular-rescisao/">Como calcular rescisão</a>.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Informe datas, salário e tipo de demissão.</li>
          <li>Estimamos saldo, férias + 1/3, 13º, aviso (30+3/ano, máx. 90) e FGTS.</li>
          <li>Se informar saldo real de FGTS, priorizamos esse valor.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Some as verbas cabíveis no seu tipo de demissão; calcule aviso proporcional; estime FGTS (8% ao mês ou extrato) e multa (40% ou 20%). Descontos de INSS/IRRF podem incidir sobre parcelas específicas — use as <a class="text-brand underline" href="/tabelas-${year}/">tabelas ${year}</a> como apoio.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Aviso ≈ 30 + 3 × anos completos (teto 90 dias), quando devido</li>
          <li>FGTS mensal ≈ remuneração × 8%</li>
          <li>Multa sem justa causa ≈ saldo FGTS × 40%</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Contrato de 2 anos completos: aviso proporcional de até 36 dias (30+6), se devido. FGTS e multa dependem do saldo e do tipo de demissão — informe o extrato para maior precisão.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Escolher tipo de demissão incorreto.</li>
          <li>Usar FGTS estimado em vez do extrato.</li>
          <li>Esquecer férias vencidas acumuladas.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li><a class="text-brand underline" href="/calculadoras/fgts/">FGTS</a> · <a class="text-brand underline" href="/calculadoras/seguro-desemprego/">Seguro-desemprego</a> · <a class="text-brand underline" href="/calculadoras/ferias/">Férias</a></li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>CLT — aviso prévio, verbas rescisórias e hipóteses de justa causa.</li>
          <li>Lei do FGTS — multa e saques.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Não substitui TRCT nem orientação profissional.</p>`,
    },
  ],
};

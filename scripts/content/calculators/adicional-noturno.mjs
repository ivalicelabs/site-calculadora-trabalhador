export default {
  slug: 'adicional-noturno',
  howto:
    'Calculamos 20% sobre a hora diurna para horas entre 22h e 5h (regra urbana padrão da CLT).',
  related: ['hora-extra', 'salario-liquido', 'inss'],
  faqs: () => [
    {
      q: 'Qual o percentual do adicional noturno?',
      a: 'Na CLT urbana, o adicional padrão é de no mínimo 20% sobre a hora diurna.',
    },
    {
      q: 'Qual o horário noturno?',
      a: 'Em regra urbana, das 22h às 5h. Convenções coletivas podem detalhar exceções.',
    },
    {
      q: 'Como obtenho a hora diurna?',
      a: 'Usamos salário ÷ 220, a mesma base habitual da hora normal.',
    },
    {
      q: 'Adicional noturno e hora extra somam?',
      a: 'Podem cumular conforme a jornada. Simule horas extras na calculadora específica e informe horas noturnas quando couber.',
    },
    {
      q: 'Trabalho rural tem regra diferente?',
      a: 'Sim, horários e percentuais podem divergir. Esta ferramenta segue a regra urbana padrão da CLT.',
    },
    {
      q: 'O adicional entra no líquido do mês?',
      a: 'Sim, como provento. Veja o impacto em salário líquido, INSS e IRRF.',
    },
    {
      q: 'Convenção pode pagar mais que 20%?',
      a: 'Sim. O percentual legal é mínimo; acordos podem ser mais favoráveis.',
    },
    {
      q: 'A estimativa substitui o holerite?',
      a: 'Não. Confira sempre o demonstrativo oficial.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é o adicional noturno?',
      html: `<p>É o acréscimo devido pelo trabalho no período noturno. Na CLT urbana, o mínimo é <strong>20%</strong> sobre a hora diurna, tipicamente entre <strong>22h e 5h</strong>.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Calcula a hora diurna (salário ÷ 220).</li>
          <li>Aplica 20% de adicional.</li>
          <li>Multiplica pelas horas noturnas informadas.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Hora diurna = salário ÷ 220. Hora noturna ≈ hora diurna × 1,20. Total ≈ hora noturna × quantidade de horas noturnas.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Hora diurna = bruto ÷ 220</li>
          <li>Adicional = hora diurna × 20%</li>
          <li>Total = (hora diurna + adicional) × horas noturnas</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Salário R$ 2.200,00 → hora diurna R$ 10,00 → hora noturna R$ 12,00. Em 22 horas noturnas: R$ 264,00 de adicional/jornada noturna estimada (antes de outros reflexos).</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Aplicar 20% sobre o salário mensal inteiro em vez da hora.</li>
          <li>Ignorar convenção mais benéfica.</li>
          <li>Contar horas diurnas como noturnas.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Combine com <a class="text-brand underline" href="/calculadoras/hora-extra/">hora extra</a> quando a jornada ultrapassar o contratual.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>CLT — trabalho noturno urbano.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa.</p>`,
    },
  ],
};

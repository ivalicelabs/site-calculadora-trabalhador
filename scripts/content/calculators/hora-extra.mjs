export default {
  slug: 'hora-extra',
  howto:
    'A hora normal usa salário ÷ 220. Aplicamos 50% (úteis) ou 100% (domingo/feriado) e somamos adicional noturno se houver.',
  related: ['salario-liquido', 'adicional-noturno', 'inss', 'irrf'],
  faqs: () => [
    {
      q: 'Qual a base da hora normal?',
      a: 'Usamos salário bruto ÷ 220 horas mensais, regra habitual da CLT para jornada padrão.',
    },
    {
      q: 'Qual o adicional de hora extra?',
      a: '50% em dias úteis e 100% em domingos/feriados nesta calculadora (salvo acordo/convenção diferente).',
    },
    {
      q: 'Posso somar adicional noturno?',
      a: 'Sim. Informe horas noturnas para incluir o adicional mínimo de 20% sobre a hora diurna (regra urbana padrão).',
    },
    {
      q: '220 horas vale para qualquer jornada?',
      a: 'É a referência usual de jornada integral. Jornadas parciais ou acordos podem usar outro divisor — ajuste o cenário com cuidado.',
    },
    {
      q: 'Hora extra entra no salário líquido?',
      a: 'Sim, como provento do mês. Simule o impacto na calculadora de salário líquido.',
    },
    {
      q: 'Banco de horas muda o cálculo?',
      a: 'Pode mudar. Compensações previstas em acordo/convenção podem substituir o pagamento imediato. Esta ferramenta estima o valor da hora extra.',
    },
    {
      q: 'Domingo e feriado são sempre 100%?',
      a: 'Nesta estimativa, sim. Convenções coletivas podem prever percentuais diferentes — prevalece a norma aplicável.',
    },
    {
      q: 'A estimativa substitui o holerite?',
      a: 'Não. Use-a para planejar e conferir ordens de grandeza.',
    },
  ],
  sections: (year) => [
    {
      id: 'o-que-e',
      title: 'O que é hora extra?',
      html: `<p><strong>Hora extra</strong> é o trabalho além da jornada contratual. A CLT prevê adicionais mínimos; acordos podem melhorar esses percentuais.</p>`,
    },
    {
      id: 'como-funciona',
      title: 'Como funciona nesta calculadora',
      html: `<ol class="list-decimal space-y-2 pl-5">
          <li>Hora normal = salário ÷ 220.</li>
          <li>Aplica 50% (úteis) ou 100% (domingo/feriado).</li>
          <li>Soma adicional noturno se houver horas entre 22h e 5h.</li>
        </ol>`,
    },
    {
      id: 'manual',
      title: 'Como calcular manualmente',
      html: `<p>Hora normal = salário ÷ 220. Hora extra 50% = hora normal × 1,5. Hora extra 100% = hora normal × 2. Multiplique pelas horas. Noturno: acrescente ≥20% sobre a hora diurna nas horas noturnas.</p>`,
    },
    {
      id: 'formulas',
      title: 'Fórmulas utilizadas',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Hora normal = bruto ÷ 220</li>
          <li>HE 50% = hora normal × 1,5 × horas</li>
          <li>HE 100% = hora normal × 2 × horas</li>
          <li>Noturno ≥ hora diurna × 1,20 × horas noturnas</li>
        </ul>`,
    },
    {
      id: 'exemplo',
      title: `Exemplo prático (${year})`,
      html: `<p>Salário R$ 2.200,00 → hora normal R$ 10,00. Dez horas extras a 50% → R$ 150,00 antes de reflexos e descontos de folha.</p>`,
    },
    {
      id: 'erros',
      title: 'Erros mais comuns',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Usar divisor diferente de 220 sem critério.</li>
          <li>Esquecer o adicional noturno quando a jornada invade 22h–5h.</li>
          <li>Ignorar convenção coletiva mais benéfica.</li>
        </ul>`,
    },
    {
      id: 'dicas',
      title: 'Dicas importantes',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>Veja também <a class="text-brand underline" href="/calculadoras/adicional-noturno/">adicional noturno</a> e <a class="text-brand underline" href="/calculadoras/salario-liquido/">salário líquido</a>.</li>
        </ul>`,
    },
    {
      id: 'legislacao',
      title: 'Legislação e referências',
      html: `<ul class="list-disc space-y-2 pl-5">
          <li>CLT — jornada, horas extras e trabalho noturno.</li>
          <li>Constituição — limites e direitos sociais correlatos.</li>
        </ul>
        <p class="mt-3 text-sm text-ink-muted">Estimativa educativa.</p>`,
    },
  ],
};

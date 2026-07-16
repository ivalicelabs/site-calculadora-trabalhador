/**
 * Páginas programmatic: /salario-liquido-{slug}/
 * Conteúdo educativo por profissão.
 * Salários médios: scripts/content/programmatic/salario-liquido/salarios.json
 * (atualizável via n8n). Cálculo líquido: /calculadoras/salario-liquido/.
 */
export default [
  {
    slug: 'enfermeiro',
    profissao: 'Enfermeiro',
    title: 'Salário líquido de enfermeiro CLT — calculadora',
    description:
      'Estime o salário líquido de enfermeiro CLT: bruto, INSS, IRRF, adicional noturno e plantões. Calculadora gratuita com tabelas atualizadas.',
    keywords:
      'salário líquido enfermeiro, enfermeiro CLT, calculadora enfermeiro, adicional noturno enfermagem',
    diferenciais: [
      'Adicional noturno (jornadas 22h–5h)',
      'Plantões e escalas (ex.: 12x36)',
      'Horas extras em sobrecarga',
      'Possível insalubridade conforme laudo/local',
    ],
    intro:
      'O salário líquido de um enfermeiro CLT depende do salário-base e dos adicionais da escala (plantões, noturno, extras). Use a calculadora de salário líquido para simular o mês com os valores do seu holerite.',
    howTo:
      'Some ao bruto os proventos do mês (plantão, noturno, HE). Informe dependentes e outros descontos. A ferramenta aplica INSS e IRRF das tabelas do ano e estima o líquido. Para o adicional noturno isolado, use também a calculadora específica.',
    faq: [
      {
        q: 'Como calcular o salário líquido de enfermeiro?',
        a: 'Informe o salário bruto do mês (incluindo plantões e adicionais) na calculadora de salário líquido. Os descontos de INSS e IRRF são estimados automaticamente.',
      },
      {
        q: 'Enfermeiro recebe adicional noturno?',
        a: 'Quando a jornada urbana ocorre entre 22h e 5h, a CLT prevê adicional noturno mínimo de 20% sobre a hora diurna, salvo regra mais favorável em acordo ou convenção.',
      },
      {
        q: 'Plantão entra no cálculo do líquido?',
        a: 'Sim. Inclua o valor pago no mês no bruto ou em acréscimos, para que INSS e IRRF reflitam a remuneração real.',
      },
      {
        q: 'A estimativa substitui o holerite?',
        a: 'Não. É educativa. Confira sempre o demonstrativo oficial e a convenção coletiva da categoria.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'adicional-noturno', 'hora-extra', 'inss', 'irrf'],
  },
  {
    slug: 'professor',
    profissao: 'Professor',
    title: 'Salário líquido de professor CLT — calculadora',
    description:
      'Calcule o salário líquido de professor CLT: aula, horas extras, INSS e IRRF. Simulação gratuita no navegador.',
    keywords:
      'salário líquido professor, professor CLT, calculadora professor, desconto INSS professor',
    diferenciais: [
      'Carga horária e aulas extras',
      'Possíveis gratificações por titulação',
      'Férias escolares com regras específicas da escola/rede',
    ],
    intro:
      'Professores CLT costumam ter remuneração ligada à carga horária. Para estimar o líquido do mês, parta do bruto total (aulas + extras) e use a calculadora de salário líquido.',
    howTo:
      'Informe o bruto mensal completo. Se houver aulas extras, some-as antes. Dependentes e outros descontos (plano de saúde, etc.) entram nos campos correspondentes. Compare com as tabelas INSS/IRRF do site.',
    faq: [
      {
        q: 'Como calcular o líquido de professor CLT?',
        a: 'Some a remuneração do mês e use a calculadora de salário líquido para estimar INSS, IRRF e o valor final.',
      },
      {
        q: 'Aula extra altera o desconto?',
        a: 'Sim. Proventos aumentam a base de contribuição e podem elevar o IRRF do mês.',
      },
      {
        q: 'Professor tem cálculo diferente de INSS?',
        a: 'Em folha CLT, a contribuição do empregado segue a mesma tabela progressiva usada nas nossas ferramentas, até o teto.',
      },
      {
        q: 'Posso simular férias e 13º?',
        a: 'Sim. Use as calculadoras de férias e 13º salário com a base adequada ao seu contrato.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'ferias', 'decimo-terceiro', 'inss', 'irrf'],
  },
  {
    slug: 'motorista',
    profissao: 'Motorista',
    title: 'Salário líquido de motorista CLT — calculadora',
    description:
      'Estime o salário líquido de motorista CLT com horas extras, adicional noturno, INSS e IRRF. Ferramenta gratuita.',
    keywords:
      'salário líquido motorista, motorista CLT, calculadora motorista, hora extra motorista',
    diferenciais: [
      'Horas extras em rotas longas',
      'Adicional noturno em viagens',
      'Possível periculosidade conforme atividade (norma/laudo)',
    ],
    intro:
      'Motoristas CLT frequentemente acumulam extras e jornadas noturnas. Para o líquido, consolide o bruto do mês e simule na calculadora de salário líquido.',
    howTo:
      'Informe o salário e os adicionais pagos no mês. Use a calculadora de hora extra e a de adicional noturno para detalhar componentes; depois leve o total ao salário líquido.',
    faq: [
      {
        q: 'Como estimar o líquido de motorista?',
        a: 'Some salário-base e adicionais do mês e rode a calculadora de salário líquido para ver INSS, IRRF e líquido estimado.',
      },
      {
        q: 'Hora extra de motorista é 50% ou 100%?',
        a: 'A calculadora de hora extra usa 50% em dias úteis e 100% em domingo/feriado como padrão CLT; convenções podem melhorar esses percentuais.',
      },
      {
        q: 'Viagem noturna gera adicional?',
        a: 'Se a jornada urbana ocorrer no horário noturno legal, aplica-se o adicional mínimo de 20%, salvo norma mais favorável.',
      },
      {
        q: 'A ferramenta calcula periculosidade automaticamente?',
        a: 'Não. Se houver adicional de periculosidade no holerite, inclua o valor no bruto ou em acréscimos.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'adicional-noturno', 'inss', 'fgts'],
  },
  {
    slug: 'vendedor',
    profissao: 'Vendedor',
    title: 'Salário líquido de vendedor CLT — calculadora',
    description:
      'Calcule o salário líquido de vendedor CLT com salário fixo, comissões, INSS e IRRF. Simulação gratuita.',
    keywords:
      'salário líquido vendedor, vendedor CLT, comissão líquido, calculadora vendedor',
    diferenciais: [
      'Comissões variáveis no mês',
      'Possíveis prêmios e metas',
      'Impacto direto no INSS/IRRF quando a remuneração sobe',
    ],
    intro:
      'Para vendedores CLT, o líquido muda bastante conforme as comissões do mês. Some fixo + comissões + prêmios e simule na calculadora de salário líquido.',
    howTo:
      'Use o total de proventos do mês como bruto. Se quiser isolar o efeito de uma comissão, rode dois cenários (com e sem o valor). Dependentes e outros descontos entram nos campos da ferramenta.',
    faq: [
      {
        q: 'Comissão entra no salário líquido?',
        a: 'Sim. Em regra, comissões integram a remuneração do mês e entram na base de INSS e IRRF.',
      },
      {
        q: 'Como simular um mês com meta batida?',
        a: 'Some o prêmio/comissão ao bruto na calculadora de salário líquido e compare com o mês sem o adicional.',
      },
      {
        q: 'Vendedor PJ usa esta página?',
        a: 'Esta página e a calculadora focam o regime CLT. Regras de PJ/MEI são outras.',
      },
      {
        q: 'O resultado é o valor líquido da comissão?',
        a: 'A ferramenta estima o líquido total da folha, não um rateio item a item da comissão.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'inss', 'irrf', 'decimo-terceiro', 'ferias'],
  },
  {
    slug: 'auxiliar-administrativo',
    profissao: 'Auxiliar administrativo',
    title: 'Salário líquido de auxiliar administrativo CLT — calculadora',
    description:
      'Estime o salário líquido de auxiliar administrativo CLT: bruto, INSS, IRRF e descontos. Calculadora gratuita.',
    keywords:
      'salário líquido auxiliar administrativo, administrativo CLT, calculadora salário',
    diferenciais: [
      'Jornada comercial típica',
      'Possíveis horas extras pontuais',
      'Benefícios descontados em folha (VT, plano etc.)',
    ],
    intro:
      'No administrativo CLT, o caminho mais direto é informar o bruto do holerite e os descontos na calculadora de salário líquido para ver quanto sobra no mês.',
    howTo:
      'Preencha salário bruto, dependentes e outros descontos (vale-transporte, etc.). Se houver HE, some ao bruto ou use a calculadora de hora extra antes.',
    faq: [
      {
        q: 'Como calcular o líquido de auxiliar administrativo?',
        a: 'Informe o bruto e os descontos na calculadora de salário líquido. O INSS e o IRRF são estimados com as tabelas do site.',
      },
      {
        q: 'Vale-transporte entra onde?',
        a: 'No campo de outros descontos, com o valor efetivamente descontado no holerite.',
      },
      {
        q: 'Preciso da tabela INSS?',
        a: 'A calculadora já aplica a tabela. Você pode conferir os valores em Tabelas no menu.',
      },
      {
        q: 'Serve para estágio?',
        a: 'Estágio tem regras próprias e em geral não segue a mesma folha CLT. Use apenas como referência aproximada se for o caso.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'inss', 'irrf', 'hora-extra', 'fgts'],
  },
  {
    slug: 'operador-de-caixa',
    profissao: 'Operador de caixa',
    title: 'Salário líquido de operador de caixa CLT — calculadora',
    description:
      'Calcule o salário líquido de operador de caixa CLT com extras, adicional noturno, INSS e IRRF.',
    keywords:
      'salário líquido operador de caixa, caixa CLT, calculadora caixa supermercado',
    diferenciais: [
      'Turnos e possíveis jornadas noturnas',
      'Horas extras em datas de pico',
      'Descontos de benefícios em folha',
    ],
    intro:
      'Operadores de caixa CLT podem ter turnos e extras em períodos de movimento. Consolide o bruto do mês e estime o líquido na calculadora.',
    howTo:
      'Informe o bruto com extras. Se trabalhar à noite, calcule o adicional noturno e some o resultado aos proventos antes do líquido, ou inclua o valor já pago no holerite.',
    faq: [
      {
        q: 'Como estimar o líquido de operador de caixa?',
        a: 'Some salário e adicionais do mês e use a calculadora de salário líquido para INSS, IRRF e líquido.',
      },
      {
        q: 'Domingo trabalhado muda o cálculo?',
        a: 'Pode haver percentual maior de hora extra. Use a calculadora de hora extra com a opção de domingo/feriado quando for o caso.',
      },
      {
        q: 'O FGTS aparece no líquido?',
        a: 'Não. O FGTS é depósito do empregador. Veja a calculadora de FGTS em separado.',
      },
      {
        q: 'A simulação vale para qualquer estado?',
        a: 'As tabelas federais de INSS/IRRF são as mesmas; convenções locais podem alterar adicionais.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'adicional-noturno', 'inss', 'irrf'],
  },
  {
    slug: 'vigilante',
    profissao: 'Vigilante',
    title: 'Salário líquido de vigilante CLT — calculadora',
    description:
      'Estime o salário líquido de vigilante CLT: bruto, turnos, adicional noturno, INSS e IRRF. Calculadora gratuita.',
    keywords:
      'salário líquido vigilante, vigilante CLT, calculadora vigilante, segurança patrimonial',
    diferenciais: [
      'Turnos e escalas 12x36',
      'Possível adicional noturno',
      'Periculosidade conforme atividade/norma',
    ],
    intro:
      'O líquido do vigilante CLT depende do salário-base e dos adicionais de escala. Use a média nacional como ponto de partida e ajuste com o valor do seu holerite.',
    howTo:
      'Informe o bruto do mês (com noturno e extras, se houver). A calculadora estima INSS, IRRF e o líquido. Compare com a média CAGED da categoria.',
    faq: [
      {
        q: 'Vigilante recebe adicional noturno?',
        a: 'Quando a jornada urbana ocorre entre 22h e 5h, a CLT prevê adicional noturno mínimo de 20%, salvo regra mais favorável.',
      },
      {
        q: 'A média inclui periculosidade?',
        a: 'Não. A média CAGED é salário-base. Se houver adicional no holerite, some ao bruto na simulação.',
      },
      {
        q: 'Como simular escala 12x36?',
        a: 'Use o total pago no mês como bruto. A calculadora não monta a escala; ela estima os descontos sobre o valor informado.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'adicional-noturno', 'hora-extra', 'inss', 'fgts'],
  },
  {
    slug: 'tecnico-de-enfermagem',
    profissao: 'Técnico de enfermagem',
    title: 'Salário líquido de técnico de enfermagem CLT — calculadora',
    description:
      'Calcule o salário líquido de técnico de enfermagem CLT com plantões, noturno, INSS e IRRF.',
    keywords:
      'salário líquido técnico de enfermagem, técnico enfermagem CLT, calculadora técnico enfermagem',
    diferenciais: [
      'Plantões e escalas',
      'Adicional noturno frequente',
      'Possível insalubridade conforme laudo',
    ],
    intro:
      'Técnicos de enfermagem costumam ter remuneração variável por escala. Parta do bruto do mês (ou da média nacional) e simule o líquido na calculadora.',
    howTo:
      'Some base, plantões e adicionais. Informe dependentes e outros descontos. Use também a calculadora de adicional noturno se quiser detalhar o componente.',
    faq: [
      {
        q: 'Qual a diferença para o salário de enfermeiro?',
        a: 'São CBOs e médias distintas. Enfermeiro e técnico têm páginas e médias próprias neste portal.',
      },
      {
        q: 'Plantão entra no líquido?',
        a: 'Sim. Inclua o valor pago no mês no bruto para que INSS e IRRF reflitam a remuneração real.',
      },
      {
        q: 'O piso da enfermagem aparece na média?',
        a: 'A média CAGED mostra o salário-base registrado. Confira a aplicação do piso na sua região e contrato.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'adicional-noturno', 'hora-extra', 'inss', 'irrf'],
  },
  {
    slug: 'pedreiro',
    profissao: 'Pedreiro',
    title: 'Salário líquido de pedreiro CLT — calculadora',
    description:
      'Estime o salário líquido de pedreiro CLT com horas extras, INSS e IRRF. Ferramenta gratuita.',
    keywords: 'salário líquido pedreiro, pedreiro CLT, calculadora pedreiro, construção civil',
    diferenciais: [
      'Horas extras em obra',
      'Possível adicional de insalubridade',
      'Variação forte por região e porte da obra',
    ],
    intro:
      'Na construção civil, o líquido muda com extras e adicionais. Use a média CAGED ou o valor do seu contrato na calculadora de salário líquido.',
    howTo:
      'Informe o bruto mensal. Se houver HE, some ao bruto ou use a calculadora de hora extra antes. Inclua descontos de benefícios no campo correspondente.',
    faq: [
      {
        q: 'Pedreiro autônomo usa esta calculadora?',
        a: 'Esta página foca CLT. Autônomo/MEI tem regras tributárias diferentes.',
      },
      {
        q: 'Como incluir hora extra?',
        a: 'Some o valor das extras ao bruto ou calcule na ferramenta de hora extra e depois leve o total ao líquido.',
      },
      {
        q: 'A média vale para todas as cidades?',
        a: 'É nacional. Convenções e custo de vida locais alteram o valor praticado.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'inss', 'fgts', 'rescisao'],
  },
  {
    slug: 'eletricista',
    profissao: 'Eletricista',
    title: 'Salário líquido de eletricista CLT — calculadora',
    description:
      'Calcule o salário líquido de eletricista CLT: bruto, extras, periculosidade, INSS e IRRF.',
    keywords: 'salário líquido eletricista, eletricista CLT, calculadora eletricista',
    diferenciais: [
      'Possível periculosidade',
      'Horas extras em manutenção',
      'Especializações (predial, industrial, alta tensão)',
    ],
    intro:
      'Eletricistas CLT podem ter adicionais relevantes no holerite. Simule o líquido com a média nacional ou com o bruto do seu mês.',
    howTo:
      'Informe o total de proventos. Se houver periculosidade no holerite, inclua no bruto. A calculadora estima INSS/IRRF automaticamente.',
    faq: [
      {
        q: 'Periculosidade entra no cálculo?',
        a: 'Sim, se estiver no holerite. Some o valor ao bruto; a ferramenta não detecta o adicional sozinha.',
      },
      {
        q: 'Eletricista de alta tensão tem média diferente?',
        a: 'Sim. Usamos o CBO geral de eletricista; especializações podem pagar acima da média.',
      },
      {
        q: 'Posso simular FGTS também?',
        a: 'Sim. Use a calculadora de FGTS com a mesma base salarial.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'inss', 'fgts', 'rescisao'],
  },
  {
    slug: 'mecanico',
    profissao: 'Mecânico',
    title: 'Salário líquido de mecânico CLT — calculadora',
    description:
      'Estime o salário líquido de mecânico de automóveis CLT com extras, INSS e IRRF.',
    keywords:
      'salário líquido mecânico, mecânico automóveis CLT, calculadora mecânico',
    diferenciais: [
      'Possíveis horas extras em oficina',
      'Comissões/produção em alguns contratos',
      'Adicionais conforme local e norma',
    ],
    intro:
      'Mecânicos CLT podem ter produção ou extras variáveis. Use a média CAGED ou o bruto do holerite para estimar o líquido.',
    howTo:
      'Informe o bruto do mês. Se houver comissão, some ao valor. Dependentes e outros descontos entram nos campos da calculadora.',
    faq: [
      {
        q: 'Comissão de produção entra no líquido?',
        a: 'Em regra, sim — integra a remuneração do mês e a base de INSS/IRRF.',
      },
      {
        q: 'A média é só para mecânico automotivo?',
        a: 'Usamos o CBO de mecânico de manutenção de automóveis, a referência mais comum em pesquisas.',
      },
      {
        q: 'Como comparar com o holerite?',
        a: 'Simule com o bruto oficial e confira se INSS/IRRF se aproximam do demonstrativo.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'inss', 'irrf', 'fgts'],
  },
  {
    slug: 'recepcionista',
    profissao: 'Recepcionista',
    title: 'Salário líquido de recepcionista CLT — calculadora',
    description:
      'Calcule o salário líquido de recepcionista CLT: bruto, descontos, INSS e IRRF.',
    keywords:
      'salário líquido recepcionista, recepcionista CLT, calculadora recepcionista',
    diferenciais: [
      'Jornada comercial típica',
      'Possíveis horas extras pontuais',
      'Benefícios descontados em folha',
    ],
    intro:
      'Para recepcionistas CLT, o caminho mais direto é informar o bruto do holerite (ou a média nacional) e ver o líquido estimado.',
    howTo:
      'Preencha salário bruto, dependentes e outros descontos (VT, plano etc.). Se houver HE, some ao bruto.',
    faq: [
      {
        q: 'Vale-transporte entra onde?',
        a: 'No campo de outros descontos, com o valor efetivamente descontado.',
      },
      {
        q: 'A média inclui benefícios?',
        a: 'Não. A média CAGED é salário-base em carteira.',
      },
      {
        q: 'Serve para recepcionista hospitalar?',
        a: 'Sim como referência CLT; turnos noturnos devem ser somados ao bruto se existirem.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'inss', 'irrf', 'hora-extra', 'fgts'],
  },
  {
    slug: 'garcom',
    profissao: 'Garçom',
    title: 'Salário líquido de garçom CLT — calculadora',
    description:
      'Estime o salário líquido de garçom CLT. Atenção: gorjetas podem não estar no salário-base.',
    keywords: 'salário líquido garçom, garçom CLT, calculadora garçom, gorjeta',
    diferenciais: [
      'Gorjetas e taxa de serviço',
      'Turnos e finais de semana',
      'Possível adicional noturno',
    ],
    intro:
      'No setor de bares e restaurantes, o líquido real pode incluir gorjetas fora do salário-base CAGED. Simule com o que realmente entra na sua remuneração do mês.',
    howTo:
      'Informe o bruto registrado + valores que integram a folha. Gorjetas só entram se forem pagas/registradas conforme seu contrato.',
    faq: [
      {
        q: 'Gorjeta entra no INSS?',
        a: 'Depende de como é paga e registrada. Se integrar a remuneração na folha, deve entrar no bruto da simulação.',
      },
      {
        q: 'Por que a média parece baixa?',
        a: 'A média CAGED é salário-base. Gorjetas costumam ficar de fora dessa estatística.',
      },
      {
        q: 'Trabalho aos domingos altera o cálculo?',
        a: 'Pode haver HE com percentual maior. Use a calculadora de hora extra quando for o caso.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'hora-extra', 'adicional-noturno', 'inss', 'irrf'],
  },
  {
    slug: 'auxiliar-de-limpeza',
    profissao: 'Auxiliar de limpeza',
    title: 'Salário líquido de auxiliar de limpeza CLT — calculadora',
    description:
      'Calcule o salário líquido de auxiliar de limpeza / faxineiro CLT com INSS e IRRF.',
    keywords:
      'salário líquido auxiliar de limpeza, faxineiro CLT, calculadora limpeza',
    diferenciais: [
      'Jornada típica de serviços',
      'Possível adicional de insalubridade',
      'Descontos de benefícios em folha',
    ],
    intro:
      'Auxiliares de limpeza CLT (CBO de faxineiro) têm uma das maiores amostras do CAGED. Use a média ou o bruto do holerite para estimar o líquido.',
    howTo:
      'Informe o salário bruto e os descontos. Se houver insalubridade no holerite, some ao bruto antes de calcular.',
    faq: [
      {
        q: 'Faxineiro e auxiliar de limpeza são a mesma média?',
        a: 'Usamos o CBO 5143-20 (faxineiro), a referência mais buscada para limpeza predial CLT.',
      },
      {
        q: 'Insalubridade entra automaticamente?',
        a: 'Não. Inclua o valor pago no bruto se constar no holerite.',
      },
      {
        q: 'Posso simular rescisão também?',
        a: 'Sim. Use a calculadora de rescisão com a mesma base salarial.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'inss', 'fgts', 'rescisao', 'ferias'],
  },
  {
    slug: 'programador',
    profissao: 'Programador',
    title: 'Salário líquido de programador CLT — calculadora',
    description:
      'Estime o salário líquido de programador / técnico em programação CLT com INSS e IRRF.',
    keywords:
      'salário líquido programador, programador CLT, desenvolvedor salário líquido, calculadora TI',
    diferenciais: [
      'Grande dispersão salarial na TI',
      'Muitos profissionais em PJ (fora desta média CLT)',
      'Benefícios e bônus variáveis',
    ],
    intro:
      'A média CLT de técnico em programação é uma referência; o mercado de TI varia muito por stack e senioridade. Simule com o seu bruto real.',
    howTo:
      'Informe o salário bruto CLT do mês. Bônus que entram em folha devem ser somados. Para comparar CLT x PJ, esta ferramenta cobre só o regime CLT.',
    faq: [
      {
        q: 'A média vale para desenvolvedor sênior?',
        a: 'A mediana e o teto mostram a dispersão. Sênior costuma ficar acima da média; use seu holerite para precisão.',
      },
      {
        q: 'Sou PJ — esta calculadora serve?',
        a: 'Não diretamente. Ela estima descontos de folha CLT (INSS/IRRF na fonte).',
      },
      {
        q: 'Como simular um aumento?',
        a: 'Rode dois cenários com brutos diferentes e compare o líquido.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'inss', 'irrf', 'decimo-terceiro', 'ferias'],
  },
  {
    slug: 'engenheiro-civil',
    profissao: 'Engenheiro civil',
    title: 'Salário líquido de engenheiro civil CLT — calculadora',
    description:
      'Calcule o salário líquido de engenheiro civil CLT com INSS, IRRF e descontos de folha.',
    keywords:
      'salário líquido engenheiro civil, engenheiro civil CLT, calculadora engenheiro',
    diferenciais: [
      'Remuneração tipicamente acima da média nacional',
      'Possíveis gratificações e bônus',
      'IRRF mais relevante em faixas altas',
    ],
    intro:
      'Engenheiros civis CLT costumam ter bruto elevado, o que aumenta o impacto do IRRF. Use a média CAGED ou o valor do contrato na calculadora.',
    howTo:
      'Informe o bruto, dependentes e outros descontos. Em faixas altas, compare o resultado com a tabela IRRF do site.',
    faq: [
      {
        q: 'Por que o líquido cai mais que em outros cargos?',
        a: 'Com bruto maior, a alíquota efetiva de IRRF sobe. A calculadora aplica a tabela do ano.',
      },
      {
        q: 'A média inclui autônomos?',
        a: 'Não. É média de vínculos CLT do CAGED.',
      },
      {
        q: 'Posso simular 13º e férias?',
        a: 'Sim. Use as calculadoras de 13º e férias com a base adequada ao contrato.',
      },
    ],
    relatedCalcs: ['salario-liquido', 'irrf', 'inss', 'decimo-terceiro', 'ferias'],
  },
];

import { DashboardANonInvestor, DashboardAInvestor } from './DashboardOptionA'
import { DashboardBNonInvestor, DashboardBInvestor } from './DashboardOptionB'
import { DashboardCNonInvestor, DashboardCInvestor } from './DashboardOptionC'
import { InvestmentIntro } from './InvestmentIntro'

export const flows = [
  {
    id: 'dashboard-variations',
    name: 'Dashboard (Variações)',
    options: [
      {
        id: 'option-a',
        name: 'Opção A: Card Emphasis',
        screens: [
          {
            id: 'a-non-investor',
            name: 'Dashboard (não investidor)',
            component: <DashboardANonInvestor />,
          },
          {
            id: 'a-investor',
            name: 'Dashboard (investidor)',
            component: <DashboardAInvestor />,
          },
        ],
      },
      {
        id: 'option-b',
        name: 'Opção B: Horizontal Scroll',
        screens: [
          {
            id: 'b-non-investor',
            name: 'Dashboard (não investidor)',
            component: <DashboardBNonInvestor />,
          },
          {
            id: 'b-investor',
            name: 'Dashboard (investidor)',
            component: <DashboardBInvestor />,
          },
        ],
      },
      {
        id: 'option-c',
        name: 'Opção C: Bank Style',
        screens: [
          {
            id: 'c-non-investor',
            name: 'Dashboard (não investidor)',
            component: <DashboardCNonInvestor />,
          },
          {
            id: 'c-investor',
            name: 'Dashboard (investidor)',
            component: <DashboardCInvestor />,
          },
        ],
      },
    ],
  },
  {
    id: 'investment-intro',
    name: 'Intro ao Investimento',
    options: [
      {
        id: 'intro-option-a',
        name: 'Opção A: Investment Intro',
        screens: [
          {
            id: 'intro',
            name: 'Investment Intro',
            component: <InvestmentIntro />,
          },
        ],
      },
    ],
  },
  {
    id: 'investment-detail',
    name: 'Detalhe do Investimento',
    options: [
      {
        id: 'detail-placeholder',
        name: 'Placeholder',
        screens: [
          {
            id: 'detail-placeholder',
            name: 'Em desenvolvimento',
            component: (
              <div className="w-[375px] min-h-[400px] bg-white rounded-[32px] border-2 border-gray-300 border-dashed shadow-lg flex items-center justify-center p-8">
                <div className="text-center text-wire-text-muted">
                  <div className="text-4xl mb-3">🚧</div>
                  <div className="text-sm font-semibold mb-1">Em desenvolvimento</div>
                  <div className="text-xs">
                    Detalhe do investimento será implementado na próxima iteração
                  </div>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
]

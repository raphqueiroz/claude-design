import {
  PhoneFrame,
  WireframeCard,
  WireframeButton,
  WireframeBalance,
  WireframeSection,
  WireframeList,
  Annotation,
  DashboardHeader,
} from '../components/wireframe-ui'
import { formatCurrency } from '../lib/wireframe-system'
import { nonInvestorData, investorData } from './shared-data'
import { CreditCard, TrendingUp } from 'lucide-react'

function DashboardB({ data, isInvestor }) {
  return (
    <PhoneFrame>
      <DashboardHeader />

      <div className="px-5 pt-1 pb-4">
        {/* Horizontal scroll cards - Rocket Money style */}
        <div className="relative mb-2">
          <div className="cards-scroll">
            {/* Card account */}
            <div className="scroll-card">
              <WireframeCard variant="dark" className="!rounded-2xl !p-4 h-[140px] flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-400">Cartão</span>
                </div>
                <div>
                  <div className="text-xl font-bold">{formatCurrency(data.cardBalance)}</div>
                  <div className="text-xs text-gray-400">•••• {data.cardLast4}</div>
                </div>
              </WireframeCard>
            </div>

            {/* Investment card */}
            <div className="scroll-card">
              <WireframeCard
                className={`!rounded-2xl !p-4 h-[140px] flex flex-col justify-between ${
                  isInvestor ? '!border-green-200 !bg-green-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-wire-text-muted" />
                  <span className="text-xs text-wire-text-muted">Investimentos</span>
                </div>
                <div>
                  {isInvestor ? (
                    <>
                      <div className="text-xl font-bold">{formatCurrency(data.investmentBalance)}</div>
                      <div className="text-xs text-green-600">↑ +US$ 0,12</div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-bold text-wire-text-muted">{formatCurrency(0)}</div>
                      <div className="text-xs text-wire-text-muted">Comece a investir →</div>
                    </>
                  )}
                </div>
              </WireframeCard>
            </div>
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            <div className="w-5 h-1.5 bg-gray-800 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="annotation-layer">
            <Annotation type="note" position="bottom-right">
              Scroll horizontal dá peso visual igual para cartão e investimento
            </Annotation>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <div className="px-5 mb-4">
        <WireframeSection title="Destaques" action="Ver todos">
          <div className="space-y-2">
            {data.destaques.map((d, i) => (
              <div className="relative" key={i}>
                <WireframeCard variant="muted" className="!p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{d.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{d.title}</div>
                      <div className="text-[11px] text-wire-text-muted">{d.subtitle}</div>
                    </div>
                    <WireframeButton variant="ghost" size="sm">
                      {d.cta}
                    </WireframeButton>
                  </div>
                </WireframeCard>
                {i === 0 && isInvestor && (
                  <div className="annotation-layer">
                    <Annotation type="change" position="bottom-left">
                      Rendimento real substitui CTA de investir
                    </Annotation>
                  </div>
                )}
              </div>
            ))}
          </div>
        </WireframeSection>
      </div>

      {/* History */}
      <div className="px-5 pb-6">
        <WireframeSection title="Histórico" action="Ver tudo">
          <WireframeList
            items={data.history.map((h) => ({
              icon: <span className="text-sm">{h.icon}</span>,
              title: h.type,
              subtitle: h.date,
              right:
                h.amount > 0
                  ? `${h.prefix || ''}${formatCurrency(h.amount)}`
                  : formatCurrency(Math.abs(h.amount)),
              rightColor: h.color || (h.amount < 0 ? 'text-wire-text-primary' : 'text-green-600'),
            }))}
          />
        </WireframeSection>
      </div>
    </PhoneFrame>
  )
}

export function DashboardBNonInvestor() {
  return <DashboardB data={nonInvestorData} isInvestor={false} />
}

export function DashboardBInvestor() {
  return <DashboardB data={investorData} isInvestor={true} />
}

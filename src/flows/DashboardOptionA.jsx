import {
  PhoneFrame,
  WireframeCard,
  WireframeButton,
  WireframeBalance,
  WireframeSection,
  WireframeList,
  Annotation,
} from '../components/wireframe-ui'
import { formatCurrency } from '../lib/wireframe-system'
import { nonInvestorData, investorData } from './shared-data'
import { CreditCard, TrendingUp, Bell } from 'lucide-react'

function DashboardA({ data, isInvestor }) {
  return (
    <PhoneFrame>
      {/* Header */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-wire-text-muted">Olá, Rafael 👋</div>
            <div className="text-lg font-bold">Sua conta</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center">
            <Bell size={16} className="text-wire-text-muted" />
          </button>
        </div>

        {/* Total balance */}
        <WireframeBalance
          label="Saldo total"
          value={data.totalBalance}
          size="lg"
          className="mb-5"
        />

        {/* Primary card - Card Emphasis style */}
        <div className="relative mb-4">
          <WireframeCard variant="dark" className="!rounded-2xl !p-5">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={18} className="text-gray-400" />
              <span className="text-xs text-gray-400">{data.cardName}</span>
            </div>
            <div className="text-xl font-bold mb-1">{formatCurrency(data.cardBalance)}</div>
            <div className="text-xs text-gray-400">•••• {data.cardLast4}</div>
          </WireframeCard>
          {!isInvestor && (
            <div className="annotation-layer">
              <Annotation type="note" position="top-right">
                Cartão é o elemento principal em Option A
              </Annotation>
            </div>
          )}
        </div>

        {/* Investment area */}
        <div className="relative mb-4">
          <WireframeCard className={isInvestor ? '!border-green-200 !bg-green-50/50' : ''}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-wire-text-muted" />
              <span className="text-sm font-semibold">Investimentos</span>
            </div>
            {isInvestor ? (
              <>
                <div className="text-xl font-bold">{formatCurrency(data.investmentBalance)}</div>
                <div className="text-xs text-green-600 mt-1">↑ +US$ 0,12 este mês</div>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-wire-text-muted">{formatCurrency(0)}</div>
                <WireframeButton size="sm" className="mt-2" fullWidth>
                  Começar a investir
                </WireframeButton>
              </>
            )}
          </WireframeCard>
          {isInvestor && (
            <div className="annotation-layer">
              <Annotation type="change" position="top-right">
                Investimento aparece como card secundário abaixo do cartão
              </Annotation>
            </div>
          )}
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
                      Mudou de "Comece a render" para rendimento real
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

export function DashboardANonInvestor() {
  return <DashboardA data={nonInvestorData} isInvestor={false} />
}

export function DashboardAInvestor() {
  return <DashboardA data={investorData} isInvestor={true} />
}

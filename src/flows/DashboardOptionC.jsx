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
import { CreditCard, TrendingUp, Wallet, Bell, ChevronRight } from 'lucide-react'

function AccountRow({ icon, label, balance, subtitle, highlight, annotation }) {
  return (
    <div className="relative">
      <div className={`flex items-center gap-3 py-3 px-4 rounded-lg border-2 ${highlight ? 'border-green-200 bg-green-50/50' : 'border-wire-border bg-white'}`}>
        <div className="w-10 h-10 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{label}</div>
          {subtitle && <div className="text-xs text-wire-text-muted">{subtitle}</div>}
        </div>
        <div className="text-right shrink-0 flex items-center gap-2">
          <div className="text-sm font-bold">{formatCurrency(balance)}</div>
          <ChevronRight size={14} className="text-wire-text-muted" />
        </div>
      </div>
      {annotation && (
        <div className="annotation-layer">
          {annotation}
        </div>
      )}
    </div>
  )
}

function DashboardC({ data, isInvestor }) {
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

        {/* Bank-style account list */}
        <div className="relative mb-4">
          <WireframeSection title="Suas contas">
            <div className="space-y-2">
              {isInvestor && (
                <AccountRow
                  icon={<TrendingUp size={18} className="text-green-600" />}
                  label="Investimentos"
                  balance={data.investmentBalance}
                  subtitle="+US$ 0,12 este mês"
                  highlight
                  annotation={
                    <Annotation type="change" position="top-right">
                      Investimento aparece primeiro na lista — prioridade visual máxima
                    </Annotation>
                  }
                />
              )}
              <AccountRow
                icon={<CreditCard size={18} className="text-wire-text-muted" />}
                label="Cartão Visa"
                balance={data.cardBalance}
                subtitle={`•••• ${data.cardLast4}`}
              />
              {!isInvestor && (
                <AccountRow
                  icon={<TrendingUp size={18} className="text-wire-text-muted" />}
                  label="Investimentos"
                  balance={0}
                  subtitle="Comece a render hoje"
                  annotation={
                    <Annotation type="note" position="top-right">
                      No estilo banco, investimento é uma "conta" como qualquer outra
                    </Annotation>
                  }
                />
              )}
            </div>
          </WireframeSection>
        </div>

        {/* Quick action for non-investor */}
        {!isInvestor && (
          <div className="relative mb-4">
            <WireframeCard variant="muted" className="!border-dashed !p-4 text-center">
              <Wallet size={24} className="mx-auto text-wire-text-muted mb-2" />
              <div className="text-sm font-semibold mb-1">Seu dinheiro pode render mais</div>
              <div className="text-xs text-wire-text-muted mb-3">
                Invista e ganhe 5% a.a. em dólar
              </div>
              <WireframeButton size="sm" fullWidth>
                Investir agora
              </WireframeButton>
            </WireframeCard>
            <div className="annotation-layer">
              <Annotation type="add" position="bottom-right">
                CTA de investimento mais proeminente no estilo banco
              </Annotation>
            </div>
          </div>
        )}
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

export function DashboardCNonInvestor() {
  return <DashboardC data={nonInvestorData} isInvestor={false} />
}

export function DashboardCInvestor() {
  return <DashboardC data={investorData} isInvestor={true} />
}

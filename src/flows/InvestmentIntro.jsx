import {
  PhoneFrame,
  WireframeCard,
  WireframeButton,
  Annotation,
} from '../components/wireframe-ui'
import { formatCurrency } from '../lib/wireframe-system'
import { TrendingUp, Shield, Clock, DollarSign, X } from 'lucide-react'

export function InvestmentIntro() {
  return (
    <PhoneFrame>
      {/* Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div className="text-sm font-bold">Investir</div>
        <button className="w-8 h-8 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center">
          <X size={16} className="text-wire-text-muted" />
        </button>
      </div>

      {/* Hero */}
      <div className="px-5 pt-4 pb-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4">
          <TrendingUp size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Seu dinheiro rendendo em dólar</h2>
        <p className="text-sm text-wire-text-secondary leading-relaxed">
          Invista seu saldo e ganhe rendimento diário. Sem taxas, sem complicação.
        </p>
      </div>

      {/* Benefits */}
      <div className="px-5 mb-6">
        <div className="space-y-3">
          <div className="relative">
            <WireframeCard variant="muted" className="!p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                  <DollarSign size={18} className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold">5% a.a. em dólar</div>
                  <div className="text-xs text-wire-text-muted">Rendimento diário creditado automaticamente</div>
                </div>
              </div>
            </WireframeCard>
            <div className="annotation-layer">
              <Annotation type="note" position="top-right">
                Proposta de valor principal
              </Annotation>
            </div>
          </div>

          <WireframeCard variant="muted" className="!p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Resgate quando quiser</div>
                <div className="text-xs text-wire-text-muted">Liquidez imediata, sem carência</div>
              </div>
            </div>
          </WireframeCard>

          <WireframeCard variant="muted" className="!p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-semibold">Seguro e regulado</div>
                <div className="text-xs text-wire-text-muted">Proteção SIPC até US$ 500.000</div>
              </div>
            </div>
          </WireframeCard>
        </div>
      </div>

      {/* Simulation */}
      <div className="px-5 mb-6">
        <div className="relative">
          <WireframeCard className="!p-4 text-center">
            <div className="text-xs text-wire-text-muted mb-1">Se você investir US$ 100 hoje</div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(105)}</div>
            <div className="text-xs text-green-600 font-medium">+US$ 5,00 em 1 ano</div>
          </WireframeCard>
          <div className="annotation-layer">
            <Annotation type="note" position="bottom-left">
              Simulação simples para tangibilizar o ganho
            </Annotation>
          </div>
        </div>
      </div>

      {/* Amount input */}
      <div className="px-5 mb-4">
        <div className="text-sm font-semibold mb-2">Quanto quer investir?</div>
        <div className="flex gap-2 mb-3">
          {[10, 50, 100].map((v) => (
            <button
              key={v}
              className="flex-1 py-2 text-sm font-medium border-2 border-wire-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              US$ {v}
            </button>
          ))}
        </div>
        <div className="border-2 border-wire-border rounded-lg px-4 py-3 text-center">
          <span className="text-2xl font-bold text-wire-text-muted">US$ 0,00</span>
        </div>
        <div className="text-xs text-wire-text-muted mt-2 text-center">
          Saldo disponível: {formatCurrency(245)}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-4">
        <WireframeButton fullWidth size="lg">
          Investir agora
        </WireframeButton>
        <div className="text-center mt-2">
          <WireframeButton variant="ghost" size="sm">
            Saiba mais sobre investimentos
          </WireframeButton>
        </div>
      </div>
    </PhoneFrame>
  )
}

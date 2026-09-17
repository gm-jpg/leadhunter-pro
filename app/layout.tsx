import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LeadHunter Pro | Triagem Comercial & Propostas Visuais com IA',
  description: 'Prospecção inteligente de estabelecimentos comerciais, diagnóstico de presença digital e geração de propostas personalizadas com fechamento via WhatsApp.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Otimização de LCP e Core Web Vitals via DNS Prefetch e Preconnect */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

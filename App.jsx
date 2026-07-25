import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ============================================================
// CONFIG RÁPIDA — troque aqui o link de pagamento e textos-chave
// ============================================================
const PAY_LINK = 'https://pay.cakto.com.br/38aar7u'

function todayFormatted() {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

// ---------- animação de entrada ao rolar a tela ----------
function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ---------- barra de urgência fixa no topo ----------
function UrgencyBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-wine text-white text-center text-xs md:text-sm font-bold py-2 px-3">
      ⚡ O valor promocional encerra hoje, dia {todayFormatted()} · Entre agora antes que a turma feche →
    </div>
  )
}

// ---------- contador regressivo (reinicia por sessão, 15 min) ----------
function useCountdown(minutes = 15) {
  const [display, setDisplay] = useState('15:00')
  useEffect(() => {
    const KEY = 'jejumEsterDeadline'
    const now = Date.now()
    let deadline = parseInt(localStorage.getItem(KEY) || '0', 10)
    if (!deadline || deadline < now) {
      deadline = now + minutes * 60 * 1000
      localStorage.setItem(KEY, String(deadline))
    }
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now())
      const m = Math.floor(diff / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setDisplay(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [minutes])
  return display
}

// ---------- nav ----------
function Nav() {
  return (
    <header className="sticky top-9 z-50 px-4 md:px-6">
      <nav className="flex items-center justify-between gap-4 py-3 px-5 max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-wine/15 rounded-full shadow-[0_8px_24px_rgba(26,11,20,.06)]">
        <div className="font-title font-bold text-sm uppercase tracking-wide text-ink">Mulheres que Jejuam</div>
        <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-wider text-ink">
          <a href="#problema" className="hover:text-wine transition-colors">O Problema</a>
          <a href="#metodo" className="hover:text-wine transition-colors">O Método</a>
          <a href="#mentora" className="hover:text-wine transition-colors">Quem sou eu</a>
          <a href="#oferta" className="hover:text-wine transition-colors">Preço</a>
        </div>
        <span className="text-xs bg-wine text-white px-4 py-2 rounded-full font-bold">Últimas vagas</span>
      </nav>
    </header>
  )
}

function Btn({ children, sub, className = '', ...props }) {
  return (
    <motion.a
      href={PAY_LINK}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={
        'inline-flex flex-col items-center gap-1 bg-wine text-white font-bold px-10 py-4 rounded-full glow-btn transition-shadow ' +
        className
      }
      {...props}
    >
      <span>{children}</span>
      {sub && <small className="font-medium text-xs opacity-80">{sub}</small>}
    </motion.a>
  )
}

// ---------- HERO ----------
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  const avatars = [
    'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/3O9sg2nt4OPyKcFyLGRvoSJyjIC2/6f52453b-497c-4711-a170-6cfdf9ee78f7.png',
    'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/3O9sg2nt4OPyKcFyLGRvoSJyjIC2/a38173fe-12e0-4628-8f4b-bfb2235fd65d.png',
    'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/3O9sg2nt4OPyKcFyLGRvoSJyjIC2/c2163435-9f6d-4fb5-9230-5e9dc8fd51ab.png',
    'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/3O9sg2nt4OPyKcFyLGRvoSJyjIC2/3dec5495-0d5b-4b50-a703-743d344614d7.png',
    'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/3O9sg2nt4OPyKcFyLGRvoSJyjIC2/8ad4edbc-600a-4b63-bdf4-f5c1cb484a00.png',
  ]

  return (
    <section ref={ref} className="pt-24 pb-16 px-4 md:px-6 max-w-6xl mx-auto relative overflow-hidden">
      <motion.div style={{ y }} className="absolute -top-20 -left-20 w-96 h-96 bg-wine/10 blur-[120px] rounded-full pointer-events-none" />
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="text-wine font-bold text-xs md:text-sm tracking-widest uppercase mb-4"
      >
        ● Jejum de Ester · O Chamado
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="font-title font-normal text-[2.25rem] md:text-[5rem] leading-[0.95] max-w-3xl text-ink mb-5"
      >
        Chega de orar<br />
        <em className="italic font-light text-pinklight glow-text">e não ser respondida.</em>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-muted text-lg max-w-xl mb-8"
      >
        Você não precisa de mais uma dica espiritual. Precisa de um posicionamento — o mesmo que toda mulher que já foi respondida teve que assumir primeiro. 3 dias separam quem você é hoje de quem você decidir ser.
      </motion.p>
      <Btn sub="8x R$5,40 · ou R$37 à vista">Quero me posicionar agora</Btn>

      <div className="flex items-center gap-4 mt-11 flex-wrap">
        <div className="flex">
          {avatars.map((src, i) => (
            <img key={i} src={src} alt="Aluna" draggable={false}
              className="w-13 h-13 rounded-full border-[3px] border-[#fbf7f9] object-cover -ml-3.5 first:ml-0"
              style={{ width: 52, height: 52 }} />
          ))}
        </div>
        <div>
          <b className="font-title font-semibold text-wine">+20.000 mulheres</b>
          <div className="text-[0.7rem] uppercase tracking-wide text-muted">transformadas nesse jejum</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 pt-9 border-t border-wine/15">
        {[
          ['+20 mil', 'Mulheres no jejum de Ester'],
          ['3 dias', 'Do choro à quebra'],
          ['98%', 'Sentem resposta no 2º dia'],
        ].map(([num, label], i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="font-title text-3xl text-wine">{num}</div>
            <div className="text-xs uppercase tracking-wide text-muted mt-1">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ---------- PROBLEMA (dor específica, agitação) ----------
function Problem() {
  const pains = [
    'Você ora todo dia e sente que fala com o teto, não com o céu.',
    'Seu casamento (ou a falta de um) esfriou, e você já não sabe o que fazer.',
    'A ansiedade te acorda 3 da manhã — e você encara o escuro sozinha.',
    'Vê outras mulheres testemunhando e pensa: "por que não eu?"',
  ]
  return (
    <section id="problema" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">● 01 / o problema real</p>
        <h2 className="font-title text-3xl md:text-4xl max-w-xl mb-4 text-ink">
          Não é falta de fé. <em className="text-pinklight italic font-light glow-text">É falta de posicionamento.</em>
        </h2>
        <p className="text-muted max-w-xl mb-11">
          Ester não entrou no palácio porque tinha mais fé que as outras. Ela se posicionou. Enquanto você não fizer o mesmo, vai continuar orando no vazio — não porque Deus não te ouve, mas porque ninguém te ensinou a se aproximar como quem já foi escolhida.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pains.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="bg-white rounded-3xl p-6 flex gap-4 items-start shadow-[0_10px_30px_rgba(196,30,94,.08)]">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#f4dede] text-[#b23a3a] flex items-center justify-center font-bold">✕</span>
              <span className="text-ink">{p}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="text-center mt-10 font-title text-xl text-wine">
          Marcou pelo menos uma? Você não está quebrada. Você só ainda não se posicionou.
        </p>
      </Reveal>
    </section>
  )
}

// ---------- IDENTIDADE (transformação, o gatilho mais forte) ----------
function Identity() {
  const before = ['Orações que parecem bater no teto', 'Ansiedade travando cada decisão', 'Sensação de estar sozinha na fé', 'Um chamado sem direção clara']
  const after = ['Intimidade real com Deus', 'Direção nítida pra decidir', 'Comunidade orando com você', 'Autoridade espiritual restaurada']
  return (
    <section className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">● sua vez</p>
        <h2 className="font-title text-3xl md:text-4xl max-w-2xl mb-4 text-ink">
          Da mulher que ora sem resposta <em className="text-pinklight italic font-light glow-text">para a mulher que vê Deus mover.</em>
        </h2>
        <p className="text-muted max-w-xl mb-10">Isso não é sobre fazer mais um jejum. É sobre decidir, de uma vez, ser a mulher que Deus te chamou pra ser — e parar de pedir permissão pra isso.</p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Reveal>
          <div className="border border-wine/15 rounded-3xl p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Antes</p>
            <ul className="space-y-3">{before.map((t, i) => <li key={i} className="text-ink">{t}</li>)}</ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="border border-wine/15 rounded-3xl p-8 bg-wine/5">
            <p className="text-xs font-bold uppercase tracking-widest text-pinklight mb-4">Depois</p>
            <ul className="space-y-3">{after.map((t, i) => <li key={i} className="text-ink font-medium">{t}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------- O QUE VOCÊ RECEBE ----------
function WhatYouGet() {
  const items = [
    ['O livro do Jejum de Ester', 'Guia digital completo pra ler no seu tempo.'],
    ['Mini aulas em vídeo', 'Passo a passo curto e direto: prepare, conduza, encerre.'],
    ['Lives gravadas', 'Todos os encontros salvos pra assistir quando quiser.'],
    ['Próximos jejuns ao vivo', 'Entra uma vez, volta em todos. Sem renovar nada.'],
    ['Comunidade só de mulheres', 'Grupo fechado, cuidado, sem julgamento.'],
    ['Pra vida toda', 'Não expira. Fica com você em cada temporada.'],
  ]
  return (
    <section className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">o que você recebe</p>
        <h2 className="font-title text-3xl md:text-4xl max-w-xl mb-10 text-ink">Tudo que preparei com carinho pra você.</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(([title, desc], i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.div whileHover={{ y: -4 }} className="flex gap-4 items-start bg-[#fce7f3]/40 border-[.8px] border-wine/15 rounded-3xl p-6 transition-colors hover:bg-[#fce7f3]/50 hover:border-wine/40">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-wine/10 text-wine flex items-center justify-center">♡</span>
              <div>
                <h4 className="font-title font-semibold text-ink mb-1">{title}</h4>
                <p className="text-muted text-sm">{desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ---------- MÉTODO ----------
function Method() {
  const steps = [
    ['01', 'Preparação', 'Tira os ídolos do coração e alinha a intenção.'],
    ['02', 'Rompimento', 'A fome vira oração. A fortaleza racha.'],
    ['03', 'Palácio', 'Você entra no salão. Sai com o "sim" reservado.'],
  ]
  return (
    <section id="metodo" className="py-20 px-4 md:px-6 max-w-6xl mx-auto text-center">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">método</p>
        <h2 className="font-title text-3xl md:text-4xl mb-14 text-ink">Três dias. Uma mulher nova.</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {steps.map(([n, title, desc], i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="font-title text-4xl text-pinklight opacity-70 mb-1">{n}</div>
            <div className="text-xs font-bold tracking-widest text-muted mb-2">DIA {n}</div>
            <h3 className="font-title font-semibold text-xl text-ink mb-2">{title}</h3>
            <p className="text-muted">{desc}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <div className="mt-16 pt-11 border-t border-wine/15">
          <p className="font-title italic text-xl text-ink max-w-2xl mx-auto mb-3">
            "Esse jejum é pra você que quer se aproximar de Deus de verdade. Não precisa chegar pronta — só precisa querer."
          </p>
          <p className="text-muted text-sm">Dê o primeiro passo em direção ao palácio que Deus já preparou pra você.</p>
        </div>
      </Reveal>
    </section>
  )
}

// ---------- OFERTA ----------
function Offer() {
  const timer = useCountdown(15)
  const included = [
    'Método completo com o Livro do Jejum de Ester, passo a passo',
    'Cronograma detalhado guiando cada dia',
    'Todas as lives gravadas, pra assistir quando quiser',
    'Comunidade fechada de mulheres orando junto',
    'Orações direcionadas pra cada dia do processo',
    'Acompanhamento comigo do começo ao fim',
    '1 ano de acesso a todos os propósitos, lives e encontros',
    'Atualizações contínuas sempre que sair conteúdo novo',
  ]
  return (
    <section id="oferta" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">incluso no acesso</p>
      </Reveal>
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-10 bg-white rounded-[32px] p-7 md:p-11 shadow-[0_10px_30px_rgba(196,30,94,.08)]">
          <div>
            <h3 className="font-title font-semibold text-2xl mb-5 text-ink">O que <em className="text-pinklight italic font-light glow-text">entra com você</em></h3>
            <ul className="space-y-3 mb-7">
              {included.map((t, i) => (
                <li key={i} className="flex gap-2 text-ink"><b className="text-wine">→</b>{t}</li>
              ))}
            </ul>
            <div className="bg-wine/5 border border-wine/15 rounded-3xl p-6">
              <span className="text-[0.7rem] bg-wine text-white px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block mb-4">Bônus exclusivos</span>
              <div className="flex gap-4 py-2">
                <span className="font-title text-pinklight text-xl">01</span>
                <div><b className="text-ink">Planner de Jejum Digital</b><p className="text-muted text-sm">Sua rotina espiritual organizada dia a dia.</p></div>
              </div>
              <div className="flex gap-4 py-2">
                <span className="font-title text-pinklight text-xl">02</span>
                <div><b className="text-ink">Devocional Mulheres (livro digital)</b><p className="text-muted text-sm">Meu best-seller mais vendido, completo.</p></div>
              </div>
            </div>
          </div>
          <div className="border border-wine/15 rounded-3xl p-9 text-center h-fit md:sticky md:top-32">
            <p className="text-sm text-muted mb-2">Garantido se você entrar antes do prazo acabar</p>
            <p className="text-muted line-through">R$197</p>
            <p className="text-sm text-muted mb-1">hoje sai por</p>
            <p className="font-title font-semibold text-5xl text-wine my-1">R$37,00</p>
            <p className="text-sm text-muted mb-6">à vista · ou 8x de R$5,40</p>
            <Btn className="w-full">Quero minha transformação →</Btn>
            <p className="text-xs text-muted mt-4">Oferta some em <b className="text-wine">{timer}</b> · acesso imediato · compra segura</p>
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-muted">
              <span>✓ 7 dias de garantia</span><span>✓ Acesso vitalício</span><span>✓ Comunidade fechada</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ---------- MENTORA ----------
function Mentor() {
  return (
    <section id="mentora" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-12 items-center">
        <Reveal>
          <img
            src="https://mulheresnoreino.lovable.app/__l5e/assets-v1/c4908724-06cf-4479-8850-4ce8aed7070a/tallyta.png"
            alt="Tallyta Kitamura" draggable={false}
            className="rounded-3xl shadow-[0_10px_30px_rgba(196,30,94,.08)] w-full"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-wine font-bold text-xs tracking-widest uppercase mb-2">05 / sua mentora</p>
          <h2 className="font-title font-semibold text-3xl md:text-4xl uppercase tracking-wide text-ink mb-2">Tallyta Kitamura</h2>
          <p className="text-pinklight font-bold text-xs uppercase tracking-wider mb-5">Mentora de mulheres · Criadora Projeto Mulheres que Jejuam</p>
          <p className="text-muted mb-3">Tallyta foi a primeira mulher a falar a fundo sobre o Jejum de Ester numa época em que ninguém na internet tocava no assunto. Enquanto todo mundo repetia o óbvio, ela abriu as Escrituras e começou a ensinar o posicionamento espiritual que transforma oração em resposta.</p>
          <p className="text-muted mb-3">Hoje, mais de 20 mil mulheres já passaram pelo Jejum de Ester através da comunidade fechada — e somando as redes sociais, são mais de 443 mil seguidoras acompanhando o método todos os dias.</p>
          <p className="text-muted">O Jejum de Ester é o resultado de tudo isso: um método direto, prático e acessível pra você parar de orar no vazio e virar a mulher que Deus te chamou pra ser.</p>
          <div className="flex gap-8 flex-wrap my-6">
            <div><div className="font-title text-2xl text-wine">+20 mil</div><div className="text-xs uppercase text-muted">Mulheres no jejum</div></div>
            <div><div className="font-title text-2xl text-wine">+443 mil</div><div className="text-xs uppercase text-muted">Nas redes sociais</div></div>
            <div><div className="font-title text-2xl text-wine">1ª</div><div className="text-xs uppercase text-muted">A falar do tema</div></div>
          </div>
          <p className="font-title italic text-lg text-ink border-l-4 border-pinklight pl-4">"Posicione-se como a mulher que Deus já respondeu."</p>
        </Reveal>
      </div>
    </section>
  )
}

// ---------- DEPOIMENTOS ----------
function Testimonials() {
  const imgs = [
    'https://mulheresnoreino.lovable.app/__l5e/assets-v1/29d8223f-8534-40f9-8301-ae105b03b5d4/IMG_2756.png',
    'https://mulheresnoreino.lovable.app/__l5e/assets-v1/43de20d4-90c8-45ba-9898-01866a052893/IMG_2757.png',
    'https://mulheresnoreino.lovable.app/__l5e/assets-v1/ea004637-2164-4ebf-8a56-8fa13a27d2cc/IMG_2758.png',
    'https://mulheresnoreino.lovable.app/__l5e/assets-v1/d781dbb7-192b-487f-8108-f1fdfd69d70a/IMG_2759.png',
    'https://mulheresnoreino.lovable.app/__l5e/assets-v1/0c7d0e47-a3cf-4d0a-a9a2-8c8a3a1f9bc8/IMG_2762.png',
  ]
  return (
    <section className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">06 / depoimentos</p>
        <h2 className="font-title text-3xl md:text-4xl max-w-xl mb-3 text-ink">Mulheres reais. Respostas reais.</h2>
        <p className="text-muted mb-8">Cada print é uma história de mulher que viveu o Jejum de Ester. Arraste pro lado — a fila não tem fim.</p>
      </Reveal>
      <motion.div
        className="flex gap-5 overflow-x-auto pb-4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        {[...imgs, ...imgs].map((src, i) => (
          <img key={i} src={src} alt="Depoimento" draggable={false}
            className="w-64 flex-shrink-0 rounded-2xl shadow-[0_10px_30px_rgba(196,30,94,.08)]" />
        ))}
      </motion.div>
    </section>
  )
}

// ---------- FAQ (objeções) ----------
function FAQ() {
  const qas = [
    ['O que tem dentro quando eu pago?', 'Método completo passo a passo, acesso à comunidade fechada, orientações diárias, orações direcionadas, materiais de apoio e acompanhamento durante todo o processo.'],
    ['Preciso ter experiência com jejum para participar?', 'Não. O passo a passo foi feito pra quem nunca jejuou — cada dia vem com orientação prática de como se preparar, conduzir e encerrar com segurança.'],
    ['Quanto tempo dura o jejum?', 'O método principal acontece em 3 dias, mas você tem 1 ano de acesso ao conteúdo, comunidade e lives, podendo repetir quando sentir necessidade.'],
    ['Como recebo o acesso após a compra?', 'Assim que o pagamento é aprovado, você recebe por e-mail o acesso à plataforma com o livro, as aulas e o link da comunidade.'],
    ['E se eu não conseguir acompanhar no ritmo?', 'Sem problema — o acesso é vitalício. Faça os 3 dias no seu tempo e volte quantas vezes quiser.'],
    ['Por que é cobrado, e não de graça?', 'O valor cobre a produção do material, o suporte contínuo e a manutenção da comunidade — pra que o cuidado com cada mulher seja real, não automático.'],
  ]
  const [open, setOpen] = useState(0)
  return (
    <section className="py-20 px-4 md:px-6 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-wine font-bold text-xs tracking-widest uppercase mb-3">faq</p>
        <h2 className="font-title text-3xl md:text-4xl mb-2 text-ink">Ainda tem dúvidas?</h2>
        <p className="text-muted mb-8">Normal. Aqui estão as respostas pras perguntas mais comuns:</p>
      </Reveal>
      {qas.map(([q, a], i) => (
        <Reveal key={i} delay={i * 0.03}>
          <div className="bg-white/40 border-[.8px] border-wine/15 rounded-[20px] p-5 mb-3.5">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center text-left font-bold text-ink">
              {q}
              <span className="text-pinklight text-2xl leading-none">{open === i ? '×' : '+'}</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="text-muted mt-3 overflow-hidden"
                >{a}</motion.p>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      ))}
    </section>
  )
}

// ---------- CTA FINAL ----------
function FinalCTA() {
  const timer = useCountdown(15)
  return (
    <section className="py-20 px-4 md:px-6 max-w-4xl mx-auto text-center">
      <Reveal>
        <span className="inline-block bg-white border border-wine/20 text-muted px-4 py-2 rounded-full text-sm mb-5">
          Essa oferta some em <b className="text-wine">{timer}</b>
        </span>
        <h2 className="font-title text-3xl md:text-4xl mb-8 text-ink">Duas opções. Você escolhe.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mb-8">
          <div className="bg-white border border-wine/15 rounded-2xl p-6">
            <b className="text-wine">Opção 1:</b> Fechar essa página, continuar orando no vazio e acordar amanhã com a mesma sensação de que Deus não tá te ouvindo.
          </div>
          <div className="bg-white border border-wine/15 rounded-2xl p-6">
            <b className="text-wine">Opção 2:</b> Investir menos de R$0,19 por dia e fazer o Jejum de Ester com a gente — começando a ver Deus mover o impossível em três dias.
          </div>
        </div>
        <p className="text-muted mb-1">Se comprasse tudo separado: <span className="line-through">R$244</span></p>
        <p className="font-title text-5xl text-wine my-2">R$37</p>
        <p className="text-muted text-sm mb-7">ou 8x de R$5,40 — menos que um café por dia.</p>
        <Btn>Garantir tudo por apenas R$37 →</Btn>
        <p className="text-xs text-muted mt-4">acesso imediato · compra 100% segura · garantia de 7 dias</p>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-11 pb-28 px-4 md:px-6 max-w-6xl mx-auto text-sm text-muted border-t border-wine/15">
      <p className="font-title text-ink text-lg mb-2">Jejum de Ester</p>
      <p className="max-w-xl mb-3">Os resultados descritos nos depoimentos são individuais e não garantem os mesmos resultados para todas as pessoas. O Jejum de Ester é um produto de desenvolvimento espiritual baseado em princípios bíblicos.</p>
      <div className="flex gap-4 mb-3"><a href="#" className="hover:text-wine">Privacidade</a><a href="#" className="hover:text-wine">Termos</a></div>
      <p>© {new Date().getFullYear()} Tallyta Kitamura · Todos os direitos reservados</p>
    </footer>
  )
}

function StickyBar() {
  const timer = useCountdown(15)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-wine/15 shadow-[0_-10px_30px_rgba(26,11,20,.1)] px-5 py-3 flex items-center justify-between gap-4">
      <div className="font-title text-lg"><span className="line-through text-muted text-sm mr-1.5">R$197</span><span className="text-wine">R$37</span></div>
      <div className="hidden sm:block text-sm text-muted">Some em {timer}</div>
      <Btn className="px-6 py-2.5 text-sm">Quero agora →</Btn>
    </div>
  )
}

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <UrgencyBar />
      <Nav />
      <Hero />
      <Problem />
      <Identity />
      <WhatYouGet />
      <Method />
      <Offer />
      <Mentor />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBar />
    </div>
  )
}

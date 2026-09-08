import { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleArrowUp,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';

type Project = {
  title: string;
  category: string;
  image: string;
  description: string;
  tone: string;
};

const whatsappUrl = 'https://api.whatsapp.com/send?text=Olá! Quero criar um site para o meu negócio.';

const projects: Project[] = [
  {
    title: 'Arena Palmares',
    category: 'Esporte & experiência',
    image: '/assets/images/portfolio/ArenaPalmares.png',
    description: 'Uma presença digital energética para transformar visitas em reservas.',
    tone: 'from-[#073e43] to-[#0a8c82]',
  },
  {
    title: 'Ball Burger',
    category: 'Gastronomia',
    image: '/assets/images/portfolio/BallBurger.png',
    description: 'Um site com apetite de marca, cardápio claro e pedidos a um clique.',
    tone: 'from-[#20150e] to-[#db651e]',
  },
  {
    title: 'Nexus Contabilidade',
    category: 'Serviços profissionais',
    image: '/assets/images/portfolio/contabilidade.png',
    description: 'Clareza e confiança para uma empresa que ajuda negócios a crescer.',
    tone: 'from-[#0a1736] to-[#1d58ba]',
  },
];

const benefits = [
  { number: '01', title: 'Estratégia que faz sentido', text: 'Entendemos seu momento, seu cliente e o que precisa acontecer depois do clique.' },
  { number: '02', title: 'Design que posiciona', text: 'Uma identidade digital com personalidade, feita para destacar o seu negócio.' },
  { number: '03', title: 'Tecnologia simples', text: 'Tudo rápido, responsivo e fácil de usar — para você e para quem visita.' },
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (to.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setPath('/');
      }
      const target = document.querySelector(to.slice(1));
      target?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0 });
  }, []);

  return { path, navigate };
}

function Brand({ navigate }: { navigate: (to: string) => void }) {
  return (
    <a href="/" className="brand" aria-label="Ortiz Tech, início" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
      <span className="brand-mark"><img src="/assets/images/image.png" alt="" /></span>
      <span className="brand-name">ORTIZ<span>TECH</span></span>
    </a>
  );
}

function Header({ navigate }: { navigate: (to: string) => void }) {
  const [open, setOpen] = useState(false);
  const isPortfolio = window.location.pathname === '/portfolio';
  const go = (to: string) => { setOpen(false); navigate(to); };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand navigate={navigate} />
        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          <a href="/#solucoes" onClick={(e) => { e.preventDefault(); go('/#solucoes'); }}>Soluções</a>
          <a href="/portfolio" className={isPortfolio ? 'active' : ''} onClick={(e) => { e.preventDefault(); go('/portfolio'); }}>Portfólio</a>
          <a href="/#processo" onClick={(e) => { e.preventDefault(); go('/#processo'); }}>Como funciona</a>
          <a href="/#sobre" onClick={(e) => { e.preventDefault(); go('/#sobre'); }}>Sobre nós</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Fale com a gente <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((current) => !current)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (to: string) => void }) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Brand navigate={navigate} />
          <p className="footer-intro">Sites pensados para negócios que<br />querem ser lembrados.</p>
        </div>
        <div className="footer-links">
          <div><span>Explorar</span><a href="/#solucoes" onClick={(e) => { e.preventDefault(); navigate('/#solucoes'); }}>Soluções</a><a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Portfólio</a><a href="/#processo" onClick={(e) => { e.preventDefault(); navigate('/#processo'); }}>Processo</a></div>
          <div><span>Vamos conversar</span><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a><a href="mailto:oi@ortiztech.com.br">oi@ortiztech.com.br</a></div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Ortiz Tech</span><span>Feito para negócios reais.</span></div>
    </footer>
  );
}

function Home({ navigate }: { navigate: (to: string) => void }) {
  return (
    <>
      <Header navigate={navigate} />
      <main>
        <section className="hero">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span /> Estúdio digital para pequenos negócios</div>
              <h1>Seu negócio<br /><em>merece um site</em><br />à altura.</h1>
              <p className="hero-text">Criamos sites que traduzem o valor do seu trabalho, conectam com as pessoas certas e fazem sua marca avançar.</p>
              <div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Quero meu site <ArrowUpRight size={18} /></a><a className="text-link" href="#solucoes" onClick={(e) => { e.preventDefault(); navigate('/#solucoes'); }}>Descobrir como <ChevronRight size={17} /></a></div>
              <div className="hero-note"><Check size={14} /> Atendimento próximo, do primeiro papo ao lançamento.</div>
            </div>
            <div className="hero-art reveal delay-one" aria-hidden="true">
              <div className="art-label label-top">N / 01</div>
              <div className="art-label label-bottom">DESIGN COM PROPÓSITO</div>
              <div className="art-card card-back"><span>clareza<br />é uma<br />vantagem.</span></div>
              <div className="art-card card-front"><div className="card-top"><span>ORTIZ / TECH</span><span>2026</span></div><div className="card-title">Ideias que<br /><em>ganham forma.</em></div><div className="card-line" /><div className="card-foot">estratégia · design · presença</div></div>
              <div className="art-spark">✳</div>
            </div>
          </div>
          <div className="container hero-scroll"><span>Role para explorar</span><span className="scroll-line" /></div>
        </section>

        <section className="statement section-light" id="sobre">
          <div className="container statement-grid">
            <div><div className="eyebrow dark"><span /> Por que um site?</div><h2>Mais que uma vitrine.<br /><em>Uma presença.</em></h2></div>
            <p>Seu trabalho merece ser encontrado, entendido e escolhido. Um bom site transforma a primeira impressão em uma relação que pode crescer.</p>
          </div>
          <div className="container benefit-grid" id="solucoes">{benefits.map((benefit) => <article className="benefit" key={benefit.number}><span className="benefit-number">{benefit.number}</span><Sparkles size={17} strokeWidth={1.5} /><h3>{benefit.title}</h3><p>{benefit.text}</p><a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Saiba mais sobre ${benefit.title}`}><CircleArrowUp size={19} /></a></article>)}</div>
        </section>

        <section className="featured section-blue">
          <div className="container section-heading"><div><div className="eyebrow"><span /> Feito para ser lembrado</div><h2>Projetos com<br /><em>personalidade.</em></h2></div><a className="text-link light-link" href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}>Ver todos os projetos <ArrowUpRight size={17} /></a></div>
          <div className="container featured-project"><div className="featured-image"><img src={projects[0].image} alt={projects[0].title} /><div className="image-overlay" /></div><div className="featured-info"><span className="project-index">01 / 03</span><h3>{projects[0].title}</h3><p>{projects[0].description}</p><span className="project-category">{projects[0].category}</span><a href="/portfolio" className="round-arrow" aria-label="Ver projeto" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}><ArrowUpRight size={19} /></a></div></div>
        </section>

        <section className="process section-light" id="processo"><div className="container process-grid"><div><div className="eyebrow dark"><span /> Um processo sem complicação</div><h2>Do primeiro papo<br />ao <em>resultado.</em></h2><p className="section-description">Você entende cada etapa. A gente cuida dos detalhes e mantém tudo caminhando com clareza.</p><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Começar conversa <ArrowUpRight size={17} /></a></div><div className="steps"><div className="step"><span>01</span><div><h3>Imersão</h3><p>A gente entende seu negócio e o que torna sua história especial.</p></div><ChevronDown size={18} /></div><div className="step"><span>02</span><div><h3>Estratégia</h3><p>Organizamos a mensagem e criamos um caminho para o seu cliente.</p></div><ChevronDown size={18} /></div><div className="step"><span>03</span><div><h3>Criação</h3><p>Design e tecnologia se encontram para dar forma à sua ideia.</p></div><ChevronDown size={18} /></div><div className="step"><span>04</span><div><h3>Entrega</h3><p>Seu site pronto para colocar sua marca no lugar que ela merece.</p></div><Check size={18} /></div></div></div></section>

        <section className="cta-section"><div className="cta-orb" /><div className="container cta-content"><div className="eyebrow"><span /> O próximo passo é simples</div><h2>Seu próximo cliente<br /><em>está procurando por você.</em></h2><p>Vamos transformar sua presença online em uma experiência que dá vontade de ficar.</p><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <MessageCircle size={17} /></a></div></section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function Portfolio({ navigate }: { navigate: (to: string) => void }) {
  const [selected, setSelected] = useState<Project | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <><Header navigate={navigate} /><main className="portfolio-page"><section className="portfolio-hero"><div className="container portfolio-hero-inner"><div className="eyebrow"><span /> Nosso trabalho</div><h1>Projetos que<br /><em>fazem acontecer.</em></h1><p>Marcas reais, desafios reais e sites pensados para criar movimento.</p></div></section><section className="portfolio-list section-light"><div className="container portfolio-intro"><span>03 projetos selecionados</span><p>Cada projeto começa com uma pergunta: como fazer essa marca ser impossível de ignorar?</p></div><div className="container project-list">{projects.map((project, index) => <article className="portfolio-card" key={project.title} onClick={() => setSelected(project)}><div className={`portfolio-thumb bg-gradient-to-br ${project.tone}`}><img src={project.image} alt={project.title} /><div className="portfolio-hover"><span>Ver projeto</span><ArrowUpRight size={22} /></div></div><div className="portfolio-meta"><span>0{index + 1} / {project.category}</span><h2>{project.title}</h2><p>{project.description}</p></div></article>)}</div></section><section className="portfolio-bottom"><div className="container"><h2>O próximo projeto<br /><em>pode ser o seu.</em></h2><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Vamos conversar <ArrowUpRight size={17} /></a></div></section></main>{selected && <div className="project-modal" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><div className="modal-inner" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar projeto"><X size={21} /></button><img src={selected.image} alt={selected.title} /><div className="modal-copy"><span>{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Quero um projeto assim <ArrowUpRight size={17} /></a></div></div></div>}<Footer navigate={navigate} /></>;
}

function App() {
  const { path, navigate } = useRoute();
  return path === '/portfolio' ? <Portfolio navigate={navigate} /> : <Home navigate={navigate} />;
}

export default App;

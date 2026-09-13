import type { Locale } from '../config.ts';

/**
 * The English dictionary is the contract: every other locale must match its shape,
 * so a forgotten key is a type error rather than a blank spot on the page.
 */
const en = {
  meta: {
    title: 'Flop Butylkin - AI orchestration and mobile engineering',
    description:
      'Flop Butylkin - engineer and tech lead in Warsaw. Twenty years in software: AI agent orchestration and developer tooling now, iOS, Android and React Native delivery behind it.',
    langName: 'English',
  },

  nav: {
    skipToContent: 'Skip to content',
    theme: 'Switch theme',
    language: 'Language',
  },

  hero: {
    location: 'Warsaw, Poland',
    status: 'Agents on shift',
    name: 'Flop Butylkin',
    /* Two deliberate lines - never let the wrap depend on how long a translation is. */
    lead: {
      first: 'I lead engineering teams.',
      second: 'Then I automate the parts that hurt.',
    },
    body: 'Twenty years in software. iOS since the platform existed, React Native since 2019, Android alongside - tech lead, architect, head of mobile, twenty-plus engineers and apps in the hundred-million-user range. These days it is mostly AI: fleets of agents, the tooling that keeps them legible, and whatever else the week calls for.',
  },

  numbers: {
    eyebrow: 'In numbers',
    heading: 'Track record',
    items: {
      years: { value: '20', label: 'years shipping software' },
      team: { value: '20+', label: 'engineers led' },
      users: { value: '100M+', label: 'users reached' },
      crashFree: { value: '99.99%', label: 'crash-free sessions' },
    },
  },

  crew: {
    eyebrow: 'The shift',
    title: 'Who actually does the work',
    body: 'The catalogue, the tooling and this page are built by a fleet of AI agents. They pick up issues, write code, review each other and open pull requests. Every engineer runs on a different model, so the fleet does not get stuck the same way twice. The roles are real. The standups are not.',
    engineLabel: 'Runs on',
    human: 'Human',
    punchline: 'They are good at heading somewhere. Knowing why we are going is still my job.',
  },

  work: {
    eyebrow: 'What I do',
    title: 'Where the time goes',
    items: {
      mobile: {
        title: 'Mobile delivery',
        body: 'iOS since the platform launched, React Native since 2019, Android alongside. Architecture, team structure, review culture, CI/CD, crash budgets - and the unglamorous work of making releases boring.',
      },
      orchestration: {
        title: 'Agent orchestration',
        body: 'Fleets of AI agents that plan, build and review with nobody in the loop - until something needs a decision. Paperclip and everything built around it.',
      },
      tooling: {
        title: 'Developer tooling',
        body: 'Observability for Claude Code, a curated plugin marketplace, MCP servers. Instruments for work you cannot watch directly.',
      },
      ksef: {
        title: 'Polish e-invoicing',
        body: 'A TypeScript client for the KSeF API and English translations of the official documentation, because somebody had to read it first.',
      },
      hardware: {
        title: 'Hardware that talks back',
        body: 'A Żabka bottle cap reverse-engineered into a motion controller. An IBM Wheelwriter taught new tricks. A coin pressed from real silver.',
      },
    },
  },

  stack: {
    eyebrow: 'Stack',
    title: 'What I reach for',
    groups: {
      languages: 'Languages',
      mobile: 'Mobile',
      delivery: 'Delivery',
      cloud: 'Cloud',
      ai: 'AI',
    },
  },

  offDuty: {
    label: 'Off duty',
    items: 'Hackerspaces · Sailing · Tango · Barbecue',
  },

  projects: {
    eyebrow: 'Weekends',
    title: 'What a Saturday turns into',
    body: 'Around twenty repositories, all from the past year, all built on weekends: AI tooling, agent orchestration, KSeF, and a few hardware side quests. Not a portfolio - experiments that happen to be open source.',
    cta: 'Browse the catalogue',
    note: 'stuff.flopbut.pl',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Say hello',
    body: 'Available for work on mobile delivery, CI/CD, agent orchestration and KSeF integration. Russian or English, whichever is easier.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    wall: 'Wall',
  },

  footer: {
    built: 'This site is 100% AI generated.',
    source: 'Source on GitHub',
  },

  wall: {
    meta: {
      title: 'The wall - Flop Butylkin',
      description:
        'Notes about Flop Butylkin left by people who know him. Sign in with GitHub and write your own.',
    },
    eyebrow: 'The wall',
    title: 'What people say about Flop',
    body: 'Anyone who knows Flop can leave a note here: a recommendation, a thank you, a correction. Sign in with GitHub and write it in your own words. Whatever gets published appears with your name on it.',
    empty: 'Nothing here yet. Be the first.',
    cta: 'Write on the wall',
  },

  request: {
    meta: {
      title: 'Write on the wall - Flop Butylkin',
      description:
        'Leave a note about Flop Butylkin on his wall. Sign-in with GitHub and the form are on the way.',
    },
    eyebrow: 'Coming soon',
    title: 'The form is not here yet',
    body: 'Sign-in with GitHub and the form are still being built. Come back a little later.',
    back: 'Back to the wall',
  },
};

/**
 * Shape every locale has to satisfy. Deliberately not `as const`: the contract is the set of
 * keys, not the English wording, and freezing the literals would make every translation a
 * type error.
 */
type Dictionary = typeof en;

const ru: Dictionary = {
  meta: {
    title: 'Flop Butylkin - оркестрация AI-агентов и мобильная разработка',
    description:
      'Flop Butylkin - инженер и тех-лид из Варшавы. Двадцать лет в разработке: сейчас оркестрация AI-агентов и тулинг, за спиной - iOS, Android и React Native.',
    langName: 'Русский',
  },

  nav: {
    skipToContent: 'К содержимому',
    theme: 'Сменить тему',
    language: 'Язык',
  },

  hero: {
    location: 'Варшава, Польша',
    status: 'Агенты на смене',
    name: 'Flop Butylkin',
    lead: {
      first: 'Веду инженерные команды.',
      second: 'Потом автоматизирую то, что болит.',
    },
    body: 'Двадцать лет в разработке. iOS - с момента появления платформы, React Native - с 2019-го, Android рядом. Тех-лид, архитектор, head of mobile: больше двадцати инженеров и приложения на сотни миллионов пользователей. Сейчас в основном AI: флот агентов, тулинг, который держит их в поле зрения, и всё остальное, что подкинет неделя.',
  },

  numbers: {
    eyebrow: 'В цифрах',
    heading: 'Послужной список',
    items: {
      years: { value: '20', label: 'лет в разработке' },
      team: { value: '20+', label: 'инженеров в команде' },
      users: { value: '100M+', label: 'пользователей' },
      crashFree: { value: '99.99%', label: 'сессий без падений' },
    },
  },

  crew: {
    eyebrow: 'Смена',
    title: 'Кто на самом деле делает работу',
    body: 'Каталог, тулинг и эту страницу делает флот AI-агентов. Они берут задачи, пишут код, ревьюят друг друга и открывают пулреквесты. Каждый инженер работает на своей модели, поэтому флот не застревает дважды одинаково. Роли настоящие. Стендапы - нет.',
    engineLabel: 'Модель',
    human: 'Человек',
    punchline: 'Идти к цели они умеют. Понимать, зачем мы идём, - пока моя работа.',
  },

  work: {
    eyebrow: 'Чем занимаюсь',
    title: 'Куда уходит время',
    items: {
      mobile: {
        title: 'Мобильная разработка',
        body: 'iOS - с момента появления платформы, React Native - с 2019-го, Android рядом. Архитектура, структура команды, культура ревью, CI/CD, бюджеты падений и неблагодарный труд по превращению релизов в скуку.',
      },
      orchestration: {
        title: 'Оркестрация агентов',
        body: 'Флот AI-агентов, которые планируют, пишут и ревьюят без человека в цикле - пока не потребуется решение. Paperclip и всё вокруг него.',
      },
      tooling: {
        title: 'Тулинг для разработки',
        body: 'Наблюдаемость для Claude Code, курируемый маркетплейс плагинов, MCP-серверы. Приборы для работы, за которой не посмотришь напрямую.',
      },
      ksef: {
        title: 'Польские е-фактуры',
        body: 'TypeScript-клиент для API KSeF и английские переводы официальной документации - кому-то надо было прочитать её первым.',
      },
      hardware: {
        title: 'Железо, которое отвечает',
        body: 'Крышечка Żabka, отреверсенная в контроллер движения. Пишущая машинка IBM Wheelwriter, обученная новым трюкам. Монета, отчеканенная из настоящего серебра.',
      },
    },
  },

  stack: {
    eyebrow: 'Стек',
    title: 'Чем работаю',
    groups: {
      languages: 'Языки',
      mobile: 'Мобильное',
      delivery: 'Релизы',
      cloud: 'Облака',
      ai: 'AI',
    },
  },

  offDuty: {
    label: 'Вне работы',
    items: 'Хакспейсы · Парусный спорт · Танго · Барбекю',
  },

  projects: {
    eyebrow: 'Выходные',
    title: 'Во что превращается суббота',
    body: 'Около двадцати репозиториев, все за последний год и все - по выходным: AI-тулинг, оркестрация агентов, KSeF и несколько побочных квестов по железу. Это не портфолио, а эксперименты, которые просто оказались с открытым исходным кодом.',
    cta: 'Открыть каталог',
    note: 'stuff.flopbut.pl',
  },

  contact: {
    eyebrow: 'Контакты',
    title: 'Напишите',
    body: 'Открыт для работы по мобильной разработке, CI/CD, оркестрации агентов и интеграции с KSeF. По-русски или по-английски - как удобнее.',
    email: 'Почта',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    wall: 'Стена',
  },

  footer: {
    built: 'Этот сайт на 100% сгенерирован AI.',
    source: 'Исходники на GitHub',
  },

  wall: {
    meta: {
      title: 'Стена - Flop Butylkin',
      description:
        'Записи о Flop Butylkin от людей, которые его знают. Войдите через GitHub и напишите свою.',
    },
    eyebrow: 'Стена',
    title: 'Что говорят о Флопе',
    body: 'Любой, кто знает Флопа, может оставить здесь запись: рекомендацию, благодарность, поправку. Войдите через GitHub и напишите своими словами. Всё, что будет опубликовано, появится под вашим именем.',
    empty: 'Пока пусто. Будьте первым.',
    cta: 'Написать на стене',
  },

  request: {
    meta: {
      title: 'Написать на стене - Flop Butylkin',
      description:
        'Оставьте запись о Flop Butylkin на его стене. Вход через GitHub и форма скоро появятся.',
    },
    eyebrow: 'Скоро',
    title: 'Формы пока нет',
    body: 'Вход через GitHub и форма ещё в работе. Загляните чуть позже.',
    back: 'Назад на стену',
  },
};

const pl: Dictionary = {
  meta: {
    title: 'Flop Butylkin - orkiestracja agentów AI i inżynieria mobilna',
    description:
      'Flop Butylkin - inżynier i tech lead z Warszawy. Dwadzieścia lat w branży: dziś orkiestracja agentów AI i narzędzia deweloperskie, wcześniej iOS, Android i React Native.',
    langName: 'Polski',
  },

  nav: {
    skipToContent: 'Przejdź do treści',
    theme: 'Zmień motyw',
    language: 'Język',
  },

  hero: {
    location: 'Warszawa, Polska',
    status: 'Agenci na zmianie',
    name: 'Flop Butylkin',
    lead: {
      first: 'Prowadzę zespoły inżynierskie.',
      second: 'Potem automatyzuję to, co boli.',
    },
    body: 'Dwadzieścia lat w branży. iOS odkąd platforma istnieje, React Native od 2019, Android obok. Tech lead, architekt, head of mobile: ponad dwudziestu inżynierów i aplikacje z setkami milionów użytkowników. Teraz głównie AI: flota agentów, narzędzia które trzymają je pod kontrolą, i cokolwiek jeszcze przyniesie tydzień.',
  },

  numbers: {
    eyebrow: 'W liczbach',
    heading: 'Dorobek',
    items: {
      years: { value: '20', label: 'lat w branży' },
      team: { value: '20+', label: 'inżynierów w zespole' },
      users: { value: '100M+', label: 'użytkowników' },
      crashFree: { value: '99.99%', label: 'sesji bez awarii' },
    },
  },

  crew: {
    eyebrow: 'Zmiana',
    title: 'Kto naprawdę wykonuje tę pracę',
    body: 'Katalog, narzędzia i tę stronę buduje flota agentów AI. Biorą zadania, piszą kod, recenzują się nawzajem i otwierają pull requesty. Każdy inżynier działa na innym modelu, więc flota nie zacina się dwa razy w tym samym miejscu. Role są prawdziwe. Standupy nie.',
    engineLabel: 'Model',
    human: 'Człowiek',
    punchline: 'Iść do celu potrafią. Rozumieć po co idziemy - to wciąż moja robota.',
  },

  work: {
    eyebrow: 'Czym się zajmuję',
    title: 'Na co idzie czas',
    items: {
      mobile: {
        title: 'Rozwój aplikacji mobilnych',
        body: 'iOS odkąd platforma istnieje, React Native od 2019, Android obok. Architektura, struktura zespołu, kultura code review, CI/CD, budżety awarii i niewdzięczna robota polegająca na tym, by wydania stały się nudne.',
      },
      orchestration: {
        title: 'Orkiestracja agentów',
        body: 'Flota agentów AI, która planuje, buduje i recenzuje bez człowieka w pętli - dopóki nie trzeba podjąć decyzji. Paperclip i wszystko wokół niego.',
      },
      tooling: {
        title: 'Narzędzia dla programistów',
        body: 'Obserwowalność dla Claude Code, kurowany marketplace wtyczek, serwery MCP. Przyrządy do pracy, której nie da się oglądać bezpośrednio.',
      },
      ksef: {
        title: 'Polskie e-faktury',
        body: 'Klient TypeScript do API KSeF i angielskie tłumaczenia oficjalnej dokumentacji - ktoś musiał ją przeczytać jako pierwszy.',
      },
      hardware: {
        title: 'Sprzęt, który odpowiada',
        body: 'Kapsel Żabka Triki zamieniony w kontroler ruchu. Maszyna do pisania IBM Wheelwriter nauczona nowych sztuczek. Moneta wybita z prawdziwego srebra.',
      },
    },
  },

  stack: {
    eyebrow: 'Stack',
    title: 'Czego używam',
    groups: {
      languages: 'Języki',
      mobile: 'Mobile',
      delivery: 'Wydania',
      cloud: 'Chmura',
      ai: 'AI',
    },
  },

  offDuty: {
    label: 'Po godzinach',
    items: 'Hackerspace’y · Żeglarstwo · Tango · Grill',
  },

  projects: {
    eyebrow: 'Weekendy',
    title: 'W co zamienia się sobota',
    body: 'Około dwudziestu repozytoriów, wszystkie z ostatniego roku i wszystkie weekendowe: narzędzia AI, orkiestracja agentów, KSeF i kilka pobocznych questów sprzętowych. To nie portfolio - eksperymenty, które po prostu są open source.',
    cta: 'Zobacz katalog',
    note: 'stuff.flopbut.pl',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Napisz',
    body: 'Dostępny do pracy przy rozwoju aplikacji mobilnych, CI/CD, orkiestracji agentów i integracji z KSeF. Kontakt po rosyjsku lub angielsku.',
    email: 'E-mail',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    wall: 'Ściana',
  },

  footer: {
    built: 'Ta strona jest w 100% wygenerowana przez AI.',
    source: 'Kod na GitHubie',
  },

  wall: {
    meta: {
      title: 'Ściana - Flop Butylkin',
      description:
        'Wpisy o Flopie Butylkinie od ludzi, którzy go znają. Zaloguj się przez GitHub i napisz swój.',
    },
    eyebrow: 'Ściana',
    title: 'Co mówią o Flopie',
    body: 'Każdy, kto zna Flopa, może zostawić tu wpis: rekomendację, podziękowanie, sprostowanie. Zaloguj się przez GitHub i napisz własnymi słowami. To, co zostanie opublikowane, pojawi się pod Twoim nazwiskiem.',
    empty: 'Na razie pusto. Bądź pierwszy.',
    cta: 'Napisz na ścianie',
  },

  request: {
    meta: {
      title: 'Napisz na ścianie - Flop Butylkin',
      description:
        'Zostaw wpis o Flopie Butylkinie na jego ścianie. Logowanie przez GitHub i formularz już wkrótce.',
    },
    eyebrow: 'Wkrótce',
    title: 'Formularza jeszcze nie ma',
    body: 'Logowanie przez GitHub i formularz są jeszcze w budowie. Zajrzyj trochę później.',
    back: 'Wróć na ścianę',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru, pl };

export type { Dictionary };

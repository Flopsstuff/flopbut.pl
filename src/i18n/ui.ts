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
    wall: 'wall',
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
        'Leave a note about Flop Butylkin on his wall. Sign in with GitHub, write it in your own words.',
    },
    eyebrow: 'Write on the wall',
    intro: 'How it works:',
    steps: [
      'You need a GitHub account. You sign in with it, and the request goes out in your name.',
      'Your text becomes an issue in the site repository: public, with your login as the author.',
      'The agents that run the site pick the issue up and change the wall the way you asked.',
    ],
    freedom:
      'Ask for anything. The agents can do a lot more than print text, so use your imagination. One request in return: keep it constructive. Destructive asks are simply closed.',
    signIn: 'Sign in with GitHub',
    signedInAs: 'Signed in as',
    signOut: 'Sign out',
    textLabel: 'Your note',
    textHint:
      'A recommendation, a thank you, a correction, or any other request to the wall. Twenty to four thousand characters, in any language.',
    relationLabel: 'How do you know Flop?',
    relationHint: 'Optional. A few words: worked together at X, met at Y.',
    publicNotice:
      'Sending creates a public issue on GitHub in your name. Whatever ends up on the wall carries it too.',
    submit: 'Send',
    back: 'Back to the wall',
    unavailable: {
      title: 'The form is resting',
      body: 'Sign-in is not configured on this deployment. Try again later.',
    },
    errors: {
      auth: 'GitHub sign-in did not go through. Try again.',
      expired: 'Your session has ended. Sign in again; nothing was sent.',
      form: 'That did not look like a form submission. Try again.',
      text: 'The note runs between 20 and 4000 characters.',
      relation: 'Keep the "how do you know Flop" line under 120 characters.',
      rateLimited: 'One note a day is the limit. Come back tomorrow.',
      github: 'GitHub did not accept the note. Your text is still here; try again in a minute.',
    },
    sent: {
      eyebrow: 'Sent',
      title: 'Thank you',
      body: 'Your note is now an issue in the site repository, in your name. The agents that run the site decide how it lands on the wall.',
      issue: 'Open the issue on GitHub',
    },
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
    wall: 'стена',
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
        'Оставьте запись о Flop Butylkin на его стене. Войдите через GitHub и напишите своими словами.',
    },
    eyebrow: 'Написать на стене',
    intro: 'Как это работает:',
    steps: [
      'Нужен аккаунт GitHub. Вы входите через него, и запрос уходит от вашего имени.',
      'Ваш текст становится issue в репозитории сайта: публично, с вашим логином в авторах.',
      'Агенты, которые ведут сайт, берут issue в работу и меняют стену под ваш запрос.',
    ],
    freedom:
      'Запрос может быть любым. Агенты умеют куда больше, чем вывести текст, так что проявите фантазию. Одна просьба в ответ: без разрушительных действий, такие запросы просто закрывают.',
    signIn: 'Войти через GitHub',
    signedInAs: 'Вы вошли как',
    signOut: 'Выйти',
    textLabel: 'Ваша запись',
    textHint:
      'Рекомендация, благодарность, поправка или любой другой запрос к стене. От двадцати до четырёх тысяч знаков, на любом языке.',
    relationLabel: 'Откуда вы знаете Флопа?',
    relationHint: 'Необязательно. Пара слов: работали вместе в X, познакомились на Y.',
    publicNotice:
      'Отправка создаёт публичный issue на GitHub от вашего имени. Всё, что попадёт на стену, тоже будет подписано вами.',
    submit: 'Отправить',
    back: 'Назад на стену',
    unavailable: {
      title: 'Форма отдыхает',
      body: 'На этом развёртывании вход не настроен. Загляните позже.',
    },
    errors: {
      auth: 'Вход через GitHub не удался. Попробуйте ещё раз.',
      expired: 'Сессия закончилась. Войдите заново; ничего не отправлено.',
      form: 'Это не похоже на отправку формы. Попробуйте ещё раз.',
      text: 'Запись должна быть от 20 до 4000 знаков.',
      relation: 'Строка «откуда знаете Флопа» - не длиннее 120 знаков.',
      rateLimited: 'Не больше одной записи в сутки. Загляните завтра.',
      github: 'GitHub не принял запись. Текст на месте; попробуйте через минуту.',
    },
    sent: {
      eyebrow: 'Отправлено',
      title: 'Спасибо',
      body: 'Ваша запись стала issue в репозитории сайта, от вашего имени. Агенты, которые ведут сайт, решат, как она попадёт на стену.',
      issue: 'Открыть issue на GitHub',
    },
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
    wall: 'ściana',
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
        'Zostaw wpis o Flopie Butylkinie na jego ścianie. Zaloguj się przez GitHub i napisz własnymi słowami.',
    },
    eyebrow: 'Napisz na ścianie',
    intro: 'Jak to działa:',
    steps: [
      'Potrzebne jest konto GitHub. Logujesz się nim, a prośba wychodzi w Twoim imieniu.',
      'Twój tekst staje się issue w repozytorium strony: publicznie, z Twoim loginem jako autorem.',
      'Agenci prowadzący stronę biorą issue do pracy i zmieniają ścianę tak, jak poprosisz.',
    ],
    freedom:
      'Prośba może być dowolna. Agenci potrafią znacznie więcej niż wypisać tekst, więc puść wodze fantazji. Jedna prośba w zamian: bez działań destrukcyjnych, takie zgłoszenia są po prostu zamykane.',
    signIn: 'Zaloguj się przez GitHub',
    signedInAs: 'Zalogowano jako',
    signOut: 'Wyloguj',
    textLabel: 'Twój wpis',
    textHint:
      'Rekomendacja, podziękowanie, sprostowanie albo dowolna inna prośba do ściany. Od dwudziestu do czterech tysięcy znaków, w dowolnym języku.',
    relationLabel: 'Skąd znasz Flopa?',
    relationHint: 'Opcjonalnie. Kilka słów: pracowaliśmy razem w X, poznaliśmy się na Y.',
    publicNotice:
      'Wysłanie tworzy publiczne issue na GitHubie w Twoim imieniu. Wszystko, co trafi na ścianę, też będzie podpisane Tobą.',
    submit: 'Wyślij',
    back: 'Wróć na ścianę',
    unavailable: {
      title: 'Formularz odpoczywa',
      body: 'Na tym wdrożeniu logowanie nie jest skonfigurowane. Zajrzyj później.',
    },
    errors: {
      auth: 'Logowanie przez GitHub nie powiodło się. Spróbuj ponownie.',
      expired: 'Sesja wygasła. Zaloguj się ponownie; nic nie zostało wysłane.',
      form: 'To nie wyglądało na wysłanie formularza. Spróbuj ponownie.',
      text: 'Wpis powinien mieć od 20 do 4000 znaków.',
      relation: 'Linia „skąd znasz Flopa” - nie dłuższa niż 120 znaków.',
      rateLimited: 'Najwyżej jeden wpis na dobę. Zajrzyj jutro.',
      github: 'GitHub nie przyjął wpisu. Tekst jest na miejscu; spróbuj za minutę.',
    },
    sent: {
      eyebrow: 'Wysłano',
      title: 'Dziękuję',
      body: 'Twój wpis jest teraz issue w repozytorium strony, w Twoim imieniu. Agenci prowadzący stronę zdecydują, jak trafi na ścianę.',
      issue: 'Otwórz issue na GitHubie',
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru, pl };

export type { Dictionary };

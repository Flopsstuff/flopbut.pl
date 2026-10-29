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
    projects: 'projects',
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
      tokens: { value: '2B+', label: 'tokens / week' },
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
    privacy: 'Privacy',
    terms: 'Terms',
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
    cta: 'Write on the wall',
    /* The frame every entry sits in: who asked for it, and where the request is. */
    entry: {
      by: 'Asked for by',
      request: 'request',
    },
    /*
      Captions an agent writes for an entry, keyed like the component under components/wall/
      that draws it. A contributor's own words do not have to live here.
    */
    entries: {
      fiveCats: {
        title: 'Five cats, and what Flop gets up to',
        cats: {
          agents: 'Herding a fleet of agents',
          app: 'Getting the app out the door',
          solder: 'Teaching hardware to talk back',
          sail: 'Out on the water',
          tango: 'Tango, on a weeknight',
        },
      },
    },
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
      'Sending creates a public issue on GitHub in your name. On the wall your login goes next to it too, unless you ask to leave it off.',
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

  /*
    Inline markup in these strings: [label](url) for a link, `name` for code. Section keys are
    the anchors on the page, so they stay English in every locale.
  */
  privacy: {
    meta: {
      title: 'Privacy policy - Flop Butylkin',
      description:
        'What flopbut.pl does with personal data: the wall, GitHub and Google sign-in, the private assistant, cookies and your rights.',
    },
    eyebrow: 'Privacy',
    title: 'Privacy policy',
    updated: 'Last updated',
    language:
      'The Russian and Polish versions are translations provided for convenience. If they differ, this English version prevails.',
    intro:
      'flopbut.pl is a personal site. Most of it is static pages that collect nothing about you. This page lists the few places where personal data is involved, what happens to it, and how to have it removed.',
    sections: {
      controller: {
        title: 'Who is responsible',
        body: [
          'The site is run by Flop Butylkin, Warsaw, Poland, the controller of the personal data described on this page. Write to [flopspm@gmail.com](mailto:flopspm@gmail.com) about anything here.',
        ],
      },
      browsing: {
        title: 'Visiting the site',
        body: [
          'Pages are served by Cloudflare, which handles the technical data every web request carries: IP address, browser and device details, the address requested and the time. It is used to deliver pages and to protect the site from attacks. Requests to the parts of the site that run on the server, sign-in and the forms, are also kept in logs for a few days to find and fix errors.',
          'The site loads no third-party trackers, no advertising and no analytics cookies. Fonts are served from this site itself, not from Google Fonts. The light or dark theme you pick is stored in your own browser and never leaves it.',
        ],
      },
      cookies: {
        title: 'Cookies',
        body: [
          'Cookies are set only when you sign in, and only the ones a feature you asked for cannot work without:',
        ],
        items: [
          '`wall_oauth`, ten minutes: protects the GitHub sign-in from forged requests.',
          '`wall_session`, up to one hour: keeps you signed in to the wall form. Encrypted; holds your GitHub login and the access token GitHub issued for the form.',
          'The private assistant, once it opens, uses cookies of the same kind for Google sign-in: one protects the sign-in, the other keeps you signed in, encrypted and holding only your account identifier.',
        ],
        after: ['None of them follows you to other sites, so there is no consent banner.'],
      },
      wall: {
        title: 'The wall',
        body: [
          "To write on the wall you sign in with GitHub. GitHub tells the site your login and issues a token that can do one thing: create issues in this site's repository. The token stays in the encrypted session cookie, is not stored on the server, and is gone when the cookie expires.",
          'What you send becomes a public issue in [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl) under your GitHub account, and the entry built from it appears on the wall with your login unless you ask to leave it off. Publication is the whole point, and the form says so before you send.',
          'Each new issue goes to an automated moderation service, which checks with an AI content-safety model that the request is safe, and then to the AI agents that build the entry on the site. They see the text you sent and your public GitHub login, nothing more.',
          "GitHub's own handling of your account and issues is covered by the [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). You can edit the text of your issue on GitHub yourself; to have the issue deleted or the entry taken off the wall, write to the address above.",
        ],
      },
      assistant: {
        title: 'The private assistant',
        body: [
          'A private AI assistant is being built on this site, open only to people with an invitation. This section is how it handles data, and it applies from the day the assistant opens.',
          'You sign in with a Google account. The site asks Google only for the basic sign-in scopes, `openid`, `email` and `profile`, and receives your Google account identifier, your email address and whether it is verified, your name and your profile picture. It asks for nothing else: no access to Gmail, Drive, contacts or any other Google service.',
          'Your first sign-in with an invitation registers you and takes one place on it. The site stores your Google account identifier, your email address, the invitation you used and when you registered, so it can let you back in later; your name and picture are only shown in the chat.',
          'Your conversations are stored on Cloudflare so you can come back to them. Each message is sent to [Anthropic](https://www.anthropic.com/legal/privacy), the provider of the AI model, to produce the reply; under its commercial terms it does not use them to train its models. Flop can read conversations when that is needed to keep the assistant working or to stop abuse. Do not share anything sensitive with the assistant: health, finances, passwords.',
          'The use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements. It is not sold, not used for advertising and not shared beyond what this page describes.',
          "Your registration and conversations are kept for as long as you have access. You can ask for them to be deleted at any time; when access ends they are deleted within 30 days. You can also withdraw the site's access to your Google account in your [Google account settings](https://myaccount.google.com/connections).",
        ],
      },
      email: {
        title: 'Email',
        body: [
          'If you write to the address above, your message and your address are kept in the mailbox, which is hosted by Google, to answer you and for as long as the conversation stays relevant.',
        ],
      },
      legal: {
        title: 'Legal basis',
        body: ['Under the GDPR, each use of personal data needs a legal basis:'],
        items: [
          'Delivering and protecting the site, and its logs: legitimate interest, Art. 6(1)(f).',
          'The wall: your consent, Art. 6(1)(a), given when you send a request; you can withdraw it by asking for the entry to be removed.',
          'The private assistant: providing the service you signed up for, Art. 6(1)(b).',
          'Email: legitimate interest in answering you, Art. 6(1)(f).',
        ],
      },
      recipients: {
        title: 'Who else handles the data',
        body: [
          'Personal data is never sold. It reaches only these services, each for its own part of the job:',
        ],
        items: [
          "Cloudflare: hosting, delivery and protection of the site, storage of the assistant's data.",
          'GitHub: sign-in to the wall and the public issues.',
          'Google: sign-in to the assistant, and the mailbox.',
          'Anthropic: the replies of the private assistant.',
          "AI model providers behind the moderation service and the site's agents: wall requests only, which are public anyway.",
        ],
        after: [
          "Some of these companies are in the United States. Transfers there rely on the EU-US Data Privacy Framework or on the European Commission's standard contractual clauses.",
        ],
      },
      rights: {
        title: 'Your rights',
        body: [
          'You can ask for access to your data, for a copy in a portable format, and for it to be corrected, deleted or restricted, and you can object to processing based on legitimate interest. Where processing relies on your consent, you can withdraw it at any time. Write to the address above; the answer comes within one month.',
          'You can also complain to the Polish supervisory authority, the [President of the Personal Data Protection Office](https://uodo.gov.pl/en) (UODO).',
        ],
      },
      children: {
        title: 'Children',
        body: ['The wall and the assistant are not meant for anyone under 16.'],
      },
      changes: {
        title: 'Changes',
        body: [
          'When this page changes, the date at the top changes with it. People with access to the assistant hear about substantial changes in how it handles their data before they take effect.',
        ],
      },
    },
  },

  /* Same inline markup and anchor rule as the privacy policy. */
  terms: {
    meta: {
      title: 'Terms of service - Flop Butylkin',
      description:
        'The rules for using flopbut.pl: the wall, contributions, the private assistant, liability and the law that applies.',
    },
    eyebrow: 'Terms',
    title: 'Terms of service',
    updated: 'Last updated',
    language:
      'The Russian and Polish versions are translations provided for convenience. If they differ, this English version prevails.',
    intro:
      'flopbut.pl is a personal site run by Flop Butylkin, Warsaw, Poland. Reading it needs nothing from you. These terms matter once you write on the wall or use the private assistant, and doing either means you accept them.',
    sections: {
      site: {
        title: 'The site',
        body: [
          "The texts, images and logo are Flop's, except what visitors wrote on the wall, which stays theirs. The source code is open under the MIT licence in [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl). The site is free and comes as it is: it can change, pause or go away at any time, and it may contain mistakes.",
          'Links to other sites are there for convenience. What those sites say and do is their own business.',
        ],
      },
      wall: {
        title: 'Writing on the wall',
        body: ['The wall is open to anything safe. Do not send what:'],
        items: [
          "is against the law, or infringes somebody else's copyright, trademark or privacy;",
          "goes after a person: harassment, threats, hate, or someone else's personal data without their consent;",
          'tries to harm visitors or the site: malware, phishing, tracking, or wiping out other entries;',
          'tells the agents that run the site to break their rules.',
        ],
        after: [
          'Send only what you have the right to share. By sending it you allow it to be published on the site and in its public repository, adapted by the agents so it fits the wall, and kept in the repository under the MIT licence, like the rest of the code.',
          "A request can be declined, and an entry changed or taken down, at any time, in particular when it turns out to be unsafe. Ask and your own entry comes off the wall; the issue on GitHub and the repository's history are public records and may still hold it.",
        ],
      },
      assistant: {
        title: 'The private assistant',
        body: [
          'The assistant is open by invitation only and is free. An invitation has a limited number of places, and each Google account that registers with it takes one. Access is personal: do not share your account or pass your access on.',
          'Do not use the assistant for anything illegal or harmful, do not try to break it, get around its limits or pull out its instructions, and do not drive it with scripts or bots. There are limits on how much it can be used, and they can change.',
          'Its answers are generated by an AI model. They can be wrong, incomplete or out of date, and they are not professional advice: medical, legal, financial or any other. Check anything that matters before you rely on it.',
          'Access can be limited or ended at any time, for example after a breach of these terms or when the assistant closes. You can leave whenever you like and ask for your data to be deleted.',
        ],
      },
      privacy: {
        title: 'Personal data',
        body: [
          'How the site handles personal data is described in the [privacy policy](/privacy/).',
        ],
      },
      liability: {
        title: 'Liability',
        body: [
          'The site and the assistant are provided free of charge and without any warranty. To the extent the law allows, Flop is not liable for damage resulting from using them, from their being unavailable, or from relying on what they say. Nothing here limits liability that the law does not allow to be limited, or your rights as a consumer.',
        ],
      },
      law: {
        title: 'Law and disputes',
        body: [
          'These terms are governed by Polish law, and disputes go to the courts of Poland. If you are a consumer, you also keep the protection that the mandatory law of your own country gives you.',
        ],
      },
      changes: {
        title: 'Changes',
        body: [
          'When these terms change, the date at the top changes with it. People with access to the assistant hear about substantial changes before they take effect. Questions go to [flopspm@gmail.com](mailto:flopspm@gmail.com).',
        ],
      },
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
    projects: 'проекты',
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
      tokens: { value: '2B+', label: 'токенов / неделя' },
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
    privacy: 'Конфиденциальность',
    terms: 'Условия',
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
    cta: 'Написать на стене',
    entry: {
      by: 'По просьбе',
      request: 'запрос',
    },
    entries: {
      fiveCats: {
        title: 'Пять котиков и чем занят Флоп',
        cats: {
          agents: 'Пасет флот агентов',
          app: 'Выкатывает приложение',
          solder: 'Учит железо огрызаться',
          sail: 'Под парусом',
          tango: 'Танго посреди недели',
        },
      },
    },
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
      'Отправка создаёт публичный issue на GitHub от вашего имени. На стене рядом с записью тоже будет ваш логин, если не попросите его убрать.',
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

  privacy: {
    meta: {
      title: 'Политика конфиденциальности - Flop Butylkin',
      description:
        'Что flopbut.pl делает с персональными данными: стена, вход через GitHub и Google, личный ассистент, cookies и ваши права.',
    },
    eyebrow: 'Конфиденциальность',
    title: 'Политика конфиденциальности',
    updated: 'Обновлено',
    language: 'Это перевод для удобства. При расхождении действует [английская версия](/privacy/).',
    intro:
      'flopbut.pl - личный сайт. Почти весь он состоит из статических страниц, которые ничего о вас не собирают. Здесь перечислены те немногие места, где появляются персональные данные: что с ними происходит и как добиться их удаления.',
    sections: {
      controller: {
        title: 'Кто отвечает',
        body: [
          'Сайт ведёт Flop Butylkin, Варшава, Польша. Он и есть администратор (controller) персональных данных, о которых идёт речь на этой странице. По любому вопросу отсюда пишите на [flopspm@gmail.com](mailto:flopspm@gmail.com).',
        ],
      },
      browsing: {
        title: 'Посещение сайта',
        body: [
          'Страницы отдаёт Cloudflare. Он обрабатывает технические данные, которые несёт любой веб-запрос: IP-адрес, сведения о браузере и устройстве, запрошенный адрес и время. Они нужны, чтобы доставить страницу и защитить сайт от атак. Запросы к той части сайта, что работает на сервере (вход и формы), ещё несколько дней хранятся в логах, чтобы находить и исправлять ошибки.',
          'Сайт не загружает сторонних трекеров, рекламы и аналитических cookies. Шрифты отдаются с самого сайта, а не с Google Fonts. Выбранная тема, светлая или тёмная, хранится в вашем браузере и никуда из него не уходит.',
        ],
      },
      cookies: {
        title: 'Cookies',
        body: [
          'Cookies появляются только при входе, и только те, без которых не работает функция, которой вы пользуетесь:',
        ],
        items: [
          '`wall_oauth`, десять минут: защищает вход через GitHub от поддельных запросов.',
          '`wall_session`, до часа: держит вас в форме стены. Зашифрован, содержит ваш логин GitHub и токен доступа, который GitHub выдал для формы.',
          'Личный ассистент, когда откроется, использует такие же cookies для входа через Google: один защищает вход, другой держит вас в системе, зашифрован и содержит только идентификатор аккаунта.',
        ],
        after: ['Ни один из них не следит за вами на других сайтах, поэтому баннера согласия нет.'],
      },
      wall: {
        title: 'Стена',
        body: [
          'Чтобы написать на стене, вы входите через GitHub. GitHub сообщает сайту ваш логин и выдаёт токен, который умеет одно: создавать issue в репозитории этого сайта. Токен лежит в зашифрованном cookie сессии, на сервере не хранится и пропадает вместе с cookie.',
          'То, что вы отправили, становится публичным issue в [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl) от вашего аккаунта GitHub, а запись, сделанная по нему, появляется на стене с вашим логином, если вы не попросите его убрать. Публикация и есть смысл формы, и форма говорит об этом до отправки.',
          'Каждый новый issue уходит в автоматическую модерацию, которая AI-моделью проверяет, что запрос безопасен, а затем к AI-агентам, которые делают запись на сайте. Они видят отправленный текст и ваш публичный логин GitHub, больше ничего.',
          'То, как GitHub обращается с вашим аккаунтом и issue, описано в [заявлении GitHub о конфиденциальности](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Текст своего issue вы можете править на GitHub сами; чтобы удалить issue или снять запись со стены, напишите на адрес выше.',
        ],
      },
      assistant: {
        title: 'Личный ассистент',
        body: [
          'На сайте готовится личный AI-ассистент, доступный только по приглашению. Этот раздел описывает, как он обращается с данными, и действует с того дня, как ассистент откроется.',
          'Вход - через аккаунт Google. Сайт запрашивает у Google только базовые scopes для входа, `openid`, `email` и `profile`, и получает идентификатор аккаунта Google, адрес почты и отметку о том, подтверждён ли он, имя и фото профиля. Больше ничего: ни доступа к Gmail, Drive, контактам, ни к другим сервисам Google.',
          'Первый вход по приглашению регистрирует вас и занимает в нём одно место. Сайт хранит идентификатор аккаунта Google, адрес почты, использованное приглашение и время регистрации, чтобы впускать вас и дальше; имя и фото только показываются в чате.',
          'Переписка хранится в Cloudflare, чтобы к ней можно было вернуться. Каждое сообщение отправляется [Anthropic](https://www.anthropic.com/legal/privacy), поставщику AI-модели, чтобы получить ответ; по своим коммерческим условиям Anthropic не обучает на них модели. Флоп может читать переписку, когда это нужно, чтобы ассистент работал, или чтобы пресечь злоупотребления. Не делитесь с ассистентом чувствительным: здоровьем, финансами, паролями.',
          'Использование информации, полученной через API Google, соответствует [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), включая требования Limited Use. Эти данные не продаются, не используются для рекламы и не передаются никому сверх описанного на этой странице.',
          'Регистрация и переписка хранятся, пока у вас есть доступ. Удалить их можно попросить в любой момент; после того как доступ закончится, они удаляются в течение 30 дней. Отозвать доступ сайта к аккаунту Google можно и самостоятельно, в [настройках аккаунта Google](https://myaccount.google.com/connections).',
        ],
      },
      email: {
        title: 'Почта',
        body: [
          'Если вы пишете на адрес выше, письмо и ваш адрес хранятся в почтовом ящике на Google, чтобы вам ответить, и столько, сколько переписка остаётся актуальной.',
        ],
      },
      legal: {
        title: 'Правовые основания',
        body: [
          'По GDPR у каждого использования персональных данных должно быть правовое основание:',
        ],
        items: [
          'Работа и защита сайта, логи: законный интерес, ст. 6(1)(f).',
          'Стена: ваше согласие, ст. 6(1)(a), которое вы даёте, отправляя запрос; отозвать его можно, попросив убрать запись.',
          'Личный ассистент: оказание услуги, на которую вы зарегистрировались, ст. 6(1)(b).',
          'Почта: законный интерес в том, чтобы вам ответить, ст. 6(1)(f).',
        ],
      },
      recipients: {
        title: 'Кто ещё работает с данными',
        body: [
          'Персональные данные никогда не продаются. Они попадают только в эти сервисы, каждый для своей части работы:',
        ],
        items: [
          'Cloudflare: хостинг, доставка и защита сайта, хранение данных ассистента.',
          'GitHub: вход на стену и публичные issue.',
          'Google: вход в ассистента и почтовый ящик.',
          'Anthropic: ответы личного ассистента.',
          'Поставщики AI-моделей, на которых работают модерация и агенты сайта: только запросы на стену, которые и так публичны.',
        ],
        after: [
          'Часть этих компаний находится в США. Передача данных туда опирается на EU-US Data Privacy Framework или на стандартные договорные условия Европейской комиссии.',
        ],
      },
      rights: {
        title: 'Ваши права',
        body: [
          'Вы можете запросить доступ к своим данным и их копию в переносимом формате, потребовать исправить, удалить их или ограничить обработку, а также возразить против обработки на основании законного интереса. Если обработка опирается на ваше согласие, его можно отозвать в любой момент. Пишите на адрес выше; ответ придёт в течение месяца.',
          'Также можно подать жалобу в польский надзорный орган, [Председателю Управления по защите персональных данных](https://uodo.gov.pl/en) (UODO).',
        ],
      },
      children: {
        title: 'Дети',
        body: ['Стена и ассистент не предназначены для тех, кому меньше 16.'],
      },
      changes: {
        title: 'Изменения',
        body: [
          'Когда эта страница меняется, вместе с ней меняется дата вверху. Те, у кого есть доступ к ассистенту, узнают о существенных изменениях в обращении с их данными до того, как они вступят в силу.',
        ],
      },
    },
  },

  terms: {
    meta: {
      title: 'Условия использования - Flop Butylkin',
      description:
        'Правила пользования flopbut.pl: стена, записи посетителей, личный ассистент, ответственность и применимое право.',
    },
    eyebrow: 'Условия',
    title: 'Условия использования',
    updated: 'Обновлено',
    language: 'Это перевод для удобства. При расхождении действует [английская версия](/terms/).',
    intro:
      'flopbut.pl - личный сайт, который ведёт Flop Butylkin, Варшава, Польша. Чтобы его читать, ничего не нужно. Эти условия начинают действовать, когда вы пишете на стене или пользуетесь личным ассистентом: делая это, вы их принимаете.',
    sections: {
      site: {
        title: 'Сайт',
        body: [
          'Тексты, изображения и логотип принадлежат Флопу, кроме того, что написали на стене посетители: это остаётся их. Исходный код открыт под лицензией MIT в [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl). Сайт бесплатный и предоставляется как есть: он может меняться, останавливаться или исчезнуть в любой момент и может содержать ошибки.',
          'Ссылки на другие сайты даны для удобства. За то, что там написано и происходит, отвечают сами эти сайты.',
        ],
      },
      wall: {
        title: 'Записи на стене',
        body: ['Стена открыта для всего безопасного. Не присылайте то, что:'],
        items: [
          'нарушает закон или чужие авторские права, товарные знаки, частную жизнь;',
          'направлено против человека: травля, угрозы, ненависть, чужие персональные данные без согласия;',
          'пытается навредить посетителям или сайту: вредоносный код, фишинг, слежка, уничтожение чужих записей;',
          'велит агентам, которые ведут сайт, нарушить их правила.',
        ],
        after: [
          'Присылайте только то, чем вправе делиться. Отправляя запись, вы разрешаете опубликовать её на сайте и в его публичном репозитории, адаптировать её агентами под стену и хранить в репозитории под лицензией MIT, как и остальной код.',
          'Запрос могут отклонить, а запись изменить или снять в любой момент, особенно если она окажется небезопасной. По вашей просьбе ваша запись уйдёт со стены; issue на GitHub и история репозитория - публичные записи и могут её сохранить.',
        ],
      },
      assistant: {
        title: 'Личный ассистент',
        body: [
          'Ассистент доступен только по приглашению и бесплатен. В приглашении ограниченное число мест, и каждый аккаунт Google, зарегистрированный по нему, занимает одно. Доступ личный: не делитесь аккаунтом и не передавайте доступ другим.',
          'Не используйте ассистента для незаконного или вредного, не пытайтесь его сломать, обойти ограничения или вытащить его инструкции и не управляйте им скриптами или ботами. Объём использования ограничен, и ограничения могут меняться.',
          'Ответы генерирует AI-модель. Они могут быть ошибочными, неполными или устаревшими и не являются профессиональной консультацией: медицинской, юридической, финансовой или любой другой. Проверяйте всё важное, прежде чем на это полагаться.',
          'Доступ могут ограничить или прекратить в любой момент, например после нарушения этих условий или когда ассистент закроется. Уйти можно когда угодно и попросить удалить ваши данные.',
        ],
      },
      privacy: {
        title: 'Персональные данные',
        body: [
          'Как сайт обращается с персональными данными, описано в [политике конфиденциальности](/ru/privacy/).',
        ],
      },
      liability: {
        title: 'Ответственность',
        body: [
          'Сайт и ассистент предоставляются бесплатно и без каких-либо гарантий. В пределах, допустимых законом, Флоп не отвечает за ущерб от их использования, недоступности или от того, что вы положились на их слова. Ничто здесь не ограничивает ответственность, которую закон ограничивать не позволяет, и ваши права потребителя.',
        ],
      },
      law: {
        title: 'Право и споры',
        body: [
          'К этим условиям применяется право Польши, а споры рассматривают суды Польши. Если вы потребитель, за вами сохраняется защита, которую даёт императивное право вашей страны.',
        ],
      },
      changes: {
        title: 'Изменения',
        body: [
          'Когда условия меняются, вместе с ними меняется дата вверху. Те, у кого есть доступ к ассистенту, узнают о существенных изменениях до того, как они вступят в силу. Вопросы - на [flopspm@gmail.com](mailto:flopspm@gmail.com).',
        ],
      },
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
    projects: 'projekty',
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
      tokens: { value: '2B+', label: 'tokenów / tydzień' },
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
    privacy: 'Prywatność',
    terms: 'Regulamin',
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
    cta: 'Napisz na ścianie',
    entry: {
      by: 'Na prośbę',
      request: 'zgłoszenie',
    },
    entries: {
      fiveCats: {
        title: 'Pięć kotów i czym zajmuje się Flop',
        cats: {
          agents: 'Pasie flotę agentów',
          app: 'Wypuszcza aplikację',
          solder: 'Uczy sprzęt odpowiadać',
          sail: 'Pod żaglami',
          tango: 'Tango w środku tygodnia',
        },
      },
    },
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
      'Wysłanie tworzy publiczne issue na GitHubie w Twoim imieniu. Na ścianie wpis też będzie podpisany Twoim loginem, chyba że poprosisz, żeby go pominąć.',
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

  privacy: {
    meta: {
      title: 'Polityka prywatności - Flop Butylkin',
      description:
        'Co flopbut.pl robi z danymi osobowymi: ściana, logowanie przez GitHub i Google, prywatny asystent, pliki cookie i Twoje prawa.',
    },
    eyebrow: 'Prywatność',
    title: 'Polityka prywatności',
    updated: 'Ostatnia aktualizacja',
    language:
      'To tłumaczenie dla wygody. W razie rozbieżności obowiązuje [wersja angielska](/privacy/).',
    intro:
      'flopbut.pl to strona prywatna. Prawie cała składa się ze statycznych stron, które niczego o Tobie nie zbierają. Tu wymienione są nieliczne miejsca, w których pojawiają się dane osobowe: co się z nimi dzieje i jak doprowadzić do ich usunięcia.',
    sections: {
      controller: {
        title: 'Kto odpowiada',
        body: [
          'Stronę prowadzi Flop Butylkin, Warszawa, Polska, administrator danych osobowych opisanych na tej stronie. W każdej sprawie z nią związanej pisz na [flopspm@gmail.com](mailto:flopspm@gmail.com).',
        ],
      },
      browsing: {
        title: 'Odwiedzanie strony',
        body: [
          'Strony serwuje Cloudflare, który przetwarza dane techniczne zawarte w każdym zapytaniu: adres IP, informacje o przeglądarce i urządzeniu, żądany adres i czas. Służą one do dostarczenia strony i ochrony przed atakami. Zapytania do części strony działającej na serwerze (logowanie i formularze) są dodatkowo przez kilka dni przechowywane w logach, żeby znajdować i naprawiać błędy.',
          'Strona nie ładuje zewnętrznych trackerów, reklam ani analitycznych plików cookie. Czcionki pochodzą z samej strony, nie z Google Fonts. Wybrany motyw, jasny lub ciemny, jest zapisywany w Twojej przeglądarce i jej nie opuszcza.',
        ],
      },
      cookies: {
        title: 'Pliki cookie',
        body: [
          'Pliki cookie pojawiają się tylko przy logowaniu i tylko te, bez których nie działa funkcja, z której korzystasz:',
        ],
        items: [
          '`wall_oauth`, dziesięć minut: chroni logowanie przez GitHub przed sfałszowanymi zapytaniami.',
          '`wall_session`, do godziny: utrzymuje zalogowanie w formularzu ściany. Zaszyfrowany; zawiera Twój login GitHub i token dostępu wydany przez GitHub dla formularza.',
          'Prywatny asystent, gdy ruszy, używa takich samych plików cookie przy logowaniu przez Google: jeden chroni logowanie, drugi utrzymuje sesję, jest zaszyfrowany i zawiera tylko identyfikator konta.',
        ],
        after: ['Żaden z nich nie śledzi Cię na innych stronach, dlatego nie ma banera zgody.'],
      },
      wall: {
        title: 'Ściana',
        body: [
          'Żeby napisać na ścianie, logujesz się przez GitHub. GitHub przekazuje stronie Twój login i wydaje token, który potrafi jedno: tworzyć issue w repozytorium tej strony. Token jest przechowywany w zaszyfrowanym pliku cookie sesji, nie na serwerze, i znika razem z nim.',
          'To, co wyślesz, staje się publicznym issue w [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl) z Twojego konta GitHub, a wpis zrobiony na jego podstawie pojawia się na ścianie z Twoim loginem, chyba że poprosisz o jego pominięcie. Publikacja jest celem formularza i formularz mówi o tym przed wysłaniem.',
          'Każde nowe issue trafia do automatycznej moderacji, która modelem AI sprawdza, czy prośba jest bezpieczna, a potem do agentów AI, którzy tworzą wpis na stronie. Widzą wysłany tekst i Twój publiczny login GitHub, nic więcej.',
          'To, jak GitHub obchodzi się z Twoim kontem i issue, opisuje [oświadczenie GitHub o prywatności](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement). Tekst swojego issue możesz edytować na GitHubie samodzielnie; żeby usunąć issue albo zdjąć wpis ze ściany, napisz na adres podany wyżej.',
        ],
      },
      assistant: {
        title: 'Prywatny asystent',
        body: [
          'Na stronie powstaje prywatny asystent AI, dostępny tylko z zaproszeniem. Ta sekcja opisuje, jak obchodzi się z danymi, i obowiązuje od dnia jego uruchomienia.',
          'Logujesz się kontem Google. Strona prosi Google tylko o podstawowe zakresy logowania, `openid`, `email` i `profile`, i otrzymuje identyfikator konta Google, adres e-mail wraz z informacją, czy jest zweryfikowany, imię i nazwisko oraz zdjęcie profilowe. O nic więcej nie prosi: żadnego dostępu do Gmaila, Dysku, kontaktów ani innych usług Google.',
          'Pierwsze logowanie z zaproszeniem rejestruje Cię i zajmuje w nim jedno miejsce. Strona przechowuje identyfikator konta Google, adres e-mail, użyte zaproszenie i czas rejestracji, żeby wpuszczać Cię później; imię i zdjęcie są tylko wyświetlane w czacie.',
          'Rozmowy są przechowywane w Cloudflare, żeby można było do nich wrócić. Każda wiadomość trafia do [Anthropic](https://www.anthropic.com/legal/privacy), dostawcy modelu AI, który generuje odpowiedź; zgodnie ze swoimi warunkami komercyjnymi Anthropic nie trenuje na nich modeli. Flop może czytać rozmowy, gdy jest to potrzebne do utrzymania asystenta w działaniu albo powstrzymania nadużyć. Nie powierzaj asystentowi niczego wrażliwego: zdrowia, finansów, haseł.',
          'Wykorzystanie informacji otrzymanych z interfejsów API Google jest zgodne z [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), w tym z wymogami Limited Use. Dane te nie są sprzedawane, nie służą do reklamy i nie są przekazywane nikomu poza tym, co opisuje ta strona.',
          'Rejestracja i rozmowy są przechowywane, dopóki masz dostęp. W każdej chwili możesz poprosić o ich usunięcie; po zakończeniu dostępu są usuwane w ciągu 30 dni. Dostęp strony do konta Google możesz też cofnąć samodzielnie w [ustawieniach konta Google](https://myaccount.google.com/connections).',
        ],
      },
      email: {
        title: 'E-mail',
        body: [
          'Jeśli piszesz na adres podany wyżej, wiadomość i Twój adres są przechowywane w skrzynce prowadzonej przez Google, żeby Ci odpowiedzieć, i tak długo, jak rozmowa pozostaje aktualna.',
        ],
      },
      legal: {
        title: 'Podstawy prawne',
        body: ['Zgodnie z RODO każde wykorzystanie danych osobowych wymaga podstawy prawnej:'],
        items: [
          'Działanie i ochrona strony, logi: prawnie uzasadniony interes, art. 6 ust. 1 lit. f.',
          'Ściana: Twoja zgoda, art. 6 ust. 1 lit. a, wyrażona przez wysłanie prośby; możesz ją wycofać, prosząc o usunięcie wpisu.',
          'Prywatny asystent: świadczenie usługi, z której korzystasz po rejestracji, art. 6 ust. 1 lit. b.',
          'E-mail: prawnie uzasadniony interes w udzieleniu odpowiedzi, art. 6 ust. 1 lit. f.',
        ],
      },
      recipients: {
        title: 'Kto jeszcze przetwarza dane',
        body: [
          'Dane osobowe nigdy nie są sprzedawane. Trafiają wyłącznie do tych usług, każda do swojej części pracy:',
        ],
        items: [
          'Cloudflare: hosting, dostarczanie i ochrona strony, przechowywanie danych asystenta.',
          'GitHub: logowanie na ścianę i publiczne issue.',
          'Google: logowanie do asystenta i skrzynka pocztowa.',
          'Anthropic: odpowiedzi prywatnego asystenta.',
          'Dostawcy modeli AI, na których działają moderacja i agenci strony: tylko prośby na ścianę, które i tak są publiczne.',
        ],
        after: [
          'Część tych firm ma siedzibę w Stanach Zjednoczonych. Przekazywanie tam danych opiera się na EU-US Data Privacy Framework lub na standardowych klauzulach umownych Komisji Europejskiej.',
        ],
      },
      rights: {
        title: 'Twoje prawa',
        body: [
          'Możesz żądać dostępu do swoich danych i ich kopii w formacie przenośnym, ich sprostowania, usunięcia lub ograniczenia przetwarzania, a także wnieść sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie. Jeśli przetwarzanie opiera się na Twojej zgodzie, możesz ją wycofać w każdej chwili. Napisz na adres podany wyżej; odpowiedź przyjdzie w ciągu miesiąca.',
          'Możesz też złożyć skargę do [Prezesa Urzędu Ochrony Danych Osobowych](https://uodo.gov.pl) (PUODO).',
        ],
      },
      children: {
        title: 'Dzieci',
        body: ['Ściana i asystent nie są przeznaczone dla osób poniżej 16 lat.'],
      },
      changes: {
        title: 'Zmiany',
        body: [
          'Gdy ta strona się zmienia, zmienia się też data na górze. Osoby z dostępem do asystenta dowiedzą się o istotnych zmianach w obchodzeniu się z ich danymi, zanim wejdą one w życie.',
        ],
      },
    },
  },

  terms: {
    meta: {
      title: 'Regulamin - Flop Butylkin',
      description:
        'Zasady korzystania z flopbut.pl: ściana, wpisy odwiedzających, prywatny asystent, odpowiedzialność i właściwe prawo.',
    },
    eyebrow: 'Regulamin',
    title: 'Regulamin',
    updated: 'Ostatnia aktualizacja',
    language:
      'To tłumaczenie dla wygody. W razie rozbieżności obowiązuje [wersja angielska](/terms/).',
    intro:
      'flopbut.pl to strona prywatna prowadzona przez Flopa Butylkina, Warszawa, Polska. Do czytania niczego od Ciebie nie potrzeba. Ten regulamin zaczyna obowiązywać, gdy piszesz na ścianie albo korzystasz z prywatnego asystenta: robiąc to, akceptujesz go.',
    sections: {
      site: {
        title: 'Strona',
        body: [
          'Teksty, obrazy i logo należą do Flopa, z wyjątkiem tego, co odwiedzający napisali na ścianie: to pozostaje ich. Kod źródłowy jest otwarty na licencji MIT w [Flopsstuff/flopbut.pl](https://github.com/Flopsstuff/flopbut.pl). Strona jest bezpłatna i udostępniana w takim stanie, w jakim jest: może się zmieniać, wstrzymać działanie lub zniknąć w każdej chwili i może zawierać błędy.',
          'Linki do innych stron są dla wygody. Za to, co tam jest i co się tam dzieje, odpowiadają te strony.',
        ],
      },
      wall: {
        title: 'Wpisy na ścianie',
        body: ['Ściana jest otwarta na wszystko, co bezpieczne. Nie wysyłaj tego, co:'],
        items: [
          'łamie prawo albo cudze prawa autorskie, znaki towarowe lub prywatność;',
          'jest wymierzone w człowieka: nękanie, groźby, nienawiść, cudze dane osobowe bez zgody;',
          'próbuje zaszkodzić odwiedzającym lub stronie: złośliwy kod, phishing, śledzenie, niszczenie cudzych wpisów;',
          'każe agentom prowadzącym stronę łamać ich zasady.',
        ],
        after: [
          'Wysyłaj tylko to, czym masz prawo się dzielić. Wysyłając wpis, zgadzasz się na jego publikację na stronie i w jej publicznym repozytorium, dopasowanie go przez agentów do ściany i przechowywanie w repozytorium na licencji MIT, tak jak reszty kodu.',
          'Prośba może zostać odrzucona, a wpis zmieniony lub zdjęty w każdej chwili, zwłaszcza gdy okaże się niebezpieczny. Na Twoją prośbę Twój wpis zniknie ze ściany; issue na GitHubie i historia repozytorium są publiczne i mogą go zachować.',
        ],
      },
      assistant: {
        title: 'Prywatny asystent',
        body: [
          'Asystent jest dostępny tylko z zaproszeniem i jest bezpłatny. Zaproszenie ma ograniczoną liczbę miejsc, a każde konto Google zarejestrowane z jego użyciem zajmuje jedno. Dostęp jest osobisty: nie udostępniaj konta i nie przekazuj dostępu innym.',
          'Nie używaj asystenta do niczego nielegalnego ani szkodliwego, nie próbuj go zepsuć, obejść jego limitów ani wydobyć jego instrukcji i nie steruj nim skryptami ani botami. Korzystanie z niego ma limity, które mogą się zmieniać.',
          'Odpowiedzi generuje model AI. Mogą być błędne, niepełne lub nieaktualne i nie są profesjonalną poradą: medyczną, prawną, finansową ani żadną inną. Sprawdź wszystko, co ważne, zanim na tym polegniesz.',
          'Dostęp może zostać ograniczony lub zakończony w każdej chwili, na przykład po naruszeniu regulaminu albo gdy asystent zostanie zamknięty. Możesz odejść, kiedy chcesz, i poprosić o usunięcie swoich danych.',
        ],
      },
      privacy: {
        title: 'Dane osobowe',
        body: [
          'To, jak strona obchodzi się z danymi osobowymi, opisuje [polityka prywatności](/pl/privacy/).',
        ],
      },
      liability: {
        title: 'Odpowiedzialność',
        body: [
          'Strona i asystent są udostępniane bezpłatnie i bez żadnych gwarancji. W granicach dozwolonych przez prawo Flop nie odpowiada za szkody wynikające z korzystania z nich, ich niedostępności ani z polegania na tym, co mówią. Nic tutaj nie ogranicza odpowiedzialności, której prawo nie pozwala ograniczyć, ani Twoich praw jako konsumenta.',
        ],
      },
      law: {
        title: 'Prawo i spory',
        body: [
          'Do regulaminu stosuje się prawo polskie, a spory rozstrzygają sądy polskie. Jeśli jesteś konsumentem, zachowujesz też ochronę, jaką daje Ci bezwzględnie obowiązujące prawo Twojego kraju.',
        ],
      },
      changes: {
        title: 'Zmiany',
        body: [
          'Gdy regulamin się zmienia, zmienia się też data na górze. Osoby z dostępem do asystenta dowiedzą się o istotnych zmianach, zanim wejdą one w życie. Pytania kieruj na [flopspm@gmail.com](mailto:flopspm@gmail.com).',
        ],
      },
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru, pl };

export type { Dictionary };

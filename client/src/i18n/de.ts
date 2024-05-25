export default {
  onboarding: {
    navigation: {
      prev: 'Zurück',
      next: {
        select: 'Weiter',
        podcast: 'Speichern & Weiter',
        'next-steps': 'Starthilfe beenden'
      }
    },
    steps: {
      select: {
        title: 'Einrichtungsart',
        headline: `Los geht’s!`,
        description: `Hier führen wir Dich einmal durch die Einrichtung Deines Podcasts. Egal, ob Du neu im Podcasting bist oder bereits einen Podcast hast.`,
        fresh: {
          title: 'Starte Deinen Podcast',
          description:
            'Richte Deinen Podcast ein und bringe ihn online, damit er weltweit gefunden und gehört werden können.'
        },
        import: {
          title: 'Ziehe Deinen Podcast zu Podlove um',
          description:
            'Importiere Deinen vorhandenen Podcast und bleib weiter für Dein Publikum auf Sendung.'
        }
      },
      'start-new-podcast': {
        title: 'Podcast Informationen',
        headline: 'Starte Deinen Podcast',
        description: `Was macht Deinen Podcast aus? Gib einige wichtige Details über Deinen Podcast an, um Hörer:innen zu helfen, ihn zu finden und reinzuhören. Keine Sorge: Du kannst diese Details später jederzeit ändern. Die Vorschau zeigt Dir an, wie Deine Angaben später Deinen Hörer:innen angezeigt werden.`
      },
      'start-new-next-steps': {
        title: 'Nächste Schritte',
        headline: 'Herzlichen Glückwunsch! 🎉 Die Einrichtung Deines Podcasts ist abgeschlossen!',
        description: 'Wir freuen uns, dich an Bord zu haben!',
        feed: `Der RSS-Feed Deines Podcasts ist bereit:`,
        'feed-hint':
          'Dieser Feed macht Deinen Podcast für Hörer auf verschiedenen Plattformen zugänglich. Du kannst Deinen Podcast direkt über diesen Link in jedem Podcatcher abonnieren.',
        more: 'Jetzt, da Dein Podcast läuft, hier sind einige nächste Vorschläge, was Du als nächstes machen könntest:',
        'learn-head': 'Erfahre mehr über Podlove',
        learn:
          'Tauche tiefer in die Funktionen und Möglichkeiten von Podlove ein, indem Du die Dokumentation oder Community-Foren erkundest, damit Du Deine erste Episode veröffentlichen kannst!',
        'promote-head': 'Bewirb Deinen Podcast',
        promote:
          'Mach Deinen Podcast bekannt, indem Du ihn in die gängigen Podcast-Verzeichnisse einreichst. Schau Dir unseren Leitfaden an, wie Du Deinen Podcast-Feed in Verzeichnisse einreichen kannst.',
        'community-head': 'Werde Teil der Podlove-Community',
        community:
          'Vernetze dich mit anderen Podcasterinnen im „Sendegate“, der deutschsprachigen Podcast-Community. Hol Dir Tipps, Ratschläge und Unterstützung von erfahrenen Podcasterinnen oder teile selbst Deine eigenen Erkenntnisse und Erfahrungen.',
        sendegate:
          'Klicke unten, um zum Sendegate zu gelangen und unseren Willkommensbeitrag zu lesen. Dort kannst Du Dich vorstellen und Dich vernetzen. Viel Spaß beim Podcasten!'
      }
    },
    podcast: {
      'podcast-name': 'Podcastname',
      'podcast-name-placeholder': 'Mein Podcastname',
      'podcast-name-hint':
        'Gib Deinem Podcast einen einprägsamen Namen, der das Thema oder den Inhalt widerspiegelt und Hörer:innen dazu bringt, sich Deinen Podcast genauer anzuschauen.',
      'podcast-description': 'Podcastbeschreibung',
      'podcast-description-hint':
        'Verfasse eine kurze Beschreibung, die hervorhebt, worum es in Deinem Podcast geht. Diese Beschreibung wird in Podcast-Verzeichnissen angezeigt und hilft potenziellen Hörer:innen zu verstehen, was sie in Deinem Podcast erwarten können.',
      'podcast-author': 'Podcastautor*in',
      'podcast-author-hint':
        'Gib den Namen oder einen Pseudonym der Macher*innen hinter dem Podcast ein. Dies hilft Hörern dabei zu erkennen, wer für die Inhalte verantwortlich ist, die sie gerade hören.',
      'podcast-language': 'Sprache',
      'podcast-language-hint':
        'Wähle die Sprache aus, die in Deinen Podcast-Episoden meistens gesprochen wird. Dies hilft Hörer:innen dabei, Inhalte in ihrer Sprache zu finden und die Auffindbarkeit Deines Podcasts zu verbessern.',
      'podcast-category': 'Kategorie',
      'podcast-category-hint':
        'Wähle die Kategorie, die das Hauptthema oder den Hauptinhalt Deines Podcasts am besten repräsentiert. Dies hilft Hörer:innen dabei, Deinen Podcast innerhalb bestimmter Genres oder Interessen zu entdecken.',
      'podcast-content': 'Expliziter Inhalt',
      'podcast-content-desc': 'Ist der Inhalt explizit?',
      'podcast-content-hint':
        'Gib an, ob Dein Podcast explizite Sprache oder Inhalte nur für Erwachsene enthält. Diese Information ist für einige Verzeichnisse wichtig und hilft Hörer:innen dabei, eine informierte Entscheidungen vor dem Hören zu treffen.',

      'cover-photo': 'Podcast-Cover',
      'upload-file': 'Lade ein Bild hoch',
      'drag-and-drop': 'oder drag and drop',
      'upload-image-description':
        'Lade ein Bild hoch, das Deinen Podcast visuell repräsentiert. Dieses Bild wird neben Deinem Podcast in Verzeichnissen und Plattformen angezeigt und hilft dabei, ihn hervorzuheben und Hörer:innen auf ihn aufmerksam zu machen.'
    },
    preview: {
      title: 'Vorschau',
      follow: 'Folgen',
      name: '[Name]',
      author: '[Autor]',
      playButton: 'Staffel 2, Ep 1',
      description:
        '[Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.]'
    }
  },
  select: {
    description:
      'Du kannst entweder einen neuen Podcast erstellen oder einen bestehenden Podcast von einem anderen Anbieter importieren. Wählen die Option, die deinen Bedürfnissen am besten entspricht.',
    podcast: {
      title: 'Erstellung neuer Podcast'
    },
    import: {
      title: 'Überführung eines Podcasts'
    }
  }
};

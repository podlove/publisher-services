export default {
  onboarding: {
    navigation: {
      prev: 'Zurück',
      next: {
        select: 'Weiter',
        'start-new-podcast': 'Speichern & Weiter',
        'import-feed': 'Weiter',
        'import-podcast': 'Speichern & Weiter',
        'import-episodes': 'Import starten'
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
        feedHint:
          'Dieser Feed macht Deinen Podcast für Hörer auf verschiedenen Plattformen zugänglich. Du kannst Deinen Podcast direkt über diesen Link in jedem Podcatcher abonnieren.',
        more: 'Jetzt, da Dein Podcast läuft, hier sind einige nächste Vorschläge, was Du als nächstes machen könntest:',
        learn: {
          headline: 'Erfahre mehr über Podlove',
          content:  'Tauche tiefer in die Funktionen und Möglichkeiten von Podlove ein, indem Du die Dokumentation oder Community-Foren erkundest, damit Du Deine erste Episode veröffentlichen kannst!'
        },
        promote: {
          headline: 'Bewirb Deinen Podcast',
          content: 'Mach Deinen Podcast bekannt, indem Du ihn in die gängigen Podcast-Verzeichnisse einreichst. Schau Dir unseren Leitfaden an, wie Du Deinen Podcast-Feed in Verzeichnisse einreichen kannst.',
        },
        community: {
          headline: 'Werde Teil der Podlove-Community',
          content: 'Vernetze dich mit anderen Podcasterinnen im „Sendegate“, der deutschsprachigen Podcast-Community. Hol Dir Tipps, Ratschläge und Unterstützung von erfahrenen Podcasterinnen oder teile selbst Deine eigenen Erkenntnisse und Erfahrungen.',
        }
      },
      'import-feed': {
        title: 'RSS-Feed Eingabe',
        headline: 'Ziehe Deinen Podcast zu Podlove um',
        description:
          'In den folgenden Schritten kannst Deinen bestehenden Podcast zu Podlove umziehen. Gib einfach die RSS-Feed-URL deines aktuellen Podcasts unten ein. Die RSS-Feed-URL ist ein spezieller Link, der den Inhalt deines Podcasts zusammenfasst und es Plattformen ermöglicht, diesen Inhalt zu lesen und anzuzeigen.',
        help: 'Die RSS-Feed-URL findest Du normalerweise in den Einstellungen oder im Dashboard Deiner aktuellen Hosting-Plattform. Hinweise, wie Du die RSS-Feed-URL bei einzelnen Hosting-Plattformen finden kannst, haben wir und die Community in diesem <a class="support-link" href="https://sendegate.de/t/podcast-feed-bei-hosting-plattformen-finden-wiki/17116">Post</a> im Sendegate zusammengefasst.',
        'feed-url': 'Podcast feed url',
        'feed-url-placeholder': 'Podcast-Feed-URL eingeben',
        'success-head': 'Super!',
        'success-info':
          'Dein Podcast wurde unter der angegebenen URL gefunden. Du kannst jetzt zum nächsten Schritt gehen. Dort kannst Du die Podcast-Details überprüfen und anpassen.',
        'warning-head': 'Oops!',
        'warning-info':
          'Wir konnten Deinen Podcast unter der angegebenen URL nicht finden. Keine Sorge, das passiert manchmal! Hier sind ein paar Dinge, die Du überprüfen kannst',
        'warning-hints': [
          'Stelle sicher, dass die eingegebene URL korrekt ist.',
          'Wenn Du nicht sicher bist, wo Du die RSS-Feed-URL finden kannst, schau in die Dokumentation oder im Support-Ressourcen Deines Hosting-Anbieters nach.',
          'Du kannst auch Deinen Hosting-Anbieter direkt kontaktieren, um die korrekte RSS-Feed-URL zu erfragen.'
        ]
      },
      'import-podcast': {
        title: 'Podcast Daten überprüfen',
        headline: 'Überprüfe Deine Podcast-Daten',
        description:
          'Wir haben folgende Informationen für Deinen Podcast im Feed erkannt. Nimm dir einen Moment Zeit, um die unten stehenden Infos zu überprüfen. Wenn alles passt, bist Du einen Schritt näher daran, Deinen Podcast mit der Welt zu teilen. Wenn du irgendwelche Anpassungen vornehmen möchtest, kannst Du das hier tun, bevor du zum nächsten Schritt übergehst.'
      },
      'import-episodes': {
        title: 'Episoden Importieren',
        headline: 'Episoden importieren',
        description:
          "Wir haben die folgenden { count } Episoden in Deinem bestehenden Podcast gefunden. Bitte nimm Dir einen Moment Zeit, um die Liste zu überprüfen. Wenn alles passt, klicke auf 'Import starten'. Bitte schließe Dein Broswerfenster nicht, bis der Import abgeschlossen ist.",
        missingReleaseDate: 'Kein Erscheinungsdatum gefunden',
        episodePreview: {
          title: 'Titel',
          subtitle: 'Untertitel',
          publicationDate: 'Veröffentlichungsdatum',
          mediaFile: 'Medien Datei',
          duration: 'Laufzeit',
          summary: 'Zusammenfassung',
          chapters: 'Kapitel',
          transcripts: 'Transkripte',
          content: 'Inhalt',
        },
        progress: {
          numWaitingEpisode: '{count} Episode(n) warten auf den Import',
          numSuccessEpisode: '{count} Episode(n) erfolgreich importiert',
          numFaultyEpisode: '{count} Episode(n) fehlerhaft importiert',
          progressStatus: '{processed}/{waiting} Episode(n)',
          startImport: 'Import starten',
          stopImport: 'Import stoppen',
          restartImport: 'Import neustarten',
           episodeInImport: 'Gerade im import: {title}'
        }
      },
      'import-next-steps': {
        title: 'Nächste Schritte',
        headline: 'Herzlichen Glückwunsch! 🎉 Der Import Deines Podcasts ist abgeschlossen!',
        description: `Wir freuen uns, Dich an Bord zu haben!`,
        feed: `Dein Podcast-RSS-Feed ist einsatzbereit:`,
        feedHint:
          `Der Feed macht Deinen Podcast für Hörer auf verschiedenen Plattformen zugänglich.<br>Vergiss nicht, die Feed-URL Deines Podcasts in den verschiedenen Verzeichnissen zu aktualisieren, um einen nahtlosen Übergang für Dein Publikum sicherzustellen.`,
        more: 'Jetzt, da dein Podcast importiert und bereit ist, sind hier einige nächste Vorschläge, was Du als nächstes machen könntest:',
        learn: {
          headline: 'Erfahre mehr über Podlove',
          content: 'Tauche tiefer in die Funktionen und Möglichkeiten von Podlove ein, indem Du die Dokumentation liest oder unsere Community kennenlernst.'
        },
        redirect: {
          headline: 'Richte eine Weiterleitung von deinem alten Hoster ein:',
          content: `Stelle sicher, dass deine Zuhörer automatisch Deinem neuen Feed folgen, indem du eine Weiterleitung von deiner alten Hosting-Plattform einrichtest. Lies die Support-Dokumentation Deines aktuellen Hosters oder kontaktiere das Support-Team dort, um Hilfe bei der Konfiguration einer Weiterleitung zu deinem neuen RSS-Feed zu erhalten.`
        },
        episodes: {
          headline: 'Überprüfe Deinen Episoden:',
          content: 'Alle importierten Episoden findest Du unter dem Eintrag "Episoden" in der Seitenleiste hier in Wordpress. Falls Du einige davon während des Imports mit "Überprüfen" gekennzeichnet hast, haben Sie den Tag "Überprüfen" erhalten, nach dem Du filtern kannst. Klicke auf den Button, um zur Episoden-Liste zu gelangen. Dort kannst Du Deine Folgen überprüfen und veröffentlichen.',
        },
        button: 'Episoden Liste'
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
      'cover-reset': 'Entfernen',
      'podcast-upload-hint':
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
    },
    error: {
      podcast: {
        metadata: {
          title: 'Anfrage fehlgeschlagen',
          details: 'Fehler beim abfragen der Podcast Metadaten'
        },
        episodes: {
          title: 'Anfrage fehlgeschlagen',
          details: 'Fehler beim abfragen der Podcast Episoden'
        },
        feedUrl: {
          title: 'Anfrage fehlgeschlagen',
          details: 'Fehler beim Abfragen der Feed Url'
        }
      }
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

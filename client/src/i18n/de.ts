export default {
  onboarding: {
    navigation: {
      next: 'Weiter',
      home: 'Auswahl',
      prev: 'Zurück'
    },
    steps: {
      select: {
        title: 'Einrichtungsart',
        headline: 'Wähle einen Weg',
        description: `Lass uns beginnen! Starte von grundauf oder wenn du bereits einen Podcast hast, importieren ihn in Podlove.`,
        fresh: {
          title: 'Frisches Setup',
          description: 'Du willst einen neuen Podcast starten? Wir helfen dir, alle erforderlichen Daten zu erstellen, um loszulegen.',
        },
        import: {
          title: 'Import des Podcasts',
          description: 'Du hast bereits einen Podcast? Wir helfen dir, alle deine bestehenden Daten zu importieren.',
        }
      },
      podcast: {
        title: 'Podcast Informationen',
        headline: 'Erstelle einen neuen Podcast',
        description: `Lass uns Deinen neuen Podcast einrichten. Bitte gib die folgenden Details ein, um loszulegen.`,
        'podcast-name': 'Name des Podcast',
        'podcast-name-placeholder': 'Mein Podcastname',
        'podcast-description': 'Beschreibung des Podcasts',
        'podcast-description-hint': 'Schreibe ein paar Sätze über deinen Podcast',
        'cover-photo': 'Cover-Bild',
        'upload-file': 'Lade ein Bild hoch',
        'drag-and-drop': 'oder drag and drop',
        'upload-image-description': 'Die Empfehlung von Apple ist 3000x3000 pixel JPG or PNG'
      },
      preview: {
        title: 'Vorschau',
        follow: 'Folgen',
        name: '[Name]',
        author: '[Autor]',
        playButton: 'Staffel 2, Ep 1',
        description: '[Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.]'
      },
      'next-steps': {
        title: 'Nächste Schritte'
      }
    }
  },
  select: {
    description: 'Du kannst entweder einen neuen Podcast erstellen oder einen bestehenden Podcast von einem anderen Anbieter importieren. Wählen die Option, die deinen Bedürfnissen am besten entspricht.',
    podcast: {
      title: 'Erstellung neuer Podcast'
    },
    import: {
      title: 'Überführung eines Podcasts'
    },
  }
};

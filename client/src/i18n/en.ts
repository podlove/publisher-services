export default {
  onboarding: {
    navigation: {
      prev: 'Prev',
      home: 'Home',
      next: 'Next'
    },
    steps: {
      select: {
        title: 'Setup type',
        headline: 'Choose a Path',
        description: `Let's start your journey! Start from scratch or if you already have a Podcast, import it to Podlove.`,
        fresh: {
          title: 'Start from scratch',
          description: 'You want to start a new Podcast? We will help you to create all required data to get started.',
        },
        import: {
          title: 'Import Podcast',
          description: 'You already have a Podcast? We will help you to import all of your existing data.',
        }
      },
      podcast: {
        title: 'Podcast informations',
        headline: 'Create new podcast',
        description: `Let's setup up your new podcast. Please fill in the following details to get started.`,
        'podcast-name': 'Podcast name',
        'podcast-name-placeholder': 'my podcast name',
        'podcast-description': 'Podcast description',
        'podcast-description-hint': 'Write a few sentences about your podcast.',
        'podcast-author' : 'Podcast author',
        'podcast-language': 'Language',
        'podcast-language-hint': 'The language that is spoken in the podcast.',
        'podcast-category': 'Content category',
        'podcast-subcategory': 'Content subcategory',
        'podcast-content': 'Content',
        'podcast-content-desc': 'Is the content explicit?',
        'podcast-content-hint': 'The podcast parental advisory information.',
        'cover-photo': 'Cover photo',
        'upload-file': 'Upload a file',
        'drag-and-drop': 'or drag and drop',
        'cover-reset': 'Remove',
        'podcast-upload-hint': 'Apple recommends 1400x1400 pixel as minimum and 3000x3000 pixel as maximum, format JPG or PNG.',
      },
      preview: {
        title: 'Preview',
        follow: 'Follow',
        name: '[name]',
        author: '[author]',
        playButton: 'Season 2, Ep 1',
        description: '[Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.]'
      },
      'next-steps': {
        title: 'Next steps'
      }
    }
  },
  select: {
    description:
      'You can chose to either create a new podcast or import an existing podcast from another host. Choose the option that best suits your needs.',
    podcast: {
      title: 'Create new podcast'
    },
    import: {
      title: 'Import existing podcast'
    }
  }
};

export default {
  onboarding: {
    navigation: {
      prev: 'Back',
      next: {
        select: 'Next',
        podcast: 'Save & Continue',
        'next-steps': 'Next'
      }
    },
    steps: {
      select: {
        title: 'Setup type',
        headline: `Let's Begin!`,
        description: `We're here to guide you through setting up your podcast smoothly. Whether you're new to podcasting or already have a podcast, Podlove makes it easy to get your own podcast out there.`,
        fresh: {
          title: 'Start your podcast',
          description: 'Set up your podcast and bring it online so your stories can be found and enjoyed by listeners worldwide.',
        },
        import: {
          title: 'Move your podcast to Podlove',
          description: 'Easily import your existing podcast and continue sharing your content with your audience.',
        }
      },
      podcast: {
        title: 'Podcast informations',
        headline: 'Start your podcast',
        description: "Let's setup up your new podcast. Please fill in the following details to get Let's make your podcast stand out! Share some key details about your podcast to help listeners find and enjoy your content. Don't worry, you can always update these details later. The preview on the side shows how your information will appear to your audience.started.",
        'podcast-name': 'Podcast name',
        'podcast-name-placeholder': 'my podcast name',
        'podcast-name-hint': 'Provide a memorable name for your podcast that reflects its theme or content, helping listeners identify and engage with your show.',
        'podcast-description': 'Podcast description',
        'podcast-description-hint': 'Write a brief description that highlights what your podcast is about. This description will appear in podcast directories and helps potential listeners understand what to expect from your show.',
        'podcast-author' : 'Podcast author',
        'podcast-author-hint': 'Enter the name or alias of the creator(s) behind the podcast. This helps listeners identify who is responsible for the content they are enjoying.',
        'podcast-language': 'Language',
        'podcast-language-hint': 'Select the primary language used in your podcast episodes. This helps listeners find content in their preferred language and improves discoverability.',
        'podcast-category': 'Content category',
        'podcast-category-hint': 'Choose the category that best represents the main theme or topic of your podcast. This helps listeners discover your podcast within specific genres or interests.',
        'podcast-content': 'Content',
        'podcast-content-desc': 'Is the content explicit?',
        'podcast-content-hint': 'Indicate whether your podcast contains explicit language or mature content. This information is important for some directories and helps listeners make informed decisions about the content they are about to listen to.',
        'cover-photo': 'Cover photo',
        'upload-file': 'Upload a file',
        'drag-and-drop': 'or drag and drop',
        'cover-reset': 'Remove',
        'podcast-upload-hint': 'Upload an image that represents your podcast visually. This image will be displayed alongside your podcast in directories and platforms, helping it stand out and attract listeners.',
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

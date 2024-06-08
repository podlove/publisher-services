export default {
  onboarding: {
    navigation: {
      prev: 'Back',
      next: {
        select: 'Next',
        'start-new-podcast': 'Save & Continue',
        'import-feed': 'Next',
        'import-podcast': 'Next',
        'import-episodes': 'Import',
      }
    },
    steps: {
      select: {
        title: 'Setup type',
        headline: `Let's Begin!`,
        description: `We're here to guide you through setting up your podcast smoothly. Whether you're new to podcasting or already have a podcast, Podlove makes it easy to get your own podcast out there.`,
        fresh: {
          title: 'Start your podcast',
          description:
            'Set up your podcast and bring it online so your stories can be found and enjoyed by listeners worldwide.'
        },
        import: {
          title: 'Move your podcast to Podlove',
          description:
            'Easily import your existing podcast and continue sharing your content with your audience.'
        }
      },
      'start-new-podcast': {
        title: 'Podcast informations',
        headline: 'Start your podcast',
        description:
          "Let's setup up your new podcast. Please fill in the following details to get Let's make your podcast stand out! Share some key details about your podcast to help listeners find and enjoy your content. Don't worry, you can always update these details later. The preview on the side shows how your information will appear to your audience.started."
      },
      'start-new-next-steps': {
        title: 'Next steps',
        headline: 'Congratulations! 🎉 Your podcast setup is complete!',
        description: `We're thrilled to have you on board!`,
        feed: `Your podcast's RSS feed is ready to go: `,
        'feed-hint':
          'This feed is what makes your podcast accessible to listeners on various platforms. You can directly subscribe to your podcast using this link in any podcatcher.',
        more: 'Now that your podcast is up and running, here are some next steps to consider:',
        'learn-head': 'Learn more about Podlove',
        learn:
          'Dive deeper into the features and possibilities of Podlove by exploring our documentation and community forums to get ready to publish your first episode and share it with the world!',
        'promote-head': 'Promote your podcast',
        promote:
          'Spread the word about your new podcast by submitting it to popular podcast directories. Check out our guide on how to submit your podcast feed to directories for more information.',
        'community-head': 'Join the Podlove community',
        community:
          'Connect with fellow podcasters and enthusiasts on the Podlove Sendegate, our community forum. Get tips, advice, and support from experienced podcasters, and share your own insights and experiences.',
        sendegate:
          'Click below to visit the Sendegate and access our welcome post, where you can introduce yourself and get started on your podcasting journey. Happy podcasting!'
      },
      'import-feed': {
        title: 'Enter RSS-Feed',
        headline: 'Move your Podcast to Podlove',
        description: 
          'Let\'s get started on bringing your existing podcast over to Podlove. Simply enter the RSS feed URL of your current podcast below.',
        help: 'You can usually find the RSS feed URL in the settings or dashboard of your current hosting platform.',
        'feed-url': 'Podcast feed url',
        'feed-url-placeholder': 'Enter the feed url',
        'success-head': 'Success!',
        'success-info': 
          'Your podcast has been detected at the provided URL. You can now proceed to the next step, where you\'ll be able to review and adjust the podcast details.',
        'warning-head': 'Oops!',
        'warning-info':
          'We couldn\'t find a podcast at the provided URL. Don\'t worry, it happens sometimes! Here are a few things you can try:'
      },
      'import-podcast': {
        title: 'Check Podcast information',
        headline: 'Check your podcast data',
        description:
          'We\'ve detected the metadata for your podcast in your feed. Take a moment to review the details below. If everything looks good, you\'re one step closer to sharing your podcast with the world. If you need to make any adjustments, feel free to do so before proceeding to the next step.'
      },
      'import-episodes': {
        title: 'Import Episodes',
      },
      'import-next-steps': {
        title: 'Next Steps',
      }
    },

    podcast: {
      'podcast-name': 'Podcast name',
      'podcast-name-placeholder': 'my podcast name',
      'podcast-name-hint':
        'Provide a memorable name for your podcast that reflects its theme or content, helping listeners identify and engage with your show.',
      'podcast-description': 'Podcast description',
      'podcast-description-hint':
        'Write a brief description that highlights what your podcast is about. This description will appear in podcast directories and helps potential listeners understand what to expect from your show.',
      'podcast-author': 'Podcast author',
      'podcast-author-hint':
        'Enter the name or alias of the creator(s) behind the podcast. This helps listeners identify who is responsible for the content they are enjoying.',
      'podcast-language': 'Language',
      'podcast-language-hint':
        'Select the primary language used in your podcast episodes. This helps listeners find content in their preferred language and improves discoverability.',
      'podcast-category': 'Content category',
      'podcast-category-hint':
        'Choose the category that best represents the main theme or topic of your podcast. This helps listeners discover your podcast within specific genres or interests.',
      'podcast-content': 'Content',
      'podcast-content-desc': 'Is the content explicit?',
      'podcast-content-hint':
        'Indicate whether your podcast contains explicit language or mature content. This information is important for some directories and helps listeners make informed decisions about the content they are about to listen to.',
      'cover-photo': 'Cover photo',
      'upload-file': 'Upload a file',
      'drag-and-drop': 'or drag and drop',
      'cover-reset': 'Remove',
      'podcast-upload-hint':
        'Upload an image that represents your podcast visually. This image will be displayed alongside your podcast in directories and platforms, helping it stand out and attract listeners.'
    },
    preview: {
      title: 'Preview',
      follow: 'Follow',
      name: '[name]',
      author: '[author]',
      playButton: 'Season 2, Ep 1',
      description:
        '[Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.]'
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

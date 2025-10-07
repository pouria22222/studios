export const translations = {
  header: {
    title: 'Mr Robinhood',
    blog: 'Blog',
    marketplace: 'Marketplace',
    contact: 'Contact Me',
    admin: 'Login',
  },
  footer: {
    copyright: (year: number) => `Copyright © ${year} Mr Robinhood. All rights reserved.`,
  },
  home: {
    title: 'From my cozy corner',
    subtitle: 'A collection of thoughts, stories, and ideas.',
  },
  marketplace: {
    title: 'Marketplace',
    subtitle: 'High-quality digital downloads to elevate your creative projects.',
    categories: {
      all: 'All',
      templates: 'Templates',
      icons: 'Icons',
      presets: 'Presets',
    }
  },
  contact: {
    title: 'Contact Me',
    subtitle: 'Feel free to reach out to me.',
    cardTitle: 'Contact Information',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
  },
  settings: {
    title: 'Settings',
    cardTitle: 'Contact Information',
    cardDescription: 'Update your public contact information.',
    emailLabel: 'Email Address',
    instagramLabel: 'Instagram Username',
    saveButton: 'Save Changes',
    saveSuccessTitle: 'Settings Saved',
    saveSuccessDesc: 'Your contact information has been successfully updated.',
  },
  postList: {
    searchPlaceholder: 'Search articles...',
    noArticles: 'No articles found. Try a different search.',
  },
  postEditor: {
    titlePlaceholder: 'Title',
    aiTools: 'AI Tools',
    refineWithAI: 'Refine with AI',
    savePost: 'Save Post',
    contentEmpty: 'Content is empty',
    contentEmptyDesc: 'Please write some content before refining.',
    contentRefined: 'Content Refined',
    contentRefinedDesc: 'Your blog post has been successfully refined by AI.',
    error: 'Error',
    refineError: 'Failed to refine the blog post.',
    voiceTranscribed: 'Voice Transcribed',
    voiceTranscribedDesc: 'Your recorded voice has been converted to text.',
    transcriptionError: 'Failed to transcribe the voice.',
    wip: 'Feature in progress',
    wipDesc: (element: string) => `Adding ${element} is not yet implemented.`,
    embed: {
      title: "Embed from web",
      description: "Enter a link to YouTube, Twitter, etc.",
      placeholder: "https://...",
      button: "Embed"
    }
  },
  voiceRecorder: {
      title: 'Voice to Text',
      description: 'Record your thoughts and let AI draft your post.',
      micAccessDenied: 'Microphone access denied. Please check your browser settings.',
      micAccessError: 'Cannot access the microphone. Please check if it is being used by another application.',
      transcribing: 'Transcribing...',
      recording: 'Recording...',
      permissionNeeded: 'Permission Needed',
      tapToStart: 'Tap to start',
  },
  admin: {
    title: 'Admin Panel',
    dashboard: 'Dashboard',
    newPost: 'New Post',
    manageGallery: 'Manage Products',
    settings: 'Settings',
    analytics: 'Analytics',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Here you can see the performance of your blog posts.',
    postsTableTitle: 'Post Performance',
    postTitleHeader: 'Title',
    postViewsHeader: 'Views',
  },
  auth: {
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Name',
    login: {
      title: 'Login to Admin Panel',
      description: 'To access the dashboard, please log in.',
      button: 'Login',
    }
  }
};

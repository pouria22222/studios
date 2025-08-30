export const translations = {
  en: {
    header: {
      title: "Nazy's Nook",
      blog: 'Blog',
      gallery: 'Gallery',
      admin: 'Admin Panel',
    },
    footer: {
      copyright: (year: number) => `© ${year} Nazy's Nook. All rights reserved.`,
    },
    home: {
      title: 'From My Nook',
      subtitle: 'A collection of thoughts, stories, and ideas.',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'A collection of moments and inspirations.',
      categories: {
        all: 'All',
        nature: 'Nature',
        urban: 'Urban',
        art: 'Art',
      }
    },
    postList: {
      searchPlaceholder: 'Search articles...',
      noArticles: 'No articles found. Try a different search term.',
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
      voiceTranscribedDesc: 'Your voice recording has been converted to text.',
      transcriptionError: 'Failed to transcribe audio.',
      wip: 'Feature in Progress',
      wipDesc: (element: string) => `Adding ${element} is not yet implemented.`,
    },
    voiceRecorder: {
        title: 'Voice to Text',
        description: 'Record your thoughts and let AI draft your post.',
        micAccessDenied: 'Microphone access was denied. Please check permissions in your browser settings.',
        micAccessError: 'Could not access the microphone. Please ensure it is not being used by another application.',
        transcribing: 'Transcribing...',
        recording: 'Recording...',
        permissionNeeded: 'Permission needed',
        tapToStart: 'Tap to start',
    },
  },
  fa: {
    header: {
      title: 'کنج دنج نازی',
      blog: 'وبلاگ',
      gallery: 'گالری',
      admin: 'پنل مدیریت',
    },
    footer: {
      copyright: (year: number) => `© ${year} کنج دنج نازی. تمامی حقوق محفوظ است.`,
    },
    home: {
      title: 'از کنج دنج من',
      subtitle: 'مجموعه‌ای از افکار، داستان‌ها و ایده‌ها.',
    },
    gallery: {
      title: 'گالری',
      subtitle: 'مجموعه‌ای از لحظات و الهامات.',
      categories: {
        all: 'همه',
        nature: 'طبیعت',
        urban: 'شهری',
        art: 'هنر',
      }
    },
    postList: {
      searchPlaceholder: 'جستجوی مقالات...',
      noArticles: 'مقاله‌ای یافت نشد. عبارت دیگری را جستجو کنید.',
    },
    postEditor: {
      titlePlaceholder: 'عنوان',
      aiTools: 'ابزارهای هوش مصنوعی',
      refineWithAI: 'اصلاح با هوش مصنوعی',
      savePost: 'ذخیره پست',
      contentEmpty: 'محتوا خالی است',
      contentEmptyDesc: 'لطفا قبل از اصلاح مقداری محتوا بنویسید.',
      contentRefined: 'محتوا اصلاح شد',
      contentRefinedDesc: 'پست وبلاگ شما با موفقیت توسط هوش مصنوعی اصلاح شد.',
      error: 'خطا',
      refineError: 'اصلاح پست وبلاگ ناموفق بود.',
      voiceTranscribed: 'صدا رونویسی شد',
      voiceTranscribedDesc: 'صدای ضبط شده شما به متن تبدیل شد.',
      transcriptionError: 'رونویسی صدا ناموفق بود.',
      wip: 'قابلیت در دست ساخت',
      wipDesc: (element: string) => `افزودن ${element} هنوز پیاده‌سازی نشده است.`,
    },
    voiceRecorder: {
        title: 'صدا به متن',
        description: 'افکار خود را ضبط کنید و اجازه دهید هوش مصنوعی پست شما را پیش‌نویس کند.',
        micAccessDenied: 'دسترسی به میکروفون رد شد. لطفاً مجوزها را در تنظیمات مرورگر خود بررسی کنید.',
        micAccessError: 'امکان دسترسی به میکروفون وجود ندارد. لطفاً بررسی کنید که توسط برنامه دیگری استفاده نمی‌شود.',
        transcribing: 'در حال رونویسی...',
        recording: 'در حال ضبط...',
        permissionNeeded: 'مجوز لازم است',
        tapToStart: 'برای شروع ضربه بزنید',
    },
  },
};

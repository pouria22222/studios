
export const translations = {
  header: {
    title: 'کنج دنج نازی',
    blog: 'وبلاگ',
    gallery: 'گالری',
    contact: 'ارتباط با من',
    admin: 'ورود',
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
  contact: {
    title: 'ارتباط با من',
    subtitle: 'برای ارتباط با من راحت باشید.',
    cardTitle: 'راه‌های ارتباطی',
    emailLabel: 'ایمیل',
    instagramLabel: 'اینستاگرام',
  },
  settings: {
    title: 'تنظیمات',
    cardTitle: 'اطلاعات تماس',
    cardDescription: 'اطلاعات تماس عمومی خود را به‌روز کنید.',
    emailLabel: 'آدرس ایمیل',
    instagramLabel: 'نام کاربری اینستاگرام',
    saveButton: 'ذخیره تغییرات',
    saveSuccessTitle: 'تنظیمات ذخیره شد',
    saveSuccessDesc: 'اطلاعات تماس شما با موفقیت به‌روز شد.',
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
    embed: {
      title: "جاسازی از وب",
      description: "لینک یوتیوب، توییتر و ... را وارد کنید.",
      placeholder: "https://...",
      button: "جاسازی"
    }
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
  admin: {
    title: 'پنل مدیریت',
    dashboard: 'داشبورد',
    newPost: 'پست جدید',
    manageGallery: 'مدیریت گالری',
    settings: 'تنظیمات',
  },
  auth: {
    emailLabel: 'ایمیل',
    passwordLabel: 'رمز عبور',
    nameLabel: 'نام',
    login: {
      tab: 'ورود',
      title: 'ورود به حساب کاربری',
      description: 'برای دسترسی به پنل مدیریت وارد شوید.',
      button: 'ورود',
    },
    signup: {
      tab: 'ثبت نام',
      title: 'ایجاد حساب کاربری',
      description: 'برای شروع یک حساب کاربری جدید بسازید.',
      button: 'ثبت نام',
    }
  }
};

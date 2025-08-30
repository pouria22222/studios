import type { Post, GalleryImage, Settings } from '@/types';

const posts: Post[] = [
  {
    id: '1',
    title: {
      en: 'The Art of Minimalist Living',
      fa: 'هنر زندگی مینیمالیستی',
    },
    author: 'Nazy Hosseini',
    date: '2024-07-15',
    image: 'https://picsum.photos/seed/1/1200/800',
    imageHint: 'minimalist interior',
    content: {
      en: `<p>Minimalism is not about having less, it's about making room for more of what matters. It's a journey of discovering what is truly essential in our lives and letting go of the rest. This philosophy extends beyond physical possessions into our digital lives, our relationships, and our mental space.</p><p>Embracing a minimalist lifestyle can lead to reduced stress, increased clarity, and more intentional living. It starts with small steps, like decluttering a single drawer or unsubscribing from unwanted emails. Over time, these small actions build momentum, creating a life that is both simpler and more fulfilling.</p>`,
      fa: `<p>مینیمالیسم به معنای داشتن کمتر نیست، بلکه به معنای ایجاد فضا برای چیزهایی است که اهمیت بیشتری دارند. این سفری برای کشف چیزهای واقعا ضروری در زندگی و رها کردن بقیه است. این فلسفه فراتر از دارایی‌های فیزیکی به زندگی دیجیتال، روابط و فضای ذهنی ما نیز گسترش می‌یابد.</p><p>پذیرش سبک زندگی مینیمالیستی می‌تواند منجر به کاهش استرس، افزایش شفافیت و زندگی هدفمندتر شود. این کار با قدم‌های کوچک شروع می‌شود، مانند مرتب کردن یک کشو یا لغو اشتراک ایمیل‌های ناخواسته. با گذشت زمان، این اقدامات کوچک شتاب می‌گیرند و زندگی‌ای را می‌سازند که هم ساده‌تر و هم رضایت‌بخش‌تر است.</p>`,
    },
    tags: ['Minimalism', 'Lifestyle', 'Well-being'],
  },
  {
    id: '2',
    title: {
      en: 'A Journey Through the Colors of Autumn',
      fa: 'سفری در میان رنگ‌های پاییز',
    },
    author: 'Nazy Hosseini',
    date: '2024-06-28',
    image: 'https://picsum.photos/seed/2/1200/800',
    imageHint: 'autumn forest',
    content: {
      en: `<p>Autumn paints in colors that summer has never seen. The world transforms into a brilliant canvas of gold, orange, and red. There's a certain magic in the crisp air and the rustling leaves underfoot. It's a season of change, a time for reflection and cozy moments.</p><p>My favorite autumn activity is hiking through the forest, camera in hand, trying to capture the fleeting beauty of the season. Each leaf tells a story, and the landscape is a testament to the beauty of impermanence. It's a reminder to appreciate the present moment before it, too, fades away.</p>`,
      fa: `<p>پاییز با رنگ‌هایی نقاشی می‌کند که تابستان هرگز ندیده است. جهان به یک بوم درخشان از طلا، نارنجی و قرمز تبدیل می‌شود. در هوای خنک و برگ‌های خش‌خش‌کنان زیر پا، جادوی خاصی وجود دارد. این فصل تغییر، زمانی برای تأمل و لحظات دنج است.</p><p>فعالیت مورد علاقه من در پاییز، پیاده‌روی در جنگل با دوربین در دست است تا زیبایی گذرا فصل را ثبت کنم. هر برگ داستانی برای گفتن دارد و منظره گواهی بر زیبایی ناپایداری است. این یادآوری است که لحظه حال را قبل از اینکه آن نیز محو شود، قدر بدانیم.</p>`,
    },
    tags: ['Nature', 'Photography', 'Seasons'],
  },
  {
    id: '3',
    title: {
      en: 'The Power of a Morning Routine',
      fa: 'قدرت یک روتین صبحگاهی',
    },
    author: 'Nazy Hosseini',
    date: '2024-06-10',
    image: 'https://picsum.photos/seed/3/1200/800',
    imageHint: 'morning coffee',
    content: {
      en: `<p>How you start your day can set the tone for everything that follows. A well-crafted morning routine can be a powerful tool for productivity, mindfulness, and overall happiness. It's not about waking up at 5 AM; it's about creating a sequence of activities that energize and center you.</p><p>My routine includes a few minutes of meditation, journaling, and enjoying a quiet cup of tea before the world wakes up. This sacred time allows me to connect with myself and approach the day with intention and calm. It's a small investment that pays huge dividends in my well-being.</p>`,
      fa: `<p>نحوه شروع روزتان می‌تواند تعیین‌کننده حال و هوای تمام روز باشد. یک روتین صبحگاهی خوب طراحی‌شده می‌تواند ابزاری قدرتمند برای بهره‌وری، ذهن‌آگاهی و شادی کلی باشد. موضوع بیدار شدن در ساعت ۵ صبح نیست؛ بلکه ایجاد دنباله‌ای از فعالیت‌هاست که به شما انرژی می‌دهد و متمرکزتان می‌کند.</p><p>روتین من شامل چند دقیقه مدیتیشن، یادداشت‌برداری روزانه و لذت بردن از یک فنجان چای در سکوت قبل از بیدار شدن دنیاست. این زمان مقدس به من اجازه می‌دهد با خودم ارتباط برقرار کنم و با نیت و آرامش روز را آغاز کنم. این یک سرمایه‌گذاری کوچک است که سودهای بزرگی در سلامت روانی من دارد.</p>`,
    },
    tags: ['Productivity', 'Mindfulness', 'Self-care'],
  },
    {
    id: '4',
    title: {
      en: 'Exploring the World of Specialty Coffee',
      fa: 'کاوش در دنیای قهوه تخصصی',
    },
    author: 'Nazy Hosseini',
    date: '2024-05-22',
    image: 'https://picsum.photos/seed/4/1200/800',
    imageHint: 'latte art',
    content: {
      en: `<p>There is a world of difference between a standard cup of coffee and a meticulously brewed specialty coffee. From the origin of the beans to the brewing method, every step influences the final taste. Exploring this world is a delightful journey for the senses.</p><p>I've recently fallen in love with the pour-over method. It's a meditative process that allows you to control every variable, resulting in a clean, nuanced cup. It highlights the unique flavor profiles of single-origin beans, from the fruity notes of an Ethiopian Yirgacheffe to the chocolatey richness of a Guatemalan Antigua.</p>`,
      fa: `<p>تفاوت بزرگی بین یک فنجان قهوه معمولی و یک قهوه تخصصی که با دقت دم شده، وجود دارد. از منشأ دانه‌ها تا روش دم‌آوری، هر مرحله بر طعم نهایی تأثیر می‌گذارد. کاوش در این دنیا یک سفر لذت‌بخش برای حواس است.</p><p>من اخیراً عاشق روش پور-اور شده‌ام. این یک فرآیند مراقبه‌گونه است که به شما امکان کنترل هر متغیری را می‌دهد و نتیجه آن یک فنجان تمیز و با طعم‌های ظریف است. این روش پروفایل‌های طعمی منحصربه‌فرد دانه‌های تک‌خاستگاه را برجسته می‌کند، از نت‌های میوه‌ای یک یرگاچف اتیوپی تا غنای شکلاتی یک آنتیگوا گواتمالا.</p>`,
    },
    tags: ['Coffee', 'Hobbies', 'Food'],
  },
];

const galleryImages: GalleryImage[] = [
    { id: '1', src: 'https://picsum.photos/seed/g1/800/600', hint: 'mountain landscape', alt: 'A majestic mountain range at sunrise', caption: 'Sunrise over the peaks', category: 'Nature' },
    { id: '2', src: 'https://picsum.photos/seed/g2/800/600', hint: 'city skyline', alt: 'A bustling city skyline at night', caption: 'City of lights', category: 'Urban' },
    { id: '3', src: 'https://picsum.photos/seed/g3/800/600', hint: 'abstract art', alt: 'A colorful abstract painting', caption: 'Vibrant chaos', category: 'Art' },
    { id: '4', src: 'https://picsum.photos/seed/g4/800/600', hint: 'serene beach', alt: 'A quiet beach with gentle waves', caption: 'Peaceful shores', category: 'Nature' },
    { id: '5', src: 'https://picsum.photos/seed/g5/800/600', hint: 'modern architecture', alt: 'A building with a unique, modern design', caption: 'Architectural marvel', category: 'Urban' },
    { id: '6', src: 'https://picsum.photos/seed/g6/800/600', hint: 'wildlife photography', alt: 'A close-up shot of a fox in the wild', caption: 'Curious fox', category: 'Nature' },
];

let settings: Settings = {
  email: 'nazy.hosseini@example.com',
  instagram: 'nazy.h',
};

export const getPosts = (): Post[] => posts;
export const getPostById = (id: string): Post | undefined => posts.find(post => post.id === id);

export const getGalleryImages = (): GalleryImage[] => galleryImages;

export const getSettings = (): Settings => settings;

// Note: In a real app, this would update a database.
// Here, it only updates the in-memory object, so changes will be lost on server restart.
export const updateSettings = (newSettings: Partial<Settings>): Settings => {
  settings = { ...settings, ...newSettings };
  return settings;
}

import type { Post, GalleryImage, Settings } from '@/types';

const posts: Post[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Living',
    author: 'Nazy Hosseini',
    date: '2024-07-15',
    image: 'https://picsum.photos/seed/1/1200/800',
    imageHint: 'minimalist interior',
    content: `<p>Minimalism is not about having less, it's about making room for more of what matters. It's a journey of discovering what is truly essential in our lives and letting go of the rest. This philosophy extends beyond physical possessions into our digital lives, our relationships, and our mental space.</p><p>Embracing a minimalist lifestyle can lead to reduced stress, increased clarity, and more intentional living. It starts with small steps, like decluttering a single drawer or unsubscribing from unwanted emails. Over time, these small actions build momentum, creating a life that is both simpler and more fulfilling.</p>`,
    tags: ['Minimalism', 'Lifestyle', 'Well-being'],
  },
  {
    id: '2',
    title: 'A Journey Through the Colors of Autumn',
    author: 'Nazy Hosseini',
    date: '2024-06-28',
    image: 'https://picsum.photos/seed/2/1200/800',
    imageHint: 'autumn forest',
    content: `<p>Autumn paints in colors that summer has never seen. The world transforms into a brilliant canvas of gold, orange, and red. There's a certain magic in the crisp air and the rustling leaves underfoot. It's a season of change, a time for reflection and cozy moments.</p><p>My favorite autumn activity is hiking through the forest, camera in hand, trying to capture the fleeting beauty of the season. Each leaf tells a story, and the landscape is a testament to the beauty of impermanence. It's a reminder to appreciate the present moment before it, too, fades away.</p>`,
    tags: ['Nature', 'Photography', 'Seasons'],
  },
  {
    id: '3',
    title: 'The Power of a Morning Routine',
    author: 'Nazy Hosseini',
    date: '2024-06-10',
    image: 'https://picsum.photos/seed/3/1200/800',
    imageHint: 'morning coffee',
    content: `<p>How you start your day can set the tone for everything that follows. A well-crafted morning routine can be a powerful tool for productivity, mindfulness, and overall happiness. It's not about waking up at 5 AM; it's about creating a sequence of activities that energize and center you.</p><p>My routine includes a few minutes of meditation, journaling, and enjoying a quiet cup of tea before the world wakes up. This sacred time allows me to connect with myself and approach the day with intention and calm. It's a small investment that pays huge dividends in my well-being.</p>`,
    tags: ['Productivity', 'Mindfulness', 'Self-care'],
  },
    {
    id: '4',
    title: 'Exploring the World of Specialty Coffee',
    author: 'Nazy Hosseini',
    date: '2024-05-22',
    image: 'https://picsum.photos/seed/4/1200/800',
    imageHint: 'latte art',
    content: `<p>There is a world of difference between a standard cup of coffee and a meticulously brewed specialty coffee. From the origin of the beans to the brewing method, every step influences the final taste. Exploring this world is a delightful journey for the senses.</p><p>I've recently fallen in love with the pour-over method. It's a meditative process that allows you to control every variable, resulting in a clean, nuanced cup. It highlights the unique flavor profiles of single-origin beans, from the fruity notes of an Ethiopian Yirgacheffe to the chocolatey richness of a Guatemalan Antigua.</p>`,
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

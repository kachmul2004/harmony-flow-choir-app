export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  choir: string;
  attendees: number;
  isAttending?: boolean;
}

export interface Music {
  id: string;
  title: string;
  composer: string;
  arranger: string | null;
  choir: string;
  duration: string;
  coverArt: string;
  audioUrl: string;
  description: string;
  lyrics: string;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
  author: string;
}

export type News = NewsItem;

export interface Choir {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  interests: string[];
  joinDate: string;
  choirMemberships: string[];
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

export const currentUser: User = {
  id: "current-user",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://source.unsplash.com/random/100x100/?portrait",
  role: "Tenor",
  bio: "Passionate about choral music with 5 years of singing experience. Always eager to learn new techniques and meet fellow music enthusiasts.",
  interests: ["Classical", "Gospel", "Folk Music"],
  joinDate: "2023-01-15",
  choirMemberships: ["Harmony Singers", "Community Voices"]
};

export const users: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,1",
    role: "Tenor",
    bio: "Passionate about choral music with 5 years of singing experience. Always eager to learn new techniques and meet fellow music enthusiasts.",
    interests: ["Classical", "Gospel", "Folk Music"],
    joinDate: "2023-01-15",
    choirMemberships: ["Harmony Singers", "Community Voices"]
  },
  {
    id: "2",
    name: "Sofia Martinez",
    email: "sofia@example.com",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,2",
    role: "Soprano",
    bio: "Professional vocalist with 10+ years of experience in choral arrangements. Specialized in Renaissance and Baroque choral works.",
    interests: ["Baroque", "Renaissance", "Contemporary"],
    joinDate: "2020-05-22",
    choirMemberships: ["City Chamber Choir"]
  },
  {
    id: "3",
    name: "Marcus Chen",
    email: "marcus@example.com",
    avatar: "https://source.unsplash.com/random/100x100/?portrait,3",
    role: "Bass",
    bio: "Music teacher and choir director with a passion for community music education. Focused on making choral music accessible to all.",
    interests: ["Education", "Community Choirs", "World Music"],
    joinDate: "2021-09-10",
    choirMemberships: ["Community Voices", "Global Rhythms Ensemble"]
  }
];

export const payments: Payment[] = [
  {
    id: "1",
    description: "Annual Membership Fee",
    amount: 120.00,
    date: "2024-01-15",
    status: "paid"
  },
  {
    id: "2",
    description: "Workshop Registration",
    amount: 45.00,
    date: "2024-02-20",
    status: "paid"
  },
  {
    id: "3",
    description: "Music Score Purchase",
    amount: 15.00,
    date: "2024-03-05",
    status: "paid"
  },
  {
    id: "4",
    description: "Concert Costume Fee",
    amount: 75.00,
    date: "2024-04-10",
    status: "pending"
  }
];

export const events: Event[] = [
  {
    id: "1",
    title: "Summer Harmony Concert",
    description: "Join us for an evening of beautiful choral music celebrating the warmth and joy of summer. The program includes works from classical composers as well as contemporary pieces that capture the essence of the season.",
    date: "2025-06-15",
    time: "7:00 PM - 9:00 PM",
    location: "Grand Concert Hall, 123 Music Avenue",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=500&q=80",
    choir: "Harmony Singers",
    attendees: 156,
    isAttending: false
  },
  {
    id: "2",
    title: "Community Choir Workshop",
    description: "A day-long workshop for choir members of all experience levels. Learn new techniques, practice with experienced conductors, and meet fellow choir enthusiasts from around the region. Lunch and refreshments will be provided.",
    date: "2025-05-10",
    time: "9:00 AM - 4:00 PM",
    location: "Community Center, 456 Melody Lane",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=500&q=80",
    choir: "Community Voices",
    attendees: 89,
    isAttending: false
  },
  {
    id: "3",
    title: "Winter Caroling Event",
    description: "Spread holiday cheer by joining our winter caroling event. We'll be singing traditional carols at various locations throughout the town. Hot cocoa and snacks will be provided.",
    date: "2024-12-20",
    time: "6:00 PM - 8:00 PM",
    location: "Town Square, Main Street",
    image: "https://images.unsplash.com/photo-1482597869166-609e91429f40?w=800&h=500&q=80",
    choir: "Holiday Harmonies",
    attendees: 120,
    isAttending: true
  },
  {
    id: "4",
    title: "Spring Sing-Along",
    description: "Celebrate the arrival of spring with a joyful sing-along event. Bring your family and friends and sing along to popular songs about nature and renewal.",
    date: "2025-03-21",
    time: "2:00 PM - 4:00 PM",
    location: "Central Park, Green Meadow",
    image: "https://images.unsplash.com/photo-1523810192022-5a0fb9aa7ff8?w=800&h=500&q=80",
    choir: "Park Singers",
    attendees: 95,
    isAttending: false
  },
  {
    id: "5",
    title: "Gospel Music Festival",
    description: "Experience the power and passion of gospel music at our annual festival. Featuring performances by local and national gospel choirs, this event is sure to uplift your spirit.",
    date: "2025-07-04",
    time: "10:00 AM - 6:00 PM",
    location: "Gospel Arena, Faith Avenue",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&h=500&q=80",
    choir: "Gospel Voices United",
    attendees: 250,
    isAttending: false
  }
];

export const music: Music[] = [
  {
    id: "1",
    title: "Harmony in Motion",
    composer: "Elena Rodriguez",
    arranger: "Michael Chen",
    choir: "Harmony Singers",
    duration: "4:32",
    coverArt: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&q=80",
    audioUrl: "https://cdn.freesound.org/previews/686/686289_9508104-lq.mp3",
    description: "A beautiful contemporary piece that showcases the power of harmony and unity through music. This composition won the National Choral Award in 2023.",
    lyrics: "When voices join as one,\nHarmony begins to flow.\nMelodies intertwine,\nCreating beauty as we go.\n\nChoorus:\nHarmony in motion,\nLike waves upon the sea.\nHarmony in motion,\nSets our spirits free.",
    tags: ["Contemporary", "Award-winning", "Harmony"]
  },
  {
    id: "2",
    title: "Song of Peace",
    composer: "David Williams",
    arranger: null,
    choir: "Mountain View Choir",
    duration: "3:45",
    coverArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&q=80",
    audioUrl: "https://cdn.freesound.org/previews/702/702954_12422217-lq.mp3",
    description: "A heartfelt song calling for peace and unity across all nations. This piece combines elements of traditional gospel with contemporary choral arrangements.",
    lyrics: "Let peace reign in our hearts,\nLet love guide all we do.\nFrom east to west, from north to south,\nLet kindness see us through.\n\nChoorus:\nOne world, one voice, one song of peace,\nRinging clear and true.\nOne world, one hope, one dream we share,\nMe and you.",
    tags: ["Sacred", "Gospel", "Peace"]
  },
  {
    id: "3",
    title: "Echoes of the Past",
    composer: "Sophia Lee",
    arranger: "James Miller",
    choir: "City Chamber Choir",
    duration: "5:01",
    coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&q=80",
    audioUrl: "https://cdn.freesound.org/previews/700/700891_1325316-lq.mp3",
    description: "A reflective piece that draws inspiration from historical events and cultural traditions. The music evokes a sense of nostalgia and remembrance.",
    lyrics: "In echoes of the past,\nWe hear the stories told.\nOf triumphs and of tears,\nOf courage to behold.\n\nChoorus:\nEchoes of the past,\nGuiding us today.\nEchoes of the past,\nLighting up the way.",
    tags: ["Classical", "Historical", "Reflective"]
  },
  {
    id: "4",
    title: "Rhythm of Life",
    composer: "Carlos Ramirez",
    arranger: null,
    choir: "Global Rhythms Ensemble",
    duration: "4:12",
    coverArt: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&q=80",
    audioUrl: "https://cdn.freesound.org/previews/706/706801_11861866-lq.mp3",
    description: "An energetic and vibrant piece that celebrates the diversity and rhythm of life. The music incorporates elements of Latin, African, and Asian musical traditions.",
    lyrics: "The rhythm of life is calling,\nIn every beat, a song.\nFrom sunrise to sunset,\nWe dance where we belong.\n\nChoorus:\nRhythm of life, so strong and free,\nUniting all in harmony.\nRhythm of life, for all to see,\nA celebration wild and glee.",
    tags: ["World Music", "Energetic", "Cultural"]
  },
  {
    id: "5",
    title: "Morning Meditation",
    composer: "Sarah Johnson",
    arranger: "Thomas Chen",
    choir: "Serenity Ensemble",
    duration: "3:24",
    coverArt: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=400&h=400&q=80",
    audioUrl: "https://www.chosic.com/wp-content/uploads/2022/01/The-Epic-Hero-Asher-Fulero.mp3",
    description: "A calming and introspective piece designed for mindfulness and meditation. This composition features gentle harmonies that help center the mind and soul.",
    lyrics: "Breathe in the morning light,\nFeel the peace within.\nLet your spirit soar,\nLet your day begin.\n\nChoorus:\nMoments of silence,\nMoments of grace.\nFinding your center,\nIn this sacred space.",
    tags: ["Meditation", "Instrumental", "Peaceful"]
  }
];

export const news: NewsItem[] = [
  {
    id: "1",
    title: "Harmony Singers Win National Award",
    content: "The Harmony Singers have been awarded the National Choral Award for their outstanding performance and contribution to the world of choral music.",
    date: "2024-03-15",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&q=80",
    category: "Awards",
    author: "Music Editorial Team"
  },
  {
    id: "2",
    title: "Community Choir Workshop a Success",
    content: "The recent Community Choir Workshop was a resounding success, with participants praising the quality of instruction and the opportunity to connect with fellow choir enthusiasts.",
    date: "2024-02-28",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=200&q=80",
    category: "Workshops",
    author: "Events Coordinator"
  },
  {
    id: "3",
    title: "Global Rhythms Ensemble Announces World Tour",
    content: "The Global Rhythms Ensemble has announced an upcoming world tour, bringing their unique blend of musical traditions to audiences around the globe.",
    date: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&q=80",
    category: "Tours",
    author: "Tour Manager"
  }
];

export const choirs: Choir[] = [
  {
    id: "1",
    name: "Harmony Singers",
    description: "The Harmony Singers are a premier vocal ensemble known for their rich harmonies and diverse repertoire spanning from Renaissance madrigals to contemporary compositions. Founded in 2005, they have performed internationally and won multiple choral competitions.",
    members: 42,
    image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=200&h=200&q=80",
    location: "Central Auditorium"
  },
  {
    id: "2",
    name: "Mountain View Choir",
    description: "The Mountain View Choir specializes in folk and traditional music from around the world. Their performances often incorporate elements of storytelling and cultural education, making them popular with audiences of all ages.",
    members: 35,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&q=80",
    location: "Mountain Arts Center"
  },
  {
    id: "3",
    name: "City Chamber Choir",
    description: "The City Chamber Choir is a select group of vocalists dedicated to performing classical and contemporary chamber music. Their intimate concerts are known for their precision and artistry.",
    members: 28,
    image: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?w=200&h=200&q=80",
    location: "Downtown Music Hall"
  }
];

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  date: string;
}

export const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "New Game Release: The Last Adventure",
    description: "Experience the epic journey in our latest RPG release, featuring stunning graphics and immersive gameplay.",
    imageUrl: "/assets/news/game1.jpg",
    link: "/game/1",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Spring Sale: Up to 50% Off",
    description: "Don't miss our biggest sale of the season! Huge discounts on popular titles.",
    imageUrl: "/assets/news/sale.jpg",
    link: "/catalog?sale=true",
    date: "2024-03-10"
  },
  {
    id: 3,
    title: "New Gaming Platform Support",
    description: "We're excited to announce support for the latest gaming platforms, including PS5 and Xbox Series X.",
    imageUrl: "/assets/news/platforms.jpg",
    link: "/news/platform-support",
    date: "2024-03-05"
  },
  {
    id: 4,
    title: "Community Event: Gaming Tournament",
    description: "Join our upcoming gaming tournament with amazing prizes and exclusive rewards.",
    imageUrl: "/assets/news/tournament.jpg",
    link: "/events/tournament",
    date: "2024-03-01"
  }
]; 
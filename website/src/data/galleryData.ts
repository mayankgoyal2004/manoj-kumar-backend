export interface GalleryItem {
  id: string;
  title: string;
  category: 'Leadership' | 'Campus' | 'Research' | 'Conferences' | 'Speeches';
  type: 'video' | 'image';
  videoUrl?: string;
  youtubeId?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  caption: string;
  year?: string;
  channel?: string;
  duration?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-vid-01',
    title: 'Empowering Leaders, Transforming Institutions',
    category: 'Leadership',
    type: 'video',
    youtubeId: 'McyJD5FNOVM',
    videoUrl: 'https://youtu.be/McyJD5FNOVM',
    thumbnailUrl: 'https://img.youtube.com/vi/McyJD5FNOVM/hqdefault.jpg',
    imageUrl: 'https://img.youtube.com/vi/McyJD5FNOVM/maxresdefault.jpg',
    caption: 'Dr. Manoj Kumar, Vice-Chancellor, DAV University, conducted Workshop-I on Leadership Management from July 15–19, 2026. The workshop equipped Deans, Coordinators, and senior faculty members with practical insights into strategic leadership, innovation, change management, and building high-performance teams.',
    year: '2026',
    channel: ''
  }
];

import { Status } from '../enums/status.enum';
import { Post } from '../interfaces/post.interface';

export const mockPost: Post = {
  id: getRandomId(),
  title: 'Enchantment of the Arctic',
  subtitle: 'Experience wonders of the Arctic region',
  description: 'Discover Arctic beauty, witness the Northern Lights, ',
  date: '2023-07-14T00:00:00Z',
  image: 'https://picsum.photos/200/300',
  caption: 'Arctic adventure',
  price: 85,
  isFavorite: true,
  status: Status.onSale,
  author: {
    id: 1,
    name: 'John',
    lastname: 'Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  isNew: true,
};

export function getRandomId() {
  return Math.floor(Math.random() * 101) + 100;
}

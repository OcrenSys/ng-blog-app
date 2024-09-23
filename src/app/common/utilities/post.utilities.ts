import { faker } from '@faker-js/faker';
import { Status } from '../enums/status.enum';
import { Post } from '../interfaces/post.interface';

const IMAGES = [
  'https://images.pexels.com/photos/1629000/pexels-photo-1629000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/13925674/pexels-photo-13925674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/191070/pexels-photo-191070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/27745174/pexels-photo-27745174/free-photo-of-imdat-penceresi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/13046455/pexels-photo-13046455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/10225284/pexels-photo-10225284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2893285/pexels-photo-2893285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/19630188/pexels-photo-19630188/free-photo-of-tower-bridge-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/18843716/pexels-photo-18843716/free-photo-of-stone-bridge-leading-to-eilean-donan-castle.jpeg',
];

export const mockPost: Post = {
  id: getRandomNumber(),
  title: faker.commerce.productName(),
  subtitle: faker.commerce.productMaterial(),
  description: faker.commerce.productDescription(),
  date: faker.date.anytime(),
  image: IMAGES[getRandomNumber(0, 9)],
  caption: faker.commerce.productName(),
  price: parseInt(faker.commerce.price()),
  isFavorite: faker.datatype.boolean(),
  status: faker.helpers.enumValue(Status),
  author: {
    id: getRandomNumber(1, 50),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    avatar: `https://i.pravatar.cc/150?img=${getRandomNumber(1, 50)}`,
  },
};

export function getRandomNumber(
  start: number = 100,
  end: number = 200,
): number {
  if (end < start) {
    throw new Error('End value must be greater than start value');
  }

  return Math.floor(Math.random() * (end - start + 1)) + start;
}

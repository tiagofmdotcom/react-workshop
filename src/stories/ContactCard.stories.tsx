// ContactCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ContactCard from '../ContactCard';
import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router';

const meta = {
  title: 'Components/ContactCard',
  component: ContactCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ]

} satisfies Meta<typeof ContactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {

  args: {
    photo: 'https://example.com/photo.jpg',
    name: 'John Doe',
    email: 'doej@gmail.com',
    phone: '123-456-7890',
    id: '1',
    onRemove: fn()

  },
};

import Badge from '@repo/ui/components/Badge';
import type { Meta, StoryObj } from '@storybook/nextjs';

export default {
  component: Badge,
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    title: '',
    color: 'teal',
  },
};

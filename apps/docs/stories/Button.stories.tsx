import Button from '@repo/ui/components/Button';
import type { Meta, StoryObj } from '@storybook/nextjs';

export default {
  component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'sm',
    color: 'primary',
    variant: 'solid',
    onClick: () => {},
    className: '',
  },
};

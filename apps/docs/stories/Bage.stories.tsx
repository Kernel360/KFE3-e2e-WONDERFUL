import Badge from "@repo/ui/components/common/Badge"
import type { StoryObj, Meta } from "@storybook/nextjs"


export default {
  component: Badge,
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    title: "",
    color: "teal"
  },
}

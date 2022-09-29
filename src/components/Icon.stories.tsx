import { Meta, Story } from "@storybook/html";
import { COLOR } from "./constants";
import { Icon as IconComponent, ICON_NAMES, Props } from "./Icon";

export default {
  title: "Components/Icon",
  args: {
    children: "Icon",
  },
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
      defaultValue: "create",
    },
    color: {
      options: COLOR,
      control: { type: "select" },
      defaultValue: "primary",
    },
  },
} as Meta;

// @ts-expect-error FIXME: Should return Solid component
const Template: Story<Props> = (args) => <IconComponent {...args} />;

// @ts-expect-error FIXME: Should return Solid component
const TemplateList: Story<{ data: Props[] }> = (args) => {
  return args.data.map((v) => (
    <>
      <IconComponent {...v} />
      <br />
    </>
  ));
};

const baseData: Props = {
  name: "create",
  size: 24,
  color: "primary",
};

export const Icon = Template.bind({});
Icon.args;

export const Icons = TemplateList.bind({});
Icons.args = {
  data: ICON_NAMES.map((name) => ({
    ...baseData,
    name,
  })),
};

export const Colors = TemplateList.bind({});
Colors.args = {
  data: COLOR.map((color) => ({
    ...baseData,
    color,
  })),
};

// FIXME For now chromatic dose not support for lazy load components test.
// export const IconClick = Template.bind({});

// IconClick.args = baseData;
// IconClick.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   // FIXME: WorkAround wait for component until rendered.
//   await sleep(5000);
//   await userEvent.click(canvas.getByRole("button"));
// };
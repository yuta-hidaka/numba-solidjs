import type { Component, JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { clsx } from "clsx";
import { Color } from "@/types/Colors";
import { Button, ButtonColor } from "./Button";
import { Icon, IconName } from "./Icon";
import css from "./IconButton.module.css";

export type Props = {
  children?: JSX.Element;
  buttonColor?: Color;
  link?: boolean;
  iconName: IconName;
  iconColor: Color;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const getButtonConfig = (link?: boolean, color?: Color): ButtonColor => {
  const res = {
    link: link,
    color: color,
  } as ButtonColor;

  if (link) {
    res.color = undefined;
  }

  return res;
};

export const DEFAULT_ICON_SIZE = 24;

export const IconButton: Component<Props> = (props) => {
  const [local, buttonAttributes, iconAttributes] = splitProps(
    props,
    ["children", "link", "buttonColor"],
    ["onClick", "disabled"]
  );

  return (
    <Button
      {...{
        ...buttonAttributes,
        ...getButtonConfig(local.link, local.buttonColor),
      }}
    >
      <div class={clsx({ [css.style]: true })}>
        <div>
          <Icon
            size={20}
            name={iconAttributes.iconName}
            color={
              buttonAttributes.disabled ? "disabled" : iconAttributes.iconColor
            }
          />
        </div>
        <Show when={!!local.children}>
          <div class={clsx({ [css.text]: true })}>{local.children}</div>
        </Show>
      </div>
    </Button>
  );
};

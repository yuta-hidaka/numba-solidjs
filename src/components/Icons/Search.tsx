import type { Color } from "@/types/Colors";
import { clsx } from "clsx";
import type { Component, JSX } from "solid-js";
import css from "./Icon.module.css";

export type Props = {
  size?: number;
  color?: Color;
  onClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Search: Component<Props> = (props) => {
  console.log(!props.color);
  const DEFAULT_SIZE = 24;
  return (
    <a onClick={props.onClick} role="button">
      <svg
        style={{
          width: props.size || DEFAULT_SIZE,
          height: props.size || DEFAULT_SIZE,
        }}
        class={clsx({
          [css.style]: true,
          [css.disabled]: props.color === "disabled",
          [css.primary]: props.color === "primary",
          [css.danger]: props.color === "danger",
          [css.secondary]: props.color === "secondary",
          [css.primaryOutline]: props.color === "primaryOutline",
          [css.dangerOutline]: props.color === "dangerOutline",
          [css.secondaryOutline]: props.color === "secondaryOutline",
        })}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
        />
      </svg>
    </a>
  );
};

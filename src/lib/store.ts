import { createSignal, createRoot, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import type { Group } from "@/types/Group";
import type { Badge } from "@/types/Badge";

// utils
const omit = (obj: Record<string, any>, key: string) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

type Store = {
  groups: Group[];
  badges: Record<string, Badge[]>;
};

function createAppStore() {
  const [enabled, setEnabled] = createSignal(false);

  const [state, setState] = createStore<Store>({
    groups: [],
    badges: {},
  });

  // groups
  const createGroup = ({ id, name }: { id: string; name: string }) => {
    setState("groups", (g) => [...g, { id, name }]);
  };

  const removeGroup = (id: Group["id"]) => {
    setState("groups", (gx) => gx.filter((g) => g.id !== id));
    setState((state) => ({ badges: omit(state.badges, id) }));
  };

  // badges
  const getBadgeByGroupId = (id?: Group["id"]) => {
    return id ? state.badges[id] : [];
  };

  const createBadgeWithSelectedState = ({
    id,
    name,
  }: Pick<Badge, "id" | "name">) => {
    const [selected, setSelected] = createSignal(false);
    const b: Badge = { id, name, color: "BLUE", selected, setSelected };
    return b;
  };

  const createBadge = ({
    parentId,
    id,
    name,
  }: {
    parentId: Group["id"];
    id: Badge["id"];
    name: Badge["name"];
  }) => {
    const b: Badge = createBadgeWithSelectedState({ id, name });
    setState("badges", [parentId], (bx) => (bx ? [...bx, b] : [b]));
  };

  const removeBadge = (parentId: Group["id"], ids: Badge["id"][]) => {
    ids.forEach((id) =>
      setState("badges", [parentId], (bx) => bx.filter((b) => b.id !== id))
    );

    if (getBadgeByGroupId(parentId).length) return;
    removeGroup(parentId);
  };

  // TODO: check unnecessary properties e.g. Symbol(solid-proxy)
  const syncAll = (payload: [Group[], Record<string, Badge[]>]) => {
    const [groups, badgesRaw] = payload;

    const badges = Object.keys(badgesRaw).reduce((acc, key) => {
      return Object.assign(acc, {
        [key]: badgesRaw[key].map((x) => createBadgeWithSelectedState(x)),
      });
    }, {});
    setState((s) => ({ groups, badges }));
  };

  const groups = createMemo(() => state.groups);

  return {
    state, // TODO: use only debug
    syncAll,
    enabled,
    setEnabled,
    groups,
    createGroup,
    removeGroup,
    getBadgeByGroupId,
    createBadge,
    removeBadge,
  };
}
export const store = createRoot(createAppStore);

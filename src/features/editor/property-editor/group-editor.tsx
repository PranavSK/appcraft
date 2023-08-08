import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Plus, X } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { clone, differenceWith, filter, keys, map, pipe, setPath } from 'remeda';

import { appletLayoutAtom } from '#/features/applet/applet.store';
import { nodeStateAtomFamily } from '#/features/nodes/group-node';
import { Button } from '#/features/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/features/ui/select';

import { selectedNodeAtom } from '../editor.store';

const selectedNodeGroupsAtom = atom((get) => {
  const { id } = get(selectedNodeAtom);
  if (id == null) return [];
  const groups = get(appletLayoutAtom)[id].groups;
  return map(groups, (id) => ({ id, ...get(nodeStateAtomFamily(id)) }));
});

const allGroupsAtom = atom((get) => {
  const layout = get(appletLayoutAtom);
  const groups = pipe(
    layout,
    keys,
    filter((id) => layout[id].type === 'group'),
    map((id) => ({ id, ...get(nodeStateAtomFamily(id)) })),
  );
  return groups;
});

const availableGroupsAtom = atom((get) => {
  const selectedNodeGroups = get(selectedNodeGroupsAtom);
  const allGroups = get(allGroupsAtom);
  return differenceWith(allGroups, selectedNodeGroups, (a, b) => a.id === b.id);
});

function useAddDeleteGroup() {
  const { id } = useAtomValue(selectedNodeAtom);
  const setAppletLayout = useSetAtom(appletLayoutAtom);
  const addGroup = useCallback(
    (group: string) => {
      setAppletLayout((layout) => {
        if (id == null) return layout;
        const groups = clone(layout[id].groups);
        return setPath([id, 'groups'], [...groups, group])(layout);
      });
    },
    [id, setAppletLayout],
  );

  const deleteGroup = useCallback(
    (group: string) => {
      setAppletLayout((layout) => {
        if (id == null) return layout;
        const groups = clone(layout[id].groups);
        return setPath(
          [id, 'groups'],
          filter(groups, (g) => g !== group),
        )(layout);
      });
    },
    [id, setAppletLayout],
  );

  return { addGroup, deleteGroup };
}

export const GroupEditor: FC = () => {
  const selectedNodeGroups = useAtomValue(selectedNodeGroupsAtom);
  const availableGroups = useAtomValue(availableGroupsAtom);
  const { addGroup, deleteGroup } = useAddDeleteGroup();
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();
  return (
    <>
      <div className="flex flex-wrap items-center space-x-2 text-xs">
        {selectedNodeGroups.map(({ id, name }) => (
          <div
            key={id}
            className="flex space-x-2 rounded-full bg-primary p-2 text-primary-foreground"
          >
            {name}
            <X className="h-4 w-4" onClick={() => deleteGroup(id)} />
          </div>
        ))}
      </div>
      <form
        className="flex space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedGroup) return;
          addGroup(selectedGroup);
          setSelectedGroup('');
        }}
      >
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Add Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {availableGroups.length > 0 ? 'Available groups' : 'No valid groups'}{' '}
              </SelectLabel>
              {availableGroups.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

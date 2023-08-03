import { type ExtractAtomValue, useAtomValue, useSetAtom } from 'jotai';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FC, useMemo } from 'react';
import TreeView, { type INode, type INodeRendererProps } from 'react-accessible-treeview';

import { appletLayoutAtom } from '#/features/applet';
import { cn } from '#/lib/utils';

import { selectedNodeAtom } from '../editor.store';

function constructNodeTreeFromLayout(layout: ExtractAtomValue<typeof appletLayoutAtom>) {
  const nodes: INode[] = [
    {
      name: '',
      id: 'root',
      children: ['header', 'grid', 'footer'],
      parent: null,
    },
  ];

  function recurseChildren(id: string) {
    const children = layout[id].children;
    if (children) {
      children.forEach((child) => {
        const name = layout[child].type;
        nodes.push({
          name,
          id: child,
          children: recurseChildren(child),
          parent: id,
        });
      });

      return children;
    }

    return [];
  }

  nodes.push({
    name: 'header',
    id: 'header',
    children: recurseChildren('header'),
    parent: 'root',
    metadata: {
      type: 'header',
    },
  });
  nodes.push({
    name: 'grid',
    id: 'grid',
    children: recurseChildren('grid'),
    parent: 'root',
    metadata: {
      type: 'grid',
    },
  });

  nodes.push({
    name: 'footer',
    id: 'footer',
    children: recurseChildren('footer'),
    parent: 'root',
    metadata: {
      type: 'footer',
    },
  });

  return nodes;
}

const NodeRenderer: FC<INodeRendererProps> = ({
  element,
  getNodeProps,
  level,
  isBranch,
  isExpanded,
  isSelected,
}) => {
  const { className, ...nodeProps } = getNodeProps();
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-[25px_1fr] items-center rounded-sm p-1',
        isSelected && 'bg-primary text-primary-foreground',
      )}
      {...nodeProps}
      style={{ paddingLeft: `${1.25 * (level - 1)}rem` }}
    >
      {isBranch &&
        (isExpanded ? (
          <ChevronDown className="inline-block" />
        ) : (
          <ChevronRight className="inline-block" />
        ))}
      <span className="col-start-2 text-sm">{element.name}</span>
    </div>
  );
};

export const NodeTree: FC = () => {
  const layout = useAtomValue(appletLayoutAtom);
  const treeData = useMemo(() => constructNodeTreeFromLayout(layout), [layout]);
  const setSelectedNode = useSetAtom(selectedNodeAtom);

  return (
    <TreeView
      data={treeData}
      nodeRenderer={NodeRenderer}
      onNodeSelect={({ element, isSelected }) => {
        if (isSelected) {
          setSelectedNode({
            id: `${element.id}`,
            type: element.name,
            parent: element.parent != null ? `${element.parent}` : null,
          });
        }
      }}
    />
  );
};

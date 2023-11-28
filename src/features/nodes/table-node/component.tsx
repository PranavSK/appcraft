import { atom, useAtomValue } from 'jotai';
import { type FC, useMemo } from 'react';

import { useFilteredChildren } from '#/features/applet/applet.store';
import { ChildrenNode } from '#/features/nodes/common/components';
import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily as cellStateAtomFamily } from '../table-cell-node/store';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const {
    columns,
    rows,
    showHeader,
    headerColor,
    highlightType,
    highlightColor,
    highlightIndex,
    ...state
  } = useAtomValue(nodeStateAtomFamily(id));

  const childrenIds = useFilteredChildren(id);
  const childrenStatesAtom = useMemo(
    () => atom((get) => childrenIds.map((childId) => get(cellStateAtomFamily(childId)))),
    [childrenIds],
  );
  const childrenStates = useAtomValue(childrenStatesAtom);
  const mappedRows = useMemo(() => {
    const mapped = [];
    let reservedRowSpan = 0;
    let totalColSpan = 0;
    let currentRow = [];
    for (let i = 0; i < rows * columns; i++) {
      const { rowspan, colspan } = childrenStates[i] ?? { rowspan: 1, colspan: 1 };
      if (rowspan - 1 > reservedRowSpan) {
        reservedRowSpan = rowspan - 1;
      }
      if (totalColSpan >= columns - reservedRowSpan) {
        totalColSpan = 0;
        mapped.push(currentRow);
        currentRow = [];
        reservedRowSpan = Math.max(0, reservedRowSpan - 1);
      }

      totalColSpan += colspan;
      currentRow.push(childrenIds[i] ? <ChildrenNode id={childrenIds[i]} /> : null);
    }
    mapped.push(currentRow);

    return {
      header: showHeader ? mapped.shift() : undefined,
      body: mapped,
    };
  }, [childrenIds, childrenStates, columns, rows, showHeader]);

  return (
    <Widget asChild className={className} {...state}>
      <table className={cn('border-separate border-spacing-0 rounded-md')}>
        {highlightType === 'column' && (
          <colgroup>
            {Array.from({ length: columns }, (_, column) => (
              <col
                key={column}
                style={highlightIndex === column ? { backgroundColor: highlightColor } : undefined}
              />
            ))}
          </colgroup>
        )}
        {showHeader && (
          <thead>
            <tr>
              {mappedRows.header?.map((cell, i) => (
                <th
                  key={i}
                  className={cn(
                    'min-h-[10rem] border-l border-t p-2 align-middle',
                    i === 0 && 'rounded-tl-md',
                    i === columns - 1 && 'rounded-tr-md border-r',
                  )}
                  style={{
                    backgroundColor:
                      (highlightType === 'row' && highlightIndex === 0) ||
                      (highlightType === 'cell' && highlightIndex === i)
                        ? highlightColor
                        : headerColor,
                  }}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {mappedRows.body.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'border-l border-t p-2 align-middle',
                    i === mappedRows.body.length - 1 && 'border-b',
                    j === columns - 1 && 'border-r',
                    !showHeader && i === 0 && j === 0 && 'rounded-tl-md',
                    !showHeader && i === 0 && j === columns - 1 && 'rounded-tr-md',
                    i === mappedRows.body.length - 1 && j === 0 && 'rounded-bl-md',
                    i === mappedRows.body.length - 1 && j === columns - 1 && 'rounded-br-md',
                  )}
                  style={
                    (highlightType === 'cell' &&
                      highlightIndex === (showHeader ? (i + 1) * columns : i * columns + j)) ||
                    (highlightType === 'row' && highlightIndex === (showHeader ? i + 1 : i))
                      ? { backgroundColor: highlightColor }
                      : undefined
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  );
};

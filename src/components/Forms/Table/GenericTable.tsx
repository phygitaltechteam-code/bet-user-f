import React from 'react';
import {
  ChevronsUpDown,
  DollarSign,
  ArrowRightLeft,
  Clock,
  Settings,
  User,
  PenSquare,
  Eye,
} from 'lucide-react';

export interface Column<T = any> {
  label: string;
  key: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export interface Action<T = any> {
  icon: React.ReactNode;
  title: string;
  onClick: (row: T, index: number) => void;
  show?: (row: T, index: number) => boolean;
}

interface GenericTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  initialSortField?: string;
  initialSortDirection?: 'asc' | 'desc';
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  keyExtractor?: (row: T, index: number) => string | number;
}

function GenericTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onSort,
  initialSortField = '',
  initialSortDirection = 'asc',
  emptyMessage = 'No data to display',
  onRowClick,
  keyExtractor,
}: GenericTableProps<T>) {
  const [sortField, setSortField] = React.useState(initialSortField);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(
    initialSortDirection,
  );

  const handleSort = (field: string) => {
    if (!onSort) return;

    let newDirection: 'asc' | 'desc' = 'asc';
    if (sortField === field) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return (
        <i className="fa-solid fa-sort sort-icon text-gray-400 ml-1 text-xs"></i>
      );
    }
    return sortDirection === 'asc' ? (
      <i className="fa-solid fa-sort-up sort-icon text-gray-600 ml-1 text-xs"></i>
    ) : (
      <i className="fa-solid fa-sort-down sort-icon text-gray-600 ml-1 text-xs"></i>
    );
  };

  const getKey = (row: T, index: number) => {
    if (keyExtractor) {
      return keyExtractor(row, index);
    }
    return row.id || row.key || index;
  };

  const renderCellValue = (column: Column<T>, row: T, index: number) => {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row, index);
    }

    if (value === undefined || value === null) {
      return <span className="text-gray-400">-</span>;
    }

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value;
  };

  return (
    <div className="table-container overflow-x-auto">
      <table className="w-full whitespace-nowrap text-left text-sm">
        <thead className="border-b border-brand-border bg-brand-gray font-semibold text-brand-text">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`hover:bg-gray-200 cursor-pointer px-4 py-3 transition-colors ${column.className || ''}`}
                style={{width: column.width}}
                onClick={() =>
                  column.sortable !== false && onSort && handleSort(column.key)
                }
              >
                <span className="flex items-center gap-1">
                  {column.label}
                  {column.sortable !== false &&
                    onSort &&
                    getSortIcon(column.key)}
                </span>
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-3" scope="col">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="text-gray-500 bg-white px-4 py-12 text-center font-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={getKey(row, index)}
                className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row, index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 ${column.className || ''}`}
                  >
                    {renderCellValue(column, row, index)}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {actions.map(
                        (action, actionIndex) =>
                          (action.show ? action.show(row, index) : true) && (
                            <button
                              key={actionIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row, index);
                              }}
                              className="action-btn text-gray-600 hover:bg-gray-100 inline-flex h-7 w-7 items-center justify-center rounded-md border border-stroke bg-white transition-all"
                              title={action.title}
                            >
                              {action.icon}
                            </button>
                          ),
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Pre-defined action icons for common operations
export const defaultActions = {
  banking: (onClick: (row: any, index: number) => void): Action => ({
    icon: <i className="fa-solid fa-dollar-sign text-gray-600 text-sm"></i>,
    title: 'Banking',
    onClick,
  }),
  transfer: (onClick: (row: any, index: number) => void): Action => ({
    icon: (
      <i className="fa-solid fa-arrow-right-arrow-left text-gray-600 text-sm"></i>
    ),
    title: 'Transfer',
    onClick,
  }),
  history: (onClick: (row: any, index: number) => void): Action => ({
    icon: (
      <i className="fa-solid fa-clock-rotate-left text-gray-600 text-sm"></i>
    ),
    title: 'History',
    onClick,
  }),
  settings: (onClick: (row: any, index: number) => void): Action => ({
    icon: <i className="fa-solid fa-gear text-gray-600 text-sm"></i>,
    title: 'Settings',
    onClick,
  }),
  profile: (onClick: (row: any, index: number) => void): Action => ({
    icon: <i className="fa-solid fa-user text-gray-600 text-sm"></i>,
    title: 'Profile',
    onClick,
  }),
  edit: (onClick: (row: any, index: number) => void): Action => ({
    icon: <i className="fa-regular fa-pen-to-square text-gray-600 text-sm"></i>,
    title: 'Edit',
    onClick,
  }),
  view: (onClick: (row: any, index: number) => void): Action => ({
    icon: <i className="fa-regular fa-eye text-gray-600 text-sm"></i>,
    title: 'View',
    onClick,
  }),
};

export default GenericTable;

import { cloneElement, Children, ReactNode } from 'react';

interface Column {
  value: string;
  name?: string;
  type?: string;
}

interface Row {
  id?: string | number;
  [key: string]: any;
}

interface RenderTbodyProps {
  rows: Row[];
  columns: Column[];
  rightComponents: ReactNode;
}

const RenderTbody = ({ rows, columns, rightComponents }: RenderTbodyProps) => {
  const childrenWithProps = (register: Row) =>
    Children.toArray(rightComponents).map((child: any, index) => {
      if (child?.props && Array.isArray(child?.props.children)) {
        return child?.props.children.map((chi, chiIndex) =>
          cloneElement(chi, {
            value: JSON.stringify(register),
            key: `${index}-${chiIndex}`,
          })
        );
      }
      return child;
    });

  const renderColumnContent = (column: Column, register: Row, registerIndex: number, cKey: string | number) => {
    if (column.value === 'isChildren') {
      return <td key={cKey}><div className='flex items-center justify-center'>{childrenWithProps(register)}</div></td>;
    }

    if (column?.type && column?.type === 'img') {
      return <td key={cKey}>
        {
          register[column.value] ?
            <img
              src={register[column.value]}
              alt={register[column.value]}
              className='dt-image'
            />
            : ''
        }
      </td>;
    }

    if (column.name === 'N°') {
      return <td key={cKey}>{registerIndex + 1}</td>;
    }

    return <td key={cKey}>{register[column.value]}</td>;
  };

  return rows?.map((register, registerIndex) => (
    <tr key={register.id || registerIndex}>
      {columns.map((column, cKey) => renderColumnContent(column, register, registerIndex, cKey))}
    </tr>
  ));
};

export default RenderTbody;

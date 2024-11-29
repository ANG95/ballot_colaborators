import { cloneElement, Children } from 'react'

const RenderTbody = (rows: any[], columns: any[], rightComponents: any) => {
    const childrenWithProps = (register: any) => Children.map(rightComponents, (child) => {
        return cloneElement(child, { value: JSON.stringify(register) })
    });
    return (
       rows&& rows.map((register, registerIndex) => (
            <tr key={register.id || registerIndex}>
                {columns.map((column, cKey) => (
                    <td key={column.value || cKey}>
                        {column.value === "isChildren"
                            ? childrenWithProps(register)
                            : column.name === "N°"
                                ? registerIndex + 1
                                : register[column.value]}
                    </td>
                ))}
            </tr>
        ))
    );
}

export default RenderTbody;

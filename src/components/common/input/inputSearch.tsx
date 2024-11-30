import React, { ChangeEvent } from 'react';
import { MdSearch, } from "react-icons/md";

interface InputSearchProps {
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,
    userSelected?: (e: any) => void,
    results?: any[]
    placeholder?: string
}

const InputSearch = ({ onChangeInput, onBlur, userSelected, results, placeholder }: InputSearchProps) => {

    return (
        <>
            <div className="pseudo-search p-1">
                <input
                    type="text"
                    placeholder={placeholder}
                    autoFocus
                    required
                    onBlur={onBlur}
                    onChange={onChangeInput}
                    className='px-3'
                />
                <button type="submit"><MdSearch size={20} /></button>
            </div>

            {results && results.length > 0 && (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Resultados de la búsqueda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((r) => (
                                <tr key={r.label} className='cursor-pointer hover:bg-gray-200' onClick={() => userSelected(r)}>
                                    <td>
                                        {r.label}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </>
    )
}

export default InputSearch
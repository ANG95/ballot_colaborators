import React from 'react';
import { MdSearch, } from "react-icons/md";

interface InputSearchProps {
    onChangeInput: () => void
    onBlur?: () => void
}

const InputSearch = ({ onChangeInput, onBlur }: InputSearchProps) => (
    <div className="pseudo-search p-1">
        <input
            type="text"
            placeholder="Buscar..."
            autoFocus
            required
            onBlur={onBlur}
            onChange={onChangeInput}
            className='px-3'
        />
        <button type="submit"><MdSearch size={20} /></button>
    </div>
)

export default InputSearch
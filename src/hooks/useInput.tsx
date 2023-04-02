import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type returnTypes = [string, (e: ChangeEvent) => void, Dispatch<SetStateAction<string>>];

export default (initialValue = '') : returnTypes => {
    const [value, setValue] = useState(initialValue);

    const handler = useCallback((e : any) => {
        setValue(e.target.value);
    }, []);

    return [value, handler, setValue];

};

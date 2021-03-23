import React from 'react';
import { toast } from 'react-toastify';

const toastTypes = ['warning', 'error', 'success', 'dark', 'info'];

export const createToast = (
    payload: any,
    Component: any,
    route: string,
    type: string
) => {
    if(!toastTypes.includes(type)) {
        type = 'info';
    }

    let props = {
        route,
        ...payload.user,
        ...payload
    }

    toast[type](<Component {...props} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: false
    });
}
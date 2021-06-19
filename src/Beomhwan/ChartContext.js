// Custom chart list context
import React, {createContext, useContext} from 'react';
import {withCookies} from 'react-cookie';

const UserMachineIdContext = createContext();

const ChartContext = ({children, machineId}) => {

    return (
        <UserMachineIdContext.Provider value={machineId}>
                {children}
        </UserMachineIdContext.Provider>
    );
};

export default withCookies(ChartContext);

export function useMachineInfo() {
    const machineinfo = useContext(UserMachineIdContext);
    if(!machineinfo)
        return '기기 정보 없음!';
    return machineinfo;
};
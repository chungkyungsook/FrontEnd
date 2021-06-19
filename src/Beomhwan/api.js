// CRUD Axios function 集め
import axios from 'axios';
import {URL} from './Util';

// Create

// ==================== Read =====================
// 수확한 버섯 정보 get
export async function getKinoko(prgId) {
    let kinokoInfo = await axios.get(`${URL}/api/mushroom/complete`, {
        params: {
            prgId: prgId
        }
    }).then(response => {
        console.log(response);
        return response.data;
    }).catch(err => {
        console.log(err);
        return [];
    });

    return kinokoInfo;
};

// 프로그램 리스트 데이터 get
export async function getCustomProgramList () {
    let data = await axios.get(`${URL}/api/farm/custom/list`);

    console.log(data);

    return data;
}

// 현재 프로그램 id, 이름 get
export async function getRunningChartName (machineId) {
    let data = await axios.get(`${URL}/api/myfarm/data`, {
        params: {
            id: machineId // machineId
        }
    }).then(res => {
        if(res.data.length === 0) {
            return [{id:0, prg_name: ''}];
        }
        return res.data;
    }).catch(err => {
        console.log(err);
        return [{prgId:0, prg_name: ''}];
    })
    return data;
}

// 현재 프로그램 차트 정보 get
export async function getRunningChartInfo (prgId, prgType) {
    let data = await axios.get(`${URL}/api/farm/data`, {
        params: {
            id: prgId,
            type: prgType
        }
    }).then(res => {
        return res.data;
    });
    
    return data;
}

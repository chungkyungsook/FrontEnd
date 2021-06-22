// CRUD Axios function 集め
import axios from 'axios';
import {URL} from './Util';

const api = axios.create({
    baseURL: `${URL}/api`
});

// 수확 버섯 갯수 get
export async function getKinoko(prgId) {
    let kinokoInfo = await api.get(`/mushroom/complete`, {
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
    let data = await api.get(`/farm/custom/list`);

    return data;
}

// 현재 프로그램 id, 이름 get
export async function getRunningChartName (machineId) {
    let data = await api.get(`/myfarm/data`, {
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
    let data = await api.get(`/farm/data`, {
        params: {
            id: prgId,
            type: prgType
        }
    }).then(res => {
        return res.data;
    });
    
    return data;
}

// 로그아웃 시간 얻기 get
export async function getLogoutDate (id, token) {
    await api.get('/logout/date', {
        params: {
            id: id,
            token: token
        }
    })
}

// 커스텀 프로그램 시작 put
export async function startCustomProgram (macId, prgId) {
    await api.put('/myfarm/program', {
        id: macId,
        prgId: prgId
    })
}

// 커스텀 프로그램 업데이트 put
export async function updateCustomProgram (params) {
    await api.put('/farm/period/extend', {
        id: params.prgId,
        water: params.water,
        sunshine: params.sunshine,
        period: params.period,
        token: params.token,
        temps: params.temps,
        humis: params.humis
    })
}

// 커스텀 프로그램 삭제 delete
export async function deleteCustomProgram (prgId) {
    await api.delete(`/farm`, {params: {
        id: prgId
    }})
}

// 커스텀 프로그램 추가 post
export async function addCustomProgram (params) {
    await api.post('/farm/custom', {
        machineId: params.machineId,
        water: params.water,
        sunshine: params.sunshine,
        period: params.period,
        name: params.name,
        temp: params.temp,
        humi: params.humi
    })   
}
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
    });

    return kinokoInfo;
};
// ===============================================

// Update

// Delete

///
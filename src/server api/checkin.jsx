import axios from './axios.instance';

export async function store(email) {
    return await axios.post(`/checkin`, email);
}
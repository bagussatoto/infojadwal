import axios from './axios.instance';
export async function getAll(email) {
    return await axios.get(`/schedule?email=${email}`);
}

export async function getDetail(email, day) {
    return await axios.get(`/schedule?email=${email}&day=${day}`);
}

export async function store(email, day, title) {
    return await axios.post(`/schedule?email=${email}`, { title, day });
}

export async function update(email, id, title) {
    return await axios.patch(`/schedule?email=${email}&id=${ id }`, { title });
}

export async function destroy(email, id) {
    return await axios.delete(`/schedule?email=${email}&id=${id}`);
}
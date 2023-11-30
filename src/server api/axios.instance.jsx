import axios from 'axios';
import { config } from '../configs';

export default axios.create({
	baseURL: config.API,
	timeout: 1000,
});

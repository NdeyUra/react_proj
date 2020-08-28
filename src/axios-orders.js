import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-da62f.firebaseio.com/'
});

export default instance;
import userRoute from './userRoute.js';
import movieRoute from './movieRoute.js';

export default function route(app) {
    app.use('/', userRoute);
    app.use('/', movieRoute);
}

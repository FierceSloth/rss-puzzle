import { App } from './app';
import { Router } from './router/router';

const app = new App();
const router = new Router(app);

router.listen();

import { notifications } from './notifications.js'


export function cliq_notify(key, msg) {
    switch (key) {
        case 'i': {
            notifications.info(msg, 3000)
        }
            break;
        case 'd': {
            notifications.danger(msg, 3000)
        }
            break;
        case 's': {
            notifications.success(msg, 3000)
        }
            break;
        case 'w': {
            notifications.warning(msg, 3000)
        }
            break;
        default: {
            notifications.default(msg, 2000)
        }
            break;
    }
}


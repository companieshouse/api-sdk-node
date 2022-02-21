// {
//     "status": "UP",
//     "components": {
//         "diskSpace": {
//             "status": "UP",
//             "details": {
//                 "total": 75826716672,
//                 "free": 45381320704,
//                 "threshold": 10485760,
//                 "exists": true
//             }
//         },
//         "ping": {
//             "status": "UP"
//         }
//     }
// }

export interface HealthCheck {
    status: string;
    components: Components;
}

export interface Components {
    diskSpace: DiskSpace;
    ping: Ping;
}

export interface DiskSpace {
    status: string;
    details: Details;
}

export interface Details {
    total: number;
    free: number;
    threshold: number;
    exists: boolean;
}

export interface Ping {
    status: string;
}

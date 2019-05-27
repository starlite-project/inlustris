import { InlustrisClient } from '../Client';

export interface InlustrisPlugin {
    name: string;
    loader: (client: InlustrisClient) => any;
}
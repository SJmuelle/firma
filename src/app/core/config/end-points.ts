import {environment} from '../../../environments/environment';

export class EndPoints {
    /**
     * @description: Url end-point base
     */
    static urlBase(url: string): string {
        return environment.apiPath + url;
    }

    /**
     * @description: Url end-point de pruebas en local
     */
     static urlPrueba(url: string): string {
        return environment.apiPrueba + url;
    }
}

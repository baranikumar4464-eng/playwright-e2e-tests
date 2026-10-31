import {test as base} from '@playwright/test'

export type EnvConfig = {
    envName: string;
    appUrl: string;
    dbConfig: {};
    nopCommerceWeb: string;
    "auto-quote-qa": string;
};

export const test = base.extend<EnvConfig>({
    //Define option and provide default value
    //later we can overide this in config
    envName: [">>Provide env name",{option:true}],
    appUrl: [">>Provide app url",{option:true}],
    nopCommerceWeb: [">>Provide app url",{option:true}],
    dbConfig: [{},{option:true}]

});
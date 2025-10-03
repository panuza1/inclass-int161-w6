import { promises as fs } from 'node:fs';
import {response} from "express";

async function main(value = 0) {
    try {
        console.log(await a(value));
        console.log('After main success');
    } catch (e) {
        handler(e);
    }
}

async function a(value) {
    return await b(value);
}

async function b(value) {
    if (value > 0) {
        return ++value;
    }
    try {
        const data = await fs.readFile('data.txt', 'utf8');
        return data;
    } catch (e) {
        throw new Error('Failed to read the file: ' + e.message);
    }
}

function handler(e) {
    console.log('Error handler');
    console.log('=============================');
    console.log('Message: ', e.message);
    if (e.status) console.log('Status: ', e.status);
    if (e.code) console.log('Code: ', e.code);
    // console.log('Stack Trace: ', e.stack);
}

main(1).catch((e) => handler(e));
main().catch((e) => handler(e));



const fs = require('node:fs');
function main(value=0) {
    console.log(a(value));
}
function a(value) {
    return b(value);
}
function b(value) {
    if (value > 0) {
        return ++value;
    }
    const data = fs.readFileSync('test.txt');
}
main(); //without error handler

try {
    main(1);
    console.log('After main success');
    console.log('------------------');
    main();
    console.log('After main error');
} catch (e) {
    console.log('Message: ', e.message);
    console.log('Status: ', e.status);
    console.log('Code: ', e.code);
    console.log('Stack Trace: ', e.stack);
}
console.log('Program was normal ended');

// try.. catch  -> make the program nonstop 
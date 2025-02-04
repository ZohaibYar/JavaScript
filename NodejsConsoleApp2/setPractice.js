const letter = new Set();
letter.add(1);
letter.add(2);
letter.add(4);
letter.add("zohaib");
letter.add("yar");
letter.add(2);
letter.add(2);
letter.add(0);
console.log(letter);



const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Press Enter to exit...", () => {
    rl.close();
});

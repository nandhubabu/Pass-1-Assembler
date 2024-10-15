const btn1 = document.getElementById("btn1");
const file1 = document.getElementById("file1");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const op = document.getElementById("op");
const btn2 = document.getElementById("btn2");
const file2 = document.getElementById("file2");
const clrsrc = document.getElementById("clrsrc");
const clrop = document.getElementById("clrop");
const clrout1 = document.getElementById("clrout1");
const clrout2 = document.getElementById("clrout2");
const clrsym = document.getElementById("clrsym");
const symtab = document.getElementById("symtab");
const btnsave1 = document.getElementById("btnsave1");
const btnsave2 = document.getElementById("btnsave2");
const btnsave3 = document.getElementById("btnsave3");
const btnsave4 = document.getElementById("btnsave4");
const btnsave5 = document.getElementById("btnsave5");
const btnp1 = document.getElementById("btnp1");
const btnp2 = document.getElementById("btnp2");

const optab = new Map([
    ['ADD', '18'], ['ADDF', '58'], ['ADDR', '90'], ['AND', '40'], ['CLEAR', 'B4'],
    ['COMP', '28'], ['COMPF', '88'], ['COMPR', 'A0'], ['DIV', '24'], ['DIVF', '64'],
            ['DIVR', '9C'], ['FIX', 'C4'], ['FLOAT', 'C0'], ['HIO', 'F4'], ['J', '3C'],
            ['JEQ', '30'], ['JGT', '34'], ['JLT', '38'], ['JSUB', '48'], ['LDA', '00'],
            ['LDB', '68'], ['LDCH', '50'], ['LDF', '70'], ['LDL', '08'], ['LDS', '6C'],
            ['LDT', '74'], ['LDX', '04'], ['LPS', 'D0'], ['MUL', '20'], ['MULF', '60'],
            ['MULR', '98'], ['NORM', 'C8'], ['OR', '44'], ['RD', 'D8'], ['RMO', 'AC'],
            ['RSUB', '4C'], ['SHIFTL', 'A4'], ['SHIFTR', 'A8'], ['SIO', 'F0'], ['SSK', 'EC'],
            ['STA', '0C'], ['STB', '78'], ['STCH', '54'], ['STF', '80'], ['STI', 'D4'],
            ['STL', '14'], ['STS', '7C'], ['STSW', 'E8'], ['STT', '84'], ['STX', '10'],
            ['SUB', '1C'], ['SUBF', '5C'], ['SUBR', '94'], ['SVC', 'B0'], ['TD', 'E0'],
            ['TIO', 'F8'], ['TIX', '2C'], ['TIXR', 'B8'], ['WD', 'DC'],
]);

let locctr = 0; // Location counter
let start = 0;

// Load saved assembly code
window.onload = function () {
    const savedAssemblyCode = localStorage.getItem("assembly_code");
    if (savedAssemblyCode) {
        document.getElementById("pass1").value = savedAssemblyCode;
    }
    const savedOptab = localStorage.getItem("optab");
    if (savedOptab) {
        op.value = savedOptab;
    }
};

// Upload Assembly Code
btn1.addEventListener("click", function () {
    const file = file1.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const code = e.target.result;
            document.getElementById("pass1").value = code;
            updateOpcodeOutput(code);
            disableUploadButton(btn1);
        };
        reader.readAsText(file);
    } else {
        alert("Please upload the file");
    }
});

// Upload OPTAB
btn2.addEventListener("click", function () {
    const file = file2.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            op.value = e.target.result;
            disableUploadButton(btn2);
        };
        reader.readAsText(file);
    } else {
        alert("Please upload the file");
    }
});

// Clear Functions
clrsrc.addEventListener("click", clearAssemblyCode);
clrop.addEventListener("click", clearOptab);
clrout1.addEventListener("click", () => output1.value = "");
clrout2.addEventListener("click", () => output2.value = "");
clrsym.addEventListener("click", () => {
    symtab.value = "";
});

// Save Functions
btnsave1.addEventListener("click", saveAssemblyCode);
btnsave2.addEventListener("click", saveOptab);
btnsave3.addEventListener("click", saveIntermediate);
btnsave4.addEventListener("click", saveSymtab);
btnsave5.addEventListener("click", saveOutput);

// Pass One
btnp1.addEventListener("click", passOne);
function passOne() {
    const code = document.getElementById("pass1").value.trim();
    const inputArr = code.split('\n').map(line => line.trim().split(/\s+/));
    const optabArr = op.value.trim().split('\n').map(line => line.trim().split(/\s+/));

    const out = processPass1(inputArr, optabArr);
    output1.value = out.intermediate;
    symtab.value = out.symtab;
}

function processPass1(inputArr, optabArr) {
    let locctr = 0, prev = 0, intermediate = "", symtab = "";
    const symtabArr = [];

    if (inputArr[0][1] === 'START') {
        locctr = parseInt(inputArr[0][2], 16);
        prev = locctr;
    }

    for (let i = 1; inputArr[i][1] !== 'END'; i++) {
        // Process opcodes and location counter logic...
        // Update intermediate and symtab...
    }

    return { intermediate, symtab: symtabArr.map(item => item.join('\t')).join('\n') };
}

// Pass Two
btnp2.addEventListener("click", passTwo);
function passTwo() {
    const intermediateCode = output1.value.trim();
    const lines = intermediateCode.split("\n");
    const symt = symtab.value.trim();
    const opt = op.value.trim();

    const symtabArr = symt.split("\n").map(line => line.trim().split(/\s+/));
    const intermediateArr = lines.map(line => line.trim().split(/\s+/));
    const optabArr = opt.split("\n").map(line => line.trim().split(/\s+/));

    const result = processPass2(optabArr, intermediateArr, symtabArr);
    output2.value = result.output2;
}

function processPass2(optabArr, intermediateArr, symtabArr) {
    // Processing logic for Pass Two...
    return { output, output2 };
}

// Helper Functions
function clearAssemblyCode() {
    document.getElementById("pass1").value = "";
    localStorage.removeItem("assembly_code");
}

function clearOptab() {
    op.value = "";
    localStorage.removeItem("optab");
}

function disableUploadButton(button) {
    button.textContent = "Uploaded";
    button.disabled = true;
    button.style.backgroundColor = "#d3d3d3";
    button.style.color = "#fff";
}

function updateOpcodeOutput(code) {
    const lines = code.split('\n');
    const opcodeOutput = lines.map(line => {
        const parts = line.trim().split(/\s+/);
        const opcode = parts[1];
        return optab.has(opcode) ? `${opcode} ${optab.get(opcode)}` : '';
    }).filter(Boolean).join('\n');
    op.value = opcodeOutput;
}

function saveAssemblyCode() {
    const text = document.getElementById("pass1").value;
    localStorage.setItem("assembly_code", text);
}

function saveOptab() {
    const text = op.value;
    localStorage.setItem("optab", text);
}

function saveIntermediate() {
    const text = output1.value;
    const blob = new Blob([text], { type: "text/plain" });
    downloadFile(blob, "intermediate_file.txt");
}

function saveSymtab() {
    const text = symtab.value;
    const blob = new Blob([text], { type: "text/plain" });
    downloadFile(blob, "symtab.txt");
}

function saveOutput() {
    const text = output2.value;
    const blob = new Blob([text], { type: "text/plain" });
    downloadFile(blob, "output_pass2.txt");
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}

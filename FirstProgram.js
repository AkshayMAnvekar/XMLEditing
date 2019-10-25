const pd = require('pretty-data').pd;


arrJSON = [
    { A: 'Error Table', C: 'FIB', D: '1, 2, 3' },
    { A: 'Problem ID', B: 'PR5277' },
    { A: 'Tutelage ID', B: 'TU5277' },
    { A: 'Tutelage Variables', B: 'A' },
    { A: 'Possible Answers', B: 'Feedback Name' },
    { A: '<FIB_1> ==<FIB_2>==8,<FIB_3>==$A*80$', B: 'NA', E: 1 },
    { A: '<FIB_1>!=8 || <FIB_2>!= 8', B: 'FB1', E: 2 },
    { A: '<FIB_1> ==<FIB_2>==8,<FIB_3>!=$A*80$', B: 'FB2', E: 3 },
    { A: 70, B: 'FB2', E: 3 },
    { A: 5, B: 'FB3', E: 4 },
    { A: 'Other[8], 56', B: 'FB1', E: 2 },
    { A: '8, Other[56]', B: 'FB2', E: 3 },
    { A: '8, 56', B: 'FB2', E: 3 },
    { A: 'Other', B: '_UNCOMMON', E: 4 }
];
var qType = "FIB";
var ref = "1, 2";
if (typeof ref == "string") {
    var forFib1 = ref;
    if (typeof ref !== "number") {
        var forFib2 = forFib1.replace(/\s/g, '');
        var refFib = forFib2.split(',');
        console.log(`${refFib}`);
    }
}
if (typeof ref == "number") {
    refFib = ref;
}
// var ref = 1;
var ret = '';
for (let arr of arrJSON) {
    if (qType == "FIB" && "E" in arr) {
        ret += `${fibTutelageTemplate(arr, refFib)}`;
        
    }
}


function fibTutelageTemplate(arrEle, refFib) {
    var xml = '';

    if (arrEle.B !== "NA") {
        xml += `<feedback name="${arrEle.B}"><trigger>`
        if (arrEle.A === "Other" || arrEle.B === "_UNCOMMON") {
            xml = xml.replace("<trigger>","");
            return `${xml}</feedback>`;
        } 
        else if (typeof arrEle.A === "number") {
            xml += `<cond><fib_ref name="fib${refFib}"/>==${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        }
        else if (typeof ref === "number" && !arrEle.A.includes(",") && !arrEle.A.includes("FIB")) {
            xml += `<cond><fib_ref name="fib${refFib}"/>==${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        } 
        else if (!arrEle.A.includes(",") && arrEle.A.includes("FIB")) {
            arrEle.A = arrEle.A.replace(/\s/g, '');
            arrEle.A = arrEle.A.replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
            xml += `<cond>${arrEle.A}</cond>`;
            return `${xml}</trigger></feedback>`;
        }
        else if(arrEle.A.includes(",")) {
            let fibVal = arrEle.A.replace(/\s/g, '');
            fibEle = fibVal.split(',');
            console.log(fibEle);
            if (typeof refFib == "number") {
                if (!fibEle[0].search("fib")) {
                    xml += `<cond><fib_ref name="fib${refFib}"/>==${fibEle[0]}</cond>`
                } 
                else {
                    fibEle[0] = fibEle[0].replace(/\s/g, '');
                    fibEle[0] = fibEle[0].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                    xml += `<cond>${fibEle[0]}</cond>`;
                } 
                for (var i = 1; i < fibEle.length; i++) {
                    fibEle[i] = fibEle[i].replace(/\s/g, '');
                    fibEle[i] = fibEle[i].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                    xml += `<cond>${fibEle[i]}</cond>`;
                }
            }
            else {
                for (let i = 0; i < fibEle.length; i++) {
                    if (i < refFib.length && !fibEle[i].includes("FIB")) {
                        if (!fibEle[i].includes("Other")) {
                            xml += `<cond><fib_ref name="fib${refFib[i]}"/>==${fibEle[i]}</cond>`
                        }
                        else if (fibEle[i].includes("Other")) {
                            var matches = fibEle[i].match(/\[(.*?)\]/);
                            if (matches != null) {
                                xml += `<cond><fib_ref name="fib${refFib[i]}"/>!=${matches[1]}</cond>`
                            }
                        }
                    }
                    else {
                        fibEle[i] = fibEle[i].replace(/\s/g, '');
                        fibEle[i] = fibEle[i].replace(/(<FIB_)(\d)(>)/g, `<fib_ref name="fib` + "$2" + `"/>`);
                        xml += `<cond>${fibEle[i]}</cond>`;
                    }
                }
            }
            
            return `${xml}</trigger></feedback>`;
        }
    }   
    else {
        return '';
    }
}

console.log(pd.xml(ret));
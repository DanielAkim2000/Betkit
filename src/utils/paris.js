// let allMatches = [
//     ["Real Oviedo", "Almeria"],
//     ["Racing", "Levante"],
//     ["Viseu", "Maritimo"],
//     ["Malte", "Moldavie"],
//     ["Liechtenstein", "Gibraltar"],
//     ["Real Burgos", "Mirandes"],
// ];

const getRandomNumber = () => {
    let r = Math.floor(Math.random() * 3);
    if (r === 0) {
        return getRandomNumber();
        // 1 === Victory equipe 1 , 2 === Match Null, 3 === Victory equipe 2
    }
    return r;
};

//Compare 2 objects
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null
    ) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

/**
 * Verifie si le ticket est deja present dans le tableau de resultat
 *
 * @param {Object} ticket
 * @param {Array} result
 */
const verifTicketsInResult = (ticket, results) => {
    for (let r of results) {
        if (deepEqual(ticket, r)) {
            return true;
        }
    }
    return false;
};

class Paris {
    constructor(matches, cotes) {
        this.matches = matches;
        this.cotes = cotes;
    }

    getOneTicket() {
        let ticket = {};
        let cote = 1;
        for (let match of this.matches) {
            let r = getRandomNumber();
            ticket[match[0] + " VS " + match[1]] = {
                result: match[r - 1] ? match[r - 1] : "Match Null",
            };

            let index = this.matches.indexOf(match);
            cote *= this.cotes[index][r - 1];
        }

        cote = cote.toPrecision(5);
        ticket.cote = cote;
        return { ticket, cote };
    }

    async getNTickets(n) {
        let result = [];
        let resultCote = [];
        if (n === 0) {
            return { result, resultCote };
        }
        if (n <= 3 ** this.matches.length) {
            for (let i = 0; i < n; i++) {
                let { ticket, cote } = this.getOneTicket();
                let verifTicket = verifTicketsInResult(ticket, result);
                while (verifTicket) {
                    let obj = this.getOneTicket();
                    ticket = obj.ticket;
                    cote = obj.cote;
                    verifTicket = verifTicketsInResult(ticket, result);
                }

                resultCote.push(cote);
                result.push(ticket);
            }
        } else {
            return { result, resultCote };
        }

        console.log(result);
        result = result.sort((a, b) => a.cote - b.cote);
        resultCote = resultCote.sort((a, b) => a - b);
        return { result, resultCote };
    }
}

export { Paris };

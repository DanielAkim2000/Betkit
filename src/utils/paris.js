// let allMatches = [
//     ["Real Oviedo", "Almeria"],
//     ["Racing", "Levante"],
//     ["Viseu", "Maritimo"],
//     ["Malte", "Moldavie"],
//     ["Liechtenstein", "Gibraltar"],
//     ["Real Burgos", "Mirandes"],
// ];

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
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

    getAllCombinations() {
        let results = [];
        const outcomes = [1, 2, 3]; // Victoire equipe 1, match nul, victoire equipe 2

        const generateCombinations = (current, index) => {
            if (index === this.matches.length) {
                results.push([...current]);
                return;
            }

            for (let outcome of outcomes) {
                current.push(outcome);
                generateCombinations(current, index + 1);
                current.pop();
            }
        };

        generateCombinations([], 0);
        return results;
    }

    getOneTicketFromCombination(combination) {
        let ticket = {};
        let cote = 1;

        for (let i = 0; i < this.matches.length; i++) {
            let match = this.matches[i];
            let result = combination[i];
            ticket[match[0] + " VS " + match[1]] = {
                result:
                    result === 1
                        ? match[0]
                        : result === 2
                        ? "Match Null"
                        : match[1],
            };

            cote *= this.cotes[i][result - 1];
        }

        cote = cote.toPrecision(5);
        ticket.cote = cote;
        return { ticket, cote };
    }

    async getNTickets(n) {
        let allCombinations = this.getAllCombinations();
        let selectedTickets = [];

        if (n > allCombinations.length) {
            return { result: [], resultCote: [] };
        }

        while (selectedTickets.length < n) {
            let randomIndex = Math.floor(
                Math.random() * allCombinations.length
            );
            let combination = allCombinations[randomIndex];
            let { ticket, cote } =
                this.getOneTicketFromCombination(combination);

            if (!verifTicketsInResult(ticket, selectedTickets)) {
                selectedTickets.push(ticket);
            }
        }

        let resultCote = selectedTickets.map((ticket) => ticket.cote);
        selectedTickets.sort((a, b) => a.cote - b.cote);
        resultCote.sort((a, b) => a - b);

        return { result: selectedTickets, resultCote };
    }

    async getNTicketsRandom(n) {
        let selectedTickets = [];

        while (selectedTickets.length < n) {
            let ticket = {};
            let cote = 1;
            for (let i = 0; i < this.matches.length; i++) {
                // on recupere la longueur de la cote pour savoir combien de possibilite il y a
                let max = this.cotes[i].length;
                // ensuite on genere un nombre aleatoire entre 1 et la longueur du tableau de cote
                let r = getRandomNumber(max);
                // on recupere le match courant et on insere le resultat dans le ticket avec le nom des equipes
                // on multiplie la cote par la cote du resultat
                // on fait ca pour chaque match
                // si le max = 3 alors on a 3 possibilites de resultat
                // la troisieme possibilite est le match nul comme ca chaque match qui a 3 possibilites de resultat aura forcement un resultat
                // et pour les match qui ont 2 possibilites de resultat notre nombre aleatoire sera soit 1 soit 2 mais jamais 3
                let match = this.matches[i];
                ticket[match[0] + " VS " + match[1]] = {
                    result:
                        r === 1 ? match[0] : r === 2 ? match[1] : "Match Null",
                };

                cote *= this.cotes[i][r - 1];
            }

            cote = parseFloat(cote.toFixed(2));
            ticket.cote = cote;

            if (!verifTicketsInResult(ticket, selectedTickets)) {
                selectedTickets.push(ticket);
            }
        }

        let resultCote = selectedTickets.map((ticket) => ticket.cote);
        selectedTickets.sort((a, b) => a.cote - b.cote);
        resultCote.sort((a, b) => a - b);

        return { result: selectedTickets, resultCote };
    }
}

export { Paris };

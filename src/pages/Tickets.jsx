import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardTicket } from "../components";
import { Paris } from "../utils";

const Tickets = () => {
    let location = useLocation();
    let state = location.state ?? {
        matches: {},
        cotes: {},
        numberOfTickets: 0,
    };

    const [allMatches, setAllMatches] = useState([]);
    const [allCotes, setAllCotes] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    const [numberOfTickets, setNumberOfTickets] = useState(0);

    const setDataForMatches = (data) => {
        let matches = data.map((match) => [match.team1, match.team2]);
        // Ne met à jour l'état que si les données sont différentes
        if (JSON.stringify(matches) !== JSON.stringify(allMatches)) {
            setAllMatches(matches);
        }
    };

    const setDataForCotes = (data) => {
        let cotes = data.map((cote) => [cote.odd1, cote.odd2, cote.odd3]);
        // Ne met à jour l'état que si les données sont différentes
        if (JSON.stringify(cotes) !== JSON.stringify(allCotes)) {
            setAllCotes(cotes);
        }
    };

    const generateTickets = async (matches, cotes) => {
        // si la cote odd3 est null on enleve la possibilite de match null on envoie un tableau de 2 cases
        const updatedCotes = cotes.map((cote) => {
            if (cote[2] === null) {
                cote.splice(2, 1);
            }
            return cote;
        });

        let parisclassName = new Paris(matches, updatedCotes);
        // eslint-disable-next-line no-unused-vars
        parisclassName
            .getNTicketsRandom(numberOfTickets)
            .then(({ result, resultCote }) => {
                setAllTickets(result);
                // console.log(result);
            });
    };

    useEffect(() => {
        if (state.matches.length > 0) {
            setDataForMatches(state.matches);
        }
        if (state.cotes.length > 0) {
            setDataForCotes(state.cotes);
        }
        if (state.numberOfTickets > 0) {
            setNumberOfTickets(state.numberOfTickets);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.matches, state.cotes, state.numberOfTickets]);

    useEffect(() => {
        if (
            allMatches.length === state.matches.length &&
            allCotes.length === state.cotes.length
        ) {
            generateTickets(allMatches, allCotes);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allMatches, allCotes]);

    return (
        <div>
            <h1 className="text-center text-4xl font-semibold uppercase text-gray-800 pb-10">
                Tickets
            </h1>
            <div className="border-t-2 p-10 border-red-500 flex flex-row flex-wrap gap-10 justify-start items-center">
                {allTickets.map((ticket, index) => (
                    <CardTicket key={index} index={index} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export { Tickets };

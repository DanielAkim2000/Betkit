import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import image from "../assets/fleche.svg";
import { Paris } from "../utils";

const Tickets = () => {
    let location = useLocation();
    let state = location.state ?? {
        matches: {},
        cotes: {},
    };

    const [allMatches, setAllMatches] = useState([]);
    const [allCotes, setAllCotes] = useState([]);
    const [allTickets, setAllTickets] = useState([]);
    let n = 9;

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

    const generateTickets = (matches, cotes) => {
        let parisclassName = new Paris(matches, cotes);
        parisclassName.getNTickets(n).then(({ result, resultCote }) => {
            setAllTickets(result);
            console.log(result);
        });
    };

    // Mettre à jour les données de matches et cotes à partir du state
    useEffect(() => {
        if (state.matches.length > 0) {
            setDataForMatches(state.matches);
        }
        if (state.cotes.length > 0) {
            setDataForCotes(state.cotes);
        }
    }, [state.matches, state.cotes]); // Ajout des dépendances pour éviter la boucle infinie

    // Générer les tickets une fois que les données sont mises à jour
    useEffect(() => {
        if (
            allMatches.length === state.matches.length &&
            allCotes.length === state.cotes.length
        ) {
            generateTickets(allMatches, allCotes);
        }
    }, [allMatches, allCotes]); // Utilise les bonnes dépendances

    return (
        <div>
            <h1 className="text-center text-4xl font-semibold uppercase text-gray-800 pb-10">
                Tickets
            </h1>
            <div className="border-t-2 p-10 border-red-500 flex flex-row flex-wrap gap-10 justify-around items-center">
                {allTickets.map((ticket, index) => (
                    <div className="flex flex-col gap-5" key={index}>
                        <div className="inline-flex justify-center items-center border-2 border-red-500 rounded-lg p-1">
                            <i className="font-bold italic uppercase text-lg">{`Ticket ${
                                index + 1
                            }`}</i>
                            <div>
                                <img src={image} alt="fleche" />
                            </div>
                        </div>
                        <div className="border-2 border-red-500 rounded-lg p-4">
                            {Object.keys(ticket).map((key) => {
                                if (key !== "cote") {
                                    return (
                                        <div className="" key={key}>
                                            <b className="uppercase text-base font-medium ">
                                                {key}
                                            </b>
                                            <p className="text-amber-300 font-semibold italic pb-2 mb-2 text-lg border-b-2 border-red-500 uppercase">
                                                {ticket[key].result}
                                            </p>
                                        </div>
                                    );
                                }
                                if (key === "cote") {
                                    return (
                                        <div className="mt-5" key={key}>
                                            <b className="text-2xl text-green-500 italic font-extrabold">
                                                {ticket.cote}
                                            </b>
                                        </div>
                                    );
                                }

                                // key === "cote" && (
                                //     <div className="cote">
                                //         <b>Cote: {ticket.cote}</b>
                                //     </div>
                                // )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Tickets };

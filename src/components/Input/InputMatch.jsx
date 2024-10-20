import PropTypes from "prop-types"; // 1. Importer PropTypes
import { useEffect, useState } from "react";

// Import images for sports
import basketball from "../../assets/basketball.svg";
import closeImg from "../../assets/close.svg";
import rugby from "../../assets/rugby.svg";
import soccer from "../../assets/soccer.svg";
import tennis from "../../assets/tennis.svg";

// 3. Définir le composant InputMatch
/*
    Ce composant permet de créer un formulaire pour ajouter des matchs
    Il prend en paramètre matches, nbMatch, handleChange et changeTablePossibility
    matches est un tableau de matchs
    nbMatch est le nombre de matchs
    handleChange est une fonction de gestion des changements
    changeTablePossibility est une fonction de changement de la table de possibilités

    Il retourne un formulaire pour ajouter des matchs

    Fonctionnement:
    - On crée un formulaire pour ajouter des matchs
    - On crée un tableau de possibilités
    - On crée un tableau de sports sélectionnés
    - On crée une fonction pour changer le sport
    - On crée un effet pour changer le sport
    - On crée un effet pour changer la table de possibilités
    - On crée une fonction pour afficher le formulaire
    - On retourne le formulaire

    Fonctionnalité:
    - On peut ajouter un match
    - On peut changer le sport
    - On peut ajouter une équipe 1
    - On peut ajouter une équipe 2
    - On peut ajouter une cote 1
    - On peut ajouter une cote 2
    - On peut ajouter une cote 3

*/

/**
 * @name InputMatch
 * @description Composant InputMatch
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.matches - Les matchs
 * @param {Number} props.nbMatch - Le nombre de matchs
 * @param {Function} props.handleChange - La fonction de gestion des changements
 * @param {Function} props.changeTablePossibility - La fonction de changement de la table de possibilités
 * @returns {JSX.Element}
 * @example
 * <InputMatch
 * matches={matches}
 * nbMatch={nbMatch}
 * handleChange={handleChange}
 * changeTablePossibility={changeTablePossibility}
 * />
 * @version 1.0.0
 */
const InputMatch = ({
    matches,
    cotes,
    nbMatch,
    handleChange,
    changeTablePossibility,
}) => {
    const [nbPossibility, setNbPossibility] = useState([3]);
    const [sportSelected, setSportSelected] = useState(["soccer"]);
    const [manualTrigger, setManualTrigger] = useState(false);

    console.log("Nb Possibility", nbPossibility);
    console.log("Sport Selected", sportSelected);
    console.log("matches", matches);
    const changeSport = (sport, i) => {
        // on met null dans odd3 si le sport n'a pas de match null
        if (sport === "tennis" || sport === "basketball") {
            handleChange({ target: { value: null } }, i, "odd3");
        }

        setSportSelected((prev) => {
            let newSportSelected = [...prev];
            newSportSelected[i] = sport;
            return newSportSelected;
        });
        switch (sport) {
            case "soccer":
                setNbPossibility((prev) => {
                    let newPossibility = [...prev];
                    newPossibility[i] = 3;
                    return newPossibility;
                });

                break;
            case "basketball":
                setNbPossibility((prev) => {
                    let newPossibility = [...prev];
                    newPossibility[i] = 2;
                    return newPossibility;
                });
                break;
            case "rugby":
                setNbPossibility((prev) => {
                    let newPossibility = [...prev];
                    newPossibility[i] = 3;
                    return newPossibility;
                });
                break;
            case "tennis":
                setNbPossibility((prev) => {
                    let newPossibility = [...prev];
                    newPossibility[i] = 2;
                    return newPossibility;
                });
                break;
            default:
                setNbPossibility((prev) => {
                    let newPossibility = [...prev];
                    newPossibility[i] = 3;
                    return newPossibility;
                });

                break;
        }
    };

    const closeClick = (i) => {
        setManualTrigger(true);
        let newPossibility = [...nbPossibility];
        newPossibility.splice(i, 1);
        console.log("newPossibility", newPossibility);
        setNbPossibility(newPossibility);
        setSportSelected((prev) => {
            let newSportSelected = [...prev];
            newSportSelected.splice(i, 1);
            return newSportSelected;
        });
        handleChange({ target: { value: null } }, i, "close");
    };

    useEffect(() => {
        // permet de ne pas rajouter le nombre de matchs si c'est un trigger manuel
        // si je clique sur close on garde le nombre de possibilite precedente et la fonction close click supprimera
        // la possibilite du match supprimé
        if (manualTrigger) {
            setManualTrigger(false);
            return;
        }

        if (nbMatch === 1) {
            setNbPossibility([3]);
        } else {
            setNbPossibility([
                ...nbPossibility,
                (nbPossibility[nbMatch - 1] = 3),
            ]);
            setSportSelected([
                ...sportSelected,
                (sportSelected[nbMatch - 1] = "soccer"),
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbMatch]);

    useEffect(() => {
        changeTablePossibility(nbPossibility);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nbPossibility]);

    const renderInputMatch = () => {
        const inputs = [];
        for (let i = 0; i < nbMatch; i++) {
            // i < nbMatch au lieu de i <= nbMatch pour avoir exactement nbMatch itérations
            inputs.push(
                <div
                    key={i}
                    className="p-5 border-2  rounded-2xl border-red-500 m-5 max-sm:m-auto flex-1 min-w-[25rem] max-w-[25rem] relative"
                >
                    {" "}
                    {/* Ajouter une key unique ici */}
                    <h2 className="text-2xl font-bold text-red-500">
                        Match {i + 1}
                    </h2>
                    <div>
                        {nbMatch > 1 && (
                            <button
                                className="rounded-full w-8 h-8 text-center pb-1  text-3xl absolute top-2 right-2 hover:bg-yellow-200"
                                onClick={() => {
                                    nbMatch === 1
                                        ? alert(
                                              "Vous devez avoir au moins un match"
                                          )
                                        : closeClick(i);
                                }}
                            >
                                <img
                                    src={closeImg}
                                    alt="close"
                                    className=" rounded-full"
                                />
                            </button>
                        )}
                    </div>
                    <div>
                        <h5 className="text-lg text-gray-800 italic font-semibold">
                            Quel sport pour ce match?
                        </h5>

                        <div className="flex flex-row nowrap gap-10 justify-center my-4">
                            <button
                                value={"soccer"}
                                className={` rounded-full transition duration-700 ease-in-out p-2 ${
                                    sportSelected[i] === "soccer"
                                        ? "border-2 border-red-500"
                                        : ""
                                }`}
                                onClick={() => changeSport("soccer", i)}
                            >
                                <img src={soccer} alt="soccer" width={30} />
                            </button>
                            <button
                                value={"basketball"}
                                className={`rounded-full p-2 transition duration-700 ease-in-out ${
                                    sportSelected[i] === "basketball"
                                        ? "border-2 border-red-500 "
                                        : ""
                                }`}
                                onClick={() => changeSport("basketball", i)}
                            >
                                <img
                                    src={basketball}
                                    width={30}
                                    alt="basketball"
                                />
                            </button>
                            <button
                                value={"rugby"}
                                className={` rounded-full p-2 transition duration-700 ease-in-out ${
                                    sportSelected[i] === "rugby"
                                        ? "border-2 border-red-500"
                                        : ""
                                }`}
                                onClick={() => changeSport("rugby", i)}
                            >
                                <img src={rugby} width={30} alt="rugby" />
                            </button>
                            <button
                                value={"tennis"}
                                className={` rounded-full p-2 transition duration-700 ease-in-out  ${
                                    sportSelected[i] === "tennis"
                                        ? "border-2 border-red-500"
                                        : ""
                                }`}
                                onClick={() => changeSport("tennis", i)}
                            >
                                <img src={tennis} width={30} alt="tennis" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2 items-start gap-5">
                        <div className="w-full flex flex-row gap-3">
                            <input
                                value={matches[i]?.team1 || ""}
                                type="text"
                                placeholder="Equipe 1"
                                className="w-full p-2 border-2 border-gray-300 rounded-md transition-all duration-1000 ease-in-out outline-none focus:border-red-500 font-bold uppercase text-center"
                                onChange={(e) => handleChange(e, i, "team1")}
                            />
                            <h6 className="text-xl text-gray-900 italic font-semibold p-2">
                                VS
                            </h6>
                            <input
                                value={matches[i]?.team2 || ""}
                                type="text"
                                placeholder="Equipe 2"
                                className="w-full p-2 border-2 border-gray-300 rounded-md transition-all duration-1000 ease-in-out outline-none focus:border-red-500 font-bold uppercase text-center"
                                onChange={(e) => handleChange(e, i, "team2")}
                            />
                        </div>
                        <div className="w-full flex justify-between flex-row flex-nowrap gap-3">
                            <div className="w-[100px]">
                                <input
                                    value={cotes[i]?.odd1 || ""}
                                    placeholder="Cote 1"
                                    className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md transition-all duration-1000 ease-in-out outline-none focus:border-red-500 font-extrabold text-center text-lg "
                                    onChange={(e) => handleChange(e, i, "odd1")}
                                />
                            </div>
                            {nbPossibility[i] === 3 && (
                                <div className="w-[100px]">
                                    <input
                                        value={cotes[i]?.odd3 || ""}
                                        placeholder="Cote Null"
                                        className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md transition-all duration-1000 ease-in-out outline-none focus:border-red-500 inline-block font-extrabold text-center text-lg  "
                                        onChange={(e) =>
                                            handleChange(e, i, "odd3")
                                        }
                                    />
                                </div>
                            )}
                            <div className="w-[100px]">
                                <input
                                    value={cotes[i]?.odd2 || ""}
                                    placeholder="Cote 2"
                                    className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md transition-all duration-1000 ease-in-out outline-none focus:border-red-500 inline-block font-extrabold text-center text-lg  "
                                    onChange={(e) => handleChange(e, i, "odd2")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className="flex justify-start flex-wrap max-xl:justify-center z-10">
            {renderInputMatch()}
        </div>
    );
};

// 2. Définir les PropTypes pour la validation
InputMatch.propTypes = {
    nbMatch: PropTypes.number.isRequired, // nbMatch doit être un nombre et est requis
    handleChange: PropTypes.func.isRequired, // handleChange doit être une fonction et est requise
    changeTablePossibility: PropTypes.func.isRequired, // changeTablePossibility doit être une fonction et est requise
    matches: PropTypes.array.isRequired, // matches doit être un tableau et est requis
    cotes: PropTypes.array.isRequired, // cotes doit être un tableau et est requis
};

export { InputMatch };

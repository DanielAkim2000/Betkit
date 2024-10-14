import PropTypes from "prop-types"; // 1. Importer PropTypes
import { useEffect, useState } from "react";

// Import images for sports
import basketball from "../../assets/basketball.svg";
import rugby from "../../assets/rugby.svg";
import soccer from "../../assets/soccer.svg";
import tennis from "../../assets/tennis.svg";

const InputMatch = ({ nbMatch, handleChange, changeTablePossibility }) => {
    const [nbPossibility, setNbPossibility] = useState([3]);
    const [sportSelected, setSportSelected] = useState(["soccer"]);
    console.log(nbPossibility);

    const changeSport = (sport, i) => {
        // on met null dans odd3 si le sport n'a pas de match null
        if (sport === "tennis" || sport === "basketball") {
            handleChange({ target: { value: null } }, i, "odd3");
        }

        setSportSelected({ ...sportSelected, [i]: sport });
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

    useEffect(() => {
        nbMatch === 1
            ? setNbPossibility([3])
            : setNbPossibility([
                  ...nbPossibility,
                  (nbPossibility[nbMatch - 1] = 3),
              ]);

        setSportSelected({ ...sportSelected, [nbMatch - 1]: "soccer" });

        return () => {
            setNbPossibility([]);
            setSportSelected([]);
        };
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
                    className="p-5 border-2 rounded-2xl border-red-500 m-5 flex-1 min-w-[25rem] max-w-[25rem]"
                >
                    {" "}
                    {/* Ajouter une key unique ici */}
                    <h2 className="text-2xl font-bold text-red-500">
                        Match {i + 1}
                    </h2>
                    <div>
                        <h5 className="text-lg text-gray-800 italic font-semibold">
                            Quel sport pour ce match?
                        </h5>

                        <div className="flex flex-row nowrap gap-10 justify-center my-4">
                            <button
                                value={"soccer"}
                                className={`border-red-500 rounded-full p-2 ${
                                    sportSelected[i] === "soccer" && "border-2"
                                }`}
                                onClick={() => changeSport("soccer", i)}
                            >
                                <img src={soccer} alt="soccer" width={30} />
                            </button>
                            <button
                                value={"basketball"}
                                className={`border-red-500 rounded-full p-2 ${
                                    sportSelected[i] === "basketball" &&
                                    "border-2"
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
                                className={`border-red-500 rounded-full p-2 ${
                                    sportSelected[i] === "rugby" && "border-2"
                                }`}
                                onClick={() => changeSport("rugby", i)}
                            >
                                <img src={rugby} width={30} alt="rugby" />
                            </button>
                            <button
                                value={"tennis"}
                                className={`border-red-500 rounded-full p-2  ${
                                    sportSelected[i] === "tennis" && "border-2"
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
                                type="text"
                                placeholder="Equipe 1"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-red-500 font-bold uppercase text-center"
                                onChange={(e) => handleChange(e, i, "team1")}
                            />
                            <h6 className="text-xl text-gray-900 italic font-semibold p-2">
                                VS
                            </h6>
                            <input
                                type="text"
                                placeholder="Equipe 2"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-red-500 font-bold uppercase text-center"
                                onChange={(e) => handleChange(e, i, "team2")}
                            />
                        </div>
                        <div className="w-full flex justify-between flex-row flex-nowrap gap-3">
                            <div className="w-[100px]">
                                <input
                                    placeholder="Cote 1"
                                    className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md focus:outline-red-500 font-extrabold text-center text-lg "
                                    onChange={(e) => handleChange(e, i, "odd1")}
                                />
                            </div>
                            {nbPossibility[i] === 3 && (
                                <div className="w-[100px]">
                                    <input
                                        placeholder="Cote Null"
                                        className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md focus:outline-red-500 inline-block font-extrabold text-center text-lg  "
                                        onChange={(e) =>
                                            handleChange(e, i, "odd3")
                                        }
                                    />
                                </div>
                            )}
                            <div className="w-[100px]">
                                <input
                                    placeholder="Cote 2"
                                    className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md focus:outline-red-500 inline-block font-extrabold text-center text-lg  "
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
        <div className="flex justify-start flex-wrap max-xl:justify-center">
            {renderInputMatch()}
        </div>
    );
};

// 2. Définir les PropTypes pour la validation
InputMatch.propTypes = {
    nbMatch: PropTypes.number.isRequired, // nbMatch doit être un nombre et est requis
    handleChange: PropTypes.func.isRequired, // handleChange doit être une fonction et est requise
    changeTablePossibility: PropTypes.func.isRequired, // changeTablePossibility doit être une fonction et est requise
};

export { InputMatch };

import PropTypes from "prop-types"; // 1. Importer PropTypes
import { useState } from "react";

const InputMatch = ({ nbMatch, handleChange }) => {
    const [nbPossibility, setNbPossibility] = useState(3);

    const handleClick = (e) => {
        setNbPossibility(e.target.value);
    };
    const renderInputMatch = () => {
        const inputs = [];
        for (let i = 0; i < nbMatch; i++) {
            // i < nbMatch au lieu de i <= nbMatch pour avoir exactement nbMatch itérations
            inputs.push(
                <div
                    key={i}
                    className="p-5 border-2 rounded-xl border-red-500 m-5 flex-1 max-w-[24rem]"
                >
                    {" "}
                    {/* Ajouter une key unique ici */}
                    <h2 className="text-2xl font-bold text-red-500">
                        Match {i + 1}
                    </h2>
                    <div>
                        <h5 className="text-lg text-gray-800 italic font-semibold">
                            Nombre de possibilité?
                        </h5>
                        <div className="flex flex-row flex-nowrap gap-10 justify-center p-2">
                            <button
                                value={2}
                                className="bg-red-500 text-white p-2 rounded-full w-10 h-10 text-center hover:bg-red-600 focus:border-2 focus:border-yellow-400"
                                onClick={handleClick}
                            >
                                2
                            </button>
                            <button
                                value={3}
                                className="bg-red-500 text-white p-2 rounded-full w-10 h-10  text-center hover:bg-red-600 focus:border-2 focus:border-yellow-400"
                                onClick={handleClick}
                            >
                                3
                            </button>
                        </div>
                        `
                    </div>
                    <div className="flex justify-between my-5 items-start gap-2">
                        <div className="w-1/2 flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Equipe 1"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-red-500 font-bold uppercase"
                                onChange={(e) => handleChange(e, i, "team1")}
                            />
                            <div className="w-[100px]">
                                <input
                                    placeholder="Cote 1"
                                    className="w-full p-2 border-2 border-yellow-400 bg-yellow-400 rounded-md focus:outline-red-500 font-extrabold text-center text-lg "
                                    onChange={(e) => handleChange(e, i, "odd1")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center  gap-3 w-auto">
                            <h6 className="text-xl text-gray-900 italic font-semibold p-2">
                                VS
                            </h6>
                            {parseInt(nbPossibility) === 3 && (
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
                        </div>
                        <div className="w-1/2 flex justify-between flex-col items-end gap-3">
                            <input
                                type="text"
                                placeholder="Equipe 2"
                                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-red-500 text-right font-bold uppercase "
                                onChange={(e) => handleChange(e, i, "team2")}
                            />
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
};

export { InputMatch };

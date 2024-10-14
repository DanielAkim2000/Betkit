import { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeImg from "../assets/close.svg";
import { InputMatch } from "../components/Input";
//Import image for sports

const Home = () => {
    const [nbMatchs, setNbMatchs] = useState(1);
    const [matches, setMatches] = useState([]);
    const [cotes, setCotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [tablePossibility, setTablePossibility] = useState([3]);

    let nbPossibility = tablePossibility.reduce((a, b) => a * b, 1);

    const changeTablePossibility = (table) => {
        setTablePossibility(table);
    };

    const navigate = useNavigate();

    const addMatch = () => {
        setNbMatchs(nbMatchs + 1);
        setTimeout(() => {
            ensureButtonVisible(BtnCombinaisons);
        }, 100);
    };

    const handleChange = (e, index, statut) => {
        const value = e.target.value;
        const newMatches = [...matches];
        const newCotes = [...cotes];
        // if (statut === "team1") {
        //     newMatches[index] = { ...newMatches[index], team1: value };
        // } else if (statut === "team2") {
        //     newMatches[index] = { ...newMatches[index], team2: value };
        // } else if (statut === "odd1") {
        //     newCotes[index] = { ...newCotes[index], odd1: value };
        // } else if (statut === "odd2") {
        //     newCotes[index] = { ...newCotes[index], odd2: value };
        // } else if (statut === "odd3") {
        //     newCotes[index] = { ...newCotes[index], odd3: value };
        // }
        switch (statut) {
            case "team1":
                newMatches[index] = { ...newMatches[index], team1: value };
                break;
            case "team2":
                newMatches[index] = { ...newMatches[index], team2: value };
                break;
            case "odd1":
                newCotes[index] = { ...newCotes[index], odd1: value };
                break;
            case "odd2":
                newCotes[index] = { ...newCotes[index], odd2: value };
                break;
            case "odd3":
                if (value === "" || value === null) {
                    newCotes[index] = { ...newCotes[index], odd3: null };
                } else {
                    newCotes[index] = { ...newCotes[index], odd3: value };
                }
                break;
            default:
                break;
        }

        setMatches(newMatches);
        setCotes(newCotes);
        console.log(cotes);
        console.log(matches);
    };

    const ensureButtonVisible = (button) => {
        const rect = button.getBoundingClientRect();
        const windowHeight =
            window.innerHeight || document.documentElement.clientHeight;

        // Si le bouton est hors du viewport (par exemple en-dessous de la fenêtre)
        if (rect.top > windowHeight || rect.bottom < 0) {
            button.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    // Exemple d'utilisation : vérifier toutes les 500ms si le bouton est toujours visible
    const BtnCombinaisons = document.getElementById("btn-combinaisons");

    return (
        <div className="flex flex-col items-center min-h-[90vh]">
            {/* ENtre tes matches et les cotes et voit les combinaisons possibles */}
            <h1 className="text-center text-4xl font-semibold text-gray-800">
                Bienvenue sur BetKit !<br />
            </h1>
            <h2 className="text-center text-2xl my-5 text-gray-800 italic font-light">
                Entrez les matchs et les cotes pour voir les combinaisons et
                gains possibles !
            </h2>
            <div className="flex flex-col justify-center items-center gap-3 pb-5">
                <h3 className="text-md font-thin text-center text-gray-800 mb-5 px-10 max-w-[700px]">
                    Selectionnez le sport sur chacun de vos matchs pour avoir le
                    bon nombre de possibilités
                </h3>
            </div>
            {/* Pour commencer, entre les nom des 2 equipes et les cotes si tu as plusieurs match appuie sur le button + qui te permettra d entrer un mathc de plus */}
            <div className="flex flex-row items-center justify-center flex-wrap">
                <InputMatch
                    nbMatch={nbMatchs}
                    handleChange={handleChange}
                    changeTablePossibility={changeTablePossibility}
                />
            </div>
            <button
                className="bg-red-500 text-white rounded-full w-16 h-16 text-center pb-1 hover:bg-red-600 text-3xl"
                onClick={addMatch}
            >
                <p className="mx-auto">+</p>
            </button>
            <button
                id="btn-combinaisons"
                className="bg-red-500 text-white p-2 rounded-md w-[20rem] mt-10 font-extrabold"
                onClick={() => setShowModal(true)}
            >
                Calculer les combinaisons
            </button>
            {/* modal for number ticket show */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center">
                    <div className="bg-white rounded-xl min-w-[20rem] min-h-[10rem] flex flex-col justify-center items-center border-2 p-3 border-red-500 scale-90">
                        <div className="flex justify-end w-full">
                            <button
                                className="top-2 right-2 w-10 h-10 hover:fill-red-900"
                                onClick={() => setShowModal(false)}
                                aria-label="close"
                            >
                                <img
                                    src={closeImg}
                                    alt="close"
                                    className=" rounded-full"
                                />
                            </button>
                        </div>
                        <h2 className="text-2xl font-semibold px-5 italic">
                            Combien de tickets voulez-vous générer ? (max{" "}
                            {nbPossibility} )
                        </h2>
                        <div className="flex flex-row justify-center items-center w-full p-5 gap-5 mb-3">
                            <input
                                max={nbPossibility}
                                className="border-2 border-red-500 rounded-lg  p-2 mt-5 flex-5 focus:border-red-500 focus:outline-red-500 font-bold text-lg"
                            />
                            <button
                                className="bg-red-500 border-red-500 border-2  text-white p-2 rounded-lg mt-5 flex-1 h-100 text-lg font-bold hover:bg-red-600"
                                onClick={() =>
                                    navigate("/tickets", {
                                        state: { matches, cotes },
                                    })
                                }
                            >
                                Générer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { Home };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputMatch } from "../components/Input";

const Home = () => {
    const [nbMatchs, setNbMatchs] = useState(1);
    const [matches, setMatches] = useState([]);
    const [cotes, setCotes] = useState([]);
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
        if (statut === "team1") {
            newMatches[index] = { ...newMatches[index], team1: value };
        } else if (statut === "team2") {
            newMatches[index] = { ...newMatches[index], team2: value };
        } else if (statut === "odd1") {
            newCotes[index] = { ...newCotes[index], odd1: value };
        } else if (statut === "odd2") {
            newCotes[index] = { ...newCotes[index], odd2: value };
        } else if (statut === "odd3") {
            newCotes[index] = { ...newCotes[index], odd3: value };
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
        <div>
            {/* ENtre tes matches et les cotes et voit les combinaisons possibles */}
            <h1 className="text-center text-4xl font-semibold text-gray-800">
                Bienvenue sur BetKit !<br />
            </h1>
            <h2 className="text-center text-2xl my-5 text-gray-800 italic font-light">
                Entrez les matchs et les cotes pour voir les combinaisons
                possibles
            </h2>
            {/* Pour commencer, entre les nom des 2 equipes et les cotes si tu as plusieurs match appuie sur le button + qui te permettra d entrer un mathc de plus */}
            <div className="flex flex-row items-center justify-center flex-wrap">
                <InputMatch nbMatch={nbMatchs} handleChange={handleChange} />
                <button
                    className="bg-red-500 text-white p-2 rounded-full w-16 h-16 mt-5 hover:bg-red-600"
                    onClick={addMatch}
                >
                    +
                </button>
            </div>
            <button
                id="btn-combinaisons"
                className="bg-red-500 text-white p-2 rounded-md w-[20rem] mt-10"
                onClick={() =>
                    navigate("/tickets", { state: { matches, cotes } })
                }
            >
                Calculer les combinaisons
            </button>
        </div>
    );
};

export { Home };

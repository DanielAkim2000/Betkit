import Proptypes from "prop-types";
import saveImg from "../../assets/save.svg";
import shareImg from "../../assets/share.svg";

const CardTicket = ({ index, ticket }) => {
    return (
        <div
            className="flex flex-col min-w-[20rem] max-w-[20rem] mx-auto"
            key={index}
        >
            <div className="inline-flex justify-center items-center border-2 border-red-500 rounded-lg p-1">
                <i className="font-bold italic uppercase text-lg">{`Ticket ${
                    index + 1
                }`}</i>
            </div>
            <div className="border-2 border-red-500 rounded-lg py-4 flex flex-col justify-center items-center gap-5 mt-4">
                {Object.keys(ticket).map((key) => {
                    if (key !== "cote") {
                        return (
                            <div
                                className="border-b-[1px] border-red-500 w-full last:border-0 flex flex-col justify-center items-center text-center pb-2"
                                key={key}
                            >
                                <b className="uppercase text-base font-semibold ">
                                    {key}
                                </b>
                                <p className="text-red-700 font-semibold italic text-lg uppercase">
                                    {ticket[key].result}
                                </p>
                            </div>
                        );
                    }
                    if (key === "cote") {
                        return (
                            <div key={key}>
                                <b className="uppercase text-base font-semibold ">
                                    Cote:
                                </b>
                                <p className="text-red-700 font-extrabold italic text-2xl uppercase ">
                                    {ticket.cote}
                                </p>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="mt-3 flex flex-row gap-5 items-center justify-center ">
                {/* <b className="uppercase text-base font-semibold ">Cote:</b> */}
                {/* btn save this ticket and btn share this ticket */}
                <button className=" bg-red-500 text-white rounded-xl p-2 hover:bg-red-600">
                    <img src={saveImg} alt="save" className="w-7 h-7 mx-auto" />
                </button>
                <button className=" bg-red-500 text-white rounded-xl p-2 hover:bg-red-600">
                    <img
                        src={shareImg}
                        alt="share"
                        className="w-7 h-7 mx-auto"
                    />
                </button>
            </div>
        </div>
    );
};

CardTicket.propTypes = {
    index: Proptypes.number.isRequired,
    ticket: Proptypes.object.isRequired,
};

export { CardTicket };

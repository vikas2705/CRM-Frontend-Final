import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchCreatedTickets, saveExistingTicket } from "../api/tickets";
import { getTicketsCount } from "../utils/ticketCount";
import TicketsTable from "../components/TicketsTable";
import UpdateTicketsModal from "../components/modals/UpdateTicketsModal";
import StatusCards from "../components/StatusCards";

const Engineer = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [ticketsCount, setTicketsCount] = useState({});
    const [selectedTicket, setSelectedTicket] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchTicketsList = () => {
        fetchCreatedTickets()
            .then(res => {
                if (res.status === 200) {
                    const tickets = res.data;
                    setTicketsList(tickets);
                    const countMap = getTicketsCount(tickets);
                    setTicketsCount(countMap);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchTicketsList();
    }, []);

    const editTicket = rowData => {
        const ticket = { ...rowData };
        setSelectedTicket(ticket);
        openModal();
    };
    const updateSelectedTicket = e => {
        // api call for saving the edited ticket
        saveExistingTicket(selectedTicket.id, selectedTicket)
            .then(res => {
                if (res.status === 200) {
                    // fetch the list of tickets again
                    fetchTicketsList();
                    closeModal();
                }
            })
            .catch(err => {
                console.log(err);
            });

        e.preventDefault();
    };

    const handleTicketChange = e => {
        const updatedTicket = { ...selectedTicket };

        if (e.target.name === "assignee")
            updatedTicket.assignee = e.target.value;
        else if (e.target.name === "ticketPriority")
            updatedTicket.ticketPriority = e.target.value;

        setSelectedTicket(updatedTicket);
    };

    return (
        <div className='bg-light min-vh-100 d-flex '>
            <div className='col-1'>
                <Sidebar />
            </div>

            <div className='container my-5 mx-5'>
                <h1>Welcome, {localStorage.getItem("name")}</h1>
                <h2>User Type: {localStorage.getItem("userTypes")}</h2>

                {/** cards start */}
                <StatusCards ticketsCount={ticketsCount} />
                {/**cards end */}

                {/**Material Table starts */}
                <TicketsTable
                    ticketsList={ticketsList}
                    editTicket={editTicket}
                    title='Tickets Created by You'
                />
                {/**Material Table ends */}

                {/**Update Ticket modal starts */}
                {modalVisible && (
                    <UpdateTicketsModal
                        modalVisible={modalVisible}
                        closeModal={closeModal}
                        selectedTicket={selectedTicket}
                        updateSelectedTicket={updateSelectedTicket}
                        handleTicketChange={handleTicketChange}
                        setSelectedTicket={setSelectedTicket}
                        userType={localStorage.getItem("userTypes")}
                    />
                )}
                {/**Update Ticket modal ends */}
            </div>
        </div>
    );
};

export default Engineer;

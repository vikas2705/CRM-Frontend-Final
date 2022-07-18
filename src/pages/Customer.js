import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "react-bootstrap";
import {
    fetchCreatedTickets,
    saveExistingTicket,
    createNewTicketByCustomer,
} from "../api/tickets";
import { getTicketsCount } from "../utils/ticketCount";
import TicketsTable from "../components/TicketsTable";
import UpdateTicketsModal from "../components/modals/UpdateTicketsModal";
import CreateTicketsModal from "../components/modals/CreateTicketsModal";
import StatusCards from "../components/StatusCards";

const Customer = () => {
    const [ticketsList, setTicketsList] = useState([]);
    const [ticketsCount, setTicketsCount] = useState({});
    const [selectedTicket, setSelectedTicket] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newTicketModalVisible, setNewTicketModalVisible] = useState(false);
    const [newTicket, setNewTicket] = useState({
        title: "",
        description: "",
    });

    const openNewTicketModal = () => {
        setNewTicketModalVisible(true);
    };

    const closeNewTicketModal = () => {
        setNewTicketModalVisible(false);
    };

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

        if (e.target.name === "title") updatedTicket.title = e.target.value;
        else if (e.target.name === "description")
            updatedTicket.description = e.target.value;
        else if (e.target.name === "ticketPriority")
            updatedTicket.ticketPriority = e.target.value;

        setSelectedTicket(updatedTicket);
    };

    const handleNewTicketChange = e => {
        const updatedTicket = { ...newTicket };

        if (e.target.name === "title") updatedTicket.title = e.target.value;
        else if (e.target.name === "description")
            updatedTicket.description = e.target.value;

        setNewTicket(updatedTicket);
    };
    const createNewTicket = e => {
        // make an api call to create new ticket
        createNewTicketByCustomer(newTicket)
            .then(res => {
                if (res.status === 201) {
                    fetchTicketsList();
                    closeNewTicketModal();
                }
            })
            .catch(err => {
                console.log(err);
            });

        // on success, i should fetch list of tickets
        //close new ticket modal
        e.preventDefault();
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

                {/**Raise a Ticket Button starts */}
                <div>
                    <Button
                        className='btn btn-primary my-2 width100p'
                        onClick={openNewTicketModal}
                    >
                        Raise a Ticket
                    </Button>
                </div>
                {/**Raise a Ticket Button Ends */}

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

                {/** create a ticket modal starts */}
                {newTicketModalVisible && (
                    <CreateTicketsModal
                        newTicketModalVisible={newTicketModalVisible}
                        closeNewTicketModal={closeNewTicketModal}
                        createNewTicket={createNewTicket}
                        newTicket={newTicket}
                        handleNewTicketChange={handleNewTicketChange}
                        setNewTicket={setNewTicket}
                    />
                )}
                {/** create a ticket modal ends */}
            </div>
        </div>
    );
};

export default Customer;

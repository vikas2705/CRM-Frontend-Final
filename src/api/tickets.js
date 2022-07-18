import axios from "axios";

const BASE_URL = "https://relevel-crm--backend.herokuapp.com";

export const fetchCreatedTickets = async () => {
    return await axios.get(
        `${BASE_URL}/crm/api/v1/tickets/`,
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        },
        {
            userId: localStorage.getItem("userId"),
        }
    );
};

export const saveExistingTicket = async (id, ticketData) => {
    return await axios.put(
        `${BASE_URL}/crm/api/v1/tickets/${id}`,
        ticketData,
        {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        },
        {
            userId: localStorage.getItem("userId"),
        }
    );
};

export const createNewTicketByCustomer = async data => {
    return await axios.post(`${BASE_URL}/crm/api/v1/tickets/`, data, {
        headers: {
            "x-access-token": localStorage.getItem("accessToken"),
        },
    });
};

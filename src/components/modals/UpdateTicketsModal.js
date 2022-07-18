import React from "react";
import { Modal, Button } from "react-bootstrap";
import { USER_ROLES } from "../../constants/userRoles";

const UpdateTicketsModal = ({
    modalVisible,
    closeModal,
    selectedTicket,
    updateSelectedTicket,
    handleTicketChange,
    setSelectedTicket,
    userType,
}) => {
    return (
        <Modal
            show={modalVisible}
            onHide={closeModal}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>UPDATE TICKET</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Ticket Id: {selectedTicket.id}</h4>
                <hr />
                <form onSubmit={updateSelectedTicket}>
                    <div className='p-1'>
                        {userType === USER_ROLES.CUSTOMER && (
                            <div className='input-group mb-3'>
                                <label className='label input-group-text label-md '>
                                    Title
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='title'
                                    value={selectedTicket.title}
                                    onChange={handleTicketChange}
                                    required
                                />
                            </div>
                        )}

                        <div className='input-group mb-3'>
                            <label className='label input-group-text label-md '>
                                PRIORITY
                            </label>
                            <input
                                type='number'
                                className='form-control'
                                name='ticketPriority'
                                value={selectedTicket.ticketPriority}
                                onChange={handleTicketChange}
                                min='1'
                                max='5'
                                required
                            />
                            <p className='text-danger'>*</p>
                        </div>

                        {userType === USER_ROLES.ENGINEER && (
                            <div className='input-group mb-3'>
                                <label className='label input-group-text label-md '>
                                    ASSIGNEE
                                </label>
                                <input
                                    type='number'
                                    className='form-control'
                                    name='assignee'
                                    value={selectedTicket.assignee}
                                    onChange={handleTicketChange}
                                    min='1'
                                    max='5'
                                    required
                                />
                                <p className='text-danger'>*</p>
                            </div>
                        )}

                        {userType === USER_ROLES.CUSTOMER && (
                            <div className='input-group mb-3'>
                                <label className='label input-group-text label-md '>
                                    DESCRIPTION
                                </label>
                                <textarea
                                    id='form16'
                                    className='md-textarea form-control'
                                    rows='3'
                                    name='description'
                                    placeholder='Description'
                                    required
                                    onChange={handleTicketChange}
                                >
                                    {selectedTicket.description}
                                </textarea>
                            </div>
                        )}
                    </div>

                    <div className='input-group justify-content-center'>
                        <div className='m-1'>
                            <Button
                                variant='secondary'
                                onClick={() => {
                                    setSelectedTicket({});
                                    closeModal();
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className='m-1'>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default UpdateTicketsModal;

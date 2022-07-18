import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

const TicketsTable = ({ ticketsList, editTicket, title }) => {
    return (
        <MaterialTable
            data={ticketsList}
            columns={[
                {
                    title: "ID",
                    field: "id",
                },
                {
                    title: "TITLE",
                    field: "title",
                },
                {
                    title: "DESCRIPTION",
                    field: "description",
                    filtering: false,
                },
                {
                    title: "REPORTER",
                    field: "reporter",
                },
                {
                    title: "PRIORITY",
                    field: "ticketPriority",
                },
                {
                    title: "ASSIGNEE",
                    field: "assignee",
                },
                {
                    title: "STATUS",
                    field: "status",
                    lookup: {
                        OPEN: "OPEN",
                        IN_PROGRESS: "IN_PROGRESS",
                        BLOCKED: "BLOCKED",
                        CLOSED: "CLOSED",
                    },
                },
            ]}
            options={{
                filtering: true,
                sorting: true,
                headerStyle: {
                    backgroundColor: "darkblue",
                    color: "#FFF",
                },
                rowStyle: {
                    backgroundColor: "#EEE",
                },
                exportMenu: [
                    {
                        label: "Export PDF",
                        exportFunc: (cols, datas) =>
                            ExportPdf(cols, datas, "TicketRecords"),
                    },
                    {
                        label: "Export CSV",
                        exportFunc: (cols, datas) =>
                            ExportCsv(cols, datas, "TicketRecords"),
                    },
                ],
            }}
            title={title}
            onRowClick={(event, rowData) => editTicket(rowData)}
        />
    );
};

export default TicketsTable;

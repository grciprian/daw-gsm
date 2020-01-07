export interface Contract {
    id?: string;
    startDate?: string;
    endDate?: string;
    observations?: string;
    status?: string;
    gadgetId?: string;
    employeeId?: string;
}

export enum Status {
    Received = 1,
    WorkInProgress = 2,
    PickUp = 3,
    Finished = 4
}
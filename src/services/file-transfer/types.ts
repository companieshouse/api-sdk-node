export interface File {
    fileName: string;
    body: ArrayBuffer;
    mimeType: string;
    size: number;
    extension: string
}

export interface FileDetails {
    id: string;
    avTimestamp: string;
    avStatus: AvStatus;
    contentType: string;
    size: number;
    name: string;
    createdOn: string;
    links: FileLinks;
}

export interface FileLinks {
    download: string;
    self: string;
}

export enum AvStatus {
    INFECTED = "INFECTED",
    CLEAN = "CLEAN",
    NOT_SCANNED = "NOT_SCANNED"
}

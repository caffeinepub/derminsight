import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ServicePlan {
    id: string;
    features: Array<string>;
    name: string;
    description: string;
    isFree: boolean;
    priceUSD: bigint;
}
export interface ConsultationIntake {
    id: string;
    status: Status;
    skinConcerns: Array<string>;
    name: string;
    submittedAt: bigint;
    email: string;
    goals: string;
    skinType: string;
    currentRoutine: string;
    consentGiven: boolean;
    photos: Array<ExternalBlob>;
}
export enum Status {
    pending = "pending",
    completed = "completed",
    reviewed = "reviewed"
}
export interface backendInterface {
    getIntakeById(id: string): Promise<ConsultationIntake | null>;
    getServicePlans(): Promise<Array<ServicePlan>>;
    listIntakes(): Promise<Array<ConsultationIntake>>;
    submitIntake(name: string, email: string, skinConcerns: Array<string>, skinType: string, currentRoutine: string, goals: string, photos: Array<ExternalBlob>, consentGiven: boolean): Promise<string>;
    updateIntakeStatus(id: string, status: Status): Promise<void>;
}

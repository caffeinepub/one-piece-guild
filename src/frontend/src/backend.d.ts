import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    username: string;
    userId: string;
    gameLevel: bigint;
    registeredAt: Time;
}
export interface TournamentEntry {
    playerId: string;
    gameLevel: bigint;
    playerName: string;
    paymentNote: string;
}
export type Time = bigint;
export interface Complaint {
    username: string;
    message: string;
    timestamp: Time;
}
export interface PlayerRegistration {
    username: string;
    userId: string;
    gameLevel: bigint;
}
export interface ChatMessage {
    content: string;
    sender: string;
    timestamp: Time;
}
export interface Announcement {
    title: string;
    body: string;
    author: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatMessages(): Promise<Array<ChatMessage>>;
    getComplaints(): Promise<Array<Complaint>>;
    getLeaderboard(): Promise<Array<Player>>;
    getPlayer(userId: string): Promise<Player>;
    getTournaments(): Promise<Array<TournamentEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    postAnnouncement(title: string, body: string, author: string): Promise<void>;
    registerPlayer(input: PlayerRegistration): Promise<void>;
    registerTournament(entry: TournamentEntry): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendChatMessage(sender: string, content: string): Promise<void>;
    sendComplaint(username: string, message: string): Promise<void>;
}

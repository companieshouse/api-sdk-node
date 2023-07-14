/**
 * MetricsApi is what is returned from the api.
 */
export interface MetricsApi {
    etag: string;
    counts: CountsApi;
    mortgage: MortgageApi;
    registers: RegistersApi;
}
export interface MetricsApiResource {
    etag: string;
    counts: CountsApi;
    mortgage: MortgageApi;
    registers: RegistersApi;
}
export interface CountsApi {
    appointments: AppointmentsApi;
}
export interface CountsApiResource {
    appointments: AppointmentsApi;
}
export interface AppointmentsApi {
    activeDirectorsCount: number;
    activeSecretariesCount: number;
    activeCount: number;
    resignedCount: number;
    totalCount: number;
    activeLlpMembersCount: number;
}
export interface AppointmentsApiResource {
    active_directors_count: number;
    active_secretaries_count: number;
    active_count: number;
    resigned_count: number;
    total_count: number;
    active_llp_members_count: number;
}
export interface MortgageApi {
    satisfiedCount: number;
    partSatisfiedCount: number;
    totalCount: number;
}
export interface MortgageApiResource {
    satisfied_count: number;
    part_satisfied_count: number;
    total_count: number;
}
export interface RegistersApi {
    directors: RegisterApi;
    members: RegisterApi;
    secretaries: RegisterApi;
    usualResidentialAddress: RegisterApi;
    personsWithSignificantControl: RegisterApi;
    llpMembers: RegisterApi;
    llpUsualResidentialAddress: RegisterApi;
}
export interface RegistersApiResource {
    directors: RegisterApi;
    members: RegisterApi;
    secretaries: RegisterApi;
    usual_residential_address: RegisterApi;
    persons_with_significant_control: RegisterApi;
    llp_members: RegisterApi;
    llp_usual_residential_address: RegisterApi;
}
export interface RegisterApi {
    registerMovedTo: string;
    movedOn: string;
}
export interface RegisterApiResource {
    register_moved_to: string;
    moved_on: string;
}

 /**
  * MetricsApi is what is returned from the api.
  */
 export interface MetricsApi {
   etag: string;
   counts: CountsApi;
   mortgage: MortgageApi;
   registers?: RegistersApi;
 }

export interface MetricsApiResource {
   etag: string;
   counts: CountsApi;
   mortgage: MortgageApi;
   registers?: RegistersApi;
}

export interface CountsApi {
    personsWithSignificantControl?: PscApi;
    appointments: AppointmentsApi;
}

export interface CountsApiResource {
    persons_with_significant_control?: PscApi;
    appointments: AppointmentsApi;
}

export interface PscApi {
    statementsCount: number;
    ceasedPscsCount: number;
    totalCount: number;
    activePscsCount: number;
    withdrawnStatementsCount: number;
    activeStatementsCount: number;
    pscsCount: number;
}

export interface PscApiResource {
    statements_count: number;
    ceased_pscs_count: number;
    total_count: number;
    active_pscs_count: number;
    withdrawn_statements_count: number;
    active_statements_count: number;
    pscs_count: number;
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

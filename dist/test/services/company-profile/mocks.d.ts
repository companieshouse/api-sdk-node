export declare const fullCompanyProfileMock: {
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_creation: string;
    jurisdiction: string;
    company_status_detail: string;
    sic_codes: string[];
    has_been_liquidated: boolean;
    has_super_secure_pscs: boolean;
    type: string;
    has_charges: boolean;
    has_insolvency_history: boolean;
    registered_office_address: {
        address_line_1: string;
        address_line_2: string;
        postal_code: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        premises: string;
        region: string;
    };
    service_address: {
        address_line_1: string;
        address_line_2: string;
        postal_code: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        premises: string;
        region: string;
    };
    accounts: {
        next_accounts: {
            period_end_on: string;
            period_start_on: string;
        };
        next_due: string;
        overdue: boolean;
    };
    foreign_company_details: {
        business_activity: string;
        governed_by: string;
        legal_form: string;
        originating_registry: {
            name: string;
            country: string;
        };
        is_a_credit_finacial_institution: boolean;
        registration_number: string;
    };
    confirmation_statement: {
        last_made_up_to: string;
        next_due: string;
        next_made_up_to: string;
        overdue: boolean;
    };
    is_on_register_in_country_formed_in: string;
    links: {
        filing_history: string;
    };
};
export declare const registeredAddressEtcMissingCompanyProfileMock: {
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_creation: string;
    jurisdiction: string;
    company_status_detail: string;
    sic_codes: string[];
    has_been_liquidated: boolean;
    type: string;
    has_charges: boolean;
    has_insolvency_history: boolean;
    registered_office_address: any;
    accounts: any;
    service_address: any;
    foreign_company_details: any;
    confirmation_statement: any;
    links: any;
    is_on_register_in_country_formed_in: any;
};
export declare const foreignCompanyDetailsEtcMissingCompanyProfileMock: {
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_creation: string;
    jurisdiction: string;
    company_status_detail: string;
    sic_codes: string[];
    has_been_liquidated: boolean;
    type: string;
    has_charges: boolean;
    has_insolvency_history: boolean;
    registered_office_address: any;
    accounts: any;
    confirmation_statement: any;
    links: any;
};

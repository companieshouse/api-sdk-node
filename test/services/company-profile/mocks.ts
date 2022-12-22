export const fullCompanyProfileMock = {
    company_name: "HELLO LTD",
    company_number: "88",
    company_status: "liquidation",
    date_of_creation: "1945-08-07",
    jurisdiction: "england-wales",
    company_status_detail: "not sure",
    sic_codes: ["85100"],
    has_been_liquidated: false,
    has_super_secure_pscs: false,
    type: "private-limited-shares-section-30-exemption",
    has_charges: false,
    has_insolvency_history: true,
    registered_office_address: {
        address_line_1: "100 Rochester Row",
        address_line_2: "London",
        postal_code: "SW1P 1JP",
        care_of: "Someone",
        country: "England",
        locality: "Greater London",
        po_box: "None",
        premises: "",
        region: ""
    },
    service_address: {
        address_line_1: "101 Test Road",
        address_line_2: "Cambridge",
        postal_code: "CB1 ",
        care_of: "Someone",
        country: "England",
        locality: "Cambridgeshire",
        po_box: "None",
        premises: "",
        region: ""
    },
    accounts: {
        next_accounts: {
            period_end_on: "2018-11-22",
            period_start_on: "2017-03-01"
        },
        next_due: "2019-07-01",
        overdue: true
    },
    foreign_company_details: {
        business_activity: "Trading",
        governed_by: "Corporation Law Of Australia",
        legal_form: "Public Company Limited By Shares",
        originating_registry: {
            name: "State Of Victoria - Australia",
            country: "Australia"
        },
        is_a_credit_finacial_institution: false
    },
    confirmation_statement: {
        last_made_up_to: "2018-08-24",
        next_due: "2019-08-24",
        next_made_up_to: "2019-07-20",
        overdue: true
    },
    is_on_register_in_country_formed_in: "false",
    links: {
        filing_history: "/company/00000000/filing-history"
    }
};

export const registeredAddressEtcMissingCompanyProfileMock = {
    company_name: "HELLO LTD",
    company_number: "88",
    company_status: "liquidation",
    date_of_creation: "1945-08-07",
    jurisdiction: "england-wales",
    company_status_detail: "not sure",
    sic_codes: ["85100"],
    has_been_liquidated: false,
    type: "private-limited-shares-section-30-exemption",
    has_charges: false,
    has_insolvency_history: true,
    registered_office_address: undefined,
    accounts: undefined,
    service_address: undefined,
    foreign_company_details: undefined,
    confirmation_statement: undefined,
    links: undefined,
    is_on_register_in_country_formed_in: undefined
};

export const foreignCompanyDetailsEtcMissingCompanyProfileMock = {
    company_name: "HELLO LTD",
    company_number: "88",
    company_status: "liquidation",
    date_of_creation: "1945-08-07",
    jurisdiction: "england-wales",
    company_status_detail: "not sure",
    sic_codes: ["85100"],
    has_been_liquidated: false,
    type: "private-limited-shares-section-30-exemption",
    has_charges: false,
    has_insolvency_history: true,
    registered_office_address: undefined,
    accounts: undefined,
    confirmation_statement: undefined,
    links: undefined
};

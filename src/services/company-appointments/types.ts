export interface CompanyAppointmentResourceLinks {
  officer: string,
  self: string;
}

export interface CompanyAppointmentResource {
  service_address: AddressResource;
  usual_residential_address?: AddressResource;
  is_pre_1992_appointment?: boolean;
  appointed_on?: string;
  appointed_before: string;
  resigned_on?: string;
  country_of_residence?: string;
  date_of_birth?: DateOfBirthResource;
  former_names?: FormerNameResource[];
  surname?: string;
  forename?: string;
  identification?: IdentificationResource;
  links: CompanyAppointmentResourceLinks;
  name: string;
  nationality?: string;
  occupation?: string;
  officer_role: string;
  etag?: string;
  appointment_id?: string;
}

export interface AddressResource {
  address_line_1: string;
  address_line_2?: string;
  care_of?: string;
  country: string;
  locality: string;
  po_box?: string;
  postal_code?: string;
  premises?: string;
  region?: string;
  usualCountryOfResidence?: string;
}

export interface DateOfBirthResource {
  day?: string;
  month: string;
  year: string;
}

export interface FormerNameResource {
  forenames?: string;
  surname?: string;
}

export interface IdentificationResource {
  identification_type?: string;
  legal_authority?: string;
  legal_form?: string;
  place_registered?: string;
  registration_number?: string;
}

/**
 * CompanyAppointment is the interface used within this SDK.
 */

export interface CompanyAppointmentLinks {
  officer: string,
  self: string;
}

export interface CompanyAppointment {
  service_address: Address;
  usual_residential_address?: Address;
  is_pre_1992_appointment?: boolean;
  appointed_on?: string;
  appointed_before: string;
  resigned_on?: string;
  country_of_residence?: string;
  date_of_birth?: DateOfBirth;
  former_names?: FormerName[];
  surname?: string;
  forename?: string;
  identification?: Identification;
  links: CompanyAppointmentLinks;
  name: string;
  nationality?: string;
  occupation?: string;
  officer_role: string;
  etag?: string;
  appointment_id?: string;
}

export interface Address {
  address_line_1: string;
  address_line_2?: string;
  care_of?: string;
  country: string;
  locality: string;
  po_box?: string;
  postal_code?: string;
  premises?: string;
  region?: string;
  usualCountryOfResidence?: string;
}

export interface DateOfBirth {
  day?: string;
  month: string;
  year: string;
}

export interface FormerName {
  forenames?: string;
  surname?: string;
}

export interface Identification {
  identification_type?: string;
  legal_authority?: string;
  legal_form?: string;
  place_registered?: string;
  registration_number?: string;
}

import { FuseUtils } from '@fuse/utils';

export const PotentialsConst = {
    name: 'Oportunidad',
    names: 'Oportunidades',
    listType: 'Potentials'
};

export class Contact
{
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    company: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.lastName = contact.lastName || '';
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.nickname = contact.nickname || '';
            this.company = contact.company || '';
            this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phone = contact.phone || '';
            this.address = contact.address || '';
            this.birthday = contact.birhday || '';
            this.notes = contact.notes || '';
        }
    }
}

export interface Potentials
{
    potential_no: string;
    potentialname: string;
    amount: string;
    related_to: string;
    closingdate: string;
    opportunity_type: string;
    nextstep: string;
    leadsource: string;
    sales_stage: string;
    assigned_user_id: string;
    probability: string;
    campaignid: string;
    createdtime: string;
    modifiedtime: string;
    modifiedby: string;
    description: string;
    forecast_amount: string;
    isconvertedfromlead: string;
    contact_id: string;
    service_status: string;
    id: string;
}

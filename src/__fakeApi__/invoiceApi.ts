import { subHours, subDays } from 'date-fns';
import type { Invoice } from '../types/invoice';

const now = new Date();

class InvoiceApi {
  getInvoices(): Promise<Invoice[]> {
    const invoices: Invoice[] = [
      {
        id: '5ecb868d0f437390ef3ac62c',
        status: 'pending',
        department: 'CMPE',
        course: '150',
        createdAt: new Date('2022-06-02T00:00:00')
      },
      {
        id: '5ecb868ada8deedee0638502',
        department: 'CMPE',
        course: '160',
        status: 'timestamped',
        createdAt: new Date('2022-06-02T00:00:00')
      },
      {
        id: '5ecb868700aba84d0f1c0e48',
        department: 'CMPE',
        course: '250',
        status: 'timestamped',
        createdAt: new Date('2022-06-02T00:00:00')
      },
      {
        id: '5ecb8682038e1ddf4e868764',
        department: 'CMPE',
        course: '260',
        status: 'timestamped',
        createdAt: new Date('2022-06-02T00:00:00')
      }
    ];

    return Promise.resolve(invoices);
  }

  getInvoice(): Promise<Invoice> {
    const invoice: Invoice = {
      id: '5ecb86785312dcc69b5799ad',
      department: 'CMPE',
      course: '260',
      status: 'timestamped',
      createdAt: new Date('2022-06-02T00:00:00')
    };

    return Promise.resolve(invoice);
  }
}

export const invoiceApi = new InvoiceApi();

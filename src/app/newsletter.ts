
// INTERFACES
// Based on Sails models

export interface Newsletter {
  id: string;
  name?: string;
  expeditor?: string;
  expectedTimeOfArrival: number;
  expectedPeriodicity: 'daily' | 'weekly';

  lastRecosGenerated: string;
  lastSentByServer: string;
  lastReceivedByClient: string;

  toleranceBeforeWarning: number;
  toleranceBeforeError: number;
  criteria: any; // json object with arguments & body, representing a function

  createdAt?: number;
  updatedAt?: number;

  // associations (need to be populated)
  engine: string | Engine ; // reference to engine owning newsletter
  lastSending: string | Sending; // reference to latest email received

  // attributes added by client project
  status?: NewsletterStatus;
  arrivedToday?: boolean;
  expectedDateTime?: number;

}

export interface Email {
  id: string;
  expeditor: string;
  subject: string;
  date: string;

  // associations (need to be populated)
  origin?: string | Sending;

  createdAt?: number;
  updatedAt?: number;
}

export interface Engine {
  id: string;
  name: string;
  description: string;

  // associations (need to be populated)
  newsletters: Newsletter[] | number[];

  createdAt?: number;
  updatedAt?: number;
}

export interface Sending {
  id: string;
  internalId?: string;
  isComplete: boolean;

  // associations (need to be populated)
  newsletter: string | Newsletter;
  emailsResultingOfSending: string[] | Email[];

  createdAt?: number;
  updatedAt?: number;
}




// Interfaces for Angular manipulation / representing responses



export interface ScriptExecutionResult {
  messagesTotal: number;
  messagesProcessed: number;
  newslettersModified: number;
  newslettersCreated: number;
}

export enum NewsletterStatus {
  SCHEDULED,
  ON_TIME,
  LATE,
  NOT_SENT
}


// INTERFACES
// Based on Sails models

export interface Newsletter {
  id: number;
  name?: string;
  expeditor: string;
  expectedTimeOfArrival: number;
  expectedPeriodicity: 'daily' | 'weekly';

  lastRecosGenerated: string;
  lastSentByServer: string;
  lastReceivedByClient: string;

  engine: string | Engine ; // reference to engine owning newsletter
  lastEmail: string | Email; // reference to latest email received

  toleranceBeforeWarning: number;
  toleranceBeforeError: number;
  criteria: any; // json object with arguments & body, representing a function

  createdAt?: number;
  updatedAt?: number;

  // attributes added by client project
  status?: NewsletterStatus;
  arrivedToday?: boolean;
  expectedDateTime?: number;

}

export interface ScriptExecutionResult {
  messagesProcessed: number;
  newslettersModified: number;
  newslettersCreated: number;
}

export interface Email {
  id: string;
  expeditor: string;
  subject: string;
  date: string;

  createdAt?: number;
  updatedAt?: number;
}

export interface Engine {
  businessId: number;
  name: string;
  description: string;
  newsletters: Newsletter[] | number[];
}


export enum NewsletterStatus {
  SCHEDULED,
  ON_TIME,
  LATE,
  NOT_SENT
}
